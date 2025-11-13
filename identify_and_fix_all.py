#!/usr/bin/env python3
"""Identify ALL questions without citations and fix them."""

import json
import re

# Load notebook
with open('/Users/fax/aica-pica-lesson/AICA_PICA_Mastery_Sprint.ipynb') as f:
    notebook = json.load(f)

# First pass: Identify all cells without Source:
cells_without_source = []
for i, cell in enumerate(notebook['cells']):
    if cell.get('cell_type') != 'code':
        continue
    source = ''.join(cell.get('source', []))
    if 'create_mcq(' in source and 'Source:' not in source:
        # Extract the question for identification
        q_match = re.search(r'"(Q\d+:[^"]+)"', source)
        question = q_match.group(1) if q_match else 'Unknown'
        cells_without_source.append((i, question[:50]))

print(f"Found {len(cells_without_source)} cells without Source citations:")
for idx, q in cells_without_source:
    print(f"  Cell {idx}: {q}...")

# Define the mapping of questions to citations
# Based on the content analysis
question_to_citation = {
    # Module 1 - Posterior circulation
    'most variable origin': 'Source: PICA_content.json Slide 8',
    'below the foramen magnum': 'Source: PICA_content.json Slide 8',
    'extradural PICA origin': 'Source: PICA_content.json Slide 8',

    # Module 2 - AICA segments
    '72%': 'Source: AICA_content.json Slide 2',
    'single trunk': 'Source: AICA_content.json Slide 2',
    'lower to middle third': 'Source: AICA_content.json Slide 2',
    'four main segments': 'Source: AICA_content.json Slide 3',
    'anterior pontine segment': 'Source: AICA_content.json Slide 4',
    'lateral pontine segment': 'Source: AICA_content.json Slide 5',
    'premeatal segment': 'Source: AICA_content.json Slide 7',
    'meatal segment': 'Source: AICA_content.json Slide 8',
    'postmeatal segment': 'Source: AICA_content.json Slide 9',
    'flocculopeduncular': 'Source: AICA_content.json Slide 10',
    'cortical segment': 'Source: AICA_content.json Slide 11',

    # Module 3 - AICA branches
    'labyrinthine': 'Source: AICA_content.json Slide 12',
    'recurrent perforating': 'Source: AICA_content.json Slide 12',
    'Recurrent perforators': 'Source: AICA_content.json Slide 12',
    'subarcuate': 'Source: AICA_content.json Slide 13',
    'AICA syndrome': 'Source: AICA_content.json Slide 15',
    'meatal loop': 'Source: AICA_content.json Slide 8',
    'AICA bifurcates': 'Source: AICA_content.json Slide 11',
    'bifurcation': 'Source: AICA_content.json Slide 11',
    'petrosal': 'Source: AICA_content.json Slide 14',

    # Module 4 - PICA segments
    'five segments': 'Source: PICA_content.json Slide 2',
    'tonsillomedullary segment': 'Source: PICA_content.json Slide 5',
    'telovelotonsillar': 'Source: PICA_content.json Slide 6',
    'cranial loop': 'Source: PICA_content.json Slide 9',
    'caudal loop': 'Source: PICA_content.json Slide 10',
    'vermian branch': 'Source: PICA_content.json Slide 14',
    'tonsillohemispheric': 'Source: PICA_content.json Slide 14',
    'suboccipital': 'Source: PICA_content.json Slide 14',

    # Module 5 - PICA branches
    'lateral medullary': 'Source: PICA_content.json Slide 11',
    'Wallenberg': 'Source: PICA_content.json Slide 15',
    'medial branch': 'Source: PICA_content.json Slide 12',
    'tonsillomedullary perforators': 'Source: PICA_content.json Slide 11',
    'PICA territory': 'Source: PICA_content.json Slide 15',
}

# Now fix each cell
fixes_made = 0
for cell_idx, question_text in cells_without_source:
    cell = notebook['cells'][cell_idx]
    source_lines = cell['source']

    # Find which citation to use
    citation = None
    full_source = ''.join(source_lines)

    for key, cite in question_to_citation.items():
        if key.lower() in full_source.lower():
            citation = cite
            break

    if not citation:
        print(f"WARNING: Could not determine citation for cell {cell_idx}")
        continue

    # Find the explanation line and add citation
    for i in range(len(source_lines) - 1, -1, -1):
        line = source_lines[i]
        # Find lines that contain explanation text (last string parameter)
        if '"' in line and ('\\n' in line or ')' in line):
            # This is likely the explanation
            if line.rstrip().endswith('"'):
                # Add citation inside the quotes
                source_lines[i] = line.rstrip()[:-1] + '. ' + citation + '"\\n'
                fixes_made += 1
                print(f"Fixed cell {cell_idx}: Added {citation}")
                break
            elif '")' in line:
                # Handle closing parenthesis
                source_lines[i] = line.replace('")', f'. {citation}")')
                fixes_made += 1
                print(f"Fixed cell {cell_idx}: Added {citation}")
                break

    cell['source'] = source_lines

print(f"\\n✅ Fixed {fixes_made} cells")

# Save the notebook
with open('/Users/fax/aica-pica-lesson/AICA_PICA_Mastery_Sprint.ipynb', 'w') as f:
    json.dump(notebook, f, indent=1, ensure_ascii=False)
print("📝 Notebook saved")