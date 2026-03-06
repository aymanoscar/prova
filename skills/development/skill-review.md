# Code Review Skill

Perform a thorough code review when the user shares code, opens a PR, or asks for feedback on their implementation.

## When to activate
- User pastes code and asks for review
- User mentions "review my code", "check this", "feedback on"
- User opens a pull request or mentions PR review

## Review checklist

1. **Correctness** — Does the code do what it claims? Edge cases covered?
2. **Security** — SQL injection, XSS, exposed secrets, insecure dependencies?
3. **Performance** — N+1 queries, unnecessary loops, memory leaks?
4. **Readability** — Clear naming, appropriate comments, consistent style?
5. **Maintainability** — DRY, single responsibility, appropriate abstractions?
6. **Error handling** — Are errors caught and handled properly?
7. **Tests** — Is the code testable? Are tests present?

## Output format

Structure your review as:
- **Summary** (1-2 sentences)
- **Critical issues** (must fix)
- **Suggestions** (nice to have)
- **Positives** (what's done well)

Be specific: reference line numbers and provide corrected snippets where helpful.
