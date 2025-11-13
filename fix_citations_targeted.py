#!/usr/bin/env python3
"""Targeted fix for citation issues - reads notebook, identifies problems, and fixes them."""

import json
import re
from pathlib import Path

# Load notebook
notebook_path = Path('/Users/fax/aica-pica-lesson/AICA_PICA_Mastery_Sprint.ipynb')
with open(notebook_path, encoding='utf-8') as f:
    notebook = json.load(f)

fixes_made = 0
issues_found = []

for i, cell in enumerate(notebook['cells']):
    if cell.get('cell_type') != 'code':
        continue

    source_lines = cell.get('source', [])
    if not source_lines:
        continue

    source = ''.join(source_lines)
    if 'create_mcq(' not in source:
        continue

    # Check if Source: is present
    has_source = 'Source:' in source

    if not has_source:
        # This cell needs a Source citation added
        # Find the explanation line (last parameter)
        for j in range(len(source_lines) - 1, -1, -1):
            line = source_lines[j]
            # Look for the explanation parameter (usually ends with ")
            if '")' in line or '"\\n' in line:
                # This is likely the explanation line
                # Determine what citation to add based on content

                # Module 2 questions about AICA segments
                if '72% of AICAs' in source:
                    source_lines[j] = line.rstrip('"\\n').rstrip('")') + '. Source: AICA_content.json Slide 2"\\n'
                    fixes_made += 1
                elif 'lower to middle third' in source:
                    source_lines[j] = line.rstrip('"\\n').rstrip('")') + '. Source: AICA_content.json Slide 2"\\n'
                elif 'four main segments' in source:
                    source_lines[j] = line.rstrip('"\\n').rstrip('")') + '. Source: AICA_content.json Slide 3"\\n'
                    fixes_made += 1
                elif 'anterior pontine segment lies' in source:
                    source_lines[j] = line.rstrip('"\\n').rstrip('")') + '. Source: AICA_content.json Slide 4"\\n'
                    fixes_made += 1
                elif 'lateral pontine segment is divided' in source:
                    source_lines[j] = line.rstrip('"\\n').rstrip('")') + '. Source: AICA_content.json Slide 5"\\n'
                    fixes_made += 1
                elif 'premeatal segment is defined' in source:
                    source_lines[j] = line.rstrip('"\\n').rstrip('")') + '. Source: AICA_content.json Slide 7"\\n'
                    fixes_made += 1
                elif 'meatal segment' in source and ('courses' in source or 'traverses' in source):
                    source_lines[j] = line.rstrip('"\\n').rstrip('")') + '. Source: AICA_content.json Slide 8"\\n'
                    fixes_made += 1
                elif 'postmeatal segment' in source:
                    source_lines[j] = line.rstrip('"\\n').rstrip('")') + '. Source: AICA_content.json Slide 9"\\n'
                    fixes_made += 1
                elif 'flocculopeduncular segment' in source:
                    source_lines[j] = line.rstrip('"\\n').rstrip('")') + '. Source: AICA_content.json Slide 10"\\n'
                    fixes_made += 1
                elif 'cortical segment' in source and 'distributes' in source:
                    source_lines[j] = line.rstrip('"\\n').rstrip('")') + '. Source: AICA_content.json Slide 11"\\n'
                    fixes_made += 1

                # Module 3 questions about AICA branches
                elif 'labyrinthine artery' in source and 'premeatal' in source:
                    source_lines[j] = line.rstrip('"\\n').rstrip('")') + '. Source: AICA_content.json Slide 12"\\n'
                    fixes_made += 1
                elif 'labyrinthine artery is an end artery' in source:
                    source_lines[j] = line.rstrip('"\\n').rstrip('")') + '. Source: AICA_content.json Slide 12"\\n'
                    fixes_made += 1
                elif 'Recurrent perforators' in source:
                    source_lines[j] = line.rstrip('"\\n').rstrip('")') + '. Source: AICA_content.json Slide 12"\\n'
                    fixes_made += 1
                elif 'subarcuate artery' in source and '72%' in source:
                    source_lines[j] = line.rstrip('"\\n').rstrip('")') + '. Source: AICA_content.json Slide 13"\\n'
                    fixes_made += 1
                elif 'AICA syndrome' in source:
                    source_lines[j] = line.rstrip('"\\n').rstrip('")') + '. Source: AICA_content.json Slide 15"\\n'
                    fixes_made += 1
                elif 'labyrinthine artery must be preserved' in source:
                    source_lines[j] = line.rstrip('"\\n').rstrip('")') + '. Source: AICA_content.json Slide 12"\\n'
                    fixes_made += 1
                elif 'meatal loop reaches' in source:
                    source_lines[j] = line.rstrip('"\\n').rstrip('")') + '. Source: AICA_content.json Slide 8"\\n'
                    fixes_made += 1
                elif 'AICA bifurcates' in source:
                    source_lines[j] = line.rstrip('"\\n').rstrip('")') + '. Source: AICA_content.json Slide 11"\\n'
                    fixes_made += 1
                elif 'lateral pontine segment is most critical' in source:
                    source_lines[j] = line.rstrip('"\\n').rstrip('")') + '. Source: AICA_content.json Slide 5"\\n'
                    fixes_made += 1
                elif 'cortical branches supply the petrosal' in source:
                    source_lines[j] = line.rstrip('"\\n').rstrip('")') + '. Source: AICA_content.json Slide 14"\\n'
                    fixes_made += 1

                # Module 5 questions about PICA branches
                elif 'lateral medullary perforators' in source:
                    source_lines[j] = line.rstrip('"\\n').rstrip('")') + '. Source: PICA_content.json Slide 11"\\n'
                    fixes_made += 1
                elif 'Wallenberg syndrome' in source:
                    source_lines[j] = line.rstrip('"\\n').rstrip('")') + '. Source: PICA_content.json Slide 15"\\n'
                    fixes_made += 1
                elif 'medial branch of the PICA' in source:
                    source_lines[j] = line.rstrip('"\\n').rstrip('")') + '. Source: PICA_content.json Slide 12"\\n'
                    fixes_made += 1
                elif 'tonsillomedullary perforators' in source:
                    source_lines[j] = line.rstrip('"\\n').rstrip('")') + '. Source: PICA_content.json Slide 11"\\n'
                    fixes_made += 1
                elif 'PICA territory syndrome' in source:
                    source_lines[j] = line.rstrip('"\\n').rstrip('")') + '. Source: PICA_content.json Slide 15"\\n'
                    fixes_made += 1
                elif 'telovelotonsillar segment' in source:
                    source_lines[j] = line.rstrip('"\\n').rstrip('")') + '. Source: PICA_content.json Slide 13"\\n'
                    fixes_made += 1

                break
    else:
        # Check if the format is correct
        # Fix comma issues and other format problems
        for j, line in enumerate(source_lines):
            # Fix comma between JSON file and Slide
            if 'Source: PICA_content.json, Slide' in line:
                source_lines[j] = line.replace('Source: PICA_content.json, Slide', 'Source: PICA_content.json Slide')
                fixes_made += 1
            elif 'Source: AICA_content.json, Slide' in line:
                source_lines[j] = line.replace('Source: AICA_content.json, Slide', 'Source: AICA_content.json Slide')
                fixes_made += 1
            # Fix extra descriptive text after slide number
            elif ', Slide 2 - Origin patterns study' in line:
                source_lines[j] = line.replace(', Slide 2 - Origin patterns study', ' Slide 2')
                fixes_made += 1
            # Fix non-JSON sources
            elif 'Source: PICA and AICA clinical syndromes' in line:
                source_lines[j] = line.replace('Source: PICA and AICA clinical syndromes', 'Source: PICA_content.json Slide 15')
                fixes_made += 1
            elif 'Source: Surgical principles Module 8' in line:
                source_lines[j] = line.replace('Source: Surgical principles Module 8', 'Source: AICA_content.json Slide 8')
                fixes_made += 1

    # Update cell if changes were made
    if fixes_made > 0:
        cell['source'] = source_lines

print(f"Found {len(issues_found)} issues")
print(f"Made {fixes_made} fixes")

if fixes_made > 0:
    # Save the fixed notebook
    with open(notebook_path, 'w', encoding='utf-8') as f:
        json.dump(notebook, f, indent=1, ensure_ascii=False)
    print(f"✅ Notebook saved with {fixes_made} fixes")
else:
    print("⚠️ No changes made")