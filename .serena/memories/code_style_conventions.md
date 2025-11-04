# Code Style and Conventions

## Python Style
- **Standard**: Follow Python standard conventions (PEP 8)
- **Compatibility**: Python 3.8+ (tested with Python 3.12.x)
- **Linting**: Use `ruff check .` for code quality

## Jupyter Notebook Conventions

### Cell Structure
1. **Markdown cells** - Module headers, instructions, learning objectives
2. **Code cells** - Python code for questions, widgets, logic
3. **Output cells** - Generated automatically

### Question Format
All questions use consistent `create_mcq()` function:
```python
display(create_mcq(
    "Q#: [Question text]?",
    ["Option A", "Option B", "Option C", "Option D"],
    "Correct answer (must match option exactly)",
    "Detailed explanation with anatomical reasoning. Source: [JSON_file] Slide [#]"
))
```

### Widget Pattern
Interactive elements follow ipywidgets conventions:
```python
widget = widgets.IntSlider(value=0, min=0, max=10, ...)
button = Button(description='Submit', button_style='success')
output = Output()

def handler(btn):
    with output:
        clear_output()
        # logic

button.on_click(handler)
display(VBox([widget, button, output]))
```

## Content Conventions

### Source Citations
**REQUIRED**: Every question explanation must cite source
- Format: `Source: AICA_content.json Slide 2`
- Or: `Source: PICA_content.json Slides 5-6`

### Medical Terminology
- Use proper anatomical nomenclature
- Spell out abbreviations on first use
- CN = Cranial Nerve
- IAC = Internal Auditory Canal
- CPA = Cerebellopontine Angle

### Question Types
1. **Anatomical Recall** - Knowledge level, direct facts
2. **Application** - Apply concepts to scenarios
3. **Clinical Vignettes** - Case-based, synthesis level
4. **Teach-Back** - Explain concepts to others

## Data Integrity
- **100% accuracy required** for quantitative data (Module 7)
- All facts must be traceable to JSON source files
- Cross-reference percentages and measurements
- Do not create new medical facts

## Git Conventions
- **Branch naming**: `###-feature-name` (e.g., `002-content-specialist`)
- **Commit messages**: Descriptive, include module/feature context
- **No commits of**: Large binary files, personal data, API keys