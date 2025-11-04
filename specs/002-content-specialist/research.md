# Phase 0: Research - Content Development Methodology
**Feature**: 002-content-specialist | **Phase**: Research | **Date**: 2025-11-04

## Research Question
How should a medical content specialist systematically develop 115 board exam-style assessment questions with verified accuracy, appropriate difficulty progression, and educational effectiveness?

## Content Development Best Practices

### Board Exam Question Standards

**Multiple-Choice Question Format** (NBME/ABNS Style):
- **Stem**: Clinical vignette or direct question (2-4 sentences for clinical, 1 sentence for factual)
- **Options**: Exactly 4 choices (A, B, C, D)
- **Single best answer**: One clearly correct option
- **Plausible distractors**: Incorrect options must be plausible to uninformed learners but clearly wrong to knowledgeable ones
- **Explanation**: 3-5 sentences explaining why correct answer is right and why distractors are wrong

**Question Difficulty Levels**:
1. **Knowledge Recall** (30%): Direct anatomical facts from slides
2. **Application** (50%): Apply anatomy to clinical scenarios or comparative reasoning
3. **Synthesis** (20%): Integrate multiple concepts or clinical decision-making

**Bloom's Taxonomy Mapping**:
- Modules 3-6: 60% Recall, 30% Application, 10% Synthesis
- Module 7: 80% Recall (quantitative data), 20% Application
- Module 8: 20% Recall, 50% Application, 30% Synthesis (clinical vignettes)
- Module 9: 30% Recall, 40% Application, 30% Synthesis (comprehensive)
- Module 10: 10% Recall, 30% Application, 60% Synthesis (teach-back)

### Medical Content Verification Protocol

**Source Hierarchy** (in order of authority):
1. **Primary**: AICA_content.json and PICA_content.json (verified against Rhoton)
2. **Secondary**: Rhoton's Cranial Anatomy and Surgical Approaches (cross-reference for clarification)
3. **Tertiary**: Peer-reviewed neurosurgical literature (for clinical syndrome details)

**Verification Checklist per Question**:
- [ ] Factual claims match JSON source data (slide number documented)
- [ ] Quantitative data exact match (percentages, measurements)
- [ ] Clinical syndromes match established literature
- [ ] Anatomical terminology uses standard nomenclature
- [ ] Distractors are factually incorrect (not just less optimal)

**Cross-Referencing Process**:
1. Identify source slide in JSON file
2. Extract relevant fact/data
3. Document slide number in question explanation
4. For quantitative questions: Copy exact numerical value
5. For clinical content: Verify syndrome presentation against standard references

### Question Writing Workflow

**Step 1: Content Mapping** (1 hour per module)
- Read all relevant JSON slides for module
- Identify key concepts that warrant assessment
- Categorize by difficulty level (recall/application/synthesis)
- Ensure coverage of all learning objectives

**Step 2: Question Drafting** (5-7 minutes per question)
- Write stem (clear, concise, unambiguous)
- Develop correct answer first
- Create 3 plausible distractors
- Draft explanation with source citation

**Step 3: Self-Review** (2-3 minutes per question)
- Check against verification checklist
- Ensure distractors are plausible but incorrect
- Verify explanation addresses all options
- Confirm source citation is accurate

**Step 4: Batch Quality Assurance** (20-30 minutes per module)
- Review all questions for difficulty distribution
- Check for unintentional patterns (e.g., "C" always correct)
- Ensure no duplicate concepts across questions
- Validate clinical realism for vignettes

**Time Estimates**:
- Module 3-6 (10-12 questions each): 1.5-2 hours per module
- Module 7 (20 questions): 2.5-3 hours
- Module 8 (12 vignettes): 2.5-3 hours (vignettes take longer)
- Module 9 (33 questions): 4-5 hours (comprehensive review)
- Module 10 (8 questions): 1.5-2 hours
- **Total**: 15-20 hours (conservative estimate vs plan.md 8-12 hours - plan may be optimistic)

### Distractor Development Strategies

**Common Distractor Types**:
1. **Conceptual Confusion**: Related but incorrect anatomy (e.g., "anterior inferior cerebellar artery" vs "posterior inferior cerebellar artery")
2. **Quantitative Near-Miss**: Close but wrong numbers (e.g., 72% vs 62% for AICA origin)
3. **Clinical Mimic**: Similar syndrome with different territory (e.g., AICA vs PICA syndrome)
4. **Incomplete Answer**: Partially correct but missing key element
5. **Overextension**: Correct concept applied to wrong context

**Distractor Quality Criteria**:
- Must be factually incorrect (verifiable against sources)
- Should appeal to common misconceptions
- Avoid "trick" options that mislead through semantic games
- Never use "all of the above" or "none of the above" (not board exam style)

## Educational Design Principles

### Spaced Repetition & Retrieval Practice

**Module Sequencing Strategy**:
- Modules 3-5: Introduce concepts with immediate assessment
- Module 6: Comparative assessment (forces retrieval of Modules 3-5)
- Module 7: Quantitative deep dive (strengthens factual encoding)
- Module 8: Clinical application (retrieval + transfer)
- Module 9: Comprehensive (spaced retrieval of all prior modules)
- Module 10: Teach-back (highest-order retrieval)

**Question Distribution Rationale**:
- Fewer questions for narrow topics (Module 3: 10 questions, focused on branches)
- More questions for complex topics (Module 4: 12 questions, 5 PICA segments)
- Highest count for integration (Module 9: 33 questions, comprehensive)

### Immediate Feedback Design

**Explanation Structure** (already implemented via `create_mcq()`):
1. **Correctness indicator**: ✅ or ❌
2. **Correct answer statement**: "The correct answer is [X]"
3. **Why correct**: 1-2 sentences explaining the correct answer
4. **Why others wrong**: 1 sentence per distractor (brief)
5. **Source citation**: "Source: AICA_content.json, Slide 7"

**Learning-Focused Language**:
- Avoid judgmental language ("You should have known...")
- Frame mistakes as learning opportunities
- Connect to clinical relevance when possible
- Suggest review resources for failed questions

### Clinical Integration Strategies

**Module 8 Vignette Structure**:
1. **Patient presentation**: Age, symptoms, timeline (1-2 sentences)
2. **Diagnostic findings**: Imaging, physical exam (1 sentence)
3. **Surgical decision point**: Approach selection, intraoperative anatomy, complication avoidance
4. **Question**: What anatomical knowledge informs the decision?

**Realism Requirements**:
- Use actual surgical scenarios (CPA tumor, aneurysm, vascular compression)
- Avoid contrived setups ("A patient presents with exactly three symptoms...")
- Include normal variations (e.g., "AICA forms meatal loop" - common, not pathologic)
- Ensure decisions require anatomical knowledge, not just clinical experience

**Clinical Syndrome Questions** (Modules 3, 5, 8):
- Present syndrome features (symptoms/signs)
- Ask for anatomical correlation (which artery/territory)
- Explain pathophysiology in answer
- Differentiate from similar syndromes in distractors

## Module-Specific Development Notes

### Module 3: AICA Branches & Clinical Syndromes (10 questions)

**Content Distribution**:
- Labyrinthine artery anatomy (3 questions): origin, course, territory
- Recurrent perforators (2 questions): targets, clinical significance
- Subarcuate artery (2 questions): variations, surgical relevance
- AICA occlusion syndrome (3 questions): clinical presentation, differential diagnosis

**Key Concepts to Assess**:
- Labyrinthine artery as AICA branch (vs direct basilar origin)
- Meatal loop proximity to IAC
- Lateral pontine syndrome features
- Differentiation from PICA (Wallenberg) syndrome

**Source Material**: AICA_content.json Slides 10-14

---

### Module 4: PICA Segments Deep Dive (12 questions)

**Content Distribution**:
- Anterior medullary segment (2 questions)
- Lateral medullary segment (3 questions)
- Tonsillomedullary segment (2 questions)
- Telovelotonsillar segment (3 questions)
- Cortical segment (2 questions)

**Key Concepts to Assess**:
- Segment boundaries (anatomical landmarks)
- Relationships to cranial nerves (IX, X, XI, XII)
- Transition from anterior to lateral at vertebral artery junction
- Telovelotonsillar loop and surgical exposure

**Source Material**: PICA_content.json Slides 1-6

---

### Module 5: PICA Branches & Wallenberg Syndrome (10 questions)

**Content Distribution**:
- Perforators (3 questions): medullary targets
- Choroidal branches (2 questions): 4th ventricle supply
- Anatomical variations (2 questions): origin patterns
- Wallenberg syndrome (3 questions): clinical features, pathophysiology

**Key Concepts to Assess**:
- Lateral medullary perforators to inferior cerebellar peduncle
- Posterior inferior cerebellar hemisphere supply
- Wallenberg syndrome pentad (vertigo, ataxia, Horner's, sensory loss, dysphagia)
- PICA vs AICA syndrome differentiation

**Source Material**: PICA_content.json Slides 7-15

---

### Module 6: AICA vs PICA Comparison (10 questions)

**Content Distribution**:
- Origin differences (2 questions): basilar vs vertebral
- Segment classification (2 questions): 3 AICA vs 5 PICA
- Territory differences (3 questions): pons vs medulla, cerebellum
- Clinical syndrome differentiation (3 questions): lateral pontine vs Wallenberg

**Key Concepts to Assess**:
- AICA supplies lateral pons, PICA supplies lateral medulla
- AICA occlusion includes hearing loss (labyrinthine artery), PICA does not
- Both cause ipsilateral cerebellar ataxia
- Horner's syndrome more common in PICA occlusion

**Source Material**: AICA_content.json (comparison slide) + PICA_content.json (comparison)

---

### Module 7: Quantitative Mastery (20+ questions)

**Content Distribution**:
- AICA measurements (8 questions): origin patterns, caliber, meatal loop depth
- PICA measurements (8 questions): segment lengths, caliber, origin variations
- Comparative quantitative (4+ questions): relative frequencies, territory overlap percentages

**Key Concepts to Assess**:
- AICA origin: 72% single trunk, 26% duplicate, 2% triplicate (Slide 3)
- Meatal loop reaches porus in X% (verify exact percentage from JSON)
- PICA origin variations: 10% bilateral, 5% absent unilaterally
- Average segment lengths and calibers

**Verification Protocol**:
- EVERY numerical answer MUST match JSON exactly
- Document source slide for each question
- Cross-reference against multiple slides if data appears in multiple locations
- Flag any inconsistencies for resolution before finalizing

**Source Material**: AICA_content.json (Slides 3-9), PICA_content.json (Slides 1-6, 16-20)

---

### Module 8: Surgical Applications (12 vignettes)

**Content Distribution**:
- Retrosigmoid approach (4 vignettes): CPA tumor, AICA preservation
- Far-lateral approach (4 vignettes): Foramen magnum lesions, PICA anatomy
- Translabyrinthine/hearing preservation (4 vignettes): IAC approach, labyrinthine artery

**Vignette Template**:
```
A 45-year-old patient presents with [symptoms]. Imaging reveals [finding]. You are planning a [surgical approach]. [Intraoperative scenario or preoperative decision].

Question: [Anatomical knowledge required for decision]

A) [Correct answer based on anatomy]
B) [Distractor - common misconception]
C) [Distractor - correct anatomy, wrong application]
D) [Distractor - related but incorrect structure]
```

**Realism Checklist**:
- [ ] Scenario occurs in actual neurosurgical practice
- [ ] Decision requires anatomical knowledge, not just experience
- [ ] Imaging findings are realistic (not contrived)
- [ ] Options are all plausible intraoperative choices

**Source Material**: AICA_content.json (surgical approaches), PICA_content.json (surgical approaches)

---

### Module 9: Comprehensive Assessment (33 questions)

**Content Distribution** (from spec.md User Story 4):
- Module 1: 3 questions (basic AICA anatomy)
- Module 2: 5 questions (AICA segments)
- Module 3: 4 questions (AICA branches)
- Module 4: 5 questions (PICA segments)
- Module 5: 4 questions (PICA branches)
- Module 6: 4 questions (comparison)
- Module 7: 4 questions (quantitative)
- Module 8: 4 questions (clinical)

**Integration Requirements**:
- 30% (10+ questions) must require multi-module knowledge
- Example: "Which artery's occlusion causes hearing loss, vertigo, facial palsy?" (Modules 2+3+clinical)
- Avoid verbatim repetition of earlier questions
- Vary difficulty to match original module thresholds

**Randomization Strategy**:
- Do NOT group by source module (breaks pattern recognition)
- Mix difficulty levels throughout assessment
- Intersperse factual recall with clinical application

**Source Material**: All prior JSON slides (comprehensive review)

---

### Module 10: Mastery Certification (8 questions)

**Content Distribution**:
- Teach-back questions (5): "How would you explain [concept] to a medical student?"
- Clinical synthesis (3): "Compare and contrast [AICA vs PICA concept]"

**Question Types**:
1. **Explain to novice**: "How would you teach segment boundaries to a medical student?"
2. **Clinical teaching point**: "What key anatomical points would you emphasize when teaching AICA occlusion syndrome?"
3. **Comparative synthesis**: "Explain the differences between AICA and PICA syndromes to a resident"
4. **Surgical teaching**: "What anatomical considerations would you emphasize for a fellow planning a retrosigmoid approach?"

**High Threshold Rationale** (90%):
- Certification-level assessment
- Requires synthesis, not just recall
- 8 questions means 1 error allowed (87.5% rounds to 88%, fails)
- 0 errors = 100% = mastery certified

**Source Material**: All JSON slides (comprehensive mastery)

---

## Quality Assurance Workflow

### Attending Physician Review Protocol

**Review Checklist** (to be completed post-implementation):
1. **Medical Accuracy Review**:
   - [ ] All factual claims verified against JSON sources
   - [ ] Quantitative data 100% match (Module 7 critical)
   - [ ] Clinical syndromes match literature
   - [ ] No anatomical errors or misconceptions

2. **Educational Quality Review**:
   - [ ] Questions test learning objectives
   - [ ] Difficulty progression appropriate
   - [ ] Explanations are clear and complete
   - [ ] No "gotcha" questions or semantic tricks

3. **Clinical Realism Review** (Module 8):
   - [ ] Vignettes are realistic surgical scenarios
   - [ ] Decisions require anatomical knowledge
   - [ ] Options are all plausible choices
   - [ ] No contrived or unrealistic setups

4. **Board Exam Alignment Review**:
   - [ ] Format matches NBME/ABNS style
   - [ ] Difficulty appropriate for residents
   - [ ] Coverage aligns with board emphasis
   - [ ] No content outside scope of curriculum

### Learner Testing Protocol

**Representative Learner Test** (post-implementation):
- Recruit 1-2 neurosurgery residents (PGY3-4)
- Complete Modules 3-10 in sequence
- Collect feedback on:
  - Question clarity
  - Explanation helpfulness
  - Clinical relevance
  - Perceived difficulty
  - Time per module

**Success Metrics**:
- 80%+ report questions are clear and unambiguous
- 80%+ report explanations are helpful
- 80%+ report clinical vignettes are realistic
- Average time per module within estimates

---

## Research Conclusions

### Content Development Approach

**Recommended Workflow** (15-20 hours total):
1. **Day 1 (4 hours)**: Modules 3-4 (22 questions)
2. **Day 2 (4 hours)**: Modules 5-6 (20 questions)
3. **Day 3 (5 hours)**: Module 7 (20+ questions, requires careful verification)
4. **Day 4 (4 hours)**: Module 8 (12 vignettes)
5. **Day 5 (4 hours)**: Modules 9-10 (41 questions)

**Critical Success Factors**:
1. Rigorous source verification (especially Module 7 quantitative)
2. Plausible distractors (avoid obviously wrong options)
3. Educational explanations (not just answer keys)
4. Clinical realism (Module 8 vignettes must be authentic)
5. Balanced coverage (Module 9 distribution per spec)

**Risk Mitigation**:
- Content specialist MUST have medical training (resident/fellow/attending)
- Attending review MANDATORY before deployment
- JSON files are authoritative source (no external research without documentation)
- Quantitative questions require double-checking (100% accuracy required)

### Next Phase: Design

Phase 1 will define:
1. **Question Entity Structure** (data-model.md): Fields for question object, validation rules
2. **Content Specialist Workflow** (quickstart.md): Step-by-step guide for question development
3. **Contracts** (N/A): No API contracts for content development work

---

**Research Phase Complete** | **Next**: Phase 1 Design (data-model.md, quickstart.md)
