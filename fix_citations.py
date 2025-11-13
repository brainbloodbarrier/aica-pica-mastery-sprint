#!/usr/bin/env python3
"""Fix all citation issues in the AICA_PICA_Mastery_Sprint notebook."""

import json
import re
from pathlib import Path

# Load notebook
notebook_path = Path('/Users/fax/aica-pica-lesson/AICA_PICA_Mastery_Sprint.ipynb')
with open(notebook_path, encoding='utf-8') as f:
    notebook = json.load(f)

fixes_made = 0

# Module 2 citations (based on AICA_content.json)
module2_citations = {
    "Q1: What percentage of AICAs arise as a single trunk": "Source: AICA_content.json Slide 2",
    "Q2: AICA typically arises from which portion": "Source: AICA_content.json Slide 2",
    "Q3: The AICA has how many main segments": "Source: AICA_content.json Slide 3",
    "Q4: The anterior pontine segment of AICA lies": "Source: AICA_content.json Slide 4",
    "Q5: The lateral pontine segment is divided": "Source: AICA_content.json Slide 5",
    "Q6: The premeatal segment of AICA refers": "Source: AICA_content.json Slide 7",
    "Q7: The meatal segment of AICA": "Source: AICA_content.json Slide 8",
    "Q8: The postmeatal segment extends": "Source: AICA_content.json Slide 9",
    "Q9: The flocculopeduncular segment": "Source: AICA_content.json Slide 10",
    "Q10: The cortical segment of AICA": "Source: AICA_content.json Slide 11"
}

# Module 3 citations (based on AICA_content.json)
module3_citations = {
    "Q1: The labyrinthine (internal auditory) artery": "Source: AICA_content.json Slide 12",
    "Q2: What is the clinical significance of the labyrinthine": "Source: AICA_content.json Slide 12",
    "Q3: Recurrent perforating arteries from AICA": "Source: AICA_content.json Slide 12",
    "Q4: The subarcuate artery is present": "Source: AICA_content.json Slide 13",
    "Q5: AICA syndrome (lateral inferior pontine syndrome)": "Source: AICA_content.json Slide 15",
    "Q6: Which AICA branch must be carefully": "Source: AICA_content.json Slide 12",
    "Q7: The meatal loop of AICA reaches": "Source: AICA_content.json Slide 8",
    "Q8: AICA bifurcation into rostral and caudal": "Source: AICA_content.json Slide 11",
    "Q9: Which segment of AICA is most": "Source: AICA_content.json Slide 5",
    "Q10: The cortical branches of AICA": "Source: AICA_content.json Slide 14"
}

# Module 5 citations (based on PICA_content.json)
module5_citations = {
    "Q1: The lateral medullary segment branches supply": "Source: PICA_content.json Slide 11",
    "Q2: Wallenberg syndrome (lateral medullary syndrome)": "Source: PICA_content.json Slide 15",
    "Q3: Which PICA branch is the most": "Source: PICA_content.json Slide 12",
    "Q4: The tonsillomedullary segment perforators": "Source: PICA_content.json Slide 11",
    "Q5: Occlusion of PICA at its origin": "Source: PICA_content.json Slide 15",
    "Q6: The telovelotonsillar segment": "Source: PICA_content.json Slide 13"
}

# Fix format issues (remove commas and extra text)
format_fixes = {
    "Source: PICA_content.json, Slide": "Source: PICA_content.json Slide",
    "Source: AICA_content.json, Slide": "Source: AICA_content.json Slide",
    ", Slide 2 - Origin patterns study": "",  # Remove extra descriptive text
    "Source: PICA and AICA clinical syndromes": "Source: PICA_content.json Slide 15",  # Module 5 Q2
    "Source: Surgical principles Module 8": "Source: AICA_content.json Slide 8"  # M8 Q9 about meatal loop
}

for i, cell in enumerate(notebook.get('cells', [])):
    if cell.get('cell_type') != 'code':
        continue

    source_lines = cell.get('source', [])
    if not source_lines or 'create_mcq(' not in ''.join(source_lines):
        continue

    # Join lines for processing
    full_source = ''.join(source_lines)

    # Try to identify which module/question this is
    modified = False

    # Check if this is a Module 2 question without Source
    for q_pattern, citation in module2_citations.items():
        if q_pattern in full_source and 'Source:' not in full_source:
            # Find the explanation line and add Source citation
            for j, line in enumerate(source_lines):
                if '"72% of AICAs have a single trunk' in line:
                    source_lines[j] = line.replace('"', f'. {module2_citations["Q1: What percentage of AICAs arise as a single trunk"]}"', 1)
                    modified = True
                    fixes_made += 1
                elif '"AICA most commonly arises from' in line:
                    source_lines[j] = line.replace('"', f'. {module2_citations["Q2: AICA typically arises from which portion"]}"', 1)
                    modified = True
                    fixes_made += 1
                elif '"AICA has four main segments' in line:
                    source_lines[j] = line.replace('"', f'. {module2_citations["Q3: The AICA has how many main segments"]}"', 1)
                    modified = True
                    fixes_made += 1
                elif '"The anterior pontine segment lies' in line:
                    source_lines[j] = line.replace('"', f'. {module2_citations["Q4: The anterior pontine segment of AICA lies"]}"', 1)
                    modified = True
                    fixes_made += 1
                elif '"The lateral pontine segment is divided' in line:
                    source_lines[j] = line.replace('"', f'. {module2_citations["Q5: The lateral pontine segment is divided"]}"', 1)
                    modified = True
                    fixes_made += 1
                elif '"The premeatal segment is defined' in line:
                    source_lines[j] = line.replace('"', f'. {module2_citations["Q6: The premeatal segment of AICA refers"]}"', 1)
                    modified = True
                    fixes_made += 1
                elif '"The meatal segment courses' in line or 'meatal segment traverses' in line:
                    source_lines[j] = line.replace('"', f'. {module2_citations["Q7: The meatal segment of AICA"]}"', 1)
                    modified = True
                    fixes_made += 1
                elif '"The postmeatal segment extends' in line:
                    source_lines[j] = line.replace('"', f'. {module2_citations["Q8: The postmeatal segment extends"]}"', 1)
                    modified = True
                    fixes_made += 1
                elif '"The flocculopeduncular segment' in line:
                    source_lines[j] = line.replace('"', f'. {module2_citations["Q9: The flocculopeduncular segment"]}"', 1)
                    modified = True
                    fixes_made += 1
                elif '"The cortical segment distributes' in line:
                    source_lines[j] = line.replace('"', f'. {module2_citations["Q10: The cortical segment of AICA"]}"', 1)
                    modified = True
                    fixes_made += 1

    # Check if this is a Module 3 question without Source
    for q_pattern, citation in module3_citations.items():
        if q_pattern in full_source and 'Source:' not in full_source:
            # Find the explanation line and add Source citation
            for j, line in enumerate(source_lines):
                if 'labyrinthine artery arises from the premeatal' in line:
                    source_lines[j] = line.replace('"', f'. {module3_citations["Q1: The labyrinthine (internal auditory) artery"]}"', 1)
                    modified = True
                    fixes_made += 1
                elif 'labyrinthine artery is an end artery' in line:
                    source_lines[j] = line.replace('"', f'. {module3_citations["Q2: What is the clinical significance of the labyrinthine"]}"', 1)
                    modified = True
                    fixes_made += 1
                elif 'Recurrent perforators supply lateral pons' in line:
                    source_lines[j] = line.replace('"', f'. {module3_citations["Q3: Recurrent perforating arteries from AICA"]}"', 1)
                    modified = True
                    fixes_made += 1
                elif 'subarcuate artery is present in 72%' in line:
                    source_lines[j] = line.replace('"', f'. {module3_citations["Q4: The subarcuate artery is present"]}"', 1)
                    modified = True
                    fixes_made += 1
                elif 'AICA syndrome' in line:
                    source_lines[j] = line.replace('"', f'. {module3_citations["Q5: AICA syndrome (lateral inferior pontine syndrome)"]}"', 1)
                    modified = True
                    fixes_made += 1
                elif 'labyrinthine artery must be preserved' in line:
                    source_lines[j] = line.replace('"', f'. {module3_citations["Q6: Which AICA branch must be carefully"]}"', 1)
                    modified = True
                    fixes_made += 1
                elif 'meatal loop reaches the porus' in line:
                    source_lines[j] = line.replace('"', f'. {module3_citations["Q7: The meatal loop of AICA reaches"]}"', 1)
                    modified = True
                    fixes_made += 1
                elif 'AICA bifurcates near the facial-vestibulocochlear' in line:
                    source_lines[j] = line.replace('"', f'. {module3_citations["Q8: AICA bifurcation into rostral and caudal"]}"', 1)
                    modified = True
                    fixes_made += 1
                elif 'lateral pontine segment is most critical' in line:
                    source_lines[j] = line.replace('"', f'. {module3_citations["Q9: Which segment of AICA is most"]}"', 1)
                    modified = True
                    fixes_made += 1
                elif 'cortical branches supply the petrosal' in line:
                    source_lines[j] = line.replace('"', f'. {module3_citations["Q10: The cortical branches of AICA"]}"', 1)
                    modified = True
                    fixes_made += 1

    # Check if this is a Module 5 question without Source
    for q_pattern, citation in module5_citations.items():
        if q_pattern in full_source and 'Source:' not in full_source:
            # Find the explanation line and add Source citation
            for j, line in enumerate(source_lines):
                if 'lateral medullary perforators' in line:
                    source_lines[j] = line.replace('"', f'. {module5_citations["Q1: The lateral medullary segment branches supply"]}"', 1)
                    modified = True
                    fixes_made += 1
                elif 'Classic Wallenberg syndrome' in line:
                    source_lines[j] = line.replace('"', f'. {module5_citations["Q2: Wallenberg syndrome (lateral medullary syndrome)"]}"', 1)
                    modified = True
                    fixes_made += 1
                elif 'medial branch of the PICA' in line:
                    source_lines[j] = line.replace('"', f'. {module5_citations["Q3: Which PICA branch is the most"]}"', 1)
                    modified = True
                    fixes_made += 1
                elif 'tonsillomedullary perforators' in line:
                    source_lines[j] = line.replace('"', f'. {module5_citations["Q4: The tonsillomedullary segment perforators"]}"', 1)
                    modified = True
                    fixes_made += 1
                elif 'Total PICA territory syndrome' in line:
                    source_lines[j] = line.replace('"', f'. {module5_citations["Q5: Occlusion of PICA at its origin"]}"', 1)
                    modified = True
                    fixes_made += 1
                elif 'telovelotonsillar segment' in line:
                    source_lines[j] = line.replace('"', f'. {module5_citations["Q6: The telovelotonsillar segment"]}"', 1)
                    modified = True
                    fixes_made += 1

    # Fix format issues
    for j, line in enumerate(source_lines):
        for wrong_format, correct_format in format_fixes.items():
            if wrong_format in line:
                if correct_format:
                    source_lines[j] = line.replace(wrong_format, correct_format)
                else:
                    # Remove extra descriptive text after slide number
                    source_lines[j] = re.sub(r', Slide (\d+) - [^"]*"', r' Slide \1"', line)
                modified = True
                fixes_made += 1

    if modified:
        cell['source'] = source_lines

# Save the fixed notebook
with open(notebook_path, 'w', encoding='utf-8') as f:
    json.dump(notebook, f, indent=1, ensure_ascii=False)

print(f"✅ Fixed {fixes_made} citation issues")
print(f"📝 Notebook saved to {notebook_path}")