# Codebase Structure

## Root Directory Files

### Main Deliverable
- **AICA_PICA_Mastery_Sprint.ipynb** - Primary interactive learning notebook (176 cells)
- **AICA_PICA_Mastery_Sprint_BACKUP.ipynb** - Backup copy

### Configuration
- **CLAUDE.md** - AI development guidelines and project conventions
- **README.md** - Project overview and user documentation
- **.gitignore** - Git exclusions

### Implementation Reports
- **IMPLEMENTATION_REPORT.md** - Latest implementation status
- **FINAL_IMPLEMENTATION_REPORT.md** - Comprehensive report
- **COMPLETION_SUMMARY.md** - Module completion tracking
- **NOTEBOOK_COMPLETION_REPORT.md** - Notebook-specific report

### Scripts
- **fix_notebook.py** - Automation script for notebook reorganization
- **append_modules.py** - Script to add modules
- **add_remaining_modules.py** - Module addition utility
- **module_9_10_additions.py** - Module 9/10 question content
- **new_m7_questions.py** - Module 7 questions

### Content Files
- **module_6_questions.txt** - Pre-drafted Module 6 questions
- **complete_modules_6_10.md** - Module completion notes
- **progress.txt** - Progress tracking

## Directories

### `/data/`
**Purpose**: Source content files in JSON format

- **AICA_content.json** - 17 slides of AICA anatomy
- **PICA_content.json** - 20 slides of PICA anatomy
- **image_resources.json** - Imaging resource catalog

### `/specs/`
**Purpose**: Feature specifications and planning documents

#### `/specs/001-interactive-modules/`
- **spec.md** - Feature specification
- **plan.md** - Implementation plan
- **tasks.md** - Task breakdown
- **data-model.md** - Data structures
- **research.md** - Research notes
- **quickstart.md** - Quick start guide
- **/contracts/** - API contracts
- **/checklists/** - QA checklists

#### `/specs/002-content-specialist/`
- **spec.md** - Content specialist feature spec
- **plan.md** - Content generation plan
- **tasks.md** - 176 task breakdown
- **data-model.md** - Question type templates
- **research.md** - Board exam methodology
- **quickstart.md** - Quick start
- **/checklists/** - Content QA

### `/docs/`
**Purpose**: Supplementary educational materials

- **presentation_prep_guide.md** - Slide-by-slide presentation prep
- **AICA_PICA_Reference_Handout.md** - Quick reference for clinicians
- **AICA_PICA_Board_Prep.ipynb** - 50+ board-style questions
- **AICA_PICA_Imaging_Resources.md** - Curated imaging guide

### `/images/`
**Purpose**: Image assets for documentation and presentation

### `/.claude/`
**Purpose**: Claude Code CLI configuration

### `/.specify/`
**Purpose**: Specification tooling configuration

### `/.serena/`
**Purpose**: Serena MCP server configuration and memories

### `/.git/`
**Purpose**: Git version control

## Key File Relationships

```
AICA_PICA_Mastery_Sprint.ipynb
├── Reads: data/AICA_content.json
├── Reads: data/PICA_content.json
└── Implements: specs/001-interactive-modules/spec.md
                specs/002-content-specialist/spec.md

specs/002-content-specialist/
├── data-model.md → Templates for questions
├── research.md → Question writing methodology
└── tasks.md → Implementation task list

module_9_10_additions.py
└── Source for: Modules 9-10 questions
```

## Notebook Internal Structure

1. **Setup & Imports** (Cells 1-10)
2. **Module 1**: Posterior Circulation Overview
3. **Module 2**: AICA Segments Deep Dive  
4. **Module 3**: AICA Branches (10 questions)
5. **Module 4**: PICA Segments (12 questions target)
6. **Module 5**: PICA Branches (10 questions target)
7. **Module 6**: AICA vs PICA Comparison (10 questions)
8. **Module 7**: Quantitative Mastery (20 questions target)
9. **Module 8**: Surgical Applications (12 questions target)
10. **Module 9**: Comprehensive Assessment (33 questions target)
11. **Module 10**: Mastery Certification (8 questions target)
12. **Final Analytics & Badges** (Cells 170-176)