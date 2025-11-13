#!/usr/bin/env python3
"""Fix the final cells that need citations."""

import json

# Load notebook
with open('/Users/fax/aica-pica-lesson/AICA_PICA_Mastery_Sprint.ipynb') as f:
    notebook = json.load(f)

# Cell 42 - Q9: AICA bifurcates into which two main trunks?
# Answer: Rostral and caudal trunks
cell = notebook['cells'][42]
for i, line in enumerate(cell['source']):
    if '"AICA bifurcates into rostral and caudal trunks' in line:
        # Add citation
        cell['source'][i] = line.replace(
            '"AICA bifurcates into rostral and caudal trunks near the facial-vestibulocochlear nerve complex"',
            '"AICA bifurcates into rostral and caudal trunks near the facial-vestibulocochlear nerve complex. Source: AICA_content.json Slide 11"'
        )
        print("Fixed cell 42 - AICA bifurcation")
        break

# Cell 43 - Q10: Which AICA segment is defined as extending from the free edge of the flocculus
# This is about the cortical segment
cell = notebook['cells'][43]
for i, line in enumerate(cell['source']):
    if '"The cortical segment extends' in line:
        # Add citation
        cell['source'][i] = line.replace(
            '"The cortical segment extends from the flocculus to the cerebellar surface and supplies the petrosal surface"',
            '"The cortical segment extends from the flocculus to the cerebellar surface and supplies the petrosal surface. Source: AICA_content.json Slide 11"'
        )
        print("Fixed cell 43 - Cortical segment")
        break

# Save
with open('/Users/fax/aica-pica-lesson/AICA_PICA_Mastery_Sprint.ipynb', 'w') as f:
    json.dump(notebook, f, indent=1, ensure_ascii=False)

print("\\n✅ Fixed final cells!")