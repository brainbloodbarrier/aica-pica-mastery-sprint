#!/usr/bin/env python3
"""Fix the last two cells."""

import json

# Load notebook
with open('/Users/fax/aica-pica-lesson/AICA_PICA_Mastery_Sprint.ipynb') as f:
    notebook = json.load(f)

# Cell 42 - AICA bifurcates into rostral and caudal trunks
cell_42 = notebook['cells'][42]
source_42 = cell_42['source']
for i, line in enumerate(source_42):
    if 'rostral and caudal trunks' in line and '")' in line:
        source_42[i] = line.replace('")', '. Source: AICA_content.json Slide 11")')
        print("Fixed cell 42")
        break

# Cell 43 - Cortical segment extending from flocculus
cell_43 = notebook['cells'][43]
source_43 = cell_43['source']
for i, line in enumerate(source_43):
    if 'cortical segment extends' in line and '")' in line:
        source_43[i] = line.replace('")', '. Source: AICA_content.json Slide 11")')
        print("Fixed cell 43")
        break

# Save
with open('/Users/fax/aica-pica-lesson/AICA_PICA_Mastery_Sprint.ipynb', 'w') as f:
    json.dump(notebook, f, indent=1, ensure_ascii=False)

print("✅ Done!")