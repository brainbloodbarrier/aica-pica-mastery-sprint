#!/usr/bin/env python3
"""Check format issues in citations."""

import json
import re

# Load notebook
with open('/Users/fax/aica-pica-lesson/AICA_PICA_Mastery_Sprint.ipynb') as f:
    notebook = json.load(f)

# Check cells with Source but wrong format
format_issues = []
no_source = []

for i, cell in enumerate(notebook['cells']):
    if cell.get('cell_type') != 'code':
        continue
    source = ''.join(cell.get('source', []))

    if 'create_mcq(' not in source:
        continue

    if 'Source:' not in source:
        no_source.append(i)
    else:
        # Extract the Source citation
        source_match = re.search(r'Source:[^"\']*', source)
        if source_match:
            citation = source_match.group()
            # Check if it matches the correct format
            correct_pattern = r'Source:\s+(AICA_content\.json|PICA_content\.json)\s+Slides?\s+\d+'
            if not re.match(correct_pattern, citation):
                format_issues.append((i, citation[:100]))

print(f'MCQ cells without Source: {len(no_source)}')
for idx in no_source[:5]:
    print(f'  Cell {idx}')

print(f'\nCells with format issues: {len(format_issues)}')
for idx, cite in format_issues[:10]:
    print(f'  Cell {idx}: "{cite}"')

print(f'\nTotal issues: {len(no_source) + len(format_issues)}')