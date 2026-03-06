# Claude Agent SDK Skill

Build agentic applications with the Claude Agent SDK when the user wants autonomous agents with built-in tools (file access, web browsing, terminal), multi-turn sessions, subagents, or MCP integration.

## When to activate
- User asks to "build an agent", "create an autonomous agent", "use Agent SDK"
- User imports `@anthropic-ai/claude-agent-sdk` or `claude_agent_sdk`
- User wants an agent that can read files, browse the web, or run shell commands autonomously
- User wants to orchestrate multiple specialized subagents

## Decision: Claude API vs Agent SDK

Use **Agent SDK** when Claude itself needs to discover/access files, web, or shell.
Use **Claude API + tool use** when you define your own tools and control the loop.

## Installation

```bash
# TypeScript
npm install @anthropic-ai/claude-agent-sdk

# Python
pip install claude-agent-sdk
```

## Core pattern — TypeScript

```typescript
import { query } from "@anthropic-ai/claude-agent-sdk";

for await (const message of query({
  prompt: "Find and fix the bug in auth.ts",
  options: {
    cwd: "/path/to/project",
    allowedTools: ["Read", "Edit", "Bash", "Glob", "Grep"],
    permissionMode: "acceptEdits",
    maxTurns: 30,
  },
})) {
  if ("result" in message) console.log(message.result);
}
```

## Core pattern — Python

```python
import asyncio
from claude_agent_sdk import query, ClaudeAgentOptions

async def main():
    async for message in query(
        prompt="Analyze this codebase and find performance issues",
        options=ClaudeAgentOptions(
            allowed_tools=["Read", "Glob", "Grep", "Bash"],
            permission_mode="acceptEdits",
        ),
    ):
        if hasattr(message, "result"):
            print(message.result)

asyncio.run(main())
```

## Session resumption

```typescript
let sessionId: string | undefined;

// First query: capture session ID
for await (const message of query({ prompt: "Read the auth module", options: { allowedTools: ["Read", "Glob"] } })) {
  if (message.type === "system" && message.subtype === "init") {
    sessionId = message.session_id;
  }
}

// Resume with full context
for await (const message of query({
  prompt: "Now find all callers of that module",
  options: { resume: sessionId },
})) {
  if ("result" in message) console.log(message.result);
}
```

## Hooks (audit, logging, control)

```typescript
import { query, HookCallback } from "@anthropic-ai/claude-agent-sdk";
import { appendFileSync } from "fs";

const auditHook: HookCallback = async (input) => {
  const file = (input as any).tool_input?.file_path ?? "unknown";
  appendFileSync("./audit.log", `${new Date().toISOString()}: modified ${file}\n`);
  return {};
};

for await (const message of query({
  prompt: "Refactor utils.ts",
  options: {
    allowedTools: ["Read", "Edit"],
    permissionMode: "acceptEdits",
    hooks: { PostToolUse: [{ matcher: "Edit|Write", hooks: [auditHook] }] },
  },
})) {
  if ("result" in message) console.log(message.result);
}
```

## Available tools

| Tool | Description |
|---|---|
| Read | Read files |
| Write | Create files |
| Edit | Edit existing files |
| Bash | Execute shell commands |
| Glob | Find files by pattern |
| Grep | Search file contents |
| WebSearch | Search the web |
| WebFetch | Fetch web pages |
| AskUserQuestion | Ask user for input |
| Agent | Spawn subagents |

## Permission modes

| Mode | Behavior |
|---|---|
| `default` | Prompt for dangerous operations |
| `acceptEdits` | Auto-accept file edits |
| `dontAsk` | Don't prompt (for CI/CD) |
| `bypassPermissions` | Skip all prompts (sandboxed use only) |

## Model defaults

Default to `claude-opus-4-6` with adaptive thinking for complex agentic tasks:

```typescript
options: {
  model: "claude-opus-4-6",
  // thinking is handled automatically by the SDK
}
```
