#!/usr/bin/env python3
"""
Script to generate remaining module content for AICA_PICA_Mastery_Sprint.ipynb
Modules 6-10 with all questions
"""

# This script generates the cell content that needs to be added to the notebook
# Each module will be added via NotebookEdit

# Module 6 content
module_6_content = {
    "reading_markdown": """### 📚 Reading: AICA vs PICA Comparative Anatomy

| Feature | AICA | PICA |
|---------|------|------|
| **Origin** | Basilar artery (lower to middle third) | Vertebral artery (variable level) |
| **Origin Pattern** | 72% single, 26% duplicate, 2% triplicate | 84% present, 16% absent; rarely duplicate |
| **Average Origin Level** | Lower half of basilar | 8.6mm above foramen magnum |
| **Segments** | 4 segments | 5 segments |
| **Segment Names** | Anterior pontine, Lateral pontine, Flocculopeduncular, Cortical | Anterior medullary, Lateral medullary, Tonsillomedullary, Telovelotonsillar, Cortical |
| **Brainstem Territory** | Lateral pons | Lateral medulla |
| **Peduncle Supply** | Middle cerebellar peduncle | Inferior cerebellar peduncle |
| **Cerebellar Territory** | Petrosal surface (anteroinferior) | Suboccipital surface (posteroinferior) |
| **Critical CN Relationships** | CN VI, VII, VIII (IAC) | CN IX, X, XI, XII |
| **Key Branch** | Labyrinthine artery (inner ear) | Perforators to medulla (most from tonsillomedullary segment) |
| **Characteristic Loop** | Meatal loop (50% enter IAC) | Caudal and cranial loops around tonsil |
| **Occlusion Syndrome** | Lateral pontine syndrome | Lateral medullary syndrome (Wallenberg) |
| **Hearing Loss in Occlusion** | **Present** (labyrinthine artery) | **Absent** (key discriminator) |
| **Facial Paralysis** | Prominent (CN VII nucleus/nerve) | Absent or mild |
| **Ataxia Source** | Middle cerebellar peduncle | Inferior cerebellar peduncle |
| **Primary Surgical Approach** | Retrosigmoid (CPA) | Midline suboccipital or far-lateral |
| **Variability** | Moderate | High (most variable cerebellar artery) |

---

#### Key Comparative Points:

**Origin**:
- AICA: More consistent origin from basilar artery
- PICA: Highly variable, can originate below foramen magnum

**Complexity**:
- AICA: 4 segments, primarily defined by relationship to IAC/nerves
- PICA: 5 segments, most complex and tortuous course

**Clinical Discrimination**:
- **Hearing loss** is the key differentiator:
  - Present in AICA occlusion
  - Absent in PICA occlusion
- Both cause vertigo, Horner syndrome, crossed sensory deficits

**Surgical Considerations**:
- AICA: Critical in CPA surgery, IAC drilling
- PICA: Critical in fourth ventricle approaches, foramen magnum surgery

---""",

    "free_recall_markdown": """### 🤔 Free Recall Challenge

**Prompt**: *Create a comparison table highlighting the five most important differences between AICA and PICA. For each difference, explain why it matters clinically or surgically.*

Take 3-5 minutes to formulate your answer before revealing below.

---

<details>
<summary><b>Click to reveal model answer</b></summary>

| Feature | AICA | PICA | Clinical/Surgical Significance |
|---------|------|------|-------------------------------|
| **Origin** | Basilar artery | Vertebral artery | AICA accessed via anterior skull base approaches; PICA via lateral/posterior approaches |
| **Brainstem Level** | Lateral pons | Lateral medulla | Determines syndrome level; affects different cranial nerve nuclei |
| **Key Branch** | Labyrinthine artery to inner ear | Perforators to lateral medulla | AICA occlusion causes hearing loss; PICA does not (key discriminator) |
| **Segments** | 4 segments (simpler) | 5 segments (more complex) | PICA course more tortuous, harder to predict intraoperatively |
| **Primary Territory** | Petrosal cerebellar surface | Suboccipital cerebellar surface | Determines which surgical approaches expose each artery |

**Why This Matters**:

1. **Hearing loss discriminates syndromes**: Critical for diagnosis
2. **Different cranial nerves**: AICA (VI, VII, VIII) vs PICA (IX, X, XI, XII)
3. **Surgical approach selection**: Pathology location determines artery at risk
4. **Variability**: PICA more variable, requires careful preoperative imaging
5. **Collateral patterns**: Understanding territories predicts stroke risk with sacrifice

</details>

---""",

    "assessment_header": """### ✅ Module 6 Assessment

Complete the following 10 multiple-choice questions. You need **80% (8/10 correct)** to pass.

**Critical**: All questions directly compare AICA and PICA.

---"""
}

# Module 6 questions (all 10)
module_6_questions = [
    {
        "num": 1,
        "question": "Q1: Which artery originates from the basilar artery, and which originates from the vertebral artery?",
        "options": [
            "Both AICA and PICA originate from the basilar artery",
            "AICA from basilar artery; PICA from vertebral artery",
            "AICA from vertebral artery; PICA from basilar artery",
            "Both AICA and PICA originate from the vertebral artery"
        ],
        "correct": "AICA from basilar artery; PICA from vertebral artery",
        "explanation": "AICA arises from the basilar artery (typically from the lower to middle third), while PICA arises from the vertebral artery (averaging 8.6mm above the foramen magnum but highly variable). This fundamental difference determines surgical approach selection and affects collateral circulation patterns. Source: AICA_content.json Slide 2, PICA_content.json Slide 8"
    },
    {
        "num": 2,
        "question": "Q2: How many segments comprise AICA compared to PICA?",
        "options": [
            "AICA: 3 segments; PICA: 5 segments",
            "AICA: 4 segments; PICA: 5 segments",
            "AICA: 5 segments; PICA: 4 segments",
            "AICA: 4 segments; PICA: 4 segments"
        ],
        "correct": "AICA: 4 segments; PICA: 5 segments",
        "explanation": "AICA has 4 segments (anterior pontine, lateral pontine, flocculopeduncular, cortical) while PICA has 5 segments (anterior medullary, lateral medullary, tonsillomedullary, telovelotonsillar, cortical). PICA's more complex segmentation reflects its more tortuous and variable course, making it the most complex cerebellar artery. Source: AICA_content.json Slide 3, PICA_content.json Slide 2"
    },
    {
        "num": 3,
        "question": "Q3: Which cerebellar peduncle does AICA supply, and which does PICA supply?",
        "options": [
            "AICA: Superior peduncle; PICA: Inferior peduncle",
            "AICA: Middle peduncle; PICA: Inferior peduncle",
            "AICA: Inferior peduncle; PICA: Middle peduncle",
            "Both supply the middle cerebellar peduncle"
        ],
        "correct": "AICA: Middle peduncle; PICA: Inferior peduncle",
        "explanation": "AICA supplies the middle cerebellar peduncle and adjacent lateral pons, while PICA supplies the inferior cerebellar peduncle and adjacent lateral medulla. This explains why ataxia in AICA occlusion results from middle peduncle damage, while ataxia in Wallenberg syndrome (PICA occlusion) results from inferior peduncle damage. The superior cerebellar peduncle is supplied by SCA. Source: AICA_content.json Slide 5, PICA_content.json Slide 11"
    },
    {
        "num": 4,
        "question": "Q4: Compare the cerebellar surface territories of AICA and PICA:",
        "options": [
            "AICA: Suboccipital surface; PICA: Petrosal surface",
            "AICA: Petrosal surface; PICA: Suboccipital surface",
            "Both supply primarily the petrosal surface",
            "Both supply primarily the suboccipital surface"
        ],
        "correct": "AICA: Petrosal surface; PICA: Petrosal surface",
        "explanation": "AICA primarily supplies the petrosal (anteroinferior) cerebellar surface, while PICA supplies the suboccipital (posteroinferior) cerebellar surface. These complementary distributions ensure complete cerebellar coverage. The petrosal surface faces anteriorly/superiorly, while the suboccipital surface faces posteriorly/inferiorly. Source: AICA_content.json Slide 14, PICA_content.json Slide 14"
    },
    {
        "num": 5,
        "question": "Q5: Which cranial nerve groups are intimately related to AICA vs PICA?",
        "options": [
            "AICA: CN III, IV, V; PICA: CN VII, VIII",
            "AICA: CN VI, VII, VIII; PICA: CN IX, X, XI, XII",
            "AICA: CN IX, X, XI; PICA: CN VI, VII, VIII",
            "Both arteries relate primarily to CN VII and VIII"
        ],
        "correct": "AICA: CN VI, VII, VIII; PICA: CN IX, X, XI, XII",
        "explanation": "AICA courses near CN VI (abducens), CN VII (facial), and CN VIII (vestibulocochlear) in the cerebellopontine angle and internal auditory canal. PICA courses among the lower cranial nerves: CN IX (glossopharyngeal), CN X (vagus), CN XI (accessory), and CN XII (hypoglossal) around the medulla. This difference is critical for surgical approaches and explains different cranial nerve deficits in their occlusion syndromes. Source: AICA_content.json Slides 4-5, PICA_content.json Slide 19"
    },
    {
        "num": 6,
        "question": "Q6: What is the key clinical feature that discriminates AICA occlusion from PICA occlusion?",
        "options": [
            "Vertigo (present in AICA, absent in PICA)",
            "Ataxia (present in PICA, absent in AICA)",
            "Hearing loss (present in AICA, absent in PICA)",
            "Horner syndrome (present in PICA, absent in AICA)"
        ],
        "correct": "Hearing loss (present in AICA, absent in PICA)",
        "explanation": "Hearing loss is the key discriminator. AICA occlusion causes hearing loss due to involvement of the labyrinthine artery supplying the inner ear, while PICA occlusion (Wallenberg syndrome) does not cause hearing loss. Both syndromes feature vertigo, ataxia, and Horner syndrome, but only AICA occlusion includes hearing loss. This single feature allows clinical differentiation of lateral pontine from lateral medullary syndrome. Source: AICA_content.json Slide 15, PICA_content.json inferred"
    },
    {
        "num": 7,
        "question": "Q7: Compare the characteristic loops formed by AICA and PICA:",
        "options": [
            "AICA: Caudal and cranial loops; PICA: Meatal loop",
            "AICA: Meatal loop at IAC; PICA: Caudal and cranial loops around tonsil",
            "Both form meatal loops near the internal auditory canal",
            "Neither artery forms characteristic loops"
        ],
        "correct": "AICA: Meatal loop at IAC; PICA: Caudal and cranial loops around tonsil",
        "explanation": "AICA forms a meatal loop directed toward or into the internal auditory canal (reaching the porus or entering the canal in ~50% of cases). PICA forms caudal (infratonsillar) and cranial (supratonsillar) loops as it courses around the cerebellar tonsil. These loops are critical surgical landmarks: the meatal loop must be identified before IAC drilling, while the cranial loop defines the telovelotonsillar approach to the fourth ventricle. Source: AICA_content.json Slide 8, PICA_content.json Slides 5-6, 17"
    },
    {
        "num": 8,
        "question": "Q8: Which artery is considered more variable in its course and distribution?",
        "options": [
            "AICA is more variable than PICA",
            "PICA is more variable than AICA",
            "Both have equal variability",
            "Neither shows significant variability"
        ],
        "correct": "PICA is more variable than AICA",
        "explanation": "PICA is the most variable cerebellar artery in course, origin level, and area of supply. It can originate from 14mm below to 26mm above the foramen magnum, may be absent in 16% of hemispheres, and its territory can vary from a small tonsillar area to the entire suboccipital surface. AICA shows moderate variability (72% single, 26% duplicate origin) but is more consistent than PICA. This extreme PICA variability requires careful preoperative imaging assessment. Source: AICA_content.json Slide 2, PICA_content.json Slides 1, 8, 14, 18"
    },
    {
        "num": 9,
        "question": "Q9: Compare the primary surgical approaches used to access AICA vs PICA:",
        "options": [
            "AICA: Midline suboccipital; PICA: Retrosigmoid",
            "AICA: Retrosigmoid (CPA); PICA: Midline suboccipital or far-lateral",
            "Both are accessed primarily via retrosigmoid approach",
            "AICA: Translabyrinthine; PICA: Retrosigmoid"
        ],
        "correct": "AICA: Retrosigmoid (CPA); PICA: Midline suboccipital or far-lateral",
        "explanation": "AICA is most commonly exposed via the retrosigmoid (lateral suboccipital) approach to the cerebellopontine angle, with translabyrinthine approach for IAC pathology. PICA is accessed via midline suboccipital approach for fourth ventricle surgery (telovelotonsillar corridor) or far-lateral/extreme lateral approach for foramen magnum and vertebral artery pathology. Approach selection depends on pathology location and which artery is at risk. Source: AICA_content.json Slide 17, PICA_content.json Slide 20"
    },
    {
        "num": 10,
        "question": "Q10: A patient has sudden vertigo, ipsilateral facial weakness, hearing loss, and ataxia. The lesion most likely affects:",
        "options": [
            "PICA territory (lateral medulla)",
            "AICA territory (lateral pons)",
            "Superior cerebellar artery territory",
            "Basilar artery perforators only"
        ],
        "correct": "AICA territory (lateral pons)",
        "explanation": "This constellation indicates AICA territory infarction (lateral pontine syndrome). The key features are hearing loss (labyrinthine artery involvement) and facial weakness (CN VII nucleus in pons). Wallenberg syndrome (PICA/lateral medulla) would have dysphagia and contralateral body sensory loss but NO hearing loss and typically no significant facial weakness. Hearing loss is the critical discriminator. Both cause vertigo and ipsilateral ataxia, but the peduncular source differs (middle vs inferior). Source: AICA_content.json Slide 15, comparative synthesis"
    }
]

print("Module 6 content structure created")
print(f"- Reading section: {len(module_6_content['reading_markdown'])} chars")
print(f"- Questions: {len(module_6_questions)} questions")
