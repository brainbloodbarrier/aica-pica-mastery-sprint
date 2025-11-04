# Research: Progress Persistence and Module Content Strategy

**Feature**: Complete 10-Module Interactive Learning System
**Date**: 2025-11-03
**Phase**: 0 - Research

## Purpose

This document resolves technical unknowns and establishes best practices for implementing Modules 3-10 in the AICA/PICA Mastery Sprint Jupyter notebook. Primary research areas:

1. Progress persistence across Jupyter notebook sessions
2. Content mapping from JSON files to module structure
3. Question generation strategy for comprehensive assessments
4. Badge award logic and milestone tracking

---

## Decision 1: Progress Persistence Mechanism

**Question**: How should learner progress (completed modules, quiz scores, earned badges) persist across notebook close/reopen cycles in Jupyter?

**Decision**: Use JSON file-based persistence with automatic save on score submission and load on notebook initialization

**Rationale**:

Jupyter notebooks reset Python kernel state when closed, so in-memory Python dictionaries (like the existing `progress` variable) do not persist. Three options were considered:

1. **IPython %store magic** - Stores variables across sessions using IPython's database
2. **JSON file persistence** - Write progress dictionary to `progress_data.json` file
3. **Jupyter notebook metadata** - Store progress in notebook's own metadata

**Why JSON file persistence was chosen**:

- **Simplicity**: Standard library `json` module, no additional dependencies
- **Portability**: progress_data.json can be backed up, transferred, or inspected independently
- **Transparency**: Users can see their progress data in human-readable format
- **Compatibility**: Works across all Jupyter environments (JupyterLab, Jupyter Notebook, VS Code, Colab with file access)
- **Reliability**: File I/O is more robust than IPython's %store which can corrupt on crashes

**Alternatives considered and rejected**:

- **%store magic**: Rejected because it's IPython-specific, opaque to users, and can corrupt database on kernel crashes
- **Notebook metadata**: Rejected because editing notebook file for progress creates git conflicts and risks notebook corruption

**Implementation approach**:

```python
import json
from pathlib import Path

PROGRESS_FILE = Path("progress_data.json")

# Load progress on initialization (Cell 3)
if PROGRESS_FILE.exists():
    with open(PROGRESS_FILE, 'r') as f:
        progress = json.load(f)
    # Convert ISO string back to datetime for start_time
    from datetime import datetime
    if 'start_time' in progress and isinstance(progress['start_time'], str):
        progress['start_time'] = progress['start_time']  # Keep as string for simplicity
else:
    # Initialize fresh progress (existing code in Cell 3)
    progress = {
        "start_time": datetime.now().isoformat(),
        "modules_completed": [],
        "quiz_scores": {},
        "current_module": 1,
        "mastery_level": 0,
        "badges_earned": [],
        "time_spent": {},
        "weak_areas": []
    }

# Save progress after each score submission (modify score submission functions)
def save_progress():
    with open(PROGRESS_FILE, 'w') as f:
        json.dump(progress, f, indent=2)
```

**Best practice**: Call `save_progress()` immediately after updating `progress['modules_completed']`, `progress['quiz_scores']`, or `progress['badges_earned']` to ensure no data loss.

---

## Decision 2: Content Mapping from JSON to Modules

**Question**: Which JSON slides should be used for Modules 3-10, and how should they be indexed?

**Decision**: Use systematic slide indexing based on content topic alignment with module learning objectives

**Rationale**:

The existing Modules 1-2 establish a pattern of loading slides by index from `aica_data['slides']` and `pica_data['slides']`. Module 3-10 must continue this pattern.

**Content Mapping**:

| Module | Topic | JSON Source | Slide Indices |
|--------|-------|-------------|---------------|
| Module 3: AICA Branches & Clinical | Labyrinthine artery, recurrent perforators, subarcuate artery, occlusion syndrome | AICA_content.json | Slides 11-14 (branches), plus clinical syndrome content |
| Module 4: PICA Segments Deep Dive | Five PICA segments: anterior medullary, lateral medullary, tonsillomedullary, telovelotonsillar, cortical | PICA_content.json | Slides 1-8 (segment anatomy) |
| Module 5: PICA Branches & Variations | Perforators, choroidal branches, variations, Wallenberg syndrome | PICA_content.json | Slides 9-15 (branches, variations, clinical) |
| Module 6: AICA vs PICA Comparison | Side-by-side comparison of origin, segments, territories, syndromes | Both JSON files | Synthesized comparison (not direct slide mapping) |
| Module 7: Quantitative Mastery | All measurements, percentages, anatomical variations | Both JSON files | Extract quantitative facts from all slides |
| Module 8: Surgical Applications | Approach selection, clinical vignettes | Both JSON files | Surgical relevance fields from all slides |
| Module 9: Comprehensive Assessment | Mixed questions from all prior modules | Both JSON files | N/A (assessment only, no content display) |
| Module 10: Mastery Certification | Teach-back exercises, final reflection | N/A | N/A (meta-learning, no anatomical content) |

**Best practice**: Use `display_slide_content(aica_data['slides'][index])` for content display, maintaining consistency with Modules 1-2.

---

## Decision 3: Question Generation Strategy

**Question**: How should 130+ assessment questions be created across Modules 3-10 while maintaining medical accuracy and educational rigor?

**Decision**: Hardcode questions in notebook cells following Module 1-2 pattern, using quantitative data and clinical facts directly from JSON content

**Rationale**:

Module 1 (5 questions) and Module 2 (10 questions) establish a pattern of hardcoded MCQs using the `create_mcq()` function. Modules 3-10 require ~115 additional questions.

**Question categories**:

1. **Quantitative/Factual** (40% of questions): Test recall of percentages, measurements, anatomical variations directly from JSON
   - Example: "What percentage of CPAs have a meatal loop reaching the porus?" → "50%" (from AICA slide 8)

2. **Anatomical Relationships** (30% of questions): Test understanding of segment boundaries, nerve relationships, vascular territories
   - Example: "Which cranial nerves are intimately related to AICA's lateral pontine segment?" → "CN VII and VIII"

3. **Clinical Application** (20% of questions): Test syndrome recognition and clinical reasoning
   - Example: "A patient presents with vertigo, facial palsy, and hearing loss. Which vessel is likely occluded?" → "AICA"

4. **Surgical Relevance** (10% of questions): Test approach selection and intraoperative decision-making
   - Example: "For a lesion in the cerebellopontine angle, which AICA segment must be identified first?" → "Premeatal segment"

**Question distribution target**:

- Module 3: 10 questions (AICA branches - 40% quantitative, 30% anatomical, 30% clinical)
- Module 4: 12 questions (PICA segments - 50% quantitative, 30% anatomical, 20% clinical)
- Module 5: 10 questions (PICA branches - 40% quantitative, 30% anatomical, 30% clinical)
- Module 6: 10 questions (AICA vs PICA comparison - 50% comparative, 30% differential diagnosis, 20% clinical)
- Module 7: 20 questions (Quantitative mastery - 100% quantitative data recall)
- Module 8: 12 questions (Surgical applications - 100% clinical vignettes and approach selection)
- Module 9: 33 questions (Comprehensive - at least 3 questions from each prior module's key concepts)
- Module 10: 8 questions (Teach-back - open-ended reflection prompts, not MCQs)

**Best practice**: Include detailed explanations for both correct and incorrect answers, referencing JSON slide content where applicable.

**Alternatives considered and rejected**:

- **Dynamic question generation from JSON**: Rejected because it requires complex NLP to generate distractors and explanations, and risks creating ambiguous or inaccurate questions
- **Question bank JSON file**: Rejected because it adds file management complexity and doesn't improve upon hardcoded cells for this use case

---

## Decision 4: Badge Award Logic

**Question**: When and how should badges be awarded to maximize motivation without trivializing achievements?

**Decision**: Award badges at major milestone completions (end of AICA content, end of PICA content, quantitative mastery, surgical mastery, final certification)

**Rationale**:

Gamification research shows that badges motivate continued engagement when awarded for meaningful achievements, not trivial tasks. Too many badges dilute value; too few fail to provide intermediate rewards.

**Badge Award Criteria**:

| Badge Name | Award Trigger | Rationale |
|------------|---------------|-----------|
| AICA Segments Master | Pass Module 2 (80%+) | Already implemented; recognizes completion of foundational AICA segmental anatomy |
| AICA Branches Master | Pass Module 3 (80%+) | Completes comprehensive AICA knowledge (segments + branches + clinical) |
| PICA Segments Master | Pass Module 4 (80%+) | Recognizes mastery of complex 5-segment PICA anatomy |
| PICA Master | Pass Module 5 (80%+) | Completes comprehensive PICA knowledge (segments + branches + variations + clinical) |
| Quantitative Master | Pass Module 7 (85%+) | Higher threshold reflects difficulty of recalling precise numerical data |
| Surgical Applications Master | Pass Module 8 (80%+) | Recognizes ability to apply anatomical knowledge to surgical decision-making |
| Comprehensive AICA/PICA Mastery | Pass Module 10 (90%+) | Final certification requires highest threshold (90%) as ultimate achievement |

**Total badges**: 7 (including existing AICA Segments Master)

This exceeds the SC-005 requirement of "at least 5 badges" while maintaining meaningful progression:
- Early wins (Modules 2-3): Build confidence
- Mid-journey (Modules 4-5): Validate comprehensive knowledge
- Specialization (Modules 7-8): Recognize advanced skills
- Final certification (Module 10): Ultimate achievement

**Implementation**:

```python
# In score submission functions
if score_percentage >= threshold:
    progress['modules_completed'].append(module_num)
    progress['current_module'] = module_num + 1

    # Badge award logic
    if module_num == 3:
        award_badge("AICA Branches Master")
    elif module_num == 4:
        award_badge("PICA Segments Master")
    elif module_num == 5:
        award_badge("PICA Master")
    elif module_num == 7 and score_percentage >= 85:
        award_badge("Quantitative Master")
    elif module_num == 8:
        award_badge("Surgical Applications Master")
    elif module_num == 10 and score_percentage >= 90:
        award_badge("Comprehensive AICA/PICA Mastery")

    save_progress()  # Persist badge awards
```

---

## Decision 5: Module 9 Comprehensive Assessment Design

**Question**: How should 33 questions in Module 9 be distributed to ensure balanced coverage of all prior modules?

**Decision**: Stratified sampling with minimum 3 questions per prior module, weighted by module complexity and educational importance

**Rationale**:

SC-006 requires "at least 3 questions per prior module" in the comprehensive assessment. With 8 prior modules (1-8) and 33 total questions, the distribution must balance coverage with emphasis on critical content.

**Question Distribution Strategy**:

| Prior Module | Questions | Rationale |
|--------------|-----------|-----------|
| Module 1: Posterior Circulation Overview | 3 | Foundational but broad; minimum coverage |
| Module 2: AICA Segments Deep Dive | 5 | Complex 4-segment anatomy; critical for CPA surgery |
| Module 3: AICA Branches & Clinical | 4 | Critical branches (labyrinthine) and syndrome |
| Module 4: PICA Segments Deep Dive | 5 | Most complex (5 segments); critical for posterior fossa surgery |
| Module 5: PICA Branches & Variations | 4 | High clinical importance (Wallenberg syndrome) |
| Module 6: AICA vs PICA Comparison | 4 | Integration and differential diagnosis skills |
| Module 7: Quantitative Mastery | 4 | High board exam relevance; recall precision |
| Module 8: Surgical Applications | 4 | Clinical reasoning and decision-making |

**Total**: 33 questions (3-5 per module, mean 4.125)

**Question selection priorities**:

1. **High-yield board exam content**: Quantitative data (percentages, measurements)
2. **Critical clinical distinctions**: AICA vs PICA syndromes, approach selection
3. **Surgical pearls**: Meatal loop identification, perforator preservation
4. **Common errors**: Segment boundary confusion, origin variations

**Best practice**: Randomize question order within Module 9 to prevent pattern recognition based on module sequence.

---

## Summary of Research Outcomes

All technical unknowns resolved. Implementation can proceed with:

1. **Progress Persistence**: JSON file (`progress_data.json`) with save on score submission, load on initialization
2. **Content Mapping**: Systematic JSON slide indexing documented in table above
3. **Question Generation**: Hardcoded MCQs in notebook cells, ~130 total questions across Modules 3-10
4. **Badge Awards**: 7 total badges at major milestones (exceeds SC-005 requirement)
5. **Comprehensive Assessment**: 33 questions with 3-5 per prior module (satisfies SC-006)

**No blockers identified**. Ready for Phase 1 (design).
