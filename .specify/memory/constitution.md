<!--
Sync Impact Report:
Version: 0.0.0 → 1.0.0
Rationale: Initial constitution establishment for AICA/PICA Mastery Study System

Modified Principles:
- All principles newly defined (initial creation)

Added Sections:
- I. Medical Accuracy & Evidence-Based Content
- II. Educational Effectiveness
- III. Interactive Learning Design
- IV. Clinical Integration
- V. Accessibility & Usability
- VI. Documentation Standards
- VII. Version Control & Attribution

Removed Sections:
- None (initial creation)

Templates Requiring Updates:
- ✅ .specify/templates/plan-template.md (reviewed - constitution check placeholder ready)
- ✅ .specify/templates/spec-template.md (reviewed - aligns with user-centric approach)
- ✅ .specify/templates/tasks-template.md (reviewed - supports iterative development)

Follow-up TODOs:
- None at this time
-->

# AICA/PICA Mastery Study System Constitution

## Core Principles

### I. Medical Accuracy & Evidence-Based Content

**MUST** maintain anatomical precision and clinical accuracy in all educational materials.

- All anatomical content MUST be verified against peer-reviewed neurosurgical literature, primarily Rhoton's microsurgical anatomy texts
- Quantitative data (percentages, measurements, anatomical variations) MUST cite primary sources
- Clinical syndromes and surgical approaches MUST reflect current neurosurgical practice standards
- Any contradictions or variations in literature MUST be explicitly noted with source references
- Updates to medical knowledge MUST trigger content review and version updates

**Rationale**: Medical education content directly impacts patient safety when learners become practicing clinicians. Inaccurate anatomical teaching can lead to surgical complications and patient harm.

### II. Educational Effectiveness

**MUST** implement proven educational methodologies for adult medical learning.

- Mastery-based progression required: learners must demonstrate understanding (80-85% threshold) before advancing
- Multi-modal engagement mandatory: reading, visualization, active recall, and clinical application in each module
- Spaced repetition and iterative reinforcement must be built into assessment design
- Immediate feedback required for all assessments with detailed explanations
- Learning objectives must be explicit, measurable, and aligned with neurosurgical competency milestones

**Rationale**: Passive reading produces poor retention in medical education. Active learning with mastery gates ensures surgical trainees develop reliable anatomical knowledge under pressure.

### III. Interactive Learning Design

**MUST** prioritize interactive engagement over passive content consumption.

- Jupyter notebooks are the primary learning interface for progressive modules
- Each module must include multiple assessment types (MCQs, free recall, image identification, clinical vignettes)
- Automatic grading and progress tracking must be implemented for all interactive elements
- Visual elements (diagrams, 3D models, angiographic images) must support spatial learning
- User interface must minimize cognitive load: clear navigation, consistent formatting, progressive disclosure

**Rationale**: Neurosurgical anatomy is spatially complex and cannot be mastered through text alone. Interactive tools enable learners to build mental models iteratively.

### IV. Clinical Integration

**MUST** tie every anatomical concept to surgical relevance and clinical decision-making.

- Each anatomical structure must be linked to clinical syndromes, surgical approaches, or diagnostic considerations
- Surgical pearls must be provided for relevant anatomical regions
- Case-based learning (vignettes) must integrate anatomy with clinical reasoning
- Imaging correlation (MRI, CTA, angiography) must be provided for all major structures
- Board-style questions must test clinical application, not rote memorization

**Rationale**: Trainees learn anatomy to perform surgery safely. Content without clinical context produces students who pass exams but struggle in the operating room.

### V. Accessibility & Usability

**MUST** ensure educational content is accessible to diverse learners and technical environments.

- Jupyter notebooks must run on standard Python installations without complex dependencies
- Documentation must be readable in plain text (Markdown) without specialized tools
- File organization must be intuitive: clear naming, logical directory structure, README navigation
- Installation and setup must be straightforward with explicit prerequisite documentation
- Content must be usable offline (no mandatory cloud dependencies for core learning)

**Rationale**: Medical trainees access educational materials in varied settings (hospitals, libraries, home). Technical barriers reduce learning time and exclude users with limited resources.

### VI. Documentation Standards

**MUST** maintain comprehensive, accurate, and up-to-date documentation for all project components.

- README must provide clear overview, quick start guide, and learning pathway recommendations
- Each Jupyter notebook must include module objectives, time estimates, and mastery criteria
- Presentation guides must include slide-by-slide memory anchors and anticipated Q&A
- Code comments must explain educational design choices (why this assessment type, why this threshold)
- Changelog must track content updates, corrections, and version history

**Rationale**: Self-directed medical learners need clear guidance to navigate complex material efficiently. Poor documentation wastes learner time and reduces educational effectiveness.

### VII. Version Control & Attribution

**MUST** track content evolution and properly attribute all sources.

- All anatomical content must cite primary sources (Rhoton, neuroangio.org, Radiopaedia, etc.)
- Version control (git) must track all content changes with meaningful commit messages
- Major content updates (new modules, revised assessments) must increment version numbers
- Contributors must be acknowledged appropriately
- License must clearly state educational use permissions and restrictions

**Rationale**: Medical education builds on cumulative knowledge. Proper attribution respects original authors, enables verification, and maintains academic integrity standards.

## Educational Quality Gates

**MUST** enforce quality standards before content release or updates:

1. **Medical Accuracy Review**: All anatomical content verified against primary literature
2. **Educational Design Review**: Learning objectives, assessments, and progression validated
3. **Usability Testing**: Installation, navigation, and completion tested by target audience representative
4. **Clinical Relevance Check**: Surgical applicability and board exam alignment confirmed
5. **Accessibility Validation**: Content usable across platforms and technical skill levels

Any content update that modifies anatomical facts, clinical correlations, or assessment questions must pass all five gates.

## Testing & Validation Requirements

**MUST** validate educational content through systematic testing:

- **Contract Tests**: Jupyter notebook cells execute without errors, assessments grade correctly
- **Integration Tests**: Multi-module progression works, badges and analytics calculate properly
- **Content Tests**: Facts match primary sources, questions have unambiguous correct answers
- **User Journey Tests**: Representative learners can complete full pathway (foundation → presentation → boards)

Test failures block content release. "Working on my machine" is not acceptable for educational tools used by busy medical trainees.

## Governance

This constitution defines non-negotiable standards for the AICA/PICA Mastery Study System. All feature additions, content updates, and structural changes must comply with these principles.

**Amendment Process**:

- Proposed amendments must include rationale and impact analysis
- Amendments require documentation of which dependent files need updates
- Version number must increment per semantic versioning (MAJOR.MINOR.PATCH)
- Amendment history must be tracked in Sync Impact Report (HTML comment at file top)

**Compliance Review**:

- All pull requests must verify compliance with constitution principles
- Constitution violations must be explicitly justified in "Complexity Tracking" section of plan.md
- Unjustified violations block merge
- Recurring violation patterns trigger constitution review (may need amendment or stricter enforcement)

**Runtime Development Guidance**:

For agent-specific development workflows and command execution details, see `.specify/templates/commands/*.md` files. This constitution governs *what* standards must be met; command files guide *how* to execute workflows.

**Version**: 1.0.0 | **Ratified**: 2025-11-03 | **Last Amended**: 2025-11-03
