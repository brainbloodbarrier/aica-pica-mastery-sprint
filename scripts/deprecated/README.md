# Deprecated Helper Scripts

This directory contains historical automation scripts used during initial notebook construction. **These scripts are no longer maintained or supported.**

## ⚠️ DO NOT USE THESE SCRIPTS

All scripts in this directory have been superseded by manual notebook editing and are kept only for historical reference.

## Scripts

### fix_notebook.py
**Original Purpose:** Reorganize questions into correct module sections and generate missing questions

**Issues:**
- Hardcoded absolute paths (`/Users/fax/Downloads/...`)
- Dependencies on `/tmp/` files that no longer exist
- Module 7 question generation never completed (TODO)
- Non-portable across different machines

**Status:** DEPRECATED - Edit notebook directly instead

### append_modules.py
**Original Purpose:** Append Modules 9 and 10 to main notebook

**Issues:**
- Creates placeholder questions only
- Hardcoded paths
- One-time use utility

**Status:** DEPRECATED - Modules 9-10 already in notebook

### add_remaining_modules.py
**Original Purpose:** Module addition utility with Module 6 content

**Issues:**
- Incomplete implementation
- Hardcoded paths

**Status:** DEPRECATED

### module_9_10_additions.py
**Original Purpose:** Module 9/10 question content storage

**Issues:**
- Undefined variable references
- Incomplete implementation
- Data file in .py format (should be JSON)

**Status:** DEPRECATED

### new_m7_questions.py
**Original Purpose:** Module 7 questions storage

**Issues:**
- Data file in .py format (should be JSON)

**Status:** DEPRECATED

## Why These Were Deprecated

1. **Portability Issues:** Hardcoded absolute paths break on other machines
2. **Dependencies:** Rely on temporary files that no longer exist
3. **Incomplete:** Several scripts have TODOs and undefined variables
4. **One-Time Use:** Designed for initial construction, not ongoing maintenance
5. **Manual Editing Better:** Direct notebook editing is more reliable

## Current Workflow

**To modify the notebook:**
1. Open `AICA_PICA_Mastery_Sprint.ipynb` in Jupyter
2. Edit cells directly
3. Save and commit changes

**To add/modify questions:**
1. Reference `data/AICA_content.json` and `data/PICA_content.json`
2. Add questions using the `create_mcq()` pattern in notebook cells
3. Ensure source citations: `Source: [JSON_file] Slide [#]`

## Code Quality

These scripts contain numerous linting errors (unused imports, f-strings without placeholders, undefined variables). **This is expected and acceptable** since they are deprecated and non-functional.

Ruff is configured to exclude this directory from checks.
