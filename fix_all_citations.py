#!/usr/bin/env python3
"""Fix all citation issues in the notebook."""

import json
import re

# Load notebook
with open('/Users/fax/aica-pica-lesson/AICA_PICA_Mastery_Sprint.ipynb') as f:
    notebook = json.load(f)

fixes_made = 0

# Define fixes for questions without Source citations
# Module 2 - AICA segments (10 questions)
missing_citations = [
    # Module 2
    ('72% of AICAs have a single trunk', 'Source: AICA_content.json Slide 2'),
    ('AICA most commonly arises from the lower to middle third', 'Source: AICA_content.json Slide 2'),
    ('AICA has four main segments', 'Source: AICA_content.json Slide 3'),
    ('The anterior pontine segment lies between', 'Source: AICA_content.json Slide 4'),
    ('The lateral pontine segment is divided into', 'Source: AICA_content.json Slide 5'),
    ('The premeatal segment is defined as', 'Source: AICA_content.json Slide 7'),
    ('The meatal segment courses', 'Source: AICA_content.json Slide 8'),
    ('The meatal segment traverses', 'Source: AICA_content.json Slide 8'),
    ('The postmeatal segment extends from', 'Source: AICA_content.json Slide 9'),
    ('The flocculopeduncular segment passes', 'Source: AICA_content.json Slide 10'),
    ('The cortical segment distributes', 'Source: AICA_content.json Slide 11'),

    # Module 3 - AICA branches
    ('The labyrinthine artery arises from the premeatal', 'Source: AICA_content.json Slide 12'),
    ('The labyrinthine artery is an end artery', 'Source: AICA_content.json Slide 12'),
    ('Recurrent perforators supply lateral pons', 'Source: AICA_content.json Slide 12'),
    ('The subarcuate artery is present in 72%', 'Source: AICA_content.json Slide 13'),
    ('AICA syndrome', 'Source: AICA_content.json Slide 15'),
    ('The labyrinthine artery must be preserved', 'Source: AICA_content.json Slide 12'),
    ('The meatal loop reaches the porus', 'Source: AICA_content.json Slide 8'),
    ('AICA bifurcates near the facial-vestibulocochlear', 'Source: AICA_content.json Slide 11'),
    ('The lateral pontine segment is most critical', 'Source: AICA_content.json Slide 5'),
    ('The cortical branches supply the petrosal', 'Source: AICA_content.json Slide 14'),

    # Module 5 - PICA branches
    ('The lateral medullary perforators', 'Source: PICA_content.json Slide 11'),
    ('Classic Wallenberg syndrome', 'Source: PICA_content.json Slide 15'),
    ('The medial branch of the PICA', 'Source: PICA_content.json Slide 12'),
    ('The tonsillomedullary perforators', 'Source: PICA_content.json Slide 11'),
    ('Total PICA territory syndrome', 'Source: PICA_content.json Slide 15'),
    ('The telovelotonsillar segment', 'Source: PICA_content.json Slide 13'),
]

# Define format fixes
format_replacements = [
    ('Source: PICA_content.json, Slide', 'Source: PICA_content.json Slide'),
    ('Source: AICA_content.json, Slide', 'Source: AICA_content.json Slide'),
    (', Slide 2 - Origin patterns study', ' Slide 2'),
    ('Source: PICA and AICA clinical syndromes', 'Source: PICA_content.json Slide 15'),
    ('Source: Surgical principles Module 8', 'Source: AICA_content.json Slide 8'),
]

# Process each cell
for cell in notebook['cells']:
    if cell.get('cell_type') != 'code':
        continue

    source_lines = cell.get('source', [])
    if not source_lines:
        continue

    # Check if this cell has create_mcq
    full_source = ''.join(source_lines)
    if 'create_mcq(' not in full_source:
        continue

    modified = False

    # Fix missing citations
    if 'Source:' not in full_source:
        # Find which citation to add
        for pattern, citation in missing_citations:
            if pattern in full_source:
                # Find the explanation line and add citation
                for i in range(len(source_lines)):
                    if pattern in source_lines[i]:
                        # This is the line with the explanation
                        if source_lines[i].rstrip().endswith('"'):
                            # Remove the closing quote and add citation
                            source_lines[i] = source_lines[i].rstrip()[:-1] + '. ' + citation + '"\\n'
                            fixes_made += 1
                            modified = True
                            break
                break

    # Fix format issues
    for i, line in enumerate(source_lines):
        for wrong, correct in format_replacements:
            if wrong in line:
                source_lines[i] = line.replace(wrong, correct)
                fixes_made += 1
                modified = True

    if modified:
        cell['source'] = source_lines

# Save the fixed notebook
with open('/Users/fax/aica-pica-lesson/AICA_PICA_Mastery_Sprint.ipynb', 'w') as f:
    json.dump(notebook, f, indent=1, ensure_ascii=False)

print(f"✅ Fixed {fixes_made} citation issues")
print("📝 Notebook saved")