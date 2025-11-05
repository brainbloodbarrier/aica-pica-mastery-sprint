# aica-pica Development Guidelines

Auto-generated from all feature plans. Last updated: 2025-11-03

## Active Technologies

- Python 3.12.x (compatible with Python 3.8+) + Jupyter Notebook, IPython 9.6.0, ipywidgets 8.x, ipykernel 7.0.1 (001-interactive-modules)

## Project Structure

```text
aica-pica/
├── AICA_PICA_Mastery_Sprint.ipynb      # Main deliverable
├── AICA_PICA_Mastery_Sprint_BACKUP.ipynb
├── data/                                # Source content (JSON)
│   ├── AICA_content.json
│   ├── PICA_content.json
│   └── image_resources.json
├── specs/                               # Feature specifications
│   ├── 001-interactive-modules/
│   └── 002-content-specialist/
├── docs/                                # Documentation suite
├── *.py                                 # Helper scripts
└── README.md
```

## Commands

```bash
# Launch main notebook
jupyter notebook AICA_PICA_Mastery_Sprint.ipynb

# Code quality check
ruff check .

# Validate JSON data
python3 -m json.tool data/AICA_content.json > /dev/null
python3 -m json.tool data/PICA_content.json > /dev/null
```

## Code Style

Python 3.12.x (compatible with Python 3.8+): Follow standard conventions

## Recent Changes

- 001-interactive-modules: Added Python 3.12.x (compatible with Python 3.8+) + Jupyter Notebook, IPython 9.6.0, ipywidgets 8.x, ipykernel 7.0.1

<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->
