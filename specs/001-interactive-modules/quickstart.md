# Quickstart: Testing and Validation Guide

**Feature**: Complete 10-Module Interactive Learning System
**Date**: 2025-11-03
**Phase**: 1 - Design (Testing Strategy)

## Purpose

This guide provides step-by-step instructions for validating the completed 10-module learning system against all functional requirements and success criteria. It serves as both a testing checklist for implementers and a verification guide for reviewers.

---

## Prerequisites

Before testing, ensure:

1. **Dependencies Installed**:
   ```bash
   pip install jupyter ipywidgets ipython
   # Verify installation
   python3 --version  # Should be 3.8+
   jupyter --version
   ```

2. **Repository Cloned**:
   ```bash
   cd /Users/fax/Downloads/rhoton-ready/aica-pica
   git checkout 001-interactive-modules
   ```

3. **JSON Content Files Present**:
   ```bash
   ls data/
   # Should show: AICA_content.json, PICA_content.json, image_resources.json
   ```

---

## Test Plan Overview

Testing follows the Constitution's requirements:

1. **Contract Tests**: Notebook cells execute without errors
2. **Integration Tests**: Module progression, progress persistence, badge awards
3. **Content Tests**: Quantitative questions match JSON source data
4. **User Journey Tests**: Representative learner completes full pathway

**Estimated Testing Time**: 3-4 hours for complete validation

---

## Contract Tests: Cell Execution Validation

**Objective**: Verify all notebook cells execute without Python errors.

### Test Procedure

1. **Launch Notebook**:
   ```bash
   jupyter notebook AICA_PICA_Mastery_Sprint.ipynb
   ```

2. **Clear All Outputs**:
   - Menu: Kernel → Restart & Clear Output

3. **Run All Cells Sequentially**:
   - Menu: Cell → Run All
   - Monitor execution for errors

### Success Criteria

- ✅ All cells execute to completion
- ✅ No Python exceptions or tracebacks
- ✅ All `import` statements succeed
- ✅ All `display()` functions render markdown/widgets
- ✅ JSON files load successfully (Cells 2-3)
- ✅ Helper functions define without errors (Cell 4)

### Common Issues

| Error | Likely Cause | Fix |
|-------|--------------|-----|
| `ModuleNotFoundError: No module named 'ipywidgets'` | ipywidgets not installed | `pip install ipywidgets` |
| `FileNotFoundError: data/AICA_content.json` | Wrong working directory | Run notebook from repo root |
| `JSONDecodeError` | Malformed JSON file | Validate JSON syntax |
| `NameError: name 'progress' is not defined` | Cells run out of order | Restart kernel, run all cells |

---

## Integration Test 1: Module Unlock Logic

**Objective**: Verify modules unlock only after passing prior module threshold.

### Test Procedure

1. **Fresh Start**:
   - Delete `progress_data.json` if exists
   - Restart notebook kernel
   - Run setup cells (Cells 1-4)

2. **Test Module 1 (Always Unlocked)**:
   - Execute Module 1 header cell
   - ✅ Module displays (not locked)

3. **Test Module 2 (Locked Initially)**:
   - Attempt to execute Module 2 header cell
   - ✅ Module locked message displays

4. **Unlock Module 2**:
   - Complete Module 1 assessment (5 questions)
   - Submit score ≥ 80% (4+ correct)
   - ✅ "PASSED! Module 2 is now unlocked" message displays

5. **Verify Module 2 Unlocked**:
   - Execute Module 2 header cell
   - ✅ Module displays (not locked)

6. **Test Fail Scenario**:
   - Attempt Module 2 assessment
   - Submit score < 80% (e.g., 6/10 = 60%)
   - ✅ "Did not pass" message displays
   - ✅ Module 3 remains locked
   - ✅ Study tips provided

### Success Criteria

- ✅ Module 1 always unlocked
- ✅ Modules 2-10 locked until prior module passed
- ✅ Passing threshold enforced (80%, 85%, or 90% depending on module)
- ✅ Failure provides helpful feedback

---

## Integration Test 2: Progress Persistence

**Objective**: Verify progress saves and loads correctly across sessions.

### Test Procedure

1. **Complete Modules 1-3**:
   - Pass Module 1 (80%+)
   - Pass Module 2 (80%+)
   - Pass Module 3 (80%+)
   - Verify `progress_data.json` created in repo root

2. **Inspect Progress File**:
   ```bash
   cat progress_data.json
   ```
   - ✅ File contains JSON with modules_completed: [1, 2, 3]
   - ✅ quiz_scores contains module_1, module_2, module_3 keys
   - ✅ current_module = 4
   - ✅ badges_earned contains "AICA Segments Master", "AICA Branches Master"

3. **Close Notebook**:
   - File → Close and Halt
   - Shut down Jupyter server (Ctrl+C in terminal)

4. **Reopen Notebook**:
   - Restart Jupyter: `jupyter notebook AICA_PICA_Mastery_Sprint.ipynb`
   - Run initialization cells (Cells 1-4)
   - Execute `display_progress_bar()` cell

5. **Verify Progress Loaded**:
   - ✅ Progress bar shows 30% completion (3/10 modules)
   - ✅ Quiz scores display correctly
   - ✅ Badges display: "AICA Segments Master", "AICA Branches Master"
   - ✅ Module 4 is unlocked, Module 5 is locked

### Success Criteria

- ✅ Progress persists 100% across close/reopen
- ✅ No data loss (all modules, scores, badges intact)
- ✅ Current module restored correctly
- ✅ progress_data.json is human-readable JSON

---

## Integration Test 3: Badge Award System

**Objective**: Verify badges awarded at correct milestones.

### Test Procedure

Test each badge trigger:

| Module | Pass Score | Expected Badge | Verification |
|--------|------------|----------------|--------------|
| Module 2 | 85% (9/10) | "AICA Segments Master" | ✅ Badge notification displays |
| Module 3 | 80% (8/10) | "AICA Branches Master" | ✅ Badge notification displays |
| Module 4 | 82% (10/12) | "PICA Segments Master" | ✅ Badge notification displays |
| Module 5 | 80% (8/10) | "PICA Master" | ✅ Badge notification displays |
| Module 7 | 85% (17/20) | "Quantitative Master" | ✅ Badge notification displays (85% threshold!) |
| Module 7 | 80% (16/20) | None | ✅ No badge (below 85% threshold) |
| Module 8 | 83% (10/12) | "Surgical Applications Master" | ✅ Badge notification displays |
| Module 10 | 90% (7/8) | "Comprehensive AICA/PICA Mastery" | ✅ Certification message displays |
| Module 10 | 87% (7/8) | None | ✅ No certification (below 90% threshold) |

### Success Criteria

- ✅ Total 7 badges available (SC-005: "at least 5")
- ✅ Badge notifications display with "🎖️" emoji
- ✅ Final certification displays with "🏆" emoji
- ✅ Badges persist in progress_data.json
- ✅ Progress bar displays all earned badges

---

## Integration Test 4: Immediate Feedback System

**Objective**: Verify all assessment questions provide instant feedback with explanations.

### Test Procedure

1. **Test Correct Answer Feedback**:
   - Select correct answer on any MCQ
   - Click "Submit Answer"
   - ✅ "✅ Correct!" message displays
   - ✅ Explanation provided

2. **Test Incorrect Answer Feedback**:
   - Select wrong answer on any MCQ
   - Click "Submit Answer"
   - ✅ "❌ Incorrect. The correct answer is: [answer]" displays
   - ✅ Detailed explanation provided

3. **Sample 10 Random Questions** (across different modules):
   - Verify each has explanation text
   - ✅ 100% of questions have explanations (SC-004)

### Success Criteria

- ✅ Feedback displays instantly (<200ms perceived)
- ✅ All correct answers show "✅ Correct!"
- ✅ All incorrect answers show "❌ Incorrect" + correct answer
- ✅ 100% of questions include detailed explanations
- ✅ Explanations reference source material where applicable

---

## Content Test: Quantitative Accuracy Verification

**Objective**: Verify Module 7 quantitative questions match JSON source data (SC-007).

### Test Procedure

1. **Extract All Module 7 Questions**:
   - Navigate to Module 7 cells in notebook
   - List all quantitative questions (20+ questions expected)

2. **Cross-Reference Against JSON**:
   For each quantitative question:
   - Open `data/AICA_content.json` or `data/PICA_content.json`
   - Search for referenced percentage/measurement
   - Verify question answer matches JSON data exactly

### Example Verification

| Question | Claimed Answer | JSON Source | Verified |
|----------|----------------|-------------|----------|
| "AICA single trunk origin percentage?" | "72%" | AICA slide 2: "72% single trunk" | ✅ Match |
| "Meatal loop reaches porus percentage?" | "50%" | AICA slide 8: "50% reach porus" | ✅ Match |
| "PICA origin above foramen magnum average?" | "8.6mm" | PICA slide 3: "avg 8.6mm above" | ✅ Match |

3. **Verify Sample of 10 Questions** (representative):
   - At least 3 AICA quantitative facts
   - At least 3 PICA quantitative facts
   - At least 2 comparative facts
   - At least 2 clinical syndrome facts

### Success Criteria

- ✅ 100% of sampled questions match JSON source data
- ✅ No fabricated percentages or measurements
- ✅ All facts traceable to Rhoton references (via JSON rhoton_image_refs)

---

## Content Test: Module 9 Comprehensive Coverage

**Objective**: Verify Module 9 covers all prior modules with balanced distribution (SC-006).

### Test Procedure

1. **Count Questions Per Prior Module**:
   - Tag each Module 9 question with source module (1-8)
   - Create frequency table

2. **Verify Minimum Coverage**:
   - ✅ Module 1: ≥3 questions
   - ✅ Module 2: ≥3 questions
   - ✅ Module 3: ≥3 questions
   - ✅ Module 4: ≥3 questions
   - ✅ Module 5: ≥3 questions
   - ✅ Module 6: ≥3 questions
   - ✅ Module 7: ≥3 questions
   - ✅ Module 8: ≥3 questions

3. **Verify Total Count**:
   - ✅ Total questions: 30+ (meets SC-006)

4. **Verify Clinical Application**:
   - Count questions testing clinical reasoning (vignettes, syndromes, approach selection)
   - ✅ At least 30% clinical application (SC-006 requirement)

### Success Criteria

- ✅ All 8 prior modules represented (≥3 questions each)
- ✅ Total 30+ questions
- ✅ At least 30% clinical application/integration
- ✅ Balanced coverage (no module disproportionately over/under-represented)

---

## User Journey Test: Full Pathway Completion

**Objective**: Representative learner completes full 10-module pathway (Constitution requirement).

### Test Procedure

**Tester Profile**: Neurosurgery resident, medical student, or someone with medical background

1. **Fresh Start**:
   - Delete progress_data.json
   - Launch notebook
   - Record start time

2. **Complete Modules 1-10 Sequentially**:
   - Read all content slides
   - Attempt free recall challenges before revealing answers
   - Complete all assessments honestly (no answer key lookup)
   - Submit scores
   - Track time spent per module

3. **Track Experience**:
   | Module | Time Spent | Score | Passed | Badge Earned | Notes/Issues |
   |--------|------------|-------|--------|--------------|--------------|
   | 1 | ___ min | ___% | Y/N | ___ | ___ |
   | 2 | ___ min | ___% | Y/N | ___ | ___ |
   | 3 | ___ min | ___% | Y/N | ___ | ___ |
   | 4 | ___ min | ___% | Y/N | ___ | ___ |
   | 5 | ___ min | ___% | Y/N | ___ | ___ |
   | 6 | ___ min | ___% | Y/N | ___ | ___ |
   | 7 | ___ min | ___% | Y/N | ___ | ___ |
   | 8 | ___ min | ___% | Y/N | ___ | ___ |
   | 9 | ___ min | ___% | Y/N | ___ | ___ |
   | 10 | ___ min | ___% | Y/N | ___ | ___ |

4. **Record Total Time**:
   - ✅ Total time: 12-16 hours (SC-001 target)

5. **Collect Feedback**:
   - Usability issues?
   - Confusing questions?
   - Content errors?
   - Technical glitches?

### Success Criteria

- ✅ Learner completes full pathway without encountering incomplete content (SC-001)
- ✅ No broken functionality (all cells execute, all widgets work)
- ✅ Mastery thresholds felt appropriate (not too easy/hard)
- ✅ Immediate feedback helpful for learning
- ✅ Progress persisted correctly across multi-day sessions
- ✅ Final certification achieved upon Module 10 completion
- ✅ Learner reports educational value and surgical relevance

---

## Post-Implementation Validation Checklist

Before marking feature complete, verify:

### Functional Requirements

- [ ] **FR-001**: Modules 3-10 implemented following Module 1-2 pattern
- [ ] **FR-002**: Module 3 covers AICA branches (8-10 questions)
- [ ] **FR-003**: Module 4 covers PICA 5-segment anatomy (10-12 questions)
- [ ] **FR-004**: Module 5 covers PICA branches & Wallenberg (8-10 questions)
- [ ] **FR-005**: Module 6 provides AICA vs PICA comparison (10 questions)
- [ ] **FR-006**: Module 7 focuses on quantitative mastery (20+ questions, 85% threshold)
- [ ] **FR-007**: Module 8 integrates surgical applications & vignettes (10-12 questions)
- [ ] **FR-008**: Module 9 provides comprehensive assessment (30+ questions, 85% threshold)
- [ ] **FR-009**: Module 10 includes teach-back & reflection (90% threshold)
- [ ] **FR-010**: All assessments use create_mcq() function
- [ ] **FR-011**: All questions have detailed explanations
- [ ] **FR-012**: Pass thresholds displayed before assessments
- [ ] **FR-013**: Score submission calculates percentage & compares to threshold
- [ ] **FR-014**: Pass/fail messages display with next steps
- [ ] **FR-015-017**: Progress tracking updates correctly
- [ ] **FR-018**: Progress persists across sessions (progress_data.json)
- [ ] **FR-019**: Progress bar displays completion %, modules, current module, badges
- [ ] **FR-020-021**: Content from JSON displayed via display_slide_content()
- [ ] **FR-022**: Free recall challenges in each module
- [ ] **FR-023-027**: All 7 badges award at correct milestones
- [ ] **FR-028**: Badges persist across sessions

### Success Criteria

- [ ] **SC-001**: Full pathway completable in 12-16 hours
- [ ] **SC-002**: Mastery thresholds enforced (80-90%)
- [ ] **SC-003**: 100% progress persistence across sessions
- [ ] **SC-004**: 100% of questions provide immediate feedback
- [ ] **SC-005**: 7 badges awarded (exceeds "at least 5")
- [ ] **SC-006**: Module 9 balanced coverage (3+ questions per prior module)
- [ ] **SC-007**: Module 7 quantitative questions match JSON source
- [ ] **SC-008**: Weak areas identifiable via progress tracking

### Constitution Compliance

- [ ] **Medical Accuracy**: All quantitative data verified against JSON/Rhoton
- [ ] **Educational Effectiveness**: Mastery gates enforced, immediate feedback provided
- [ ] **Interactive Design**: ipywidgets MCQs, progress tracking, badges implemented
- [ ] **Clinical Integration**: Modules 3, 5, 8 include clinical syndromes & surgical decisions
- [ ] **Accessibility**: Runs on standard Jupyter, minimal dependencies, offline-capable
- [ ] **Documentation**: Module headers, time estimates, free recall prompts included
- [ ] **Attribution**: All content derived from cited JSON sources

---

## Troubleshooting Common Issues

### Issue: Progress Not Persisting

**Symptoms**: Closing notebook loses all progress

**Diagnosis**:
- Check if `progress_data.json` exists in repo root
- Inspect file contents for valid JSON

**Fix**:
- Ensure `save_progress()` called in all score submission functions
- Verify file write permissions
- Check for filesystem errors

### Issue: Module Unlocking Incorrectly

**Symptoms**: Module N unlocks without passing Module N-1

**Diagnosis**:
- Check `progress['modules_completed']` array
- Verify `check_module_unlock(module_num)` logic

**Fix**:
- Ensure score submission only updates modules_completed on pass
- Verify threshold comparison (≥ not >)

### Issue: Badge Not Awarded

**Symptoms**: Passed module but no badge notification

**Diagnosis**:
- Check `progress['badges_earned']` array
- Verify module number in award_badge() calls

**Fix**:
- Ensure award_badge() called in score submission function
- Check threshold logic (Module 7 requires 85%, Module 10 requires 90%)

---

## Next Steps After Validation

Once all tests pass:

1. **Document Test Results**:
   - Fill out validation checklist above
   - Record any issues encountered and resolutions

2. **Prepare for User Testing**:
   - Recruit neurosurgery resident or medical student
   - Provide notebook and ask for completion feedback

3. **Finalize Documentation**:
   - Update README.md with usage instructions
   - Document any known limitations

4. **Create Pull Request**:
   - Commit all changes to 001-interactive-modules branch
   - Open PR to main with summary of implementation
   - Link to this validation document

---

**Testing Complete**: Ready for `/speckit.tasks` to generate implementation task breakdown.
