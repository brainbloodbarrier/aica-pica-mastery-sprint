# Content Specialist Quick Start Guide
**Feature**: 002-content-specialist | **Date**: 2025-11-04

## Overview

This guide provides step-by-step instructions for a medical content specialist (neurosurgery resident, fellow, or attending) to replace 115 placeholder assessment questions in the AICA/PICA Mastery Sprint Jupyter notebook with medically accurate, board exam-style questions.

**Time Estimate**: 15-20 hours total work (3-4 days at 4-5 hours/day)

**Prerequisites**:
- Medical training in neurosurgery (resident/fellow/attending level)
- Familiarity with posterior circulation anatomy
- Access to Rhoton's microsurgical anatomy references (optional, for verification)
- Basic Jupyter notebook usage (run cells, edit code)

---

## Quick Reference

### Daily Workflow Checklist

**Before Starting Each Day**:
- [ ] Open AICA_PICA_Mastery_Sprint.ipynb in Jupyter
- [ ] Open data/AICA_content.json in text editor (for reference)
- [ ] Open data/PICA_content.json in text editor (for reference)
- [ ] Review today's target modules (see Daily Schedule below)

**During Development**:
- [ ] Follow 4-step process per question (see Section 3)
- [ ] Cross-reference all facts against JSON sources
- [ ] Test each cell after editing (Shift+Enter)
- [ ] Save notebook frequently (Ctrl+S / Cmd+S)

**End of Day**:
- [ ] Run all modified cells to check for errors
- [ ] Save notebook and commit changes to git
- [ ] Update progress tracking (see Section 7)

---

## Section 1: Setup & Environment

### Step 1.1: Open Project Files

**Required Files**:
1. **Main Notebook**: `AICA_PICA_Mastery_Sprint.ipynb`
   - Location: Repository root
   - Open with: Jupyter Lab or Jupyter Notebook

2. **Source Data**: `data/AICA_content.json` and `data/PICA_content.json`
   - Open in text editor (VSCode, Sublime, etc.) for easy reference
   - Keep open in separate window while working

3. **Reference Documents** (this guide):
   - `specs/002-content-specialist/quickstart.md` (this file)
   - `specs/002-content-specialist/research.md` (methodology)
   - `specs/002-content-specialist/data-model.md` (question structure)

### Step 1.2: Understand Notebook Structure

**Navigate to Assessment Sections**:
- Module 3 Assessment: Search for "## 📝 Module 3 Assessment"
- Each module has:
  - Header cell (Markdown): Module title, pass threshold
  - Question cells (Code): Multiple `create_mcq()` function calls
  - Score submission cell (Code): Grading logic (do NOT modify)

**Identify Placeholder Questions**:
- Look for `question="[Placeholder question text]"`
- These are the cells you will edit
- Example:
```python
create_mcq(
    question="[Content specialist: Replace with question about labyrinthine artery anatomy]",
    options=[
        "[Option A - correct answer]",
        "[Option B - distractor]",
        "[Option C - distractor]",
        "[Option D - distractor]"
    ],
    correct_answer=0,
    explanation="[Content specialist: Write detailed explanation citing AICA_content.json slide number]"
)
```

### Step 1.3: Verify JSON Source Files

**AICA_content.json Structure**:
```json
{
  "slides": [
    {
      "slide_number": 1,
      "title": "AICA Overview",
      "anatomical_concepts": [...],
      "quantitative_data": {...},
      ...
    }
  ]
}
```

**Quick Verification**:
- Open `data/AICA_content.json`
- Confirm 17 slides present (slide_number 1-17)
- Open `data/PICA_content.json`
- Confirm 20 slides present (slide_number 1-20)

If files are missing or corrupted, STOP and contact project administrator.

---

## Section 2: Question Development Process

### The 4-Step Process (Per Question)

**Step 1: Content Mapping** (2 minutes)
- Identify which JSON slide(s) contain relevant content
- Read slide's anatomical_concepts and quantitative_data
- Determine question type (recall, application, vignette)
- Decide on learning objective to test

**Step 2: Drafting** (3-5 minutes)
- Write question stem (clear, concise, unambiguous)
- Write correct answer first
- Create 3 plausible distractors
- Draft explanation with source citation

**Step 3: Self-Review** (2 minutes)
- Verify facts against JSON source
- Check distractor plausibility
- Ensure explanation addresses all options
- Confirm source citation accuracy

**Step 4: Implementation** (1 minute)
- Copy content into notebook cell
- Replace placeholder text
- Verify Python syntax (quotes, commas, brackets)
- Test cell execution (Shift+Enter)

**Total Time**: 8-10 minutes per question

---

## Section 3: Writing Effective Questions

### Question Stem Guidelines

**Anatomical Recall Questions**:
- Direct, single-concept questions
- Example: "What is the most common origin pattern for AICA?"
- Length: 10-25 words

**Application Questions**:
- Present scenario requiring anatomical reasoning
- Example: "A patient with lateral pontine syndrome shows hearing loss. Which arterial territory is affected?"
- Length: 15-35 words

**Clinical Vignettes**:
- Patient presentation + clinical context + decision point
- Example: "A 52-year-old presents with hearing loss and 2cm CPA tumor. During retrosigmoid approach, you identify a vascular loop at the IAC. What anatomical structure is this likely to be?"
- Length: 30-60 words

### Option Writing Guidelines

**Format**: 4 options (A, B, C, D) - exactly one correct

**Correct Answer**:
- Factually accurate (verified against JSON)
- Clearly addresses the question
- Specific and precise (no vague language)

**Distractors** (3 incorrect options):
- Plausible to uninformed learner
- Factually incorrect (verifiable)
- Address common misconceptions
- Similar length/structure to correct answer

**Avoid**:
- "All of the above" / "None of the above"
- Absolutes ("always", "never") as hints
- Joke options or obviously wrong choices
- Options of drastically different lengths

### Explanation Writing Guidelines

**Structure** (4 required components):

1. **Correct Answer Statement** (1 sentence)
   - "The correct answer is [X] because [brief reason]."

2. **Why Correct is Right** (1-2 sentences)
   - Anatomical/clinical reasoning
   - Reference to key facts

3. **Why Key Distractor is Wrong** (1-2 sentences)
   - Address most plausible incorrect option
   - Educational focus (what misconception does it target?)

4. **Source Citation** (1 sentence)
   - Format: "Source: AICA_content.json, Slide [number]"
   - For multi-source: "Sources: AICA_content.json Slide 7, PICA_content.json Slide 15"

**Example**:
```
The correct answer is AICA territory, as hearing loss indicates involvement of the labyrinthine artery, an AICA branch supplying the inner ear. Lateral pontine syndrome includes CN VII and VIII nuclei, both supplied by AICA. PICA occlusion causes Wallenberg syndrome affecting the lateral medulla, which does not include hearing loss. Source: AICA_content.json, Slide 14
```

**Tone**:
- Educational, not punitive
- Precise medical terminology
- Concise (no unnecessary words)

---

## Section 4: Module-Specific Instructions

### Module 3: AICA Branches & Clinical (10 questions)

**Target Content**: AICA_content.json, Slides 10-14

**Question Distribution**:
- Questions 1-3: Labyrinthine artery (anatomy, course, territory)
- Questions 4-5: Recurrent perforators (targets, significance)
- Questions 6-7: Subarcuate artery (variations, surgical relevance)
- Questions 8-10: AICA occlusion syndrome (clinical features, differential)

**Key Concepts to Test**:
- Labyrinthine artery as AICA branch vs direct basilar origin
- Meatal loop anatomy and IAC proximity
- Lateral pontine syndrome features (hearing loss, facial palsy, ataxia)
- AICA vs PICA syndrome differentiation

**Difficulty**: 40% Recall, 50% Application, 10% Vignette

**Time Estimate**: 1.5-2 hours

---

### Module 4: PICA Segments Deep Dive (12 questions)

**Target Content**: PICA_content.json, Slides 1-6

**Question Distribution**:
- Questions 1-2: Anterior medullary segment
- Questions 3-5: Lateral medullary segment
- Questions 6-7: Tonsillomedullary segment
- Questions 8-10: Telovelotonsillar segment
- Questions 11-12: Cortical segment

**Key Concepts to Test**:
- Five-segment classification (not 3 or 4)
- Segment boundaries (anatomical landmarks)
- Cranial nerve relationships (IX, X, XI, XII)
- Telovelotonsillar loop and surgical access

**Difficulty**: 50% Recall, 40% Application, 10% Synthesis

**Time Estimate**: 1.5-2 hours

---

### Module 5: PICA Branches & Variations (10 questions)

**Target Content**: PICA_content.json, Slides 7-15

**Question Distribution**:
- Questions 1-3: Perforators (medullary targets)
- Questions 4-5: Choroidal branches (4th ventricle supply)
- Questions 6-7: Anatomical variations (origin patterns)
- Questions 8-10: Wallenberg syndrome (clinical features)

**Key Concepts to Test**:
- Lateral medullary perforators to inferior cerebellar peduncle
- PICA territory in cerebellum (posterior inferior hemisphere)
- Wallenberg syndrome pentad (vertigo, ataxia, Horner's, sensory loss, dysphagia)
- PICA vs AICA syndrome (no hearing loss in Wallenberg)

**Difficulty**: 40% Recall, 40% Application, 20% Vignette

**Time Estimate**: 1.5-2 hours

---

### Module 6: AICA vs PICA Comparison (10 questions)

**Target Content**: Both JSON files (comparison slides)

**Question Distribution**:
- Questions 1-2: Origin differences (basilar vs vertebral)
- Questions 3-4: Segment classification (3 AICA vs 5 PICA)
- Questions 5-7: Territory differences (pons vs medulla, cerebellum)
- Questions 8-10: Clinical syndrome differentiation

**Key Concepts to Test**:
- Direct comparison questions ("Which artery supplies lateral pons?")
- Differential diagnosis (lateral pontine vs Wallenberg)
- Hearing loss as AICA-specific finding
- Both cause ipsilateral cerebellar ataxia

**Difficulty**: 30% Recall, 50% Application, 20% Synthesis

**Time Estimate**: 1.5-2 hours

---

### Module 7: Quantitative Mastery (20+ questions) ⚠️ HIGH ACCURACY REQUIREMENT

**Target Content**: AICA_content.json (Slides 3-9), PICA_content.json (Slides 1-6, 16-20)

**Question Distribution**:
- Questions 1-8: AICA quantitative (origin patterns, caliber, measurements)
- Questions 9-16: PICA quantitative (segment lengths, origin variations)
- Questions 17-20+: Comparative quantitative data

**CRITICAL VERIFICATION PROTOCOL**:

For EVERY quantitative question:
1. Open JSON file
2. Navigate to specific slide
3. Copy exact numerical value (no rounding, no approximation)
4. Document slide number in explanation
5. Double-check before moving to next question

**Example**:
```python
# Question: "AICA originates as a single trunk in what percentage of cases?"
# Step 1: Open AICA_content.json
# Step 2: Go to Slide 3 (origin patterns)
# Step 3: Find: "single trunk origin: 72%"
# Step 4: Use EXACT value in answer: "72%"
# Step 5: Cite: "Source: AICA_content.json, Slide 3"
```

**Key Quantitative Data Points**:
- AICA origin patterns: 72% single, 26% duplicate, 2% triplicate
- AICA meatal loop depth: [verify percentage from JSON]
- PICA origin variations: [verify from JSON]
- Segment lengths and calibers: [verify all from JSON]

**Difficulty**: 80% Recall, 20% Application

**Time Estimate**: 2.5-3 hours (slower due to verification)

---

### Module 8: Surgical Applications (12 vignettes)

**Target Content**: Both JSON files (surgical approaches sections)

**Question Distribution**:
- Questions 1-4: Retrosigmoid approach (CPA access, AICA preservation)
- Questions 5-8: Far-lateral approach (foramen magnum, PICA anatomy)
- Questions 9-12: Translabyrinthine / hearing preservation (IAC, labyrinthine artery)

**Vignette Template**:
```
[Patient demographics and presentation] presents with [symptoms]. [Imaging findings]. 
[Surgical context]. [Intraoperative observation or preoperative decision point].

Question: [What anatomical knowledge is required?]

Options: [All must be plausible surgical choices]
```

**Realism Requirements**:
- Use actual surgical scenarios (CPA tumor, aneurysm, vascular compression)
- Avoid contrived setups or unrealistic findings
- Ensure decision requires anatomical knowledge
- Options should all be plausible intraoperative choices

**Example Scenarios**:
- CPA tumor with AICA involvement: preserve vs sacrifice
- Foramen magnum meningioma: PICA relationship to cranial nerves
- Vestibular schwannoma: labyrinthine artery identification
- Hemifacial spasm: vascular loop anatomy (AICA vs PICA)

**Difficulty**: 20% Application, 80% Synthesis

**Time Estimate**: 2.5-3 hours (vignettes take longer to write)

---

### Module 9: Comprehensive Assessment (33 questions)

**Target Content**: All prior JSON slides (comprehensive review)

**Question Distribution by Source Module**:
- Module 1: 3 questions (basic AICA intro)
- Module 2: 5 questions (AICA segments)
- Module 3: 4 questions (AICA branches)
- Module 4: 5 questions (PICA segments)
- Module 5: 4 questions (PICA branches)
- Module 6: 4 questions (AICA vs PICA comparison)
- Module 7: 4 questions (quantitative)
- Module 8: 4 questions (surgical applications)

**Integration Requirements**:
- 10+ questions (30%) must integrate concepts from 2+ modules
- Example: "Which artery's occlusion causes hearing loss, vertigo, and facial palsy?" (integrates Modules 2, 3, and clinical)

**Critical**: Do NOT group questions by source module
- Randomize or intersperse to prevent pattern recognition
- Mix difficulty levels throughout assessment

**Validation Checklist** (post-development):
- [ ] Exactly 3 questions from Module 1
- [ ] Exactly 5 questions from Module 2
- [ ] Exactly 4 questions from Module 3
- [ ] Exactly 5 questions from Module 4
- [ ] Exactly 4 questions from Module 5
- [ ] Exactly 4 questions from Module 6
- [ ] Exactly 4 questions from Module 7
- [ ] Exactly 4 questions from Module 8
- [ ] Total: 33 questions
- [ ] At least 10 require multi-module integration

**Time Estimate**: 4-5 hours (largest module)

---

### Module 10: Mastery Certification (8 questions)

**Target Content**: All JSON slides (comprehensive mastery)

**Question Distribution**:
- Questions 1-5: Teach-back questions ("How would you explain...")
- Questions 6-8: Clinical synthesis (integrated AICA/PICA)

**Teach-Back Question Format**:
```
"How would you explain [anatomical concept] to a medical student?"
or
"What key points would you emphasize when teaching [topic]?"
```

**Example Topics**:
- AICA vs PICA segment boundaries
- Clinical syndrome differentiation
- Surgical approach selection based on anatomy
- Anatomical variations and clinical significance

**Correct Answers for Teach-Back**:
- Should model effective teaching language
- Focus on key distinguishing features
- Use analogies or memory aids where appropriate
- Emphasize clinical relevance

**Difficulty**: 10% Recall, 30% Application, 60% Synthesis

**Time Estimate**: 1.5-2 hours

---

## Section 5: Quality Assurance

### Self-Review Checklist (Per Question)

Before moving to the next question, verify:

- [ ] **Question Clarity**: Stem is unambiguous and grammatically correct
- [ ] **Format**: Exactly 4 options provided
- [ ] **Correct Answer**: Factually accurate, verified against JSON source
- [ ] **Distractors**: All 3 are plausible but clearly incorrect
- [ ] **Explanation**: Includes all 4 required components (correct statement, rationale, distractor refutation, source)
- [ ] **Source Citation**: Complete and accurate (file name + slide number)
- [ ] **Python Syntax**: No missing quotes, commas, or brackets
- [ ] **Cell Execution**: Cell runs without errors (test with Shift+Enter)

### Batch Review (End of Module)

After completing all questions in a module:

1. **Difficulty Distribution Check**:
   - Review percentages (recall/application/synthesis)
   - Ensure distribution matches module target (see module-specific sections)

2. **Pattern Check**:
   - Verify correct answer isn't always option A or C
   - Should be roughly 25% per option (A, B, C, D) across module

3. **Coverage Check**:
   - All learning objectives from module header addressed
   - No duplicate concepts across questions
   - Balanced coverage of source slides

4. **Execution Test**:
   - Run all question cells in sequence
   - Verify no syntax errors
   - Confirm `create_mcq()` displays correctly

### Critical Checks (Module 7 Quantitative)

**100% Accuracy Required**:

For each quantitative question:
- [ ] Opened JSON source file
- [ ] Located exact numerical value
- [ ] Verified value matches answer option
- [ ] Documented slide number in explanation
- [ ] Cross-checked against other slides (if value appears multiple times)

**Flag Discrepancies**:
- If JSON contains conflicting data, STOP and document
- If value not found in JSON, STOP and document
- If unsure about interpretation, STOP and document
- Do NOT guess or approximate

---

## Section 6: Technical Implementation

### Editing Notebook Cells

**Step-by-Step**:

1. **Locate placeholder cell** in Jupyter notebook
   - Search for module assessment section
   - Find `[Content specialist: ...]` placeholder

2. **Click cell to enter edit mode**
   - Cell border turns green (edit mode)

3. **Replace placeholder text** with your content:
```python
create_mcq(
    question="What is the most common origin pattern for AICA?",
    options=[
        "Single trunk from basilar artery (72%)",
        "Duplicate origin from basilar artery (26%)",
        "Triple trunk from basilar artery (2%)",
        "Direct origin from vertebral artery"
    ],
    correct_answer=0,  # Index of correct answer (0 = first option)
    explanation="The most common AICA origin is a single trunk from the basilar artery, occurring in 72% of cases. Duplicate origins occur in 26% and triple trunks in only 2%. AICA typically arises from the basilar, not vertebral artery. Source: AICA_content.json, Slide 3"
)
```

4. **Verify Python syntax**:
   - Strings in quotes ("..." or '...')
   - Options list has square brackets [...]
   - Items separated by commas
   - Correct_answer is integer 0-3 (not string)

5. **Test cell execution**:
   - Press Shift+Enter (or click Run button)
   - Cell should display multiple-choice question
   - Verify all options display correctly

6. **Save notebook**:
   - Ctrl+S (Windows/Linux) or Cmd+S (Mac)
   - Or File → Save Notebook

### Common Syntax Errors

**Error**: `SyntaxError: EOL while scanning string literal`
**Cause**: Missing closing quote in string
**Fix**: Ensure all strings have matching quotes
```python
# Wrong:
question="What is AICA origin?

# Right:
question="What is AICA origin?"
```

**Error**: `SyntaxError: invalid syntax`
**Cause**: Missing comma between list items
**Fix**: Add comma after each option
```python
# Wrong:
options=[
    "Option A"
    "Option B"
]

# Right:
options=[
    "Option A",
    "Option B"
]
```

**Error**: `TypeError: list indices must be integers or slices, not str`
**Cause**: correct_answer is string instead of integer
**Fix**: Use integer 0-3 (no quotes)
```python
# Wrong:
correct_answer="0"

# Right:
correct_answer=0
```

**Error**: Question displays but options don't show
**Cause**: Options list not properly formatted
**Fix**: Verify square brackets and commas
```python
# Wrong:
options="Option A", "Option B", "Option C", "Option D"

# Right:
options=["Option A", "Option B", "Option C", "Option D"]
```

### Handling Special Characters

**Quotes within Strings**:
```python
# Use single quotes around string containing double quotes:
question='The "meatal loop" of AICA refers to what structure?'

# OR use triple quotes for multi-line or complex strings:
question="""The patient's MRI shows a "vascular loop" at the IAC. What is this?"""
```

**Apostrophes**:
```python
# Use double quotes around strings with apostrophes:
explanation="AICA's labyrinthine branch supplies the inner ear."

# OR escape the apostrophe:
explanation='AICA\'s labyrinthine branch supplies the inner ear.'
```

**Percentages**:
```python
# Percentages are just text in strings (no special handling):
options=["72%", "26%", "2%", "15%"]
```

---

## Section 7: Workflow & Progress Tracking

### Recommended Daily Schedule

**Day 1** (4 hours):
- Setup & familiarization: 30 minutes
- Module 3 (10 questions): 1.5 hours
- Module 4 (12 questions): 2 hours
- **Deliverable**: 22 questions complete

**Day 2** (4 hours):
- Module 5 (10 questions): 1.5 hours
- Module 6 (10 questions): 1.5 hours
- Buffer / review: 1 hour
- **Deliverable**: 20 questions complete (42 total)

**Day 3** (5 hours):
- Module 7 (20+ questions): 3 hours (slower due to verification)
- Start Module 8 (4 vignettes): 2 hours
- **Deliverable**: 24+ questions complete (66+ total)

**Day 4** (4 hours):
- Finish Module 8 (8 vignettes): 2 hours
- Module 9 (33 questions): 2 hours (start)
- **Deliverable**: 8+ vignettes complete

**Day 5** (4 hours):
- Complete Module 9: 3 hours
- Module 10 (8 questions): 1 hour
- **Deliverable**: 41 questions complete (115 total)

**Optional Day 6** (2-3 hours):
- Final review and quality assurance
- Attending physician review preparation
- Fix any identified issues

### Progress Tracking Template

Create a checklist to track completion:

```
Module 3: AICA Branches (10 questions)
[ ] Q1 - Labyrinthine artery anatomy
[ ] Q2 - Labyrinthine artery territory
[ ] Q3 - Labyrinthine artery clinical
[ ] Q4 - Recurrent perforators targets
[ ] Q5 - Recurrent perforators significance
[ ] Q6 - Subarcuate artery variations
[ ] Q7 - Subarcuate artery surgical
[ ] Q8 - AICA occlusion syndrome features
[ ] Q9 - AICA syndrome differential
[ ] Q10 - AICA syndrome vs PICA
[Total: 0/10 complete]

Module 4: PICA Segments (12 questions)
[ ] Q1-2 - Anterior medullary segment
[ ] Q3-5 - Lateral medullary segment
[ ] Q6-7 - Tonsillomedullary segment
[ ] Q8-10 - Telovelotonsillar segment
[ ] Q11-12 - Cortical segment
[Total: 0/12 complete]

... (continue for all modules)

OVERALL PROGRESS: 0/115 questions complete
```

### Git Commit Strategy

**Commit After Each Module**:
```bash
git add AICA_PICA_Mastery_Sprint.ipynb
git commit -m "Add Module 3 questions (10/10 complete)"
```

**Benefits**:
- Track progress incrementally
- Easy rollback if needed
- Clear development history

**Commit Message Format**:
```
"Add Module [N] questions ([completed]/[total] complete)"
```

Examples:
- "Add Module 3 questions (10/10 complete)"
- "Add Module 7 questions (20/20 complete) - quantitative verified"
- "Add Module 8 vignettes (12/12 complete) - surgical applications"
- "Add Module 9 comprehensive assessment (33/33 complete)"

---

## Section 8: Post-Development Quality Assurance

### Attending Physician Review Protocol

**Preparation** (content specialist):
1. Complete all 115 questions
2. Run full notebook to verify no errors
3. Create review checklist (see below)
4. Schedule review meeting with attending

**Review Checklist** (for attending):

**Medical Accuracy** (Critical):
- [ ] All anatomical facts verified against sources
- [ ] Module 7 quantitative data 100% match JSON
- [ ] Clinical syndromes match established literature
- [ ] No anatomical errors or misconceptions identified

**Educational Quality**:
- [ ] Questions test stated learning objectives
- [ ] Difficulty progression appropriate for residents
- [ ] Explanations are clear and educational
- [ ] No "gotcha" questions or tricks

**Clinical Realism** (Module 8):
- [ ] All vignettes represent authentic surgical scenarios
- [ ] Decisions require anatomical knowledge
- [ ] Options are plausible intraoperative choices
- [ ] No contrived or unrealistic setups

**Board Exam Alignment**:
- [ ] Format matches NBME/ABNS style
- [ ] Content appropriate for board preparation
- [ ] Coverage aligns with exam emphasis

**Recommendation**: [ ] Approve for deployment [ ] Revisions required

---

### Learner Testing Protocol

**Recruit Test Learners**:
- 1-2 neurosurgery residents (PGY3-5)
- Should NOT have extensive prior AICA/PICA exposure
- Ideally preparing for boards

**Testing Process**:
1. Learner completes Modules 3-10 in sequence
2. Takes notes on question clarity, difficulty, relevance
3. Completes feedback survey (see below)

**Feedback Survey** (5-point Likert scale):
1. Questions were clear and unambiguous (1=strongly disagree, 5=strongly agree)
2. Explanations helped me understand concepts (1-5)
3. Clinical vignettes were realistic (1-5)
4. Assessment difficulty was appropriate (1-5)
5. Content prepared me for board exams (1-5)

Open-ended:
- Which questions were confusing or unclear?
- Which explanations were most helpful?
- Any suggestions for improvement?

**Success Criteria** (from spec.md):
- 80%+ rate questions as clear (score 4-5 on item 1)
- 80%+ rate explanations as helpful (score 4-5 on item 2)
- 80%+ rate vignettes as realistic (score 4-5 on item 3)

---

## Section 9: Troubleshooting

### Common Issues

**Issue**: JSON file doesn't contain expected data
**Solution**: 
- Check slide number (may be off by one)
- Search for concept in other slides
- If truly missing, document and flag for review
- Do NOT make up data

**Issue**: Conflicting quantitative data in different slides
**Solution**:
- Document both values and slide numbers
- Flag for review with attending physician
- Research authoritative source (Rhoton)
- Update JSON file if needed
- Do NOT arbitrarily choose one

**Issue**: Not enough quantitative data for 20 Module 7 questions
**Solution**:
- Review all slides for numerical data (measurements, percentages, frequencies)
- Consider comparative quantitative questions (e.g., "AICA is typically [larger/smaller] than PICA")
- If insufficient, flag for specification revision
- Do NOT create non-quantitative questions to fill Module 7

**Issue**: Clinical vignette requires knowledge not in prior modules
**Solution**:
- Revise vignette to use only covered content
- OR add prerequisite content to earlier module
- OR flag as out-of-scope and skip
- Do NOT assume learners have external knowledge

**Issue**: Module 9 distribution doesn't balance (33 ÷ 8 = 4.125)
**Solution** (from spec.md):
- Prioritize complex modules with 5 questions (Modules 2, 4)
- Give simpler modules 3-4 questions (Modules 1, 3, 5, 6, 7, 8)
- Ensure total = 33
- Acceptable distribution: 3, 5, 4, 5, 4, 4, 4, 4 = 33

**Issue**: Notebook cell won't run / syntax error
**Solution**:
- Check for common syntax errors (see Section 6)
- Verify quotes, commas, brackets
- Test with simple example first
- If error persists, copy cell to text editor and review carefully

**Issue**: Question is too easy / too hard
**Solution**:
- Review difficulty targets for module (see module-specific sections)
- Adjust by changing distractor plausibility
- Too easy: Make distractors more plausible
- Too hard: Make correct answer more obvious or clarify stem
- Avoid changing factual content to adjust difficulty

---

## Section 10: Success Criteria & Completion

### Completion Checklist

**Content Development Complete**:
- [ ] Module 3: 10/10 questions
- [ ] Module 4: 12/12 questions
- [ ] Module 5: 10/10 questions
- [ ] Module 6: 10/10 questions
- [ ] Module 7: 20+/20+ questions (quantitative verified)
- [ ] Module 8: 12/12 vignettes
- [ ] Module 9: 33/33 questions (distribution validated)
- [ ] Module 10: 8/8 questions
- [ ] **Total: 115/115 questions complete**

**Quality Assurance Complete**:
- [ ] All questions self-reviewed against checklist
- [ ] Module 7 quantitative data 100% verified
- [ ] All cells execute without errors
- [ ] Attending physician review completed
- [ ] Learner testing completed (if required)
- [ ] All identified issues resolved

**Documentation Complete**:
- [ ] Git commits for each module
- [ ] Progress tracking updated
- [ ] Any discrepancies or issues documented
- [ ] Review feedback incorporated

### Success Metrics (from spec.md)

- **SC-001**: ✅ Content development completed in 15-20 hours (or per tracking)
- **SC-002**: ✅ 100% of Module 7 quantitative questions match JSON (verified)
- **SC-004**: ✅ 100% of questions include explanations with source citations
- **SC-007**: ✅ Zero factual errors identified in post-implementation review
- **SC-008**: ✅ Question quality meets board exam standards (attending validation)

---

## Section 11: Resources & References

### Quick Reference Materials

**JSON Source Files**:
- `data/AICA_content.json` - 17 slides of AICA anatomy
- `data/PICA_content.json` - 20 slides of PICA anatomy

**Project Documentation**:
- `specs/002-content-specialist/spec.md` - Feature specification
- `specs/002-content-specialist/research.md` - Content development methodology
- `specs/002-content-specialist/data-model.md` - Question structure reference
- `specs/002-content-specialist/quickstart.md` - This guide

**Notebook**:
- `AICA_PICA_Mastery_Sprint.ipynb` - Main implementation file

### External References (Optional)

**Authoritative Sources**:
- Rhoton AL. Cerebellar arteries. Neurosurgery. 2000;47(3 Suppl):S29-68.
- Rhoton AL. The posterior fossa veins. Neurosurgery. 2000;47(3 Suppl):S69-92.

**Board Review Resources**:
- Congress of Neurological Surgeons (CNS) Self-Assessment in Neurological Surgery (SANS)
- American Board of Neurological Surgery (ABNS) sample questions

---

## Contact & Support

**Issues During Development**:
- Git issues: Check repository README for setup instructions
- JSON data discrepancies: Document and flag for review
- Technical Jupyter issues: Consult Jupyter documentation or IT support
- Medical content questions: Consult Rhoton references or attending physician

**Quality Assurance Questions**:
- Content specialist self-review: Use checklists in Section 5
- Attending physician review: Schedule dedicated review session
- Learner testing: Recruit PGY3-5 residents, follow protocol in Section 8

---

**Quick Start Guide Complete**

**Next Steps**:
1. Set up environment (Section 1)
2. Begin Module 3 (Section 4)
3. Follow 4-step process per question (Section 2)
4. Track progress daily (Section 7)
5. Complete QA after each module (Section 5)

**Estimated Completion**: 15-20 hours over 3-5 days

Good luck! 🎯
