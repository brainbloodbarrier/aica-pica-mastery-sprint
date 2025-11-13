#!/usr/bin/env python3
"""Final comprehensive fix for all remaining citation issues."""

import json
import re

# Load notebook
with open('/Users/fax/aica-pica-lesson/AICA_PICA_Mastery_Sprint.ipynb') as f:
    notebook = json.load(f)

fixes_made = 0

# Go through each cell
for cell_idx, cell in enumerate(notebook['cells']):
    if cell.get('cell_type') != 'code':
        continue

    source_lines = cell.get('source', [])
    if not source_lines:
        continue

    full_source = ''.join(source_lines)

    # Skip if it's the function definition
    if 'def create_mcq' in full_source:
        continue

    # Skip if not an MCQ display call
    if 'display(create_mcq' not in full_source:
        continue

    # Skip if already has Source
    if 'Source:' in full_source:
        continue

    # Determine the appropriate citation based on content
    citation = None

    # Check content to determine citation
    if 'meatal segments are present' in full_source or '82% of CPAs have one meatal' in full_source:
        citation = 'Source: AICA_content.json Slide 8'
    elif 'premeatal segment that is solitary' in full_source or '88% of CPAs have a solitary' in full_source:
        citation = 'Source: AICA_content.json Slide 7'
    elif 'cranial nerve marks the transition' in full_source and 'CN VI' in full_source:
        citation = 'Source: AICA_content.json Slide 4'
    elif 'retrosigmoid CPA surgery' in full_source and 'meatal loop' in full_source:
        citation = 'Source: AICA_content.json Slide 8'
    elif 'segment is defined as extending from the free edge' in full_source:
        citation = 'Source: AICA_content.json Slide 10'
    elif 'premeatal segment of AICA gives rise' in full_source:
        citation = 'Source: AICA_content.json Slide 12'

    if not citation:
        # Try to extract some info for debugging
        q_match = re.search(r'"(Q\d+:[^"]+)"', full_source)
        if q_match:
            print(f"WARNING: No citation determined for cell {cell_idx}: {q_match.group(1)[:50]}...")
        continue

    # Find and fix the explanation line
    modified = False
    for i in range(len(source_lines)):
        line = source_lines[i]

        # Look for the explanation parameter (usually the last string parameter)
        # It should be a quoted string that doesn't start with Q
        if '"' in line and not line.strip().startswith('"Q'):
            # Check if this line contains the explanation text
            if ('CPAs' in line or 'segment' in line or 'nerve' in line or
                'artery' in line or '%' in line or 'supplies' in line):

                # This is likely the explanation line
                if '")' in line:
                    # Line ends with ")
                    new_line = line.replace('")', f'. {citation}")')
                    source_lines[i] = new_line
                    modified = True
                    fixes_made += 1
                    print(f"Fixed cell {cell_idx}: Added {citation}")
                    break
                elif line.rstrip().endswith('"'):
                    # Line ends with just "
                    source_lines[i] = line.rstrip()[:-1] + '. ' + citation + '"\\n'
                    modified = True
                    fixes_made += 1
                    print(f"Fixed cell {cell_idx}: Added {citation}")
                    break

    if modified:
        cell['source'] = source_lines

print(f"\\n✅ Fixed {fixes_made} cells")

# Save the notebook
with open('/Users/fax/aica-pica-lesson/AICA_PICA_Mastery_Sprint.ipynb', 'w') as f:
    json.dump(notebook, f, indent=1, ensure_ascii=False)

print("📝 Notebook saved successfully!")