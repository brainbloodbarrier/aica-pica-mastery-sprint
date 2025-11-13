#!/usr/bin/env python3
"""Properly fix citation format issues."""

import json
import re

# Load notebook
with open('/Users/fax/aica-pica-lesson/AICA_PICA_Mastery_Sprint.ipynb') as f:
    notebook = json.load(f)

fixes_made = 0

# First, fix the broken citations from previous attempts
for cell in notebook['cells']:
    if cell.get('cell_type') != 'code':
        continue

    source_lines = cell.get('source', [])
    modified = False

    for i, line in enumerate(source_lines):
        # Fix citations that were added outside the quotes
        if '"\n. Source:' in line:
            # Move Source inside the quotes
            source_lines[i] = line.replace('"\n. Source:', '. Source:') + '"'
            modified = True
            fixes_made += 1
        elif '\\n. Source:' in line:
            # Fix escaped newline version
            new_line = line.replace('\\n. Source:', '. Source:')
            if not new_line.rstrip().endswith('"'):
                new_line = new_line.rstrip() + '"'
            if not new_line.endswith('\\n'):
                new_line = new_line + '\\n'
            source_lines[i] = new_line
            modified = True
            fixes_made += 1

    if modified:
        cell['source'] = source_lines

print(f"Fixed {fixes_made} misplaced citations")

# Now add missing citations properly
for cell_idx, cell in enumerate(notebook['cells']):
    if cell.get('cell_type') != 'code':
        continue

    source_lines = cell.get('source', [])
    if not source_lines:
        continue

    full_source = ''.join(source_lines)
    if 'create_mcq(' not in full_source:
        continue

    # Skip if already has Source:
    if 'Source:' in full_source:
        continue

    # Find the explanation parameter (last string parameter)
    # It's the line that contains the explanation text
    explanation_line_idx = -1
    for i in range(len(source_lines) - 1, -1, -1):
        # Look for a line that looks like an explanation
        if '"' in source_lines[i] and (
            'syndrome' in source_lines[i] or
            'artery' in source_lines[i] or
            'segment' in source_lines[i] or
            'supplies' in source_lines[i] or
            'PICA' in source_lines[i] or
            'AICA' in source_lines[i] or
            '%' in source_lines[i]
        ):
            explanation_line_idx = i
            break

    if explanation_line_idx == -1:
        continue

    # Determine the appropriate citation based on content
    citation = None
    line = source_lines[explanation_line_idx]

    # Module content analysis
    if 'variable origin' in line and 'PICA' in line:
        citation = 'Source: PICA_content.json Slide 8'
    elif 'below the foramen magnum' in line:
        citation = 'Source: PICA_content.json Slide 8'
    elif 'extradural PICA' in line:
        citation = 'Source: PICA_content.json Slide 8'
    elif 'PICA is absent' in full_source:
        citation = 'Source: PICA_content.json Slide 18'
    elif 'petrosal surface' in line:
        citation = 'Source: AICA_content.json Slide 14'
    elif 'suboccipital surface' in line:
        citation = 'Source: PICA_content.json Slide 14'

    if citation:
        # Add citation inside the quotes
        if line.rstrip().endswith('"'):
            source_lines[explanation_line_idx] = line.rstrip()[:-1] + '. ' + citation + '"\\n'
            fixes_made += 1
            cell['source'] = source_lines
            print(f"Added citation to cell {cell_idx}: {citation}")

print(f"\\n✅ Total fixes made: {fixes_made}")

# Save the notebook
with open('/Users/fax/aica-pica-lesson/AICA_PICA_Mastery_Sprint.ipynb', 'w') as f:
    json.dump(notebook, f, indent=1, ensure_ascii=False)
print("📝 Notebook saved")