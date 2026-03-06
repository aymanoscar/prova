# Git Commit Automation Skill

Automatically stage, write conventional commit messages, and push changes when the user mentions committing or pushing work.

## When to activate
- User says "commit", "push", "save my changes", "commit and push"
- User finishes a feature and wants to save progress
- User asks to "ship" or "save" the current state

## Conventional commit format

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types
- `feat` — new feature
- `fix` — bug fix
- `refactor` — code change without new feature or fix
- `docs` — documentation only
- `test` — adding or fixing tests
- `chore` — build, config, tooling changes
- `perf` — performance improvement

## Workflow

1. Run `git status` to see what changed
2. Run `git diff` to understand the changes
3. Propose a conventional commit message
4. Ask user to confirm before committing
5. Run `git add <specific files>` (never `git add .` blindly)
6. Commit with the agreed message
7. Push only if explicitly asked

## Rules
- Never commit sensitive files (.env, credentials, keys)
- Never skip pre-commit hooks (--no-verify)
- Never force push without explicit permission
