#!/usr/bin/env python3
"""Analyze citation patterns to understand the root cause of failures."""

import json
import re
from pathlib import Path

notebook_path = Path('/Users/fax/aica-pica-lesson/AICA_PICA_Mastery_Sprint.ipynb')
with open(notebook_path, encoding='utf-8') as f:
    notebook = json.load(f)

missing_source = []
invalid_format = []
correct_citations = []

for cell in notebook.get('cells', []):
    if cell.get('cell_type') != 'code':
        continue
    source = ''.join(cell.get('source', []))
    if 'create_mcq(' not in source:
        continue

    # Extract question ID if present
    q_id_match = re.search(r'# (M\d+ Q\d+)', source)
    q_id = q_id_match.group(1) if q_id_match else 'Unknown'

    # Check for Source: in the explanation
    if 'Source:' not in source:
        missing_source.append(q_id)
    else:
        # Check citation format
        citation_pattern = r'Source:\s+(AICA_content\.json|PICA_content\.json)\s+Slides?\s+\d+'
        if re.search(citation_pattern, source):
            correct_citations.append(q_id)
        else:
            invalid_format.append(q_id)
            # Extract the actual citation to see what's wrong
            source_match = re.search(r'Source:[^"\']*', source)
            if source_match:
                print(f'{q_id}: "{source_match.group()}"')

print(f'\n=== Pattern Analysis ===')
print(f'Missing "Source:": {len(missing_source)} questions')
print(f'Invalid format: {len(invalid_format)} questions')
print(f'Correct citations: {len(correct_citations)} questions')
print(f'Total: {len(missing_source) + len(invalid_format) + len(correct_citations)} questions')

print(f'\n=== Questions missing "Source:" ===')
for q_id in missing_source[:10]:  # Show first 10
    print(f'  {q_id}')
if len(missing_source) > 10:
    print(f'  ... and {len(missing_source) - 10} more')

print(f'\n=== Questions with invalid format ===')
for q_id in invalid_format[:10]:  # Show first 10
    print(f'  {q_id}')