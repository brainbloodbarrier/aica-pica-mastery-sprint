# Feature Specification: Content Specialist - Medical Question Development

**Feature Branch**: `002-content-specialist`
**Created**: 2025-11-03
**Status**: Draft
**Input**: User description: "Fill in placeholder assessment questions with medically accurate content from JSON data files for AICA/PICA learning modules"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Replace Module 3-6 Placeholder Questions (Priority: P1)

A medical content specialist needs to replace the placeholder questions in Modules 3-6 with medically accurate assessment questions sourced from the existing AICA and PICA JSON content files, ensuring each question tests specific anatomical knowledge with detailed explanations.

**Why this priority**: Modules 3-6 form the core anatomical learning sequence (AICA branches, PICA segments/branches, comparison). Without accurate questions, learners cannot properly assess their knowledge or prepare for board exams.

**Independent Test**: A content specialist can complete Module 3 questions, verify each question against JSON source data, and a learner can take the assessment receiving accurate feedback.

**Acceptance Scenarios**:

1. **Given** Module 3 has 10 placeholder questions, **When** the content specialist reviews AICA_content.json slides 10-14 (labyrinthine artery, perforators, subarcuate artery, occlusion syndrome), **Then** they create 10 medically accurate multiple-choice questions with 4 answer options each and detailed explanations
2. **Given** a Module 4 question about PICA segment boundaries, **When** the content specialist cross-references PICA_content.json slides 1-6, **Then** the question accurately reflects the five-segment classification with correct anatomical landmarks
3. **Given** Module 5 covers PICA branches and Wallenberg syndrome, **When** the content specialist creates questions, **Then** at least 3 questions specifically test clinical presentation of lateral medullary syndrome
4. **Given** Module 6 requires comparative anatomy questions, **When** the content specialist develops questions, **Then** each question directly compares AICA and PICA on specific dimensions (origin, segments, territories, or clinical syndromes)

---

### User Story 2 - Develop Module 7 Quantitative Questions (Priority: P1)

A content specialist needs to create 20+ board exam-style quantitative questions for Module 7 that test specific numerical data (percentages, measurements, anatomical variations) with 85% accuracy requirement, cross-referencing every answer against the JSON source files.

**Why this priority**: Module 7 is critical for board exam preparation. Quantitative data questions are high-yield for exams and must be 100% accurate. This module has the highest threshold (85%) and requires verification against source data per spec requirement.

**Independent Test**: A content specialist can generate all 20 Module 7 questions, verify each answer against JSON data, and a learner scoring 17/20 (85%) demonstrates quantitative mastery.

**Acceptance Scenarios**:

1. **Given** AICA_content.json contains "72% single trunk origin, 26% duplicate, 2% triplicate", **When** the content specialist creates a question about AICA origin patterns, **Then** the correct answer matches the JSON data exactly and the explanation cites the slide number
2. **Given** Module 7 requires 20+ questions, **When** the content specialist develops questions, **Then** questions are distributed across AICA measurements (40%), PICA measurements (40%), and comparative quantitative data (20%)
3. **Given** a quantitative question states "AICA meatal loop reaches porus in X%", **When** the content specialist verifies the answer, **Then** they document the source as AICA_content.json slide 7 with the exact percentage
4. **Given** all Module 7 questions are complete, **When** a quality reviewer checks answers, **Then** 100% of numerical values match the JSON source files with no discrepancies

---

### User Story 3 - Create Module 8 Clinical Vignettes (Priority: P2)

A medical content specialist needs to develop 12 clinical vignette questions for Module 8 that require learners to apply anatomical knowledge to surgical decision-making (approach selection, intraoperative anatomy, complication prevention).

**Why this priority**: Clinical application is essential for surgical training, but depends on foundational knowledge from Modules 3-7. This enhances learning but is not required for basic assessment.

**Independent Test**: A content specialist can create all 12 vignettes, each testing different surgical scenarios, and a learner can answer using only anatomical knowledge from prior modules.

**Acceptance Scenarios**:

1. **Given** Module 8 focuses on surgical applications, **When** the content specialist creates a vignette, **Then** the vignette describes a realistic surgical scenario (CPA tumor, vascular loop, aneurysm) requiring anatomical reasoning
2. **Given** a vignette about retrosigmoid approach, **When** the learner answers, **Then** the correct answer requires knowledge of AICA meatal loop anatomy and labyrinthine artery preservation
3. **Given** Module 8 has 12 questions, **When** distributed across approaches, **Then** 4 questions cover retrosigmoid, 4 cover far-lateral/PICA, and 4 cover translabyrinthine/hearing preservation decisions
4. **Given** a clinical vignette presents "vertigo, facial palsy, hearing loss", **When** the learner identifies the syndrome, **Then** the explanation clarifies why this is AICA (lateral pontine) vs PICA (Wallenberg) syndrome

---

### User Story 4 - Build Module 9 Comprehensive Assessment (Priority: P2)

A content specialist needs to create 33 mixed questions for Module 9 that provide balanced coverage of Modules 1-8, with at least 3 questions per prior module and 30% clinical application, maintaining 85% pass threshold.

**Why this priority**: Comprehensive assessment validates overall mastery but requires all prior modules to be complete. This is a summative evaluation rather than teaching content.

**Independent Test**: A content specialist can generate 33 questions with documented distribution (3-5 per module 1-8), and a learner can take the assessment demonstrating integrated knowledge.

**Acceptance Scenarios**:

1. **Given** Module 9 requires balanced coverage, **When** the content specialist creates questions, **Then** the distribution is: Module 1 (3 questions), Module 2 (5), Module 3 (4), Module 4 (5), Module 5 (4), Module 6 (4), Module 7 (4), Module 8 (4) = 33 total
2. **Given** Module 9 emphasizes integration, **When** reviewing question types, **Then** at least 10 questions (30%) require clinical reasoning or multi-module integration
3. **Given** a Module 9 question asks "Which artery's occlusion causes hearing loss, vertigo, and facial palsy?", **When** answered correctly, **Then** the explanation integrates concepts from Modules 2 (AICA segments), 3 (labyrinthine artery), and clinical syndrome
4. **Given** Module 9 is comprehensive, **When** the content specialist finalizes questions, **Then** no more than 5 questions come from any single prior module to ensure breadth

---

### User Story 5 - Develop Module 10 Certification Questions (Priority: P3)

A content specialist needs to create 8 final assessment questions for Module 10 with 90% pass threshold, focusing on teach-back ability and integrated understanding rather than rote memorization.

**Why this priority**: Module 10 certifies mastery but is the final step. Questions should test synthesis and teaching ability, which requires all prior modules complete.

**Independent Test**: A content specialist can create 8 questions requiring explanation/teaching of concepts, and a learner scoring 7/8 (87.5% rounds to 88%) must retake while 8/8 (100%) achieves certification.

**Acceptance Scenarios**:

1. **Given** Module 10 tests teach-back ability, **When** the content specialist creates questions, **Then** questions ask "How would you explain [concept] to a medical student?" or "What teaching points would you emphasize?"
2. **Given** Module 10 requires 90% threshold, **When** a learner scores 7/8 (87.5%), **Then** the system displays "Did not pass - 90% required" and prompts review
3. **Given** Module 10 is final certification, **When** questions are created, **Then** questions integrate AICA and PICA knowledge (e.g., "Compare and contrast the clinical syndromes" or "Explain when to preserve vs sacrifice subarcuate artery")
4. **Given** Module 10 completion, **When** a learner passes with 90%+, **Then** they demonstrate comprehensive understanding sufficient for surgical training

---

### Edge Cases

- What happens when JSON content doesn't contain enough quantitative data for 20 Module 7 questions? (Content specialist must identify gaps and request additional source material)
- How does the content specialist handle conflicting data between JSON files? (Document discrepancy, research authoritative source, update JSON file)
- What if a clinical vignette requires knowledge not covered in prior modules? (Revise vignette to use only covered content or add prerequisite content)
- How are questions validated for board exam alignment? (Content specialist cross-references against sample board questions and Rhoton's teaching emphasis)
- What if the 33-question Module 9 distribution doesn't divide evenly across 8 modules? (Prioritize higher-weight modules - 5 questions for Modules 2, 4 (complex anatomy), 3-4 for others)

## Requirements *(mandatory)*

### Functional Requirements

**Module 3-6 Core Questions**:

- **FR-001**: Content specialist MUST replace all 42 placeholder questions in Modules 3-6 with medically accurate multiple-choice questions (Module 3: 10, Module 4: 12, Module 5: 10, Module 6: 10)
- **FR-002**: Each question MUST have exactly 4 answer options with one correct answer clearly identified
- **FR-003**: Every question MUST include a detailed explanation that references the JSON source material (slide number and content)
- **FR-004**: Module 3 questions MUST test labyrinthine artery anatomy (3 questions), recurrent perforators (2 questions), subarcuate artery (2 questions), and AICA occlusion syndrome (3 questions)
- **FR-005**: Module 4 questions MUST cover all 5 PICA segments with segment boundary identification and relationships to cranial nerves
- **FR-006**: Module 5 questions MUST include Wallenberg syndrome presentation (3 questions minimum) and PICA branch variations
- **FR-007**: Module 6 questions MUST directly compare AICA vs PICA on specific anatomical or clinical dimensions

**Module 7 Quantitative Accuracy**:

- **FR-008**: Module 7 MUST contain at least 20 questions exclusively testing quantitative data (percentages, measurements, frequencies)
- **FR-009**: Every Module 7 numerical answer MUST be verified against AICA_content.json or PICA_content.json with slide citation
- **FR-010**: Module 7 question distribution MUST be: AICA quantitative (8+ questions), PICA quantitative (8+ questions), comparative quantitative (4+ questions)
- **FR-011**: Module 7 explanations MUST cite the specific JSON slide number and quote the relevant quantitative data

**Module 8 Clinical Application**:

- **FR-012**: Module 8 MUST contain 12 clinical vignette questions requiring surgical decision-making
- **FR-013**: Module 8 vignettes MUST be distributed across surgical approaches: retrosigmoid (4), far-lateral (4), translabyrinthine/hearing preservation (4)
- **FR-014**: Each Module 8 vignette MUST present a realistic clinical scenario with patient presentation, imaging findings, or intraoperative situation
- **FR-015**: Module 8 explanations MUST connect anatomical knowledge to surgical decision rationale

**Module 9 Comprehensive Coverage**:

- **FR-016**: Module 9 MUST contain 33 questions with documented distribution across Modules 1-8
- **FR-017**: Module 9 MUST include at least 3 questions from each prior module (minimum coverage)
- **FR-018**: Module 9 MUST include at least 10 questions (30%) requiring clinical reasoning or multi-module integration
- **FR-019**: Module 9 questions MUST be randomized or sequenced to prevent pattern recognition by module

**Module 10 Certification**:

- **FR-020**: Module 10 MUST contain 8 questions testing synthesis and teach-back ability
- **FR-021**: Module 10 questions MUST require explanation or teaching of concepts rather than simple recall
- **FR-022**: Module 10 explanations MUST model effective teaching language for medical students

**Quality Assurance**:

- **FR-023**: All questions MUST use the existing `create_mcq()` function format (question, options array, correct answer, explanation)
- **FR-024**: Content specialist MUST document sources for all factual claims (JSON slide numbers)
- **FR-025**: All distractors (incorrect answers) MUST be plausible but clearly wrong to knowledgeable learners

### Key Entities

- **Question**: Contains question text, 4 answer options, correct answer indicator, detailed explanation, source citation (JSON file and slide number), module assignment, question type (anatomical/quantitative/clinical)
- **Content Source**: AICA_content.json and PICA_content.json files with 17 and 20 slides respectively, containing anatomical concepts, quantitative data, surgical relevance, and Rhoton image references
- **Module Assessment**: Collection of questions for a specific module with defined pass threshold (80%, 85%, or 90%), question count target, and content focus
- **Explanation**: Text that clarifies the correct answer, explains why distractors are incorrect, and cites source material for verification

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Content specialist can complete all 115 questions (Modules 3-10) within 8-12 hours of focused work
- **SC-002**: 100% of Module 7 quantitative questions match JSON source data when cross-referenced by quality reviewer
- **SC-003**: Learners completing Module 9 comprehensive assessment demonstrate balanced knowledge (no module with <60% correct rate among passing learners)
- **SC-004**: 100% of questions include explanations with source citations (JSON slide numbers)
- **SC-005**: Module 8 clinical vignettes achieve 80%+ learner satisfaction on "realistic and relevant" survey item
- **SC-006**: Module 10 certification questions achieve 90%+ pass rate on first attempt among learners who passed all prior modules with 85%+ average
- **SC-007**: Zero factual errors identified in post-implementation content review against Rhoton source material
- **SC-008**: Question quality meets board exam standards as validated by neurosurgery attending reviewer

## Assumptions

- Content specialist has medical training (neurosurgery resident, fellow, or attending) with deep knowledge of posterior circulation anatomy
- AICA_content.json and PICA_content.json contain sufficient factual material to generate all required questions without additional research
- Existing `create_mcq()` function in notebook supports the question format and feedback display
- Content specialist has access to Rhoton's microsurgical anatomy references for verification beyond JSON files
- Question development will follow board exam format conventions (stem, 4 options, single best answer)
- Explanations will be written for the target audience (neurosurgery residents preparing for boards)
- Content specialist can work directly in Jupyter notebook to replace placeholder code cells with actual questions
- Quality assurance will be performed by a neurosurgery attending or senior fellow before deployment to learners
