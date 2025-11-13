#!/usr/bin/env python3
"""Final comprehensive fix for ALL citation issues."""

import json
import re

# Load notebook
with open('/Users/fax/aica-pica-lesson/AICA_PICA_Mastery_Sprint.ipynb') as f:
    notebook = json.load(f)

fixes_made = 0

# Process each cell
for cell_idx, cell in enumerate(notebook['cells']):
    if cell.get('cell_type') != 'code':
        continue

    source_lines = cell.get('source', [])
    if not source_lines:
        continue

    full_source = ''.join(source_lines)

    # Skip if not an MCQ
    if 'create_mcq(' not in full_source:
        continue

    # Skip if already has Source:
    if 'Source:' in full_source:
        continue

    # This cell needs a citation - determine based on content
    citation = None

    # Module 1 Questions
    if 'CN VII and VIII' in full_source or 'facial (VII) and vestibulocochlear' in full_source:
        citation = 'Source: AICA_content.json Slide 1'
    elif 'Wallenberg syndrome' in full_source or 'PICA typically results' in full_source:
        citation = 'Source: PICA_content.json Slide 15'
    elif 'vertebral arteries enter' in full_source:
        citation = 'Source: PICA_content.json Slide 8'

    # Module 2 Questions - Detailed segment questions
    elif 'premeatal segment' in full_source and 'gives rise' in full_source:
        citation = 'Source: AICA_content.json Slide 12'
    elif 'meatal segments' in full_source and 'CPAs' in full_source:
        citation = 'Source: AICA_content.json Slide 8'
    elif 'premeatal segment that bifurcates' in full_source:
        citation = 'Source: AICA_content.json Slide 11'
    elif 'cranial nerve marks the transition' in full_source:
        citation = 'Source: AICA_content.json Slide 4'
    elif 'retrosigmoid CPA surgery' in full_source and 'meatal segment' in full_source:
        citation = 'Source: AICA_content.json Slide 8'
    elif 'AICA bifurcates into' in full_source and 'rostral and caudal' in full_source:
        citation = 'Source: AICA_content.json Slide 11'
    elif 'postmeatal segment' in full_source and 'extends from' in full_source:
        citation = 'Source: AICA_content.json Slide 9'

    # Module 3 Questions
    elif 'labyrinthine' in full_source:
        citation = 'Source: AICA_content.json Slide 12'
    elif 'recurrent' in full_source or 'perforat' in full_source:
        citation = 'Source: AICA_content.json Slide 12'
    elif 'subarcuate' in full_source:
        citation = 'Source: AICA_content.json Slide 13'

    # Module 4 Questions
    elif 'five segments' in full_source or 'PICA has five' in full_source:
        citation = 'Source: PICA_content.json Slide 2'
    elif 'tonsillomedullary' in full_source:
        citation = 'Source: PICA_content.json Slide 5'
    elif 'telovelotonsillar' in full_source:
        citation = 'Source: PICA_content.json Slide 6'
    elif 'cranial loop' in full_source:
        citation = 'Source: PICA_content.json Slide 9'
    elif 'caudal loop' in full_source:
        citation = 'Source: PICA_content.json Slide 10'

    # Module 5 Questions
    elif 'lateral medullary' in full_source:
        citation = 'Source: PICA_content.json Slide 11'
    elif 'Wallenberg' in full_source:
        citation = 'Source: PICA_content.json Slide 15'
    elif 'medial branch' in full_source and 'PICA' in full_source:
        citation = 'Source: PICA_content.json Slide 12'

    # Module 6 Questions
    elif 'AICA arises from' in full_source and 'PICA arises from' in full_source:
        citation = 'Source: AICA_content.json Slide 2'
    elif 'middle cerebellar peduncle' in full_source:
        citation = 'Source: AICA_content.json Slide 5'
    elif 'petrosal' in full_source:
        citation = 'Source: AICA_content.json Slide 14'
    elif 'suboccipital' in full_source:
        citation = 'Source: PICA_content.json Slide 14'

    # If no citation was determined, skip
    if not citation:
        # Extract a snippet for debugging
        snippet = re.search(r'"Q\d+:([^"]{0,50})', full_source)
        if snippet:
            print(f"WARNING: No citation determined for cell {cell_idx}: {snippet.group(1)[:30]}...")
        continue

    # Add the citation to the explanation line
    # Find the line with the explanation (last string parameter before ))
    for i in range(len(source_lines) - 1, -1, -1):
        line = source_lines[i]
        # Look for the explanation line (contains text and ends with " or ))
        if '"' in line and (')' in line or '\\n' in line):
            if line.rstrip().endswith('"'):
                # Add citation inside the quotes
                source_lines[i] = line.rstrip()[:-1] + '. ' + citation + '"\\n'
                fixes_made += 1
                print(f"Fixed cell {cell_idx}: Added {citation}")
                break
            elif '")' in line:
                # Handle closing with ))
                new_line = line.replace('")', f'. {citation}")')
                source_lines[i] = new_line
                fixes_made += 1
                print(f"Fixed cell {cell_idx}: Added {citation}")
                break

    # Update cell if modified
    if citation:
        cell['source'] = source_lines

print(f"\\n✅ Fixed {fixes_made} cells")

# Save the notebook
with open('/Users/fax/aica-pica-lesson/AICA_PICA_Mastery_Sprint.ipynb', 'w') as f:
    json.dump(notebook, f, indent=1, ensure_ascii=False)
print("📝 Notebook saved")