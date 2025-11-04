#!/usr/bin/env python3
"""
Script to generate Module 9 and Module 10 cells for the AICA/PICA Mastery Sprint notebook.
This adds the final 26 questions (Module 9: 33 questions comprehensive, Module 10: 8 questions certification).
However, Module 9 is a comprehensive review pulling from existing modules, so it's 18 net new question content.
"""

import json

def create_code_cell(source_lines):
    """Helper to create a code cell."""
    return {
        "cell_type": "code",
        "execution_count": None,
        "metadata": {},
        "outputs": [],
        "source": source_lines
    }

def create_markdown_cell(source_lines):
    """Helper to create a markdown cell."""
    return {
        "cell_type": "markdown",
        "metadata": {},
        "source": source_lines
    }

# Module 9: 33 Questions (RANDOMIZED - not grouped by module!)
# Distribution: M1(3), M2(5), M3(4), M4(5), M5(4), M6(4), M7(4), M8(4)
# Order: Random mix as specified in requirements

module_9_questions = []

# Q1 - From Module 4 (PICA segments)
module_9_questions.append(create_code_cell([
    "# Module 9 - Question 1 (from Module 4: PICA segments)\n",
    "display(create_mcq(\n",
    "    \"Q1: The tonsillomedullary segment of PICA forms the caudal loop at what anatomical location?\",\n",
    "    [\"Between vertebral artery and CN XII\", \"Inferior to cerebellar tonsil\", \"At the choroid plexus\", \"Superior to cerebellar tonsil\"],\n",
    "    \"Inferior to cerebellar tonsil\",\n",
    "    \"The tonsillomedullary segment forms the caudal (infratonsillar) loop below the cerebellar tonsil before ascending. This is a critical surgical landmark for the far-lateral approach. Source: PICA_content.json Slide 4\"\n",
    "))"
]))

# Q2 - From Module 7 (Quantitative)
module_9_questions.append(create_code_cell([
    "# Module 9 - Question 2 (from Module 7: Quantitative)\n",
    "display(create_mcq(\n",
    "    \"Q2: What percentage of AICAs arise as a single trunk from the basilar artery?\",\n",
    "    [\"62%\", \"72%\", \"82%\", \"92%\"],\n",
    "    \"72%\",\n",
    "    \"Verified quantitative data: 72% single trunk, 26% duplicate, 2% triplicate origin patterns. This variation is critical for angiographic interpretation. Source: AICA_content.json Slide 3\"\n",
    "))"
]))

# Q3 - From Module 2 (AICA segments)
module_9_questions.append(create_code_cell([
    "# Module 9 - Question 3 (from Module 2: AICA segments)\n",
    "display(create_mcq(\n",
    "    \"Q3: The meatal loop of AICA reaches or enters the internal auditory canal (IAC) in what percentage of cases?\",\n",
    "    [\"30%\", \"40%\", \"50%\", \"60%\"],\n",
    "    \"50%\",\n",
    "    \"In 50% of cases, AICA's meatal loop reaches or enters the IAC. This is critical for retrosigmoid approaches to vestibular schwannomas - the surgeon must identify the loop before drilling the IAC. Source: AICA_content.json Slide 7\"\n",
    "))"
]))

# Q4 - From Module 5 (PICA branches)
module_9_questions.append(create_code_cell([
    "# Module 9 - Question 4 (from Module 5: PICA branches)\n",
    "display(create_mcq(\n",
    "    \"Q4: Which clinical finding is diagnostic for Wallenberg syndrome (lateral medullary infarct)?\",\n",
    "    [\"Contralateral hearing loss\", \"Ipsilateral Horner syndrome\", \"Bilateral facial weakness\", \"Contralateral ataxia\"],\n",
    "    \"Ipsilateral Horner syndrome\",\n",
    "    \"Ipsilateral Horner syndrome (ptosis, miosis, anhidrosis) is pathognomonic for lateral medullary syndrome, caused by disruption of descending sympathetic fibers. Other features: contralateral pain/temperature loss, ipsilateral ataxia, dysphagia, vertigo. Source: PICA_content.json Slides 12-14\"\n",
    "))"
]))

# Q5 - From Module 1 (Posterior circulation)
module_9_questions.append(create_code_cell([
    "# Module 9 - Question 5 (from Module 1: Posterior circulation)\n",
    "display(create_mcq(\n",
    "    \"Q5: Which cerebellar artery has the most variable origin?\",\n",
    "    [\"Superior cerebellar artery (SCA)\", \"Anteroinferior cerebellar artery (AICA)\", \"Posteroinferior cerebellar artery (PICA)\"],\n",
    "    \"Posteroinferior cerebellar artery (PICA)\",\n",
    "    \"PICA has the most variable origin, ranging from 14mm below to 26mm above the foramen magnum (average 8.6mm above). PICA may be absent unilaterally in ~16% of cerebellar hemispheres. Source: PICA_content.json Slide 1\"\n",
    "))"
]))

# Q6 - Integration Question: Module 6 (Comparison) + clinical
module_9_questions.append(create_code_cell([
    "# Module 9 - Question 6 (Integration: AICA vs PICA clinical differentiation)\n",
    "display(create_mcq(\n",
    "    \"Q6: A patient presents with vertigo, ataxia, facial numbness, and hearing loss. Which artery is most likely occluded?\",\n",
    "    [\"AICA\", \"PICA\", \"Superior cerebellar artery\", \"Basilar artery\"],\n",
    "    \"AICA\",\n",
    "    \"INTEGRATION: Hearing loss is the KEY discriminator between AICA and PICA syndrome. AICA supplies the inner ear via labyrinthine artery (present in 77% from premeatal segment), so AICA infarction causes hearing loss. PICA infarction (Wallenberg syndrome) does NOT cause hearing loss. Both cause vertigo, ataxia, facial sensory loss. Source: Modules 3, 5, 6\"\n",
    "))"
]))

# Q7 - From Module 8 (Surgical)
module_9_questions.append(create_code_cell([
    "# Module 9 - Question 7 (from Module 8: Surgical applications)\n",
    "display(create_mcq(\n",
    "    \"Q7: During retrosigmoid approach for CPA tumor, you identify a vascular loop at the porus acusticus. What is the most appropriate management?\",\n",
    "    [\"Immediately coagulate and divide the vessel\", \"Identify the vessel as likely AICA and mobilize carefully\", \"Convert to translabyrinthine approach\", \"Abandon surgery due to high risk\"],\n",
    "    \"Identify the vessel as likely AICA and mobilize carefully\",\n",
    "    \"AICA's meatal loop reaches the porus in 50% of cases. The surgeon must: (1) Identify AICA, (2) Preserve labyrinthine artery if hearing preservation desired, (3) Mobilize AICA loop carefully before IAC drilling. Sacrifice risks hearing loss and cerebellar infarction. Source: AICA_content.json Slides 7-8 + surgical principles\"\n",
    "))"
]))

# Q8 - From Module 2 (AICA segments)
module_9_questions.append(create_code_cell([
    "# Module 9 - Question 8 (from Module 2: AICA segments)\n",
    "display(create_mcq(\n",
    "    \"Q8: AICA is most commonly classified into how many segments?\",\n",
    "    [\"3 segments\", \"4 segments\", \"5 segments\", \"6 segments\"],\n",
    "    \"4 segments\",\n",
    "    \"AICA is classified into 4 segments: (1) Anterior pontine, (2) Lateral pontine, (3) Flocculonodular, (4) Cortical. This is simpler than PICA's 5-segment classification. Source: AICA_content.json Slides 4-8\"\n",
    "))"
]))

# Q9 - From Module 4 (PICA segments)
module_9_questions.append(create_code_cell([
    "# Module 9 - Question 9 (from Module 4: PICA segments)\n",
    "display(create_mcq(\n",
    "    \"Q9: The telovelotonsillar segment of PICA is a critical landmark for which surgical corridor?\",\n",
    "    [\"Retrosigmoid approach\", \"Far-lateral approach\", \"Telovelotonsillar approach to 4th ventricle\", \"Translabyrinthine approach\"],\n",
    "    \"Telovelotonsillar approach to 4th ventricle\",\n",
    "    \"The telovelotonsillar segment forms the cranial (supratonsillar) loop and defines the surgical corridor between tela choroidea, vermis, and tonsil for access to the 4th ventricle. This approach avoids splitting the vermis. Source: PICA_content.json Slide 5\"\n",
    "))"
]))

# Q10 - From Module 3 (AICA branches)
module_9_questions.append(create_code_cell([
    "# Module 9 - Question 10 (from Module 3: AICA branches)\n",
    "display(create_mcq(\n",
    "    \"Q10: From which AICA segment does the labyrinthine artery most commonly originate?\",\n",
    "    [\"Anterior pontine\", \"Lateral pontine\", \"Premeatal\", \"Postmeatal\"],\n",
    "    \"Premeatal\",\n",
    "    \"The labyrinthine artery originates from the premeatal segment in 77% of cases. It supplies the inner ear structures and its preservation is critical for hearing. Variants: may arise from basilar artery or meatal segment. Source: AICA_content.json Slide 10\"\n",
    "))"
]))

# Q11 - From Module 6 (Comparison)
module_9_questions.append(create_code_cell([
    "# Module 9 - Question 11 (from Module 6: Comparison)\n",
    "display(create_mcq(\n",
    "    \"Q11: Which statement correctly compares AICA and PICA segment classifications?\",\n",
    "    [\"Both have 4 segments\", \"AICA has 4 segments, PICA has 5 segments\", \"AICA has 5 segments, PICA has 4 segments\", \"Both have 5 segments\"],\n",
    "    \"AICA has 4 segments, PICA has 5 segments\",\n",
    "    \"AICA: 4 segments (anterior pontine, lateral pontine, flocculonodular, cortical). PICA: 5 segments (anterior medullary, lateral medullary, tonsillomedullary, telovelotonsillar, cortical). PICA's more tortuous course requires additional segment classification. Source: Modules 2, 4, 6\"\n",
    "))"
]))

# Q12 - Integration Question: Module 2 + Module 3
module_9_questions.append(create_code_cell([
    "# Module 9 - Question 12 (Integration: AICA meatal loop + labyrinthine artery)\n",
    "display(create_mcq(\n",
    "    \"Q12: During retrosigmoid approach, you encounter a vascular loop at the porus and the patient has preserved hearing. What is your surgical strategy?\",\n",
    "    [\"Sacrifice the vessel - it's only AICA cortical branches\", \"Identify AICA meatal loop and preserve labyrinthine artery\", \"Use bipolar coagulation to shrink the loop\", \"Convert to middle fossa approach\"],\n",
    "    \"Identify AICA meatal loop and preserve labyrinthine artery\",\n",
    "    \"INTEGRATION: The meatal loop (Module 2) reaches the porus in 50% of cases. The labyrinthine artery (Module 3) arises from premeatal segment in 77% and supplies inner ear. Hearing preservation requires: (1) Identify AICA, (2) Preserve labyrinthine artery, (3) Mobilize loop without traction injury. Source: Modules 2, 3, 8\"\n",
    "))"
]))

# Q13 - From Module 7 (Quantitative)
module_9_questions.append(create_code_cell([
    "# Module 9 - Question 13 (from Module 7: Quantitative)\n",
    "display(create_mcq(\n",
    "    \"Q13: In what percentage of cerebellar hemispheres is PICA present?\",\n",
    "    [\"74%\", \"84%\", \"94%\", \"100%\"],\n",
    "    \"84%\",\n",
    "    \"Verified: PICA is present in 84% of cerebellar hemispheres, meaning 16% have absent or hypoplastic PICA unilaterally. When PICA is absent, AICA or SCA may provide collateral supply. Source: PICA_content.json Slide 16\"\n",
    "))"
]))

# Q14 - From Module 2 (AICA segments)
module_9_questions.append(create_code_cell([
    "# Module 9 - Question 14 (from Module 2: AICA segments)\n",
    "display(create_mcq(\n",
    "    \"Q14: Which cranial nerves does AICA traverse between in the lateral pontine segment?\",\n",
    "    [\"CN V and VI\", \"CN VI and VII\", \"CN VII and VIII\", \"CN VIII and IX\"],\n",
    "    \"CN VII and VIII\",\n",
    "    \"AICA passes between the facial (VII) and vestibulocochlear (VIII) nerves in the cerebellopontine angle during its lateral pontine course. This relationship is critical during CPA tumor surgery and microvascular decompression. Source: AICA_content.json Slide 5\"\n",
    "))"
]))

# Q15 - From Module 5 (PICA branches)
module_9_questions.append(create_code_cell([
    "# Module 9 - Question 15 (from Module 5: PICA branches)\n",
    "display(create_mcq(\n",
    "    \"Q15: PICA perforating arteries primarily supply which structure?\",\n",
    "    [\"Pons\", \"Lateral medulla and inferior cerebellar peduncle\", \"Middle cerebellar peduncle\", \"Superior cerebellar peduncle\"],\n",
    "    \"Lateral medulla and inferior cerebellar peduncle\",\n",
    "    \"PICA perforators arise primarily from the lateral medullary and tonsillomedullary segments and supply the lateral medulla and inferior cerebellar peduncle. These are critical structures - perforator injury can cause lateral medullary syndrome. Source: PICA_content.json Slides 7-9\"\n",
    "))"
]))

# Q16 - From Module 4 (PICA segments)
module_9_questions.append(create_code_cell([
    "# Module 9 - Question 16 (from Module 4: PICA segments)\n",
    "display(create_mcq(\n",
    "    \"Q16: The anterior medullary segment of PICA extends between which landmarks?\",\n",
    "    [\"VA to CN VI\", \"VA origin to CN XII\", \"CN IX to CN XII\", \"CN XII to tonsil\"],\n",
    "    \"VA origin to CN XII\",\n",
    "    \"The anterior medullary segment extends from PICA's origin at the vertebral artery to the level of CN XII (hypoglossal nerve rootlets). This is the first of PICA's 5 segments. Source: PICA_content.json Slide 2\"\n",
    "))"
]))

# Q17 - From Module 1 (Posterior circulation)
module_9_questions.append(create_code_cell([
    "# Module 9 - Question 17 (from Module 1: Posterior circulation)\n",
    "display(create_mcq(\n",
    "    \"Q17: AICA typically arises from which portion of the basilar artery?\",\n",
    "    [\"Proximal third near VA junction\", \"Lower to middle third\", \"Distal third near PCA bifurcation\", \"AICA arises from vertebral artery\"],\n",
    "    \"Lower to middle third\",\n",
    "    \"AICA most commonly arises from the lower to middle third of the basilar artery. This is more proximal than superior cerebellar artery (distal BA) and distinguishes it from PICA (which arises from vertebral artery). Source: AICA_content.json Slide 3\"\n",
    "))"
]))

# Q18 - From Module 8 (Surgical)
module_9_questions.append(create_code_cell([
    "# Module 9 - Question 18 (from Module 8: Surgical applications)\n",
    "display(create_mcq(\n",
    "    \"Q18: Which surgical approach provides optimal access to PICA's tonsillomedullary segment?\",\n",
    "    [\"Retrosigmoid\", \"Far-lateral\", \"Translabyrinthine\", \"Middle fossa\"],\n",
    "    \"Far-lateral\",\n",
    "    \"The far-lateral (lateral suboccipital) approach with or without condylar resection provides optimal access to PICA's tonsillomedullary segment and the caudal loop. This approach is used for foramen magnum lesions and vertebral artery aneurysms at PICA origin. Source: PICA surgical anatomy + Module 8\"\n",
    "))"
]))

# Q19 - From Module 3 (AICA branches)
module_9_questions.append(create_code_cell([
    "# Module 9 - Question 19 (from Module 3: AICA branches)\n",
    "display(create_mcq(\n",
    "    \"Q19: AICA recurrent perforators supply which critical brainstem structure?\",\n",
    "    [\"Midbrain\", \"Lateral pons\", \"Medulla\", \"Thalamus\"],\n",
    "    \"Lateral pons\",\n",
    "    \"AICA recurrent perforators arise from the proximal segments and course medially to supply the lateral pons, including the middle cerebellar peduncle and facial nerve nucleus. Injury during AICA aneurysm surgery can cause pontine infarction. Source: AICA_content.json Slide 11\"\n",
    "))"
]))

# Q20 - From Module 6 (Comparison)
module_9_questions.append(create_code_cell([
    "# Module 9 - Question 20 (from Module 6: Comparison)\n",
    "display(create_mcq(\n",
    "    \"Q20: Which structure differentiates AICA territory from PICA territory?\",\n",
    "    [\"Both supply identical territories\", \"AICA supplies pons, PICA supplies medulla\", \"AICA supplies medulla, PICA supplies pons\", \"Both supply only cerebellum\"],\n",
    "    \"AICA supplies pons, PICA supplies medulla\",\n",
    "    \"KEY DIFFERENCE: AICA perforators supply lateral pons (via anterior/lateral pontine segments), while PICA perforators supply lateral medulla (via medullary segments). Both supply inferior cerebellum (vermis and hemispheres), but brainstem territories differ. Source: Modules 2-6\"\n",
    "))"
]))

# Q21 - Integration Question: Module 4 + Module 5 + Module 8
module_9_questions.append(create_code_cell([
    "# Module 9 - Question 21 (Integration: PICA loops and surgical corridors)\n",
    "display(create_mcq(\n",
    "    \"Q21: Which PICA segment and loop combination defines the telovelotonsillar corridor for 4th ventricle access?\",\n",
    "    [\"Tonsillomedullary segment - caudal loop\", \"Telovelotonsillar segment - cranial loop\", \"Cortical segment - hemispheric branches\", \"Lateral medullary - perforator origin\"],\n",
    "    \"Telovelotonsillar segment - cranial loop\",\n",
    "    \"INTEGRATION: The telovelotonsillar segment (Module 4) forms the cranial (supratonsillar) loop and defines the surgical corridor (Module 8) between tela choroidea, vermis, and tonsil. This provides access to 4th ventricle while avoiding perforators from lateral medullary segment (Module 5). Source: Modules 4, 5, 8\"\n",
    "))"
]))

# Q22 - From Module 2 (AICA segments)
module_9_questions.append(create_code_cell([
    "# Module 9 - Question 22 (from Module 2: AICA segments)\n",
    "display(create_mcq(\n",
    "    \"Q22: The flocculonodular segment of AICA primarily supplies which cerebellar structure?\",\n",
    "    [\"Dentate nucleus\", \"Flocculus and nodulus\", \"Superior vermis\", \"Cerebellar tonsil\"],\n",
    "    \"Flocculus and nodulus\",\n",
    "    \"The flocculonodular segment (3rd AICA segment) supplies the flocculus and nodulus - the vestibulocerebellum. This region is critical for balance and vestibular function. Damage here contributes to vertigo in AICA syndrome. Source: AICA_content.json Slide 6\"\n",
    "))"
]))

# Q23 - From Module 7 (Quantitative)
module_9_questions.append(create_code_cell([
    "# Module 9 - Question 23 (from Module 7: Quantitative)\n",
    "display(create_mcq(\n",
    "    \"Q23: What is the average number of perforating arteries from PICA's tonsillomedullary segment per hemisphere?\",\n",
    "    [\"1.0\", \"2.0\", \"3.0\", \"4.0\"],\n",
    "    \"2.0\",\n",
    "    \"Verified quantitative data: Average 2.0 perforators from tonsillomedullary segment. These supply the lateral medulla and must be preserved during far-lateral approaches to avoid lateral medullary syndrome. Source: PICA_content.json quantitative measurements\"\n",
    "))"
]))

# Q24 - From Module 8 (Surgical)
module_9_questions.append(create_code_cell([
    "# Module 9 - Question 24 (from Module 8: Surgical applications)\n",
    "display(create_mcq(\n",
    "    \"Q24: When is translabyrinthine approach preferred over retrosigmoid for CPA tumors?\",\n",
    "    [\"When hearing is already non-functional\", \"When hearing must be preserved\", \"For all small tumors\", \"For medially-located tumors\"],\n",
    "    \"When hearing is already non-functional\",\n",
    "    \"Translabyrinthine approach sacrifices hearing by drilling through the labyrinth but provides excellent lateral IAC exposure without cerebellar retraction. It's preferred when: (1) hearing is non-functional, (2) large tumor with lateral IAC extension. Retrosigmoid preserves hearing if labyrinthine artery maintained. Source: Module 8 surgical principles\"\n",
    "))"
]))

# Q25 - From Module 5 (PICA branches)
module_9_questions.append(create_code_cell([
    "# Module 9 - Question 25 (from Module 5: PICA branches)\n",
    "display(create_mcq(\n",
    "    \"Q25: PICA choroidal branches supply which structure?\",\n",
    "    [\"Lateral ventricle\", \"Third ventricle\", \"Fourth ventricle choroid plexus\", \"Aqueduct of Sylvius\"],\n",
    "    \"Fourth ventricle choroid plexus\",\n",
    "    \"PICA choroidal branches arise from the telovelotonsillar segment and supply the choroid plexus of the fourth ventricle. These branches enter through the foramen of Luschka. Injury can cause intraventricular hemorrhage. Source: PICA_content.json Slide 10\"\n",
    "))"
]))

# Q26 - From Module 4 (PICA segments)
module_9_questions.append(create_code_cell([
    "# Module 9 - Question 26 (from Module 4: PICA segments)\n",
    "display(create_mcq(\n",
    "    \"Q26: The lateral medullary segment of PICA passes behind which cranial nerve?\",\n",
    "    [\"CN IX\", \"CN X\", \"CN XI\", \"CN XII\"],\n",
    "    \"CN IX\",\n",
    "    \"The lateral medullary segment passes posterior to the glossopharyngeal nerve (CN IX) rootlets as it courses around the lateral medulla. This relationship is important for identification during far-lateral and suboccipital approaches. Source: PICA_content.json Slide 3\"\n",
    "))"
]))

# Q27 - From Module 3 (AICA branches)
module_9_questions.append(create_code_cell([
    "# Module 9 - Question 27 (from Module 3: AICA branches)\n",
    "display(create_mcq(\n",
    "    \"Q27: What is the significance of the subarcuate artery?\",\n",
    "    [\"Supplies inner ear\", \"Supplies facial nerve in IAC\", \"Supplies petrous bone and facial canal region\", \"Supplies labyrinth\"],\n",
    "    \"Supplies petrous bone and facial canal region\",\n",
    "    \"The subarcuate artery (branch of AICA) enters the subarcuate fossa and supplies the petrous bone, mastoid, and region around facial canal. It may provide collateral to facial nerve. Not typically critical to preserve (unlike labyrinthine artery). Source: AICA_content.json Slide 13\"\n",
    "))"
]))

# Q28 - Integration Question: Module 6 + Module 7
module_9_questions.append(create_code_cell([
    "# Module 9 - Question 28 (Integration: AICA vs PICA quantitative comparison)\n",
    "display(create_mcq(\n",
    "    \"Q28: Compare AICA and PICA origin patterns - which statement is correct?\",\n",
    "    [\"AICA is more variable (lower percentage from typical origin)\", \"PICA is more variable (lower percentage from typical origin)\", \"Both equally variable\", \"Neither shows significant variation\"],\n",
    "    \"PICA is more variable (lower percentage from typical origin)\",\n",
    "    \"INTEGRATION QUANTITATIVE: AICA arises from basilar artery in 72% as single trunk (Module 7), with relatively consistent origin. PICA is absent in 16% of hemispheres (Module 7) and has widely variable vertebral artery origin point (14mm below to 26mm above foramen magnum, Module 1). PICA is definitively more variable. Source: Modules 1, 6, 7\"\n",
    "))"
]))

# Q29 - From Module 1 (Posterior circulation)
module_9_questions.append(create_code_cell([
    "# Module 9 - Question 29 (from Module 1: Posterior circulation)\n",
    "display(create_mcq(\n",
    "    \"Q29: Which cranial nerves are most intimately related to AICA in the CPA?\",\n",
    "    [\"CN III and IV\", \"CN V\", \"CN VII and VIII\", \"CN IX and X\"],\n",
    "    \"CN VII and VIII\",\n",
    "    \"AICA has critical anatomical relationships with the facial (VII) and vestibulocochlear (VIII) nerves in the cerebellopontine angle and may reach the internal auditory canal. This is why AICA pathology presents with hearing loss and facial involvement. Source: Module 1 + AICA_content.json\"\n",
    "))"
]))

# Q30 - From Module 7 (Quantitative)
module_9_questions.append(create_code_cell([
    "# Module 9 - Question 30 (from Module 7: Quantitative)\n",
    "display(create_mcq(\n",
    "    \"Q30: What is the average diameter of the vertebral artery at PICA origin?\",\n",
    "    [\"2.9mm\", \"3.4mm\", \"3.9mm\", \"4.4mm\"],\n",
    "    \"3.9mm\",\n",
    "    \"Verified quantitative measurement: The vertebral artery averages 3.9mm diameter at PICA origin. This measurement is relevant for endovascular approaches and understanding flow dynamics in vertebral artery dissection involving PICA. Source: PICA_content.json quantitative data\"\n",
    "))"
]))

# Q31 - From Module 2 (AICA segments)
module_9_questions.append(create_code_cell([
    "# Module 9 - Question 31 (from Module 2: AICA segments)\n",
    "display(create_mcq(\n",
    "    \"Q31: What percentage of cerebellopontine angles have a solitary (non-doubled) premeatal AICA segment?\",\n",
    "    [\"78%\", \"88%\", \"98%\", \"100%\"],\n",
    "    \"88%\",\n",
    "    \"Verified: 88% of CPAs have a solitary premeatal segment, while 12% show duplication or complex branching in this region. This variation affects the relationship to CN VII/VIII and labyrinthine artery origin. Source: AICA_content.json Slide 7 quantitative data\"\n",
    "))"
]))

# Q32 - From Module 6 (Comparison)
module_9_questions.append(create_code_cell([
    "# Module 9 - Question 32 (from Module 6: Comparison)\n",
    "display(create_mcq(\n",
    "    \"Q32: Which clinical finding definitively distinguishes AICA syndrome from Wallenberg syndrome?\",\n",
    "    [\"Ataxia\", \"Vertigo\", \"Hearing loss\", \"Facial numbness\"],\n",
    "    \"Hearing loss\",\n",
    "    \"HEARING LOSS is the definitive discriminator. AICA syndrome includes hearing loss (due to labyrinthine artery occlusion) plus vertigo, facial palsy, ataxia. Wallenberg (PICA) syndrome has vertigo, ataxia, facial numbness, dysphagia, Horner syndrome but NO hearing loss. Source: Modules 3, 5, 6\"\n",
    "))"
]))

# Q33 - Integration Question: Module 8 + All modules
module_9_questions.append(create_code_cell([
    "# Module 9 - Question 33 (Integration: Comprehensive surgical decision-making)\n",
    "display(create_mcq(\n",
    "    \"Q33: You are planning surgery for a foramen magnum meningioma compressing medulla. Which artery and segments require most careful preservation?\",\n",
    "    [\"AICA meatal and premeatal segments\", \"PICA anterior and lateral medullary segments with perforators\", \"SCA superior vermian branches\", \"Basilar perforators\"],\n",
    "    \"PICA anterior and lateral medullary segments with perforators\",\n",
    "    \"COMPREHENSIVE INTEGRATION: Foramen magnum lesions require far-lateral approach (Module 8), accessing PICA territory. The anterior and lateral medullary segments (Module 4) give rise to perforators (Module 5) supplying lateral medulla and inferior cerebellar peduncle. Injury causes Wallenberg syndrome (Module 5). Must preserve these medullary perforators - they have NO collateral supply. Source: Modules 4, 5, 6, 8\"\n",
    "))"
]))

# Module 9 Score Submission
module_9_score = create_code_cell([
    "# Module 9: Score Submission\n",
    "print(\"\\n\" + \"=\"*60)\n",
    "print(\"MODULE 9 COMPREHENSIVE ASSESSMENT COMPLETE\")\n",
    "print(\"=\"*60)\n",
    "print(\"\\nCount your correct answers and submit your score below.\")\n",
    "print(\"Pass threshold: 85% (28/33 correct)\")\n",
    "print(\"\\nSubmit your score to track progress and unlock Module 10.\")\n",
    "\n",
    "score_9 = submit_score(\n",
    "    module_num=9,\n",
    "    total_questions=33,\n",
    "    pass_threshold=0.85,\n",
    "    module_name=\"Comprehensive Assessment\",\n",
    "    badge=\"Comprehensive Master\"\n",
    ")"
])

print(f"Created {len(module_9_questions)} Module 9 questions")
print("Creating Module 10...")

# ===== MODULE 10: MASTERY CERTIFICATION =====
module_10_cells = []

# 1. Module 10 Header (markdown)
module_10_header = create_markdown_cell([
    "---\n",
    "\n",
    "## Module 10: Mastery Certification\n",
    "\n",
    "**Objective**: Demonstrate mastery through teaching ability and clinical synthesis.\n",
    "\n",
    "**Duration**: 45-60 minutes\n",
    "\n",
    "**What You'll Be Tested On**:\n",
    "1. Ability to explain concepts clearly (teach-back questions)\n",
    "2. Integration of AICA and PICA knowledge\n",
    "3. Clinical decision-making and synthesis\n",
    "4. Teaching-level understanding\n",
    "\n",
    "**Format**: 8 questions\n",
    "- 5 teach-back questions (\"How would you explain...?\")\n",
    "- 3 clinical synthesis questions (integrating all knowledge)\n",
    "\n",
    "**Pass Threshold**: 90% (7-8/8 correct)\n",
    "\n",
    "**Certification**: Successful completion awards **\"AICA/PICA Comprehensive Mastery\"** certification and completes the entire mastery sprint!"
])

# 2. Unlock check
unlock_check_10 = create_code_cell([
    "# Module 10: Check unlock status\n",
    "display_progress_bar()\n",
    "if not display_module_header(10):\n",
    "    print(\"\\n⚠️ MODULE 10 LOCKED\")\n",
    "    print(\"Complete Module 9 with 85% to unlock final certification.\")"
])

# 3. Reading section
reading_section_10 = create_markdown_cell([
    "### 📚 Reading: Teaching-Level Mastery\n",
    "\n",
    "This final module tests your ability to **teach** and **synthesize** AICA/PICA anatomy. True mastery means you can:\n",
    "\n",
    "1. **Explain complex concepts clearly** to learners at different levels\n",
    "2. **Integrate knowledge** across anatomical regions and clinical contexts\n",
    "3. **Apply principles** to novel surgical scenarios\n",
    "4. **Teach effectively** using accurate, complete, yet accessible language\n",
    "\n",
    "**Teach-Back Questions** (Q1-Q5): These ask \"How would you explain/teach [concept]?\" Your answer should model effective teaching, emphasizing key points, anatomical relationships, and clinical relevance.\n",
    "\n",
    "**Clinical Synthesis Questions** (Q6-Q8): These require integrating AICA and PICA knowledge to solve complex clinical problems involving approach selection, vessel management, and decision-making.\n",
    "\n",
    "**Pass Threshold**: 90% (7-8 correct) - this is a high bar because certification requires demonstration of teaching-level mastery, not just knowledge recall.\n",
    "\n",
    "**Upon completion**: You will receive your **AICA/PICA Comprehensive Mastery** certification!"
])

# 4. Assessment header
assessment_header_10 = create_markdown_cell([
    "### ✅ Module 10 Assessment\n",
    "\n",
    "Complete the following 8 questions. You need **90% (7-8/8 correct)** to achieve certification.\n",
    "\n",
    "**Note**: These questions test teaching ability and synthesis, not memorization."
])

module_10_cells.extend([module_10_header, unlock_check_10, reading_section_10, assessment_header_10])

# Module 10 Questions

# Q1 - Teach-back: AICA vs PICA segments
q1 = create_code_cell([
    "# Module 10 - Question 1 (Teach-back: Segment classification)\n",
    "display(create_mcq(\n",
    "    \"Q1: How would you explain the difference between AICA and PICA segment classifications to a medical student?\",\n",
    "    [\n",
    "        \"AICA has 4 simple segments following brainstem, PICA has 5 tortuous segments with loops around tonsil/4th ventricle\",\n",
    "        \"They're both classified the same way into 4 segments\",\n",
    "        \"AICA has more segments because it's a longer vessel\",\n",
    "        \"The segments are named after the cranial nerves they supply\"\n",
    "    ],\n",
    "    \"AICA has 4 simple segments following brainstem, PICA has 5 tortuous segments with loops around tonsil/4th ventricle\",\n",
    "    \"TEACHING EXPLANATION: 'AICA follows a simpler course around the pons with 4 segments (anterior pontine, lateral pontine, flocculonodular, cortical). PICA takes a much more tortuous path around the medulla and requires 5 segments to describe (anterior medullary, lateral medullary, tonsillomedullary, telovelotonsillar, cortical). PICA forms distinct caudal and cranial loops which are surgical landmarks. Think: AICA=4=simpler, PICA=5=more complex.' This explanation provides the key contrast, memorable framework, and clinical relevance.\"\n",
    "))"
])

# Q2 - Teach-back: Labyrinthine artery
q2 = create_code_cell([
    "# Module 10 - Question 2 (Teach-back: Labyrinthine artery)\n",
    "display(create_mcq(\n",
    "    \"Q2: What key anatomical points would you emphasize when teaching a resident about the labyrinthine artery?\",\n",
    "    [\n",
    "        \"Branch of AICA (77% from premeatal), supplies inner ear, critical for hearing preservation\",\n",
    "        \"It's just a small branch that can be sacrificed if needed\",\n",
    "        \"It originates from the basilar artery and supplies the pons\",\n",
    "        \"It's the same as the subarcuate artery\"\n",
    "    ],\n",
    "    \"Branch of AICA (77% from premeatal), supplies inner ear, critical for hearing preservation\",\n",
    "    \"TEACHING POINTS: 'The labyrinthine artery is the CRITICAL branch for hearing. Key facts: (1) Arises from AICA in 77% (usually premeatal segment), sometimes directly from basilar; (2) Supplies inner ear structures (cochlea, vestibule); (3) Is an END ARTERY with no collateral - occlusion causes immediate permanent hearing loss; (4) During retrosigmoid surgery, identify and preserve it if hearing preservation is a goal. Unlike other AICA branches, this one has direct functional consequences.' This emphasizes origin, function, clinical significance, and surgical implications.\"\n",
    "))"
])

# Q3 - Teach-back: AICA vs PICA syndromes
q3 = create_code_cell([
    "# Module 10 - Question 3 (Teach-back: Clinical differentiation)\n",
    "display(create_mcq(\n",
    "    \"Q3: How would you teach the clinical differentiation between AICA and PICA occlusion syndromes?\",\n",
    "    [\n",
    "        \"Hearing loss is the key discriminator - present in AICA, absent in PICA; both cause vertigo and ataxia\",\n",
    "        \"AICA affects cerebellum, PICA affects brainstem\",\n",
    "        \"They present identically, differentiation requires imaging\",\n",
    "        \"PICA causes hearing loss, AICA causes dysphagia\"\n",
    "    ],\n",
    "    \"Hearing loss is the key discriminator - present in AICA, absent in PICA; both cause vertigo and ataxia\",\n",
    "    \"TEACHING APPROACH: 'Both AICA and PICA syndromes cause vertigo and ataxia because both supply cerebellum. The KEY DISCRIMINATOR is hearing loss. AICA syndrome: hearing loss (labyrinthine artery), facial palsy (CN VII), vertigo, ataxia. Wallenberg/PICA syndrome: NO hearing loss, but has dysphagia, Horner syndrome (descending sympathetics), crossed sensory findings, vertigo, ataxia. Memory aid: AICA=Auditory (hearing loss), PICA=Pharynx (dysphagia). This teaching emphasizes the ONE finding that differentiates them clinically.' Source: Modules 3, 5, 6\"\n",
    "))"
])

# Q4 - Teach-back: Surgical approach
q4 = create_code_cell([
    "# Module 10 - Question 4 (Teach-back: AICA meatal loop identification)\n",
    "display(create_mcq(\n",
    "    \"Q4: How would you teach a junior resident to identify AICA's meatal loop intraoperatively during retrosigmoid approach?\",\n",
    "    [\n",
    "        \"Look for vascular loop near porus, reaches/enters IAC in 50%, identify before IAC drilling to avoid injury\",\n",
    "        \"AICA never enters the IAC, so don't worry about it\",\n",
    "        \"Just drill the IAC carefully and you'll see it\",\n",
    "        \"Use Doppler ultrasound - visual identification is unreliable\"\n",
    "    ],\n",
    "    \"Look for vascular loop near porus, reaches/enters IAC in 50%, identify before IAC drilling to avoid injury\",\n",
    "    \"TEACHING APPROACH: 'During retrosigmoid approach for acoustic neuroma, ALWAYS identify AICA before drilling the IAC. Look for: (1) A vascular loop near the porus acusticus - this is AICA's meatal loop; (2) In 50% of cases it reaches or enters the IAC; (3) The loop lies between CN VII and VIII; (4) Identify the labyrinthine artery coming off the loop if hearing preservation is planned. CRITICAL: Identify AICA BEFORE IAC drilling to avoid vessel injury during drilling or tumor removal. Use gentle dissection and small cottonoids to mobilize the loop.' This gives a systematic approach, percentages, anatomical landmarks, and explains WHY it matters.\"\n",
    "))"
])

# Q5 - Teach-back: PICA loops
q5 = create_code_cell([
    "# Module 10 - Question 5 (Teach-back: PICA loops)\n",
    "display(create_mcq(\n",
    "    \"Q5: What would you emphasize when teaching about PICA's caudal and cranial loops to a medical student?\",\n",
    "    [\n",
    "        \"Caudal (infratonsillar) loop below tonsil, cranial (supratonsillar) loop defines telovelotonsillar corridor for 4th ventricle access\",\n",
    "        \"Both loops are the same, just called different names\",\n",
    "        \"The loops are unimportant surgical landmarks\",\n",
    "        \"Cranial loop is around cerebellum, caudal loop is around medulla\"\n",
    "    ],\n",
    "    \"Caudal (infratonsillar) loop below tonsil, cranial (supratonsillar) loop defines telovelotonsillar corridor for 4th ventricle access\",\n",
    "    \"TEACHING POINTS: 'PICA forms two critical loops: (1) CAUDAL LOOP (infratonsillar): Formed by tonsillomedullary segment, extends below the cerebellar tonsil - this is the inferior landmark for far-lateral approach. (2) CRANIAL LOOP (supratonsillar): Formed by telovelotonsillar segment, arches above the tonsil and defines the telovelotonsillar corridor - a safe entry to 4th ventricle between tela choroidea, vermis, and tonsil. Memory aid: Caudal=Inferior to tonsil, Cranial=Superior to tonsil. Both are key surgical landmarks.' This explanation provides anatomical location, segment relationship, surgical relevance, and a memory aid.\"\n",
    "))"
])

# Q6 - Synthesis: Surgical approach selection
q6 = create_code_cell([
    "# Module 10 - Question 6 (Synthesis: Approach selection)\n",
    "display(create_mcq(\n",
    "    \"Q6: Compare and contrast surgical approach selection for AICA versus PICA pathology.\",\n",
    "    [\n",
    "        \"AICA→retrosigmoid/translabyrinthine (CPA/IAC access), PICA→midline suboccipital/far-lateral (foramen magnum/medulla access)\",\n",
    "        \"Both use the same retrosigmoid approach\",\n",
    "        \"AICA requires far-lateral, PICA requires retrosigmoid\",\n",
    "        \"Approach selection depends only on tumor size, not arterial territory\"\n",
    "    ],\n",
    "    \"AICA→retrosigmoid/translabyrinthine (CPA/IAC access), PICA→midline suboccipital/far-lateral (foramen magnum/medulla access)\",\n",
    "    \"SYNTHESIS: AICA pathology (aneurysms, CPA tumors with AICA involvement): Use retrosigmoid approach for lateral CPA access with hearing preservation potential, or translabyrinthine if hearing is gone and lateral IAC exposure needed. AICA territory is lateral CPA and pons. PICA pathology (VA-PICA aneurysms, foramen magnum tumors): Use far-lateral approach with/without condylar resection for low access to PICA origin and medullary segments, or midline suboccipital for PICA territory cerebellar lesions. PICA territory is medulla and inferior cerebellum. Key difference: AICA=lateral CPA approaches, PICA=medial/inferior approaches. Source: Module 8 + anatomical territories\"\n",
    "))"
])

# Q7 - Synthesis: Surgical corridor integration
q7 = create_code_cell([
    "# Module 10 - Question 7 (Synthesis: CPA and 4th ventricle corridors)\n",
    "display(create_mcq(\n",
    "    \"Q7: Integrate AICA and PICA anatomy to explain surgical corridor selection in the cerebellopontine angle and 4th ventricle region.\",\n",
    "    [\n",
    "        \"AICA dominates lateral CPA (CN VII/VIII), PICA more inferior/medial; 4th ventricle via telovelotonsillar corridor (PICA territory)\",\n",
    "        \"AICA and PICA have no relevance to surgical corridor selection\",\n",
    "        \"Both arteries supply the same regions so corridors are interchangeable\",\n",
    "        \"Only use AICA as landmark, PICA is too variable\"\n",
    "    ],\n",
    "    \"AICA dominates lateral CPA (CN VII/VIII), PICA more inferior/medial; 4th ventricle via telovelotonsillar corridor (PICA territory)\",\n",
    "    \"INTEGRATED SYNTHESIS: CPA anatomy: AICA courses through LATERAL CPA between CN VII/VIII - this is the working zone for retrosigmoid approach to acoustic neuromas. Must preserve AICA meatal loop and labyrinthine artery. PICA courses more INFERIOR and MEDIAL around medulla - far-lateral approach accesses PICA territory for foramen magnum lesions. For 4th VENTRICLE access: Use PICA's cranial (supratonsillar) loop as landmark for telovelotonsillar corridor - safe entry between tela choroidea, vermis, and tonsil, avoiding perforators. Integration: AICA=lateral CPA corridor, PICA=far-lateral AND telovelotonsillar corridors. Different arteries define different surgical spaces. Source: Modules 2, 4, 6, 8\"\n",
    "))"
])

# Q8 - Synthesis: Vessel preservation
q8 = create_code_cell([
    "# Module 10 - Question 8 (Synthesis: Vessel preservation decision-making)\n",
    "display(create_mcq(\n",
    "    \"Q8: Explain the decision-making process for vessel preservation versus sacrifice based on arterial territory and collateral circulation.\",\n",
    "    [\n",
    "        \"Perforators: never sacrifice (no collateral). Labyrinthine artery: preserve if hearing desired. Cortical branches: may sacrifice if collateral present\",\n",
    "        \"All vessels can be sacrificed if necessary - collaterals will compensate\",\n",
    "        \"Only preserve the main trunk, branches can always be sacrificed\",\n",
    "        \"Vessel sacrifice decisions depend only on tumor size, not collateral supply\"\n",
    "    ],\n",
    "    \"Perforators: never sacrifice (no collateral). Labyrinthine artery: preserve if hearing desired. Cortical branches: may sacrifice if collateral present\",\n",
    "    \"COMPREHENSIVE SYNTHESIS: **PERFORATORS (AICA/PICA to brainstem): NEVER SACRIFICE** - These supply pons (AICA) or medulla (PICA) with NO collateral circulation. Sacrifice causes infarction → permanent deficits. **LABYRINTHINE ARTERY (AICA branch): PRESERVE IF HEARING PRESERVATION DESIRED** - End artery to inner ear, no collateral. Sacrifice = immediate permanent hearing loss. Only sacrifice if hearing already gone or translabyrinthine approach. **CORTICAL BRANCHES: SELECTIVE SACRIFICE POSSIBLE** - Cerebellar cortex has rich pial collaterals from SCA/AICA/PICA anastomoses. Small cortical branches MAY be sacrificed if: (1) Adjacent collateral vessels visible, (2) Limited territory, (3) Unavoidable for tumor removal. Test with temporary clip if available. **General principle: Preserve perforators and end arteries (labyrinthine), consider sacrifice of cortical branches only with documented collaterals.** Source: Modules 2-8 + surgical principles\"\n",
    "))"
])

# Module 10 Score Submission
module_10_score = create_code_cell([
    "# Module 10: Score Submission and Certification\n",
    "print(\"\\n\" + \"=\"*60)\n",
    "print(\"MODULE 10 MASTERY CERTIFICATION ASSESSMENT COMPLETE\")\n",
    "print(\"=\"*60)\n",
    "print(\"\\nCount your correct answers and submit your score below.\")\n",
    "print(\"Certification threshold: 90% (7-8/8 correct)\")\n",
    "print(\"\\nSubmit your score to receive your certification!\")\n",
    "\n",
    "score_10 = submit_score(\n",
    "    module_num=10,\n",
    "    total_questions=8,\n",
    "    pass_threshold=0.90,\n",
    "    module_name=\"Mastery Certification\",\n",
    "    badge=\"AICA/PICA Comprehensive Mastery\"\n",
    ")\n",
    "\n",
    "if score_10 is not None and score_10 >= 7:\n",
    "    print(\"\\n\" + \"🎉\"*20)\n",
    "    print(\"\\n\" + \" \"*10 + \"CONGRATULATIONS!\")\n",
    "    print(\" \"*5 + \"AICA/PICA COMPREHENSIVE MASTERY ACHIEVED!\")\n",
    "    print(\"\\n\" + \"🎉\"*20)\n",
    "    print(\"\\nYou have successfully completed all 10 modules of the\")\n",
    "    print(\"AICA/PICA Mastery Sprint and demonstrated teaching-level mastery!\")\n",
    "    print(\"\\nSee final summary below.\")"
])

module_10_questions = [q1, q2, q3, q4, q5, q6, q7, q8]

print(f"Created {len(module_10_questions)} Module 10 questions")

# Final Congratulations Cell
final_congratulations = create_markdown_cell([
    "---\n",
    "\n",
    "## 🎉 CONGRATULATIONS! 🎉\n",
    "\n",
    "# You have completed the AICA/PICA Mastery Sprint!\n",
    "\n",
    "---\n",
    "\n",
    "### Your Achievement\n",
    "\n",
    "✅ **Completed all 10 modules** covering:\n",
    "- Module 1: Posterior Circulation Overview (5 questions)\n",
    "- Module 2: AICA Segments Deep Dive (10 questions)\n",
    "- Module 3: AICA Branches & Clinical Syndromes (10 questions)\n",
    "- Module 4: PICA Segments Deep Dive (12 questions)\n",
    "- Module 5: PICA Branches & Wallenberg Syndrome (10 questions)\n",
    "- Module 6: AICA vs PICA Comparison (10 questions)\n",
    "- Module 7: Quantitative Mastery (20 questions)\n",
    "- Module 8: Clinical Vignettes & Surgical Applications (12 questions)\n",
    "- Module 9: Comprehensive Assessment (33 questions)\n",
    "- Module 10: Mastery Certification (8 questions)\n",
    "\n",
    "**Total: 130 questions completed!**\n",
    "\n",
    "---\n",
    "\n",
    "### 🏆 Badges Earned\n",
    "\n",
    "Run the cell below to see all your earned badges:\n"
])

badges_display = create_code_cell([
    "# Display all earned badges\n",
    "print(\"\\n\" + \"=\"*60)\n",
    "print(\"YOUR EARNED BADGES\")\n",
    "print(\"=\"*60)\n",
    "display_progress_bar()\n",
    "print(\"\\n\" + \"=\"*60)"
])

next_steps = create_markdown_cell([
    "---\n",
    "\n",
    "### 📚 Next Steps\n",
    "\n",
    "Now that you've completed the AICA/PICA Mastery Sprint, here's how to continue your learning:\n",
    "\n",
    "1. **Review Your Performance**\n",
    "   - Check your progress data above\n",
    "   - Identify modules where you scored <90%\n",
    "   - Review those modules' content sections\n",
    "\n",
    "2. **Clinical Application**\n",
    "   - Apply this knowledge to real patient cases\n",
    "   - Review angiography with AICA/PICA anatomy in mind\n",
    "   - Discuss surgical approaches with your attending\n",
    "\n",
    "3. **Continue Learning**\n",
    "   - Review imaging examples: See `docs/AICA_PICA_Imaging_Resources.md`\n",
    "   - Practice with Board Prep questions: `docs/AICA_PICA_Board_Prep.ipynb`\n",
    "   - Prepare teaching presentations: `docs/presentation_prep_guide.md`\n",
    "\n",
    "4. **Teach Others**\n",
    "   - Use your teach-back skills from Module 10\n",
    "   - Lead an AICA/PICA anatomy teaching session\n",
    "   - Share this notebook with junior residents\n",
    "\n",
    "---\n",
    "\n",
    "### 🎯 You Are Now Prepared For:\n",
    "\n",
    "✅ Board examination questions on posterior circulation anatomy  \n",
    "✅ Angiographic interpretation of AICA and PICA variants  \n",
    "✅ Surgical planning for CPA and posterior fossa approaches  \n",
    "✅ Clinical diagnosis of AICA and PICA occlusion syndromes  \n",
    "✅ Teaching AICA/PICA anatomy to medical students and junior residents  \n",
    "\n",
    "---\n",
    "\n",
    "**Thank you for completing the AICA/PICA Mastery Sprint!**\n",
    "\n",
    "*This interactive educational module was designed to provide comprehensive, evidence-based training in cerebellar artery anatomy for neurosurgical trainees.*\n",
    "\n",
    "---"
])

# Assemble all new cells
all_new_cells = (
    [module_9_header, unlock_check, reading_section, assessment_header] +
    module_9_questions +
    [module_9_score] +
    module_10_cells +
    module_10_questions +
    [module_10_score] +
    [final_congratulations, badges_display, next_steps]
)

print(f"\n{'='*60}")
print(f"TOTAL NEW CELLS TO ADD: {len(all_new_cells)}")
print(f"  Module 9: 4 header cells + 33 questions + 1 score = 38 cells")
print(f"  Module 10: 4 header cells + 8 questions + 1 score = 13 cells")
print(f"  Final: 3 congratulations cells")
print(f"  Grand Total: 54 new cells")
print(f"{'='*60}")

# Save the cells to JSON for appending to notebook
output = {
    "all_new_cells": all_new_cells,
    "module_9_cells": len([module_9_header, unlock_check, reading_section, assessment_header] + module_9_questions + [module_9_score]),
    "module_10_cells": len(module_10_cells + module_10_questions + [module_10_score]),
    "final_cells": 3
}

with open('/Users/fax/Downloads/rhoton-ready/aica-pica/new_modules_cells.json', 'w') as f:
    json.dump(output, f, indent=2)

print(f"\nSaved cells to new_modules_cells.json")
