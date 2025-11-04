#!/usr/bin/env python3
"""
Fix AICA_PICA_Mastery_Sprint.ipynb by reorganizing questions and adding missing ones.

Current issues:
- Questions are labeled correctly but placed in wrong module sections
- Missing questions: Module 4 (11), Module 5 (7), Module 7 (14), Module 8 (9)
- Total: Need to add 41 new questions + reorganize existing 90 questions

This script will:
1. Extract all correctly-labeled questions
2. Generate missing questions from JSON sources
3. Reorganize notebook so questions appear in correct module sections
4. Save fixed notebook as AICA_PICA_Mastery_Sprint_FIXED.ipynb
"""

import json
import re
from pathlib import Path

def create_code_cell(source_lines):
    """Create a code cell for notebook."""
    if isinstance(source_lines, str):
        source_lines = [source_lines]
    return {
        "cell_type": "code",
        "execution_count": None,
        "metadata": {},
        "outputs": [],
        "source": source_lines
    }

def main():
    # Load notebook
    print("Loading notebook...")
    nb_path = Path('/Users/fax/Downloads/rhoton-ready/aica-pica/AICA_PICA_Mastery_Sprint.ipynb')
    with open(nb_path) as f:
        nb = json.load(f)

    # Extract questions by module number
    module_questions = {i: [] for i in range(1, 11)}
    module_assessment_cells = {}
    non_question_cells = []

    for i, cell in enumerate(nb['cells']):
        # Check for module assessment headers
        if cell['cell_type'] == 'markdown':
            content = ''.join(cell['source'])
            if '### ✅ Module' in content and 'Assessment' in content:
                for num in range(1, 11):
                    if f'Module {num} Assessment' in content:
                        module_assessment_cells[num] = i
                        break

        # Extract question cells
        if cell['cell_type'] == 'code':
            content = ''.join(cell['source'])
            if 'create_mcq(' in content:
                # Get module number from comment
                match = re.search(r'# Module (\d+)', content)
                if match:
                    mod_num = int(match.group(1))
                    module_questions[mod_num].append(cell)
                    continue

        # This cell is not a question
        non_question_cells.append((i, cell))

    print("\nCurrent question counts:")
    for mod in range(1, 11):
        print(f"  Module {mod}: {len(module_questions[mod])} questions")

    # Now generate missing questions
    print("\nGenerating missing questions...")

    # Load source JSON data
    with open('/Users/fax/Downloads/rhoton-ready/aica-pica/data/AICA_content.json') as f:
        aica_data = json.load(f)
    with open('/Users/fax/Downloads/rhoton-ready/aica-pica/data/PICA_content.json') as f:
        pica_data = json.load(f)

    # Module 4: Need 11 more PICA segment questions
    print("  Generating Module 4 questions (11 needed)...")
    module_4_new_questions = generate_module_4_questions()

    # Module 5: Need 7 more PICA branch questions
    print("  Generating Module 5 questions (7 needed)...")
    module_5_new_questions = generate_module_5_questions()

    # Module 7: Need 14 more quantitative questions
    print("  Generating Module 7 questions (14 needed)...")
    module_7_new_questions = generate_module_7_questions()

    # Module 8: Need 9 more clinical vignettes
    print("  Generating Module 8 questions (9 needed)...")
    module_8_new_questions = generate_module_8_questions()

    # Add new questions to module_questions
    module_questions[4].extend(module_4_new_questions)
    module_questions[5].extend(module_5_new_questions)
    module_questions[7].extend(module_7_new_questions)
    module_questions[8].extend(module_8_new_questions)

    print("\nUpdated question counts:")
    required = {1: 5, 2: 10, 3: 10, 4: 12, 5: 10, 6: 10, 7: 20, 8: 12, 9: 33, 10: 8}
    total_questions = 0
    for mod in range(1, 11):
        count = len(module_questions[mod])
        total_questions += count
        status = "✓" if count >= required[mod] else f"✗ (need {required[mod]})"
        print(f"  Module {mod}: {count}/{required[mod]} {status}")
    print(f"\nTotal questions: {total_questions}/{sum(required.values())}")

    # Now reconstruct notebook with questions in correct positions
    print("\nReconstructing notebook...")
    new_cells = []

    # We need to insert questions after each module's assessment header
    # Strategy: Go through cells, when we hit a module assessment, insert that module's questions

    inserted_modules = set()
    for i, cell in enumerate(nb['cells']):
        new_cells.append(cell)

        # Check if this is a module assessment header
        if cell['cell_type'] == 'markdown':
            content = ''.join(cell['source'])
            if '### ✅ Module' in content and 'Assessment' in content:
                for mod_num in range(1, 11):
                    if f'Module {mod_num} Assessment' in content and mod_num not in inserted_modules:
                        # Insert this module's questions here
                        print(f"  Inserting {len(module_questions[mod_num])} questions after Module {mod_num} assessment")
                        new_cells.extend(module_questions[mod_num])
                        inserted_modules.add(mod_num)

                        # Also need to add score submission cell
                        # (Skip for now, will keep existing score cells)
                        break

    # Create new notebook
    new_nb = nb.copy()
    new_nb['cells'] = new_cells

    # Save
    output_path = nb_path.parent / 'AICA_PICA_Mastery_Sprint_FIXED.ipynb'
    with open(output_path, 'w') as f:
        json.dump(new_nb, f, indent=2)

    print(f"\n✓ Fixed notebook saved to: {output_path}")
    print(f"  Total cells: {len(new_cells)}")
    print(f"  Original cells: {len(nb['cells'])}")

def generate_module_4_questions():
    """Generate 11 PICA segment questions."""
    questions = []

    # Read from generated file
    with open('/tmp/module_4_questions.txt') as f:
        q_texts = f.read().split('\n\n')

    for q_text in q_texts:
        if q_text.strip():
            questions.append(create_code_cell(q_text + '\n'))

    return questions

def generate_module_5_questions():
    """Generate 7 PICA branch questions."""
    questions = []

    with open('/tmp/module_5_questions.txt') as f:
        q_texts = f.read().split('\n\n')

    for q_text in q_texts:
        if q_text.strip():
            questions.append(create_code_cell(q_text + '\n'))

    return questions

def generate_module_7_questions():
    """Generate 14 quantitative questions."""
    # These need to be created fresh
    questions = []

    # For now, return empty - need to generate these
    # TODO: Generate 14 quantitative questions from JSON data
    print("    WARNING: Module 7 questions not yet generated - need manual creation")

    return questions

def generate_module_8_questions():
    """Generate 9 clinical vignettes."""
    questions = []

    with open('/tmp/module_8_vignettes.txt') as f:
        q_texts = f.read().split('\n\n')

    # We generated 12 but only need 9 more (already have 3)
    for q_text in q_texts[3:12]:  # Skip first 3, take next 9
        if q_text.strip():
            questions.append(create_code_cell(q_text + '\n'))

    return questions

if __name__ == '__main__':
    main()
