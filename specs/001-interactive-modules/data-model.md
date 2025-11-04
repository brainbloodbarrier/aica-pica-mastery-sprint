# Data Model: Interactive Learning System Entities

**Feature**: Complete 10-Module Interactive Learning System
**Date**: 2025-11-03
**Phase**: 1 - Design

## Purpose

This document defines the data entities and their relationships for the AICA/PICA Mastery Sprint learning system. These entities represent the core domain model for progress tracking, module management, and assessment delivery.

---

## Entity 1: Module

**Description**: Represents a discrete learning unit with defined objectives, content, assessments, and completion criteria.

### Attributes

| Attribute | Type | Required | Description | Validation Rules |
|-----------|------|----------|-------------|------------------|
| module_number | integer | Yes | Unique identifier (1-10) | 1 ≤ module_number ≤ 10 |
| name | string | Yes | Module display name | Non-empty string, max 100 chars |
| duration | string | Yes | Estimated completion time | Format: "XX-YY min" or "XX-YY hours" |
| pass_threshold | integer | Yes | Minimum score percentage to unlock next module | 80, 85, or 90 (based on module) |
| content_slides | array | No | List of JSON slide indices to display | Empty for Modules 9-10 (assessment only) |
| assessment_count | integer | Yes | Number of MCQ questions in module | Module-specific (5-33 questions) |

### State Transitions

Modules exist in three states from a learner's perspective:

1. **Locked**: Module cannot be accessed (prior module not passed)
2. **Unlocked**: Module can be accessed but not completed
3. **Completed**: Module passed with score ≥ pass_threshold

**Transition Rules**:

- Module 1 is always Unlocked initially (no prerequisites)
- Module N (N > 1) transitions from Locked → Unlocked when Module N-1 is Completed
- Module N transitions from Unlocked → Completed when learner achieves score ≥ pass_threshold
- Module N remains Completed permanently (can be retaken but completion status persists)

### Module Configuration (Static Data)

Defined in notebook Cell 3 as `MODULES` dictionary:

```python
MODULES = {
    1: {"name": "Posterior Circulation Overview", "duration": "30-45 min", "pass_threshold": 80},
    2: {"name": "AICA Segments Deep Dive", "duration": "90-120 min", "pass_threshold": 80},
    3: {"name": "AICA Branches & Clinical", "duration": "60-90 min", "pass_threshold": 80},
    4: {"name": "PICA Segments Deep Dive", "duration": "90-120 min", "pass_threshold": 80},
    5: {"name": "PICA Branches & Variations", "duration": "60-90 min", "pass_threshold": 80},
    6: {"name": "AICA vs PICA Comparison", "duration": "45-60 min", "pass_threshold": 80},
    7: {"name": "Quantitative Mastery", "duration": "45-60 min", "pass_threshold": 85},
    8: {"name": "Surgical Applications", "duration": "60-90 min", "pass_threshold": 80},
    9: {"name": "Comprehensive Assessment", "duration": "60 min", "pass_threshold": 85},
    10: {"name": "Mastery Certification", "duration": "30 min", "pass_threshold": 90}
}
```

---

## Entity 2: Progress

**Description**: Tracks a learner's state across modules, including completions, scores, badges, and session metadata. Persists to `progress_data.json` file.

### Attributes

| Attribute | Type | Required | Description | Validation Rules |
|-----------|------|----------|-------------|------------------|
| start_time | string (ISO 8601) | Yes | When learner first initialized notebook | Valid ISO datetime string |
| modules_completed | array of integers | Yes | List of module numbers passed | Each integer 1-10, no duplicates, sorted ascending |
| quiz_scores | object (dict) | Yes | Module scores as {module_name: percentage} | Keys: "module_1" through "module_10", values: 0-100 |
| current_module | integer | Yes | Next module to attempt | 1 ≤ current_module ≤ 10 |
| mastery_level | float | Yes | Overall mastery percentage (average of quiz_scores) | 0.0-100.0, calculated not set directly |
| badges_earned | array of strings | Yes | List of badge names awarded | Unique badge names, no duplicates |
| time_spent | object (dict) | Yes | Time spent per module (future use) | Keys: module numbers, values: duration in minutes |
| weak_areas | array of strings | Yes | Topics scoring below 85% (future use) | Topic names from modules |

### Validation Rules

**Business Logic**:

1. **Module Unlock Logic**:
   - `current_module` must be ≤ `max(modules_completed) + 1`
   - Module N can only be added to `modules_completed` if Module N-1 is already present (except Module 1)

2. **Score Integrity**:
   - `quiz_scores` keys must match completed modules
   - Scores must reflect actual pass_threshold (e.g., if module_2 in modules_completed, then quiz_scores['module_2'] ≥ 80)

3. **Badge Integrity**:
   - Badge awards must match module completions:
     - "AICA Segments Master" ⇒ 2 in modules_completed
     - "AICA Branches Master" ⇒ 3 in modules_completed
     - "PICA Segments Master" ⇒ 4 in modules_completed
     - "PICA Master" ⇒ 5 in modules_completed
     - "Quantitative Master" ⇒ 7 in modules_completed AND quiz_scores['module_7'] ≥ 85
     - "Surgical Applications Master" ⇒ 8 in modules_completed
     - "Comprehensive AICA/PICA Mastery" ⇒ 10 in modules_completed AND quiz_scores['module_10'] ≥ 90

### Initial State

When learner first opens notebook (`progress_data.json` does not exist):

```json
{
  "start_time": "2025-11-03T10:30:00",
  "modules_completed": [],
  "quiz_scores": {},
  "current_module": 1,
  "mastery_level": 0,
  "badges_earned": [],
  "time_spent": {},
  "weak_areas": []
}
```

### Example: Mid-Journey State

After completing Modules 1-5:

```json
{
  "start_time": "2025-11-03T10:30:00",
  "modules_completed": [1, 2, 3, 4, 5],
  "quiz_scores": {
    "module_1": 100,
    "module_2": 90,
    "module_3": 85,
    "module_4": 88,
    "module_5": 92
  },
  "current_module": 6,
  "mastery_level": 91.0,
  "badges_earned": [
    "AICA Segments Master",
    "AICA Branches Master",
    "PICA Segments Master",
    "PICA Master"
  ],
  "time_spent": {},
  "weak_areas": []
}
```

### Persistence Operations

**Save**: Triggered after each score submission

```python
def save_progress():
    import json
    from pathlib import Path
    with open(Path("progress_data.json"), 'w') as f:
        json.dump(progress, f, indent=2)
```

**Load**: Triggered in Cell 3 (initialization)

```python
def load_progress():
    import json
    from pathlib import Path
    PROGRESS_FILE = Path("progress_data.json")
    if PROGRESS_FILE.exists():
        with open(PROGRESS_FILE, 'r') as f:
            return json.load(f)
    return None  # Fresh start
```

---

## Entity 3: Assessment Question

**Description**: Represents a single multiple-choice question with options, correct answer, and explanation.

### Attributes

| Attribute | Type | Required | Description | Validation Rules |
|-----------|------|----------|-------------|------------------|
| question_text | string | Yes | The question prompt | Non-empty, ends with "?" |
| options | array of strings | Yes | Answer choices | 2-5 options, no duplicates |
| correct_answer | string | Yes | The correct option | Must be one of options |
| explanation | string | Yes | Detailed rationale for correct/incorrect answers | Non-empty, references source material where applicable |
| question_type | string | Yes | Category of question | "quantitative", "anatomical", "clinical", "surgical" |

### Example: Quantitative Question

```python
{
    "question_text": "In what percentage of CPAs does the AICA meatal loop reach the porus or enter the internal auditory canal?",
    "options": ["30%", "50%", "70%", "90%"],
    "correct_answer": "50%",
    "explanation": "The meatal loop reaches the porus or enters the IAC in approximately 50% of cases (Rhoton, AICA slide 8). This is critical for CPA surgery as the loop is at risk during IAC drilling.",
    "question_type": "quantitative"
}
```

### Implementation via create_mcq()

Questions are hardcoded in notebook cells using the existing `create_mcq()` helper:

```python
display(create_mcq(
    "Q1: In what percentage of CPAs does the AICA meatal loop reach the porus or enter the IAC?",
    ["30%", "50%", "70%", "90%"],
    "50%",
    "The meatal loop reaches the porus or enters the IAC in approximately 50% of cases"
))
```

No separate data structure needed - questions are embedded in notebook cells following Module 1-2 pattern.

---

## Entity 4: Badge

**Description**: Represents a mastery milestone achievement awarded when specific criteria are met.

### Attributes

| Attribute | Type | Required | Description | Validation Rules |
|-----------|------|----------|-------------|------------------|
| badge_name | string | Yes | Display name | Unique identifier |
| award_criteria | string | Yes | Condition for awarding | References module completion and/or score threshold |
| display_message | string | Yes | Notification shown when awarded | Includes emoji and celebratory text |

### Badge Definitions

| Badge Name | Award Criteria | Display Message |
|------------|----------------|-----------------|
| AICA Segments Master | Module 2 completed with ≥80% | "🎖️ BADGE EARNED: AICA Segments Master! 🎖️" |
| AICA Branches Master | Module 3 completed with ≥80% | "🎖️ BADGE EARNED: AICA Branches Master! 🎖️" |
| PICA Segments Master | Module 4 completed with ≥80% | "🎖️ BADGE EARNED: PICA Segments Master! 🎖️" |
| PICA Master | Module 5 completed with ≥80% | "🎖️ BADGE EARNED: PICA Master! 🎖️" |
| Quantitative Master | Module 7 completed with ≥85% | "🎖️ BADGE EARNED: Quantitative Master! 🎖️" |
| Surgical Applications Master | Module 8 completed with ≥80% | "🎖️ BADGE EARNED: Surgical Applications Master! 🎖️" |
| Comprehensive AICA/PICA Mastery | Module 10 completed with ≥90% | "🏆 CERTIFICATION EARNED: Comprehensive AICA/PICA Mastery! 🏆" |

### Implementation

Badges are awarded via `award_badge()` helper function (existing) and stored in `progress['badges_earned']` array.

---

## Entity 5: Content Slide

**Description**: Anatomical content from JSON files (AICA_content.json, PICA_content.json) displayed in module reading sections.

### Attributes

| Attribute | Type | Required | Description | Source |
|-----------|------|----------|-------------|--------|
| slide_number | integer | Yes | Slide index in JSON array | JSON field |
| title | string | Yes | Slide heading | JSON field |
| key_sentence | string | Yes | One-sentence summary | JSON field |
| detailed_notes | string | Yes | Comprehensive anatomical description | JSON field |
| anatomical_concepts | array of strings | Yes | Key concepts to master | JSON field |
| surgical_relevance | string | Yes | Clinical/surgical importance | JSON field |
| suggested_images | array of strings | No | Recommended illustrations | JSON field |
| rhoton_image_refs | array of strings | No | Rhoton figure references | JSON field |

### Example (from AICA_content.json)

```json
{
  "slide_number": 1,
  "title": "AICA: Anatomical Overview",
  "key_sentence": "AICA is the central cerebellar artery of the pontine angle",
  "detailed_notes": "The anteroinferior cerebellar artery (AICA) courses through the central part of the cerebellopontine angle...",
  "anatomical_concepts": [
    "Cerebellopontine angle relationship",
    "Facial and vestibulocochlear nerve proximity",
    "Petrosal surface supply"
  ],
  "surgical_relevance": "Critical landmark in cerebellopontine angle surgery...",
  "suggested_images": ["Lateral view of brainstem showing AICA course through CPA"],
  "rhoton_image_refs": ["Fig. 2.5", "Fig. 2.11"]
}
```

### Display

Content slides are rendered via `display_slide_content()` function, converting JSON to formatted markdown with headings, bullet lists, and horizontal rules.

---

## Entity Relationships

```text
Progress (1) ----< (0..10) Module Completions
  |
  +---< (0..7) Badge Awards
  |
  +---< (0..10) Quiz Scores

Module (1) ----< (3..33) Assessment Questions
  |
  +---< (0..N) Content Slides

Badge (1) ---- (1) Award Criteria → (references) Module Completion + Score Threshold
```

**Key Relationships**:

1. **Progress → Module Completions**: One-to-many (learner can complete 0-10 modules)
2. **Progress → Badges**: One-to-many (learner can earn 0-7 badges)
3. **Progress → Scores**: One-to-many (learner has 0-10 quiz scores)
4. **Module → Questions**: One-to-many (each module has 5-33 questions)
5. **Module → Slides**: One-to-many (each module displays 0-N content slides from JSON)
6. **Badge → Module**: Each badge references specific module completion(s)

---

## Validation Summary

All entities support the functional requirements:

- **FR-015 to FR-019**: Progress entity tracks all required state
- **FR-020 to FR-022**: Content Slide entity maps JSON data to modules
- **FR-023 to FR-028**: Badge entity defines all 7 milestone achievements
- **SC-003**: Progress persistence via JSON file ensures 100% data retention
- **SC-005**: 7 badges defined (exceeds "at least 5" requirement)
- **SC-007**: Content Slide provenance ensures quantitative accuracy (Rhoton references)

Ready for implementation.
