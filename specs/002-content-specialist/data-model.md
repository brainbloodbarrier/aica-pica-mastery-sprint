# Phase 1: Data Model - Question Entity Structure
**Feature**: 002-content-specialist | **Phase**: Design | **Date**: 2025-11-04

## Overview

This document defines the structure of assessment questions for the AICA/PICA learning modules. Since this is a content development project (not software engineering), the "data model" describes the conceptual structure of questions and how they integrate with the existing `create_mcq()` function in the Jupyter notebook.

## Question Entity

### Core Structure

```python
# Existing create_mcq() function signature (from Feature 001)
create_mcq(
    question: str,           # Question stem (text)
    options: List[str],      # List of 4 answer choices
    correct_answer: int,     # Index of correct answer (0-3)
    explanation: str         # Detailed explanation with source citation
)
```

**Entity Definition**:

| Field | Type | Required | Constraints | Description |
|-------|------|----------|-------------|-------------|
| `question` | string | Yes | 20-500 characters | Question stem - clinical vignette or direct question |
| `options` | array[string] | Yes | Exactly 4 items, each 5-200 chars | Answer choices (A, B, C, D) |
| `correct_answer` | integer | Yes | 0-3 (zero-indexed) | Index of correct option in options array |
| `explanation` | string | Yes | 100-1000 characters | Detailed rationale with source citation |

### Metadata (Conceptual - Not in Function Signature)

For tracking and validation purposes, each question conceptually has:

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `module_number` | integer | Module where question appears | 3 |
| `question_number` | integer | Position within module assessment | 5 |
| `question_type` | enum | Category of question | "anatomical_recall" |
| `difficulty_level` | enum | Bloom's taxonomy level | "application" |
| `source_file` | string | JSON source file | "AICA_content.json" |
| `source_slide` | integer | Slide number in JSON | 7 |
| `concepts_tested` | array[string] | Learning objectives addressed | ["labyrinthine_artery", "meatal_loop"] |

**Note**: These metadata fields are conceptual documentation only. They are not passed to `create_mcq()` but should be tracked by the content specialist during development for quality assurance.

## Question Types

### Type 1: Anatomical Recall (Knowledge Level)

**Definition**: Direct assessment of factual anatomical knowledge from JSON slides.

**Example Structure**:
```python
create_mcq(
    question="What is the most common origin pattern for the AICA?",
    options=[
        "Single trunk from basilar artery (72%)",
        "Duplicate origin from basilar artery (26%)",
        "Triple trunk from basilar artery (2%)",
        "Direct origin from vertebral artery (15%)"
    ],
    correct_answer=0,
    explanation="The most common AICA origin is a single trunk from the basilar artery, occurring in 72% of cases. Duplicate origins occur in 26% and triple trunks in only 2% of cases. AICA typically arises from the basilar, not vertebral artery. Source: AICA_content.json, Slide 3"
)
```

**Usage**: Modules 3-7 (majority of questions)

---

### Type 2: Anatomical Application (Application Level)

**Definition**: Apply anatomical knowledge to clinical or comparative scenarios.

**Example Structure**:
```python
create_mcq(
    question="A patient with lateral pontine syndrome shows hearing loss and facial palsy. Which arterial territory is most likely affected?",
    options=[
        "AICA territory (lateral pons including labyrinthine artery)",
        "PICA territory (lateral medulla)",
        "Superior cerebellar artery territory",
        "Vertebral artery perforators"
    ],
    correct_answer=0,
    explanation="Hearing loss and facial palsy indicate involvement of the lateral pons, including CN VII and CN VIII nuclei. This is AICA territory. The labyrinthine artery (AICA branch) supplies the inner ear. PICA occlusion causes Wallenberg syndrome affecting the lateral medulla, not pons. Source: AICA_content.json, Slide 14"
)
```

**Usage**: Modules 3-6, 8-9 (clinical application questions)

---

### Type 3: Clinical Vignette (Synthesis Level)

**Definition**: Multi-step clinical scenario requiring integration of anatomical knowledge with surgical decision-making.

**Example Structure**:
```python
create_mcq(
    question="A 52-year-old patient presents with left-sided hearing loss and a 2cm CPA tumor on MRI. During retrosigmoid approach, you identify a vascular loop entering the internal auditory canal. What is the most important anatomical consideration?",
    options=[
        "This is likely AICA forming a meatal loop; preserve to maintain cochlear blood supply",
        "This is likely PICA; can be sacrificed without hearing consequences",
        "This is labyrinthine artery; hearing already lost so safe to sacrifice",
        "This is superior cerebellar artery; unrelated to hearing function"
    ],
    correct_answer=0,
    explanation="A vascular loop entering the IAC in the CPA is characteristically AICA forming a meatal loop. Even with preoperative hearing loss, the labyrinthine artery (AICA branch) should be preserved when possible to maximize chances of hearing preservation or recovery. PICA does not typically reach the CPA. The patient may have reversible hearing loss from tumor compression. Source: AICA_content.json, Slide 7"
)
```

**Usage**: Module 8 (all 12 questions), Module 9-10 (synthesis questions)

---

### Type 4: Teach-Back (Synthesis Level)

**Definition**: Questions asking how to explain or teach anatomical concepts, testing mastery through pedagogical reasoning.

**Example Structure**:
```python
create_mcq(
    question="How would you explain the key difference between AICA and PICA occlusion syndromes to a medical student?",
    options=[
        "AICA affects lateral pons (hearing loss, facial palsy); PICA affects lateral medulla (dysphagia, no hearing loss)",
        "AICA affects medulla; PICA affects pons",
        "Both cause identical symptoms but different imaging findings",
        "AICA causes motor deficits; PICA causes sensory deficits only"
    ],
    correct_answer=0,
    explanation="The teaching point is anatomical territory: AICA supplies lateral pons (CN VII, VIII nuclei) causing hearing loss and facial palsy, while PICA supplies lateral medulla (nucleus ambiguus, inferior cerebellar peduncle) causing dysphagia and ataxia without hearing loss. Both cause sensory deficits and ataxia. This territorial distinction is the key concept to emphasize. Source: AICA_content.json Slide 14, PICA_content.json Slide 15"
)
```

**Usage**: Module 10 (5 of 8 questions)

---

## Distractor Structure

### Distractor Quality Criteria

All incorrect options (distractors) must satisfy:

1. **Plausibility**: Appears correct to uninformed learner
2. **Incorrectness**: Factually wrong (verifiable against sources)
3. **Pedagogical Value**: Addresses common misconceptions
4. **Clear Wrongness**: Obviously incorrect to knowledgeable learner

### Distractor Types by Question Type

#### For Anatomical Recall Questions:

1. **Quantitative Near-Miss**: Correct structure, wrong number
   - Correct: "72% single trunk origin"
   - Distractor: "62% single trunk origin"

2. **Conceptual Confusion**: Related but wrong anatomy
   - Correct: "AICA arises from basilar artery"
   - Distractor: "AICA arises from vertebral artery"

3. **Incomplete Answer**: Partially correct
   - Correct: "Five PICA segments: anterior, lateral, tonsillomedullary, telovelotonsillar, cortical"
   - Distractor: "Three PICA segments: anterior, lateral, cortical"

#### For Clinical Application Questions:

1. **Territory Confusion**: Correct syndrome, wrong artery
   - Correct: "AICA occlusion (lateral pons)"
   - Distractor: "PICA occlusion (lateral medulla)"

2. **Incomplete Clinical Reasoning**: Partially correct logic
   - Correct: "Preserve AICA to maintain cochlear blood supply"
   - Distractor: "AICA can be sacrificed; collateral flow sufficient"

3. **Correct Anatomy, Wrong Application**: Right fact, wrong context
   - Correct: "Labyrinthine artery supplies inner ear; preserve when possible"
   - Distractor: "Labyrinthine artery supplies cerebellum; safe to sacrifice"

#### For Clinical Vignettes:

1. **Plausible but Unsafe**: Technically possible but suboptimal
2. **Correct Anatomy, Wrong Surgery**: Right structure, wrong approach
3. **Common Surgical Misconception**: Reflects trainee errors

---

## Explanation Structure

### Required Components

Every explanation must include (in order):

1. **Correct Answer Statement** (1 sentence)
   - "The correct answer is [X]."
   - "This finding indicates [Y]."

2. **Why Correct Answer is Right** (1-2 sentences)
   - Anatomical reasoning
   - Clinical correlation (if applicable)
   - Reference to source material

3. **Why Key Distractor(s) are Wrong** (1-2 sentences total)
   - Address most plausible distractor
   - May briefly mention other distractors if space permits
   - Focus on educational value, not exhaustive refutation

4. **Source Citation** (1 sentence)
   - "Source: [JSON_file], Slide [number]"
   - For multi-source questions: "Sources: AICA_content.json Slide 7, PICA_content.json Slide 15"

### Explanation Length Guidelines

| Question Type | Target Length | Max Length |
|---------------|---------------|------------|
| Anatomical Recall | 100-200 characters | 400 characters |
| Application | 200-400 characters | 600 characters |
| Clinical Vignette | 300-600 characters | 1000 characters |
| Teach-Back | 200-400 characters | 600 characters |

### Explanation Tone

- **Educational**: "This demonstrates..." not "You should have known..."
- **Precise**: Specific anatomical terminology, no vague language
- **Concise**: No unnecessary words, focus on key learning points
- **Source-Referenced**: Always cite JSON slide for verification

---

## Module-Specific Requirements

### Module 3: AICA Branches (10 questions)

| Question # | Type | Concept Tested | Source Slides |
|------------|------|----------------|---------------|
| 1-3 | Recall + Application | Labyrinthine artery anatomy | 10-11 |
| 4-5 | Recall | Recurrent perforators | 12 |
| 6-7 | Recall + Application | Subarcuate artery | 13 |
| 8-10 | Application + Vignette | AICA occlusion syndrome | 14 |

**Difficulty Distribution**: 40% Recall, 50% Application, 10% Vignette

---

### Module 4: PICA Segments (12 questions)

| Question # | Type | Concept Tested | Source Slides |
|------------|------|----------------|---------------|
| 1-2 | Recall | Anterior medullary segment | 1-2 |
| 3-5 | Recall + Application | Lateral medullary segment | 3 |
| 6-7 | Recall | Tonsillomedullary segment | 4 |
| 8-10 | Application | Telovelotonsillar segment | 5 |
| 11-12 | Recall + Application | Cortical segment | 6 |

**Difficulty Distribution**: 50% Recall, 40% Application, 10% Synthesis

---

### Module 5: PICA Branches (10 questions)

| Question # | Type | Concept Tested | Source Slides |
|------------|------|----------------|---------------|
| 1-3 | Recall + Application | Perforators | 7-9 |
| 4-5 | Recall | Choroidal branches | 10-11 |
| 6-7 | Recall | Anatomical variations | 12-13 |
| 8-10 | Application + Vignette | Wallenberg syndrome | 14-15 |

**Difficulty Distribution**: 40% Recall, 40% Application, 20% Vignette

---

### Module 6: AICA vs PICA Comparison (10 questions)

| Question # | Type | Concept Tested | Source Slides |
|------------|------|----------------|---------------|
| 1-2 | Recall | Origin differences | AICA: 3, PICA: 1 |
| 3-4 | Recall + Application | Segment classification | Both |
| 5-7 | Application | Territory differences | AICA: 8-9, PICA: 8-9 |
| 8-10 | Application + Vignette | Clinical syndrome differentiation | AICA: 14, PICA: 15 |

**Difficulty Distribution**: 30% Recall, 50% Application, 20% Synthesis

---

### Module 7: Quantitative Mastery (20+ questions)

| Question # | Type | Concept Tested | Source Slides |
|------------|------|----------------|---------------|
| 1-8 | Recall (Quantitative) | AICA measurements & variations | 3-9 |
| 9-16 | Recall (Quantitative) | PICA measurements & variations | 1-6, 16-20 |
| 17-20+ | Application (Quantitative) | Comparative data | Both |

**Difficulty Distribution**: 80% Recall, 20% Application

**Critical Requirement**: 100% of numerical values must match JSON sources exactly

---

### Module 8: Surgical Applications (12 vignettes)

| Question # | Type | Concept Tested | Source Slides |
|------------|------|----------------|---------------|
| 1-4 | Clinical Vignette | Retrosigmoid approach & AICA | AICA: 7-14 |
| 5-8 | Clinical Vignette | Far-lateral approach & PICA | PICA: 1-15 |
| 9-12 | Clinical Vignette | Translabyrinthine & hearing | AICA: 10-11 |

**Difficulty Distribution**: 20% Application, 80% Synthesis

**Realism Requirement**: All vignettes must be authentic surgical scenarios

---

### Module 9: Comprehensive Assessment (33 questions)

**Distribution by Source Module**:

| Source Module | Question Count | Types | Difficulty |
|---------------|----------------|-------|------------|
| Module 1 | 3 | Recall | 70% Recall, 30% Application |
| Module 2 | 5 | Recall + Application | 60% Recall, 40% Application |
| Module 3 | 4 | Application | 50% Recall, 50% Application |
| Module 4 | 5 | Recall + Application | 50% Recall, 50% Application |
| Module 5 | 4 | Application + Vignette | 40% Recall, 60% Application |
| Module 6 | 4 | Application + Synthesis | 30% Recall, 70% Application |
| Module 7 | 4 | Recall (Quantitative) | 100% Recall |
| Module 8 | 4 | Vignette + Synthesis | 20% Application, 80% Synthesis |

**Integration Requirements**:
- 10+ questions (30%) must integrate concepts from 2+ modules
- Example: AICA segment anatomy (Module 2) + labyrinthine artery (Module 3) + clinical syndrome (Module 8)

**Randomization**: Do NOT group by source module in presentation order

---

### Module 10: Mastery Certification (8 questions)

| Question # | Type | Concept Tested |
|------------|------|----------------|
| 1-5 | Teach-Back | Pedagogical synthesis of key concepts |
| 6-8 | Clinical Synthesis | Integrated AICA/PICA knowledge |

**Difficulty Distribution**: 10% Recall, 30% Application, 60% Synthesis

**High Threshold**: 90% required (7/8 minimum to pass)

---

## Validation Rules

### Content Validation

**Pre-Implementation Checklist** (per question):
- [ ] Question stem is clear and unambiguous
- [ ] Exactly 4 options provided
- [ ] Correct answer is factually accurate (verified against JSON)
- [ ] All 3 distractors are plausible but incorrect
- [ ] Explanation includes all 4 required components
- [ ] Source citation is complete and accurate
- [ ] No grammatical or spelling errors

### Quantitative Validation (Module 7)

**Critical**: Every numerical value must be verified:

1. Locate exact quote in JSON source file
2. Copy numerical value exactly (no rounding, no approximation)
3. Document slide number in explanation
4. If conflicting data found, flag for resolution before proceeding

**Example Verification Process**:
```
Question: "AICA originates as a single trunk in what percentage of cases?"
Correct Answer: "72%"

Verification Steps:
1. Open AICA_content.json
2. Navigate to Slide 3 (origin patterns)
3. Locate text: "single trunk origin: 72%"
4. Confirm answer matches exactly: "72%" ✓
5. Document in explanation: "Source: AICA_content.json, Slide 3"
```

### Distribution Validation (Module 9)

**Post-Development Checklist**:
- [ ] Module 1: Exactly 3 questions
- [ ] Module 2: Exactly 5 questions
- [ ] Module 3: Exactly 4 questions
- [ ] Module 4: Exactly 5 questions
- [ ] Module 5: Exactly 4 questions
- [ ] Module 6: Exactly 4 questions
- [ ] Module 7: Exactly 4 questions
- [ ] Module 8: Exactly 4 questions
- [ ] Total: 33 questions
- [ ] At least 10 questions require multi-module integration

---

## Implementation Notes

### Integration with Existing Code

**Notebook Cell Structure** (from Feature 001):

```python
# Existing pattern in AICA_PICA_Mastery_Sprint.ipynb

# Assessment header cell (Markdown)
## 📝 Module 3 Assessment
Pass Threshold: 80% (8/10 correct)

# Question cells (Code) - one per question
create_mcq(
    question="[Content specialist fills this]",
    options=[
        "[Option A]",
        "[Option B]",
        "[Option C]",
        "[Option D]"
    ],
    correct_answer=0,  # Content specialist determines correct index
    explanation="[Content specialist writes detailed explanation with source]"
)
```

**Content Specialist Workflow**:
1. Locate module assessment section in notebook
2. Identify placeholder question cell
3. Replace placeholder with actual question content
4. Verify syntax (Python list, string quotes, correct_answer index)
5. Test cell execution (ensure no syntax errors)
6. Move to next question

### No Schema Validation Needed

**Rationale**: 
- Questions are directly integrated into Python code (notebook cells)
- `create_mcq()` function provides runtime validation (type checking)
- Syntax errors caught during notebook execution
- No separate data storage or schema required

**Quality Assurance**:
- Content specialist self-review against checklist
- Attending physician review for medical accuracy
- Learner testing for clarity and effectiveness

---

## Data Model Summary

**Entity**: Assessment Question
**Format**: Python function call (`create_mcq()`)
**Storage**: Jupyter notebook code cells
**Validation**: Runtime (Python), Content review (Medical QA)

**Key Fields**:
- `question` (string): Stem
- `options` (array[4]): Choices
- `correct_answer` (int 0-3): Index
- `explanation` (string): Rationale + source

**Metadata** (conceptual only): module, question number, type, difficulty, source slide, concepts tested

**Quality Gates**:
1. Source verification (100% accuracy for quantitative)
2. Distractor plausibility
3. Explanation completeness
4. Medical accuracy review
5. Learner testing

---

**Data Model Phase Complete** | **Next**: quickstart.md (Content Specialist Workflow Guide)
