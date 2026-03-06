# Test-Driven Development (TDD) Skill

Guide and enforce TDD practices when writing new features or fixing bugs.

## When to activate
- User asks to implement a new feature
- User mentions "TDD", "write tests first", "test-driven"
- User asks to fix a bug (write failing test first)

## TDD Cycle

### 1. RED — Write a failing test
- Write the smallest test that captures the desired behavior
- Run it to confirm it fails (and fails for the right reason)
- Do NOT write implementation yet

### 2. GREEN — Make it pass (minimum code)
- Write only enough code to make the test pass
- Do not over-engineer; ugly code is OK at this stage
- Run the test to confirm it passes

### 3. REFACTOR — Clean up
- Improve the code without changing behavior
- Tests must still pass after refactoring
- Apply DRY, SOLID, clean naming

## Output format for each cycle
```
## Test (RED)
[test code]

## Implementation (GREEN)
[minimal implementation]

## Refactored
[clean version]
```

## Best practices
- One assertion per test when possible
- Test behavior, not implementation details
- Name tests: `should <behavior> when <condition>`
- Keep tests fast and independent
