#!/usr/bin/env python3
"""Fix cells 42 and 43 with the exact text."""

import json

# Load notebook
with open('/Users/fax/aica-pica-lesson/AICA_PICA_Mastery_Sprint.ipynb') as f:
    notebook = json.load(f)

# Cell 42
cell = notebook['cells'][42]
for i, line in enumerate(cell['source']):
    if '"AICA typically bifurcates into rostral and caudal trunks' in line:
        cell['source'][i] = '    "AICA typically bifurcates into rostral and caudal trunks, both contributing to cerebellar supply and perforating branches. Source: AICA_content.json Slide 11"\\n'
        print("Fixed cell 42")
        break

# Cell 43 - get exact content first
cell = notebook['cells'][43]
for line in cell['source']:
    if '"The cortical segment' in line or 'cortical segment' in line.lower():
        print(f"Cell 43 explanation: {line}")

# Now fix it
for i, line in enumerate(cell['source']):
    if 'cortical segment' in line.lower() and '"' in line and not line.strip().startswith('"Q'):
        # This is the explanation line
        if line.rstrip().endswith('"'):
            cell['source'][i] = line.rstrip()[:-1] + '. Source: AICA_content.json Slide 11"\\n'
            print("Fixed cell 43")
            break

# Save
with open('/Users/fax/aica-pica-lesson/AICA_PICA_Mastery_Sprint.ipynb', 'w') as f:
    json.dump(notebook, f, indent=1, ensure_ascii=False)

print("✅ Done!")