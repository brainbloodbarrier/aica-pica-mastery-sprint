# Suggested Commands for AICA/PICA Project

## Development Commands

### Running the Main Notebook
```bash
jupyter notebook AICA_PICA_Mastery_Sprint.ipynb
```

### Installing Dependencies
```bash
pip install jupyter ipywidgets ipython ipykernel
```

### Code Quality (from CLAUDE.md)
```bash
ruff check .
```

### Testing (planned, not yet implemented)
```bash
pytest
```

## Content Verification Commands

### Validate JSON Content Files
```bash
python -m json.tool data/AICA_content.json
python -m json.tool data/PICA_content.json
```

### Count Questions in Notebook
```bash
grep -c "create_mcq(" AICA_PICA_Mastery_Sprint.ipynb
```

## Git Workflow
```bash
git status
git add .
git commit -m "message"
git push origin <branch>
```

## macOS System Commands (Darwin)
Standard Unix commands available:
- `ls`, `cd`, `pwd` - Navigation
- `grep`, `find` - Search
- `cat`, `less` - File viewing
- `python3`, `pip3` - Python tools

## Project Structure Commands
```bash
# View project structure
ls -la

# Key directories
ls data/          # JSON content files
ls specs/         # Feature specifications
ls docs/          # Supplementary documentation
```