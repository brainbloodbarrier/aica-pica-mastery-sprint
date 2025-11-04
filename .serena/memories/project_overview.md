# AICA/PICA Project Overview

## Purpose
Medical educational system for mastering the microsurgical anatomy of the Anteroinferior Cerebellar Artery (AICA) and Posteroinferior Cerebellar Artery (PICA). Target audience: neurosurgery residents, fellows, and attending surgeons.

## Project Type
**Content development project** - not traditional software engineering. Focus is on creating interactive educational materials using Jupyter notebooks.

## Key Deliverables
1. **Interactive Jupyter Notebook** (`AICA_PICA_Mastery_Sprint.ipynb`) - 10 progressive modules with mastery-based learning
2. **Question Bank** - 115+ board-style MCQs across modules 3-10
3. **Documentation Suite** - Presentation prep, handouts, imaging guides

## Tech Stack
- **Python**: 3.8+ (developed with 3.14 compatibility)
- **Jupyter Notebook**: Interactive learning environment
- **IPython**: 9.6.0
- **ipywidgets**: 8.x for interactive UI elements
- **ipykernel**: 7.0.1

## Content Sources
- `data/AICA_content.json` - 17 slides of AICA anatomy
- `data/PICA_content.json` - 20 slides of PICA anatomy
- Based on Rhoton's posterior fossa microsurgical anatomy

## Current Status
- Feature 001 (Interactive Modules): ✅ Complete
- Feature 002 (Content Specialist): 🔄 In Progress (73/115 questions complete)