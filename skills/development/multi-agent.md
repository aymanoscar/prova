# Multi-Agent Orchestration Skill

Design and implement teams of specialized subagents that work in parallel or sequence to complete complex tasks. Use when a single agent would benefit from being split into specialists.

## When to activate
- User wants to run multiple agents in parallel
- User asks for "code review team", "multi-agent pipeline", "agent orchestration"
- Task involves multiple distinct domains (security + performance + style)
- User wants agents with different tool access or models

## Core pattern — subagent team (TypeScript)

```typescript
import { query } from "@anthropic-ai/claude-agent-sdk";

for await (const message of query({
  prompt: "Do a full review of the authentication module",
  options: {
    allowedTools: ["Read", "Glob", "Grep", "Bash", "Agent"],
    agents: {
      "security-reviewer": {
        description: "Security vulnerability scanner. Use for auth, injection, data exposure issues.",
        prompt: `You are a security expert. Review code for:
- Injection attacks (SQL, XSS, command injection)
- Exposed secrets or credentials
- Insecure authentication/authorization
- Data leakage
Provide specific line numbers and severity (critical/high/medium/low).`,
        tools: ["Read", "Glob", "Grep"],
      },
      "performance-reviewer": {
        description: "Performance optimization specialist. Use for N+1 queries, memory leaks, bottlenecks.",
        prompt: `You are a performance expert. Review code for:
- N+1 database queries
- Unnecessary loops or redundant computation
- Memory leaks
- Missing indexes or caching opportunities
Quantify impact where possible.`,
        tools: ["Read", "Glob", "Grep"],
      },
      "style-reviewer": {
        description: "Code style and maintainability checker. Use for readability, naming, patterns.",
        prompt: `You are a code quality expert. Review code for:
- Naming conventions and clarity
- Single responsibility violations
- DRY principle
- Missing or misleading documentation
Be constructive and specific.`,
        tools: ["Read", "Glob", "Grep"],
      },
    },
  },
})) {
  if ("result" in message) console.log(message.result);
}
```

## Pattern: Research → Implementation pipeline

```typescript
let sessionId: string | undefined;

// Phase 1: Research specialist
for await (const message of query({
  prompt: "Use the researcher agent to find best practices for JWT refresh token rotation",
  options: {
    allowedTools: ["WebSearch", "WebFetch", "Read", "Agent"],
    agents: {
      researcher: {
        description: "Web research specialist for finding authoritative sources and best practices",
        prompt: "Search for authoritative documentation and summarize findings with sources.",
        tools: ["WebSearch", "WebFetch"],
      },
    },
  },
})) {
  if (message.type === "system" && message.subtype === "init") {
    sessionId = message.session_id;
  }
}

// Phase 2: Implementation (same session = full context of research)
for await (const message of query({
  prompt: "Implement the JWT refresh token rotation based on the research findings",
  options: {
    resume: sessionId,
    allowedTools: ["Read", "Write", "Edit", "Bash"],
    permissionMode: "acceptEdits",
  },
})) {
  if ("result" in message) console.log(message.result);
}
```

## Pattern: MCP + multi-agent

```typescript
for await (const message of query({
  prompt: "Monitor Sentry errors, fix the top issue, open a PR",
  options: {
    allowedTools: ["Read", "Edit", "Write", "Bash", "Agent"],
    mcpServers: {
      sentry: { type: "http", url: "https://mcp.sentry.dev/mcp" },
      github: { type: "http", url: "https://api.githubcopilot.com/mcp/" },
    },
    agents: {
      "error-analyzer": {
        description: "Analyzes Sentry errors and identifies root cause in code",
        prompt: "Correlate Sentry stack traces with source code. Identify root cause.",
        tools: ["Read", "Grep", "Glob"],
      },
      "pr-creator": {
        description: "Creates GitHub PRs with proper title, description, and labels",
        prompt: "Create clear, well-described PRs. Include: what changed, why, how to test.",
        tools: ["Bash"],
      },
    },
  },
})) {
  if ("result" in message) console.log(message.result);
}
```

## Subagent design rules

1. **Description** — Be specific about when to use the agent; Claude reads this to decide
2. **Prompt** — Give deep domain expertise; this is the agent's system prompt
3. **Tools** — Restrict to minimum needed (read-only analysts cannot accidentally modify files)
4. **Model** — Override for critical agents: `model: "claude-opus-4-6"` for security reviews

## Tool access patterns

| Agent type | Recommended tools |
|---|---|
| Analyst / Reviewer | `Read`, `Glob`, `Grep` |
| Researcher | `WebSearch`, `WebFetch`, `Read` |
| Builder / Implementer | `Read`, `Edit`, `Write`, `Bash` |
| Test runner | `Bash`, `Read`, `Grep` |
| Coordinator (main) | `Agent` + all others |

## When NOT to use multi-agent

- Simple single-domain task → use one agent
- Sequential steps without specialization → use one agent with `maxTurns`
- Cost-sensitive → each subagent invocation adds API calls

## Detecting subagent invocations (Python)

```python
async for message in query(...):
    if hasattr(message, "content"):
        for block in message.content:
            if getattr(block, "type", None) == "tool_use" and block.name == "Task":
                print(f"Subagent spawned: {block.input.get('subagent_type')}")
```
