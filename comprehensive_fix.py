#!/usr/bin/env python3
"""Comprehensive fix for all citation issues."""

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
    if 'create_mcq(' not in full_source:
        continue

    # Check if Source: is missing
    if 'Source:' in full_source:
        continue

    # This cell needs a citation. Determine what it should be based on content
    citation_to_add = None

    # Identify the question and determine the appropriate citation
    # Module 1 questions (Posterior circulation)
    if 'PICA has the most variable origin' in full_source:
        citation_to_add = 'Source: PICA_content.json Slide 8'
    elif 'AICA bifurcates into rostral and caudal trunks' in full_source:
        citation_to_add = 'Source: AICA_content.json Slide 11'
    elif 'PICA origin is most variable' in full_source:
        citation_to_add = 'Source: PICA_content.json Slide 8'
    elif 'below the foramen magnum in' in full_source:
        citation_to_add = 'Source: PICA_content.json Slide 8'
    elif 'extradural PICA origin' in full_source:
        citation_to_add = 'Source: PICA_content.json Slide 8'

    # Module 2 questions (AICA segments)
    elif '72% of AICAs' in full_source or 'single trunk origin' in full_source:
        citation_to_add = 'Source: AICA_content.json Slide 2'
    elif 'lower to middle third' in full_source:
        citation_to_add = 'Source: AICA_content.json Slide 2'
    elif 'four main segments' in full_source:
        citation_to_add = 'Source: AICA_content.json Slide 3'
    elif 'anterior pontine segment' in full_source:
        citation_to_add = 'Source: AICA_content.json Slide 4'
    elif 'lateral pontine segment' in full_source and 'divided into' in full_source:
        citation_to_add = 'Source: AICA_content.json Slide 5'
    elif 'premeatal segment' in full_source:
        citation_to_add = 'Source: AICA_content.json Slide 7'
    elif 'meatal segment' in full_source:
        citation_to_add = 'Source: AICA_content.json Slide 8'
    elif 'postmeatal segment' in full_source:
        citation_to_add = 'Source: AICA_content.json Slide 9'
    elif 'flocculopeduncular segment' in full_source:
        citation_to_add = 'Source: AICA_content.json Slide 10'
    elif 'cortical segment' in full_source and 'distributes' in full_source:
        citation_to_add = 'Source: AICA_content.json Slide 11'

    # Module 3 questions (AICA branches)
    elif 'labyrinthine artery' in full_source and ('premeatal' in full_source or 'end artery' in full_source or 'preserved' in full_source):
        citation_to_add = 'Source: AICA_content.json Slide 12'
    elif 'Recurrent perforators' in full_source or 'recurrent perforating' in full_source:
        citation_to_add = 'Source: AICA_content.json Slide 12'
    elif 'subarcuate artery' in full_source:
        citation_to_add = 'Source: AICA_content.json Slide 13'
    elif 'AICA syndrome' in full_source:
        citation_to_add = 'Source: AICA_content.json Slide 15'
    elif 'meatal loop' in full_source:
        citation_to_add = 'Source: AICA_content.json Slide 8'
    elif 'AICA bifurcates' in full_source:
        citation_to_add = 'Source: AICA_content.json Slide 11'
    elif 'petrosal surface' in full_source:
        citation_to_add = 'Source: AICA_content.json Slide 14'

    # Module 4 questions (PICA segments)
    elif 'PICA has five segments' in full_source:
        citation_to_add = 'Source: PICA_content.json Slide 2'
    elif 'anterior medullary segment' in full_source:
        citation_to_add = 'Source: PICA_content.json Slide 3'
    elif 'lateral medullary segment' in full_source and 'rootlets' in full_source:
        citation_to_add = 'Source: PICA_content.json Slide 4'
    elif 'tonsillomedullary segment' in full_source:
        citation_to_add = 'Source: PICA_content.json Slide 5'
    elif 'telovelotonsillar segment' in full_source:
        citation_to_add = 'Source: PICA_content.json Slide 6'
    elif 'cranial loop' in full_source:
        citation_to_add = 'Source: PICA_content.json Slide 9'
    elif 'caudal loop' in full_source:
        citation_to_add = 'Source: PICA_content.json Slide 10'
    elif 'PICA bifurcation' in full_source:
        citation_to_add = 'Source: PICA_content.json Slide 7'
    elif 'vermian branch' in full_source:
        citation_to_add = 'Source: PICA_content.json Slide 14'
    elif 'tonsillohemispheric branch' in full_source:
        citation_to_add = 'Source: PICA_content.json Slide 14'
    elif 'absent in' in full_source and 'cerebellar hemispheres' in full_source:
        citation_to_add = 'Source: PICA_content.json Slide 18'
    elif 'suboccipital surface' in full_source:
        citation_to_add = 'Source: PICA_content.json Slide 14'

    # Module 5 questions (PICA branches)
    elif 'lateral medullary perforators' in full_source or 'lateral medulla' in full_source:
        citation_to_add = 'Source: PICA_content.json Slide 11'
    elif 'Wallenberg' in full_source:
        citation_to_add = 'Source: PICA_content.json Slide 15'
    elif 'medial branch' in full_source and 'PICA' in full_source:
        citation_to_add = 'Source: PICA_content.json Slide 12'
    elif 'tonsillomedullary perforators' in full_source:
        citation_to_add = 'Source: PICA_content.json Slide 11'
    elif 'PICA territory' in full_source or 'Total PICA' in full_source:
        citation_to_add = 'Source: PICA_content.json Slide 15'
    elif 'telovelotonsillar' in full_source:
        citation_to_add = 'Source: PICA_content.json Slide 13'

    # Module 7 - Quantitative (already fixed some)
    elif 'vertebral artery diameter' in full_source:
        citation_to_add = 'Source: PICA_content.json Slide 9'
    elif 'PICA diameter' in full_source:
        citation_to_add = 'Source: PICA_content.json Slide 10'

    if citation_to_add:
        # Find the last line with content (usually the explanation)
        for i in range(len(source_lines) - 1, -1, -1):
            line = source_lines[i]
            # Look for lines that end with " or contain explanation text
            if '")' in line or ('"' in line and '\\n' in line):
                # Add citation before the closing quote
                if line.rstrip().endswith('"'):
                    source_lines[i] = line.rstrip()[:-1] + '. ' + citation_to_add + '"\\n'
                elif line.rstrip().endswith('")'):
                    source_lines[i] = line.rstrip()[:-2] + '. ' + citation_to_add + '")\\n'
                else:
                    # Insert before the newline
                    source_lines[i] = line.rstrip() + '. ' + citation_to_add + '\\n'
                fixes_made += 1
                cell['source'] = source_lines
                print(f"Fixed cell {cell_idx}: Added {citation_to_add}")
                break

print(f"\\n✅ Fixed {fixes_made} citation issues")

# Save the notebook
with open('/Users/fax/aica-pica-lesson/AICA_PICA_Mastery_Sprint.ipynb', 'w') as f:
    json.dump(notebook, f, indent=1, ensure_ascii=False)
print("📝 Notebook saved")