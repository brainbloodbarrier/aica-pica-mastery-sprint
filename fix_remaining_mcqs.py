#!/usr/bin/env python3
"""Fix the remaining MCQ cells that actually need citations."""

import json
import re

# Load notebook
with open('/Users/fax/aica-pica-lesson/AICA_PICA_Mastery_Sprint.ipynb') as f:
    notebook = json.load(f)

# Define the cells that need fixing and their citations
# Based on manual inspection, these are Module 2 detailed questions
cells_to_fix = {
    37: {
        'pattern': 'How many meatal segments are present',
        'citation': 'Source: AICA_content.json Slide 8'
    },
    38: {
        'pattern': 'percentage of CPAs have a premeatal segment that is solitary',
        'citation': 'Source: AICA_content.json Slide 7'
    },
    40: {
        'pattern': 'cranial nerve marks the transition from anterior pontine',
        'citation': 'Source: AICA_content.json Slide 4'
    },
    41: {
        'pattern': 'retrosigmoid CPA surgery',
        'citation': 'Source: AICA_content.json Slide 8'
    },
    43: {
        'pattern': 'AICA segment is defined as extending from',
        'citation': 'Source: AICA_content.json Slide 10'
    },
    35: {
        'pattern': 'premeatal segment of AICA gives rise',
        'citation': 'Source: AICA_content.json Slide 12'
    }
}

fixes_made = 0

for cell_idx, fix_info in cells_to_fix.items():
    if cell_idx >= len(notebook['cells']):
        continue

    cell = notebook['cells'][cell_idx]
    if cell.get('cell_type') != 'code':
        continue

    source_lines = cell.get('source', [])
    full_source = ''.join(source_lines)

    # Skip if already has Source
    if 'Source:' in full_source:
        print(f"Cell {cell_idx} already has Source, skipping")
        continue

    # Skip if not an actual MCQ call (not definition)
    if 'def create_mcq' in full_source:
        print(f"Cell {cell_idx} is function definition, skipping")
        continue

    if 'display(create_mcq' not in full_source:
        print(f"Cell {cell_idx} doesn't call create_mcq, skipping")
        continue

    # Verify this is the right question
    if fix_info['pattern'] not in full_source:
        print(f"Cell {cell_idx} doesn't match expected pattern, skipping")
        continue

    # Add citation to the explanation line
    for i in range(len(source_lines) - 1, -1, -1):
        line = source_lines[i]
        # Find the explanation line (contains text and ends with ")
        if '"' in line and (')' in line or '\\n' in line):
            # This is likely the explanation line
            if line.rstrip().endswith('"'):
                # Add citation inside the quotes
                source_lines[i] = line.rstrip()[:-1] + '. ' + fix_info['citation'] + '"\\n'
                fixes_made += 1
                print(f"Fixed cell {cell_idx}: Added {fix_info['citation']}")
                break
            elif '")' in line:
                # Handle closing with ))
                new_line = line.replace('")', f". {fix_info['citation']}\")")
                source_lines[i] = new_line
                fixes_made += 1
                print(f"Fixed cell {cell_idx}: Added {fix_info['citation']}")
                break

    # Update the cell
    cell['source'] = source_lines

print(f"\\n✅ Fixed {fixes_made} MCQ cells")

# Save the notebook
with open('/Users/fax/aica-pica-lesson/AICA_PICA_Mastery_Sprint.ipynb', 'w') as f:
    json.dump(notebook, f, indent=1, ensure_ascii=False)
print("📝 Notebook saved")