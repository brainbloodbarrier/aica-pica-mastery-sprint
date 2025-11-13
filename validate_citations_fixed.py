#!/usr/bin/env python3
"""Fixed citation validation script."""

import json
import re
import sys
from pathlib import Path


def load_notebook(notebook_path: Path) -> dict:
    """Load the Jupyter notebook."""
    with open(notebook_path, encoding="utf-8") as f:
        return json.load(f)


def extract_mcq_cells(notebook: dict) -> list[dict]:
    """Extract all cells containing create_mcq() calls."""
    mcq_cells = []
    for cell in notebook.get("cells", []):
        if cell.get("cell_type") != "code":
            continue
        source = "".join(cell.get("source", []))
        # Skip the function definition itself
        if "def create_mcq" in source:
            continue
        if "create_mcq(" in source:
            mcq_cells.append({"source": source, "metadata": cell.get("metadata", {})})
    return mcq_cells


def validate_citation(source: str) -> dict:
    """
    Validate that a create_mcq() call has proper citation.

    Returns dict with:
        - valid: bool
        - question_id: str (e.g., "M7 Q2")
        - citation: str or None
        - issues: list[str]
    """
    result = {"valid": True, "question_id": "Unknown", "citation": None, "issues": []}

    # Extract question ID (e.g., "# M7 Q2")
    q_id_match = re.search(r"# (M\d+ Q\d+)", source)
    if q_id_match:
        result["question_id"] = q_id_match.group(1)

    # Check for placeholder content
    if "[Content]" in source or ("Explanation" in source and source.count("Explanation") == 1):
        result["valid"] = False
        result["issues"].append("Contains placeholder content")
        return result

    # Check if Source: exists anywhere in the MCQ call
    if "Source:" not in source:
        result["valid"] = False
        result["issues"].append("No explanation with 'Source:' citation found")
        return result

    # Extract the Source citation
    source_match = re.search(r"Source:[^\"']*", source)
    if source_match:
        citation = source_match.group().strip()
        result["citation"] = citation

        # Validate citation format: "Source: [JSON_file] Slide [#]"
        citation_pattern = r"Source:\s+(AICA_content\.json|PICA_content\.json)\s+Slides?\s+\d+"
        if not re.match(citation_pattern, citation):
            result["valid"] = False
            result["issues"].append(
                "Citation format invalid. Expected: 'Source: [JSON_file] Slide [#]'"
            )
    else:
        result["valid"] = False
        result["issues"].append("Could not extract Source citation")

    return result


def main():
    """Main validation routine."""
    # Paths
    repo_root = Path(__file__).parent
    notebook_path = repo_root / "AICA_PICA_Mastery_Sprint.ipynb"

    if not notebook_path.exists():
        print(f"❌ ERROR: Notebook not found at {notebook_path}")
        sys.exit(1)

    print("📝 AICA-PICA Citation Validation (Fixed)")
    print("=" * 60)
    print(f"Notebook: {notebook_path.name}\n")

    # Load and extract
    notebook = load_notebook(notebook_path)
    mcq_cells = extract_mcq_cells(notebook)

    print(f"Found {len(mcq_cells)} MCQ cells (excluding function definition)\n")

    # Validate each
    invalid_count = 0
    results = []

    for cell in mcq_cells:
        result = validate_citation(cell["source"])
        results.append(result)

        if not result["valid"]:
            invalid_count += 1
            print(f"❌ {result['question_id']}")
            for issue in result["issues"]:
                print(f"   └─ {issue}")
            if result["citation"]:
                print(f"   └─ Found: '{result['citation']}'")
            print()

    # Summary
    print("=" * 60)
    print(f"✅ Valid citations: {len(mcq_cells) - invalid_count}")
    print(f"❌ Invalid citations: {invalid_count}")

    if invalid_count == 0:
        print("\n🎉 All citations are properly formatted!")
        sys.exit(0)
    else:
        print(f"\n⚠️  Found {invalid_count} questions with citation issues")
        print("Please add citations in format: 'Source: [JSON_file] Slide [#]'")
        sys.exit(1)


if __name__ == "__main__":
    main()