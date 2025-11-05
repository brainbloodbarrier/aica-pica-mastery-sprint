# AICA/PICA Project Overview

## Purpose
Medical educational system for mastering the microsurgical anatomy of the Anteroinferior Cerebellar Artery (AICA) and Posteroinferior Cerebellar Artery (PICA). Target audience: neurosurgery residents, fellows, and attending surgeons.

## Project Type
**Content development project** - not traditional software engineering. Focus is on creating interactive educational materials using Jupyter notebooks.

## Key Deliverables
1. **Interactive Jupyter Notebook** (`AICA_PICA_Mastery_Sprint.ipynb`) - 10 progressive modules with mastery-based learning
2. **Question Bank** - **115/115 board-style MCQs across modules 3-10 (100% COMPLETE)**
3. **Documentation Suite** - Presentation prep, handouts, imaging guides

## Tech Stack
- **Python**: 3.8+ (developed with 3.12.x compatibility)
- **Jupyter Notebook**: Interactive learning environment
- **IPython**: 9.6.0
- **ipywidgets**: 8.x for interactive UI elements
- **ipykernel**: 7.0.1
- **Ruff**: >=0.1.0 for code quality

## Content Sources
- `data/AICA_content.json` - 17 slides of AICA anatomy
- `data/PICA_content.json` - 20 slides of PICA anatomy
- Based on Rhoton's posterior fossa microsurgical anatomy (gold standard)

## Current Status
- Feature 001 (Interactive Modules): ✅ Complete
- Feature 002 (Content Specialist): ✅ **COMPLETE (115/115 questions - 100%)**
  - Module 7: 20/20 questions (Q2-Q6 added: AICA meatal loop, PICA presence, labyrinthine artery origin, PICA caudal loop, recurrent perforators)
  - Module 8: 12/12 questions (Q10-Q12 added: hearing preservation strategy, VA-PICA aneurysm perforator preservation, foramen magnum approach selection)

## Recent Improvements
- **Code Quality**: Ruff linter configured, deprecated scripts moved to `scripts/deprecated/`
- **Documentation**: Virtual environment setup documented in README.md
- **CI/CD**: GitHub Actions workflow added for automated code quality checks
- **Validation**: Citation validation script created (`scripts/validate_citations.py`)

## Question Breakdown by Module
- Module 3 (AICA Branches): 15/15 ✅
- Module 4 (PICA Segments): 15/15 ✅
- Module 5 (PICA Branches): 15/15 ✅
- Module 6 (Comparison): 10/10 ✅
- Module 7 (Quantitative): 20/20 ✅
- Module 8 (Surgical): 12/12 ✅
- Module 9 (Comprehensive): 20/20 ✅
- Module 10 (Mastery): 8/8 ✅
- **TOTAL: 115/115 (100%)**