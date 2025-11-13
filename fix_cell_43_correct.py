#!/usr/bin/env python3
"""Fix cell 43 correctly - it's about flocculopeduncular segment."""

import json

# Load notebook
with open('/Users/fax/aica-pica-lesson/AICA_PICA_Mastery_Sprint.ipynb') as f:
    notebook = json.load(f)

# Cell 43 - flocculopeduncular segment
cell = notebook['cells'][43]
for i, line in enumerate(cell['source']):
    if '"The flocculopeduncular segment extends from' in line:
        cell['source'][i] = '    "The flocculopeduncular segment extends from the CN VII/VIII complex to the cerebellopontine fissure. Source: AICA_content.json Slide 10"\\n'
        print("Fixed cell 43 - flocculopeduncular segment")
        break

# Save
with open('/Users/fax/aica-pica-lesson/AICA_PICA_Mastery_Sprint.ipynb', 'w') as f:
    json.dump(notebook, f, indent=1, ensure_ascii=False)

print("✅ Done!")