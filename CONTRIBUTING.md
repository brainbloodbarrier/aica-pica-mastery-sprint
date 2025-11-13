# Contributing to AICA PICA Mastery Sprint

This document outlines the Git workflow, branch policy, and collaboration practices for this project.

## Quick Start

### Initial Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/brainbloodbarrier/aica-pica-mastery-sprint.git
   cd aica-pica-lesson
   ```

2. Configure Git (one-time setup):
   ```bash
   git config user.name "Your Name"
   git config user.email "your.email@example.com"
   ```

3. Set up nbstripout to automatically strip notebook outputs:
   ```bash
   pipx install nbstripout
   nbstripout --install
   ```

## Project Structure

- **`main`** - Production-ready code. Protected branch, requires PR review.
- **`feat/*`** - Feature branches for new functionality
- **`fix/*`** - Bug fix branches
- **`chore/*`** - Maintenance, documentation, or infrastructure

## Git Workflow

### 1. Before Starting Work

Always ensure your local repo is in sync with GitHub:

```bash
git fetch origin --prune
git switch main
git pull --rebase
```

### 2. Create a Working Branch

For new features or fixes:

```bash
git fetch origin --prune
git switch -c feat/your-feature-name origin/main
```

### 3. Make Focused Commits

Keep commits small, atomic, and descriptive:

```bash
git add <files>
git commit -m "feat: add new feature description"
git commit -m "fix: resolve specific bug"
git commit -m "docs: update README"
```

**Commit message conventions:**
- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `chore:` - Maintenance, dependencies, infrastructure
- `refactor:` - Code refactoring without behavior change

### 4. Push to GitHub

Before pushing, verify clean status:

```bash
git status --porcelain
```

Then push:

```bash
git push -u origin feat/your-feature-name
```

On subsequent pushes:
```bash
git push
```

### 5. Create a Pull Request

On GitHub, create a PR from your branch to `main`. Include:
- Clear description of changes
- Link to related issues if applicable
- Summary of testing performed

### 6. After Merge

Clean up locally:

```bash
git switch main
git pull --rebase
git branch -d feat/your-feature-name
git push origin --delete feat/your-feature-name
```

## Working with Jupyter Notebooks

### Automatic Output Stripping

`nbstripout` is pre-configured to automatically strip notebook outputs before each commit. This prevents large diffs from notebook execution.

If you need to manually strip outputs:
```bash
nbstripout path/to/notebook.ipynb
```

### Version Control Best Practices

1. Keep notebooks focused and well-organized
2. Use clear cell markers (`# %%`) to separate logical sections
3. Avoid committing large data files—use `.gitignore` or Git LFS
4. Regenerate outputs locally before pushing; commit only code

## Syncing Between Local and Claude Code Sessions

### Before Teleporting to Claude Code

Ensure a clean working directory:

```bash
git status --porcelain
```

If dirty, commit or stash:

```bash
# Commit if work is complete:
git add -A
git commit -m "feat: descriptive message"
git push

# Or stash if not ready:
git stash push -u -m "WIP: session checkpoint"
```

Then teleport:

```bash
claude --teleport session_ID
```

### In Claude Code Session

After teleporting, configure Git:

```bash
git config user.name "Your Name"
git config user.email "your.email@example.com"
gh auth setup-git
```

Pull the latest from GitHub:

```bash
git fetch origin --prune
git switch your-branch
git pull --rebase
```

### After Claude Code Session

Pull changes back to local:

```bash
git fetch origin --prune
git switch your-branch
git pull --rebase
```

Repeat the work cycle as needed.

## Troubleshooting

### Local is ahead of GitHub

```bash
git push
```

### Session is ahead of local

```bash
git fetch origin --prune
git rebase origin/your-branch
```

### Conflicting changes between local and session

Choose one side as authoritative, then on the other side:

```bash
git fetch origin --prune
git rebase origin/your-branch
# Resolve conflicts in the editor
git add <conflicted-files>
git rebase --continue
git push
```

### Clean reset to remote (nuclear option)

If everything is out of sync and you want a fresh start:

```bash
git fetch origin
git reset --hard origin/your-branch
git clean -fd
```

## Protected Branches and Rules

- **`main`** requires:
  - All commits via PR
  - No direct pushes
  - Clean commit history (no merge commits, linear via rebase)

## Git Configuration Defaults

The project uses these global Git configurations for consistency:

```bash
init.defaultBranch = main
pull.rebase = true
rebase.autoStash = true
fetch.prune = true
push.autoSetupRemote = true
rerere.enabled = true
core.ignorecase = false
```

These are automatically configured when you set up Git on a fresh machine.

## Questions or Issues?

For workflow questions, refer to this guide. For project-specific issues, open a GitHub Issue or Discussion.

---

**Last updated:** November 13, 2025
