# Git Sync Workflow Guide

This guide explains how to properly coordinate your local Git repository,
GitHub, and Claude Code sessions to avoid conflicts and mismatches.

## System Architecture

```text
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  Your Mac (Local Clone)                                │
│  - Primary development location                        │
│  - Source of truth before teleporting                  │
│  - Pulls updates from Claude sessions                  │
│                                                         │
└──────────────────────┬──────────────────────────────────┘
                       │
                       │ push/pull
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  GitHub Repository                                     │
│  - Single source of truth                              │
│  - All branches are pushed here                         │
│  - Reference point for all environments                │
│                                                         │
└──────────────────────┬──────────────────────────────────┘
                       │
                       │ clone/teleport
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  Claude Code Session                                   │
│  - Ephemeral development environment                   │
│  - Syncs with GitHub automatically                     │
│  - Must push commits back to GitHub                    │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## Key Principles

1. **GitHub is the single source of truth** - Never work directly outside GitHub
2. **Local is authoritative before teleport** - Commit everything locally first
3. **Session outputs must be pushed** - Any work in sessions must return to GitHub
4. **Clean trees enable smooth transitions** - Always commit or stash before teleporting

## Day-to-Day Workflow

### On Your Mac (Local)

#### Starting a session

```bash
# 1. Ensure you're on the right branch
git fetch origin --prune
git switch main

# 2. Create a feature branch
git switch -c feat/your-feature-name

# 3. Work locally, making focused commits
git add <files>
git commit -m "feat: descriptive message"

# 4. Push to GitHub (sets up tracking)
git push -u origin feat/your-feature-name
```

#### Verifying clean state before teleporting

```bash
# Check for uncommitted changes
git status --porcelain

# If clean, no output appears
# If dirty, commit or stash
```

#### Teleporting to Claude Code

```bash
# Ensure clean working directory first
git status --porcelain

# If all clear:
claude --teleport session_ID

# If dirty, commit first:
git add -A
git commit -m "WIP: work in progress"
git push
```

### In Claude Code Session

#### Initial setup (first time in session)

```bash
# Configure Git identity
git config user.name "Your Name"
git config user.email "your.email@example.com"

# Setup GitHub authentication
gh auth setup-git

# Fetch latest from GitHub
git fetch origin --prune

# Switch to your working branch
git switch feat/your-feature-name
git pull --rebase
```

#### During the session

```bash
# Work normally - make commits focused and small
git add <files>
git commit -m "feat: specific change"

# After each logical chunk, push
git push

# Can also do multiple commits, then push once at the end
git commit -m "feat: another change"
git push
```

#### Key: Push before session ends

Always ensure you push all commits before leaving the session:

```bash
# See what's local but not on GitHub
git log --oneline origin/feat/your-feature-name..HEAD

# Push any unpushed commits
git push
```

### Back on Your Mac (After Session)

#### Pull session changes

```bash
# Fetch latest from GitHub
git fetch origin --prune

# Switch to your branch
git switch feat/your-feature-name

# Pull and rebase session commits
git pull --rebase
```

#### Continue local work

```bash
# Make more commits as needed
git add <files>
git commit -m "feat: additional change"

# Push for next session
git push
```

## Troubleshooting

### "Git working directory is not clean" when teleporting

**Problem:** You tried to teleport with uncommitted changes.

**Solution:**

```bash
# Option 1: Commit changes
git add -A
git commit -m "feat: descriptive message"
git push

# Option 2: Stash if not ready to commit
git stash push -u -m "WIP: work in progress"

# Then teleport
claude --teleport session_ID
```

### Local and session branches diverged

**Problem:** Local has commits session doesn't have, and vice versa.

**Solution:**

```bash
# Option A: Push local, then sync session
# On Mac:
git push

# In session:
git fetch origin
git rebase origin/feat/your-feature-name

# Option B: Pull session commits to local
# In session:
git push

# On Mac:
git fetch origin
git rebase origin/feat/your-feature-name
```

### Session is ahead and local needs updates

```bash
# On Mac:
git fetch origin --prune
git rebase origin/feat/your-feature-name

# Verify:
git log --oneline -5
```

### Local is ahead and session needs updates

```bash
# In session:
git fetch origin --prune
git rebase origin/feat/your-feature-name
```

### Conflicting changes

If both local and session changed the same files:

```bash
# Choose one side as authoritative (e.g., session)
# Then on local:
git fetch origin
git rebase origin/feat/your-feature-name

# Conflicts will appear - edit files to resolve
git add <resolved-files>
git rebase --continue
git push
```

### Nuclear option: Reset to GitHub

If everything is hopelessly out of sync and you want to start fresh:

```bash
# WARNING: This discards local changes
git fetch origin
git reset --hard origin/feat/your-feature-name
git clean -fd

# Verify:
git status
# Should show: "On branch feat/your-feature-name
# nothing to commit, working tree clean"
```

## Important Git Configuration

Your Mac has these Git settings for smooth syncing:

```bash
init.defaultBranch = main          # New repos default to main
pull.rebase = true                 # Always rebase, no merge commits
rebase.autoStash = true            # Auto-stash during rebase
fetch.prune = true                 # Remove deleted remote branches
push.autoSetupRemote = true        # Auto-track remote on push
rerere.enabled = true              # Remember conflict resolutions
core.ignorecase = false            # Case-sensitive paths
```

These are already configured globally. Just understand what they do.

## Best Practices

✅ **DO**

- Commit small, focused changes
- Push frequently from sessions
- Use descriptive commit messages
- Check GitHub for latest before starting work
- Verify clean status before teleporting
- Pull updates regularly on Mac

❌ **DON'T**

- Leave uncommitted changes before teleporting
- Work directly on `main` branch
- Skip pushing from sessions
- Use generic commit messages like "fix" or "update"
- Mix unrelated changes in one commit
- Ignore merge conflicts

## Summary Checklist

### Before teleporting to Claude Code

```bash
☐ git fetch origin --prune
☐ git switch main
☐ git pull --rebase
☐ git switch -c feat/your-feature
☐ [Make commits and push]
☐ git status --porcelain (should be clean)
☐ claude --teleport session_ID
```

### In Claude Code session

```bash
☐ git config user.name and user.email
☐ gh auth setup-git
☐ git switch feat/your-feature
☐ git pull --rebase
☐ [Make commits]
☐ git push (after each logical group)
☐ git push (before leaving)
```

### Back on Mac after session

```bash
☐ git fetch origin --prune
☐ git switch feat/your-feature
☐ git pull --rebase
☐ [Continue working]
☐ git push
```

---

**Version:** 1.0
**Last Updated:** November 13, 2025
