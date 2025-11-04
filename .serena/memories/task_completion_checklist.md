# Task Completion Checklist

## When Adding Questions to Notebook

- [ ] Question follows `create_mcq()` format exactly
- [ ] Four options provided, one clearly correct
- [ ] Correct answer text matches option verbatim
- [ ] Explanation includes anatomical reasoning
- [ ] Source citation included: `Source: [JSON_file] Slide [#]`
- [ ] Sequential numbering maintained (Q1, Q2, Q3...)
- [ ] Question placed in correct module section

## When Completing a Module

- [ ] All questions added (check target count)
- [ ] Score submission widget present
- [ ] Progress tracking logic updated
- [ ] Badge award implemented (if applicable)
- [ ] Module unlock logic verified
- [ ] Test notebook execution (no errors)

## When Modifying Notebook

- [ ] Backup created before major changes
- [ ] Cell type correct (code vs markdown)
- [ ] Cell metadata preserved
- [ ] Notebook still opens in Jupyter
- [ ] All cells execute without errors

## Quality Assurance

- [ ] Run all notebook cells to verify syntax
- [ ] Verify all source citations are accurate
- [ ] Check quantitative data against JSON sources (100% accuracy required)
- [ ] Review distractors for plausibility
- [ ] Confirm explanations provide anatomical reasoning

## Before Committing

- [ ] Run `ruff check .` (if Python code modified)
- [ ] Verify notebook file size reasonable (<5MB typical)
- [ ] Check git status for unintended files
- [ ] Write descriptive commit message
- [ ] Include module/question count in message

## Before Pushing

- [ ] Verify on correct feature branch
- [ ] Check remote branch status
- [ ] Ensure no merge conflicts
- [ ] Confirm all local commits included

## Documentation

- [ ] Update IMPLEMENTATION_REPORT.md if significant progress
- [ ] Update CLAUDE.md if new technologies added
- [ ] Update README.md if user-facing changes
- [ ] Document any issues or workarounds