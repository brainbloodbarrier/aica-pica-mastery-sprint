#!/usr/bin/env python3
"""
New Module 7 quantitative questions to add to the notebook.
These are the 9 missing questions needed to reach 20 total.
"""

# Q3 - AICA Duplicate percentage
q3 = '''display(create_mcq(
    "Q3: AICA arises as duplicate arteries in what percentage of cases?",
    ["16%", "26%", "36%", "46%"],
    "26%",
    "Verified quantitative data: Duplicate AICA origin occurs in 26% of cases. The remaining 2% arise as triplicate arteries. This anatomical variation is important for angiographic interpretation and surgical planning. Source: AICA_content.json Slide 2"
))'''

# Q5 - Meatal segment statistics
q5 = '''display(create_mcq(
    "Q5: What percentage of CPAs have a single (non-duplicate) meatal segment?",
    ["62%", "72%", "82%", "92%"],
    "82%",
    "Verified: 82% of CPAs have one meatal segment, while 18% have two meatal segments. The meatal segment forms the critical loop near the internal auditory canal that may enter the porus. Source: AICA_content.json Slide 8"
))'''

# Q6 - Labyrinthine artery count
q6 = '''display(create_mcq(
    "Q6: What is the most common number of internal auditory (labyrinthine) arteries per CPA?",
    ["One (30%)", "Two (54%)", "Three (14%)", "Four (2%)"],
    "Two (54%)",
    "Verified: Most CPAs (54%) have TWO internal auditory arteries. Only 30% have one, 14% have three, and 2% have four arteries. These arteries supply the inner ear structures and must be preserved for hearing. Source: AICA_content.json Slide 11"
))'''

# Q7 - Labyrinthine artery origin segment (different from Q8)
q7 = '''display(create_mcq(
    "Q7: What percentage of labyrinthine arteries originate from the meatal segment of AICA?",
    ["2%", "11%", "21%", "31%"],
    "21%",
    "Verified: 21% of labyrinthine arteries arise from the meatal segment. The majority (77%) arise from the premeatal segment, and only 2% from the postmeatal segment. Understanding origin patterns is critical for hearing preservation surgery. Source: AICA_content.json Slide 11"
))'''

# Q9 - Recurrent perforators presence
q9 = '''display(create_mcq(
    "Q9: Recurrent perforating arteries are present in what percentage of CPAs?",
    ["62%", "72%", "82%", "92%"],
    "82%",
    "Verified: Recurrent perforators are present in 82% of CPAs, with 74% having one artery, 6% having two, and 2% having three. These arteries supply the lateral pons and brainstem and must be preserved to prevent infarction. Source: AICA_content.json Slide 12"
))'''

# Q10 - Postmeatal segment duplication
q10 = '''display(create_mcq(
    "Q10: What percentage of CPAs have double (two) postmeatal segments?",
    ["10%", "20%", "30%", "40%"],
    "20%",
    "Verified: 20% of CPAs have two postmeatal segments, while 80% have a single postmeatal segment. The postmeatal segment begins distal to CN VII/VIII and courses medially to supply brainstem and cerebellum. Source: AICA_content.json Slide 10"
))'''

# Q11 - Subarcuate artery most common origin
q11 = '''display(create_mcq(
    "Q11: From which AICA segment does the subarcuate artery most commonly originate?",
    ["Premeatal (26%)", "Meatal (4%)", "Postmeatal (42%)", "Cortical (28%)"],
    "Postmeatal (42%)",
    "Verified: The subarcuate artery most commonly arises from the postmeatal segment (42% of cases when present). It may also arise from premeatal (26%) or meatal (4%) segments. It supplies the petrous bone via the subarcuate fossa. Source: AICA_content.json Slide 13"
))'''

# Q14 - PICA origin level above foramen magnum (average)
q14 = '''display(create_mcq(
    "Q14: What is the average height of PICA origin above the foramen magnum?",
    ["2.6mm", "6.9mm", "8.6mm", "16.9mm"],
    "8.6mm",
    "Verified: PICA origin averages 8.6mm above the foramen magnum, with a range from 14mm below to 26mm above. This high variability affects surgical approach planning for foramen magnum lesions and VA-PICA aneurysms. Source: PICA_content.json Slide 8"
))'''

# Q15 - PICA diameter at origin (average)
q15 = '''display(create_mcq(
    "Q15: What is the average diameter of PICA at its origin from the vertebral artery?",
    ["1.0mm", "2.0mm", "3.0mm", "4.0mm"],
    "2.0mm",
    "Verified: PICA diameter at origin averages 2.0mm, with a range of 0.5-3.4mm. Hypoplastic PICAs (≤1.0mm diameter) occur in 5-16% of hemispheres. This measurement is relevant for aneurysm clip selection and anastomosis procedures. Source: PICA_content.json Slide 9"
))'''

# Q17 - PICA hypoplasia frequency
q17 = '''display(create_mcq(
    "Q17: PICA is reported as hypoplastic in what percentage range of cerebellar hemispheres?",
    ["1-5%", "5-16%", "20-30%", "35-45%"],
    "5-16%",
    "Verified: PICA hypoplasia occurs in 5-16% of cerebellar hemispheres. When PICA is hypoplastic or absent, the ipsilateral AICA or contralateral PICA typically enlarges to supply the territory through anastomotic channels. Source: PICA_content.json Slide 9"
))'''

# For the script to work, let's compile all questions:
print("Module 7 - 9 New Quantitative Questions:")
print("\n" + "="*70)
print("\n# Q3")
print(q3)
print("\n# Q5")
print(q5)
print("\n# Q6")
print(q6)
print("\n# Q7")
print(q7)
print("\n# Q9")
print(q9)
print("\n# Q10")
print(q10)
print("\n# Q11")
print(q11)
print("\n# Q14")
print(q14)
print("\n# Q15")
print(q15)

# Export for insertion
questions_dict = {
    'Q3': q3,
    'Q5': q5,
    'Q6': q6,
    'Q7': q7,
    'Q9': q9,
    'Q10': q10,
    'Q11': q11,
    'Q14': q14,
    'Q15': q15
}

print(f"\n\nGenerated {len(questions_dict)} new Module 7 questions")
print("These need to be inserted sequentially into the notebook")
