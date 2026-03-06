# MCP Orchestrator Skill

Connect Claude to external services, databases, and tools via MCP (Model Context Protocol) — either in Claude Code CLI or programmatically in the Agent SDK.

## When to activate
- User mentions MCP, Model Context Protocol, MCP server
- User wants Claude to connect to GitHub, Sentry, PostgreSQL, Notion, Playwright, etc.
- User wants to add external tool capabilities to an agent
- User asks to build or configure an MCP server

## MCP in Claude Code CLI

### Add a server

```bash
# HTTP (remote)
claude mcp add --transport http github https://api.githubcopilot.com/mcp/
claude mcp add --transport http sentry https://mcp.sentry.dev/mcp
claude mcp add --transport http notion https://mcp.notion.com/mcp

# Stdio (local process)
claude mcp add --transport stdio playwright -- npx -y @playwright/mcp@latest
claude mcp add --transport stdio --env AIRTABLE_API_KEY=YOUR_KEY airtable \
  -- npx -y airtable-mcp-server

# With authentication header
claude mcp add --transport http myapi https://api.example.com/mcp \
  --header "Authorization: Bearer your-token"
```

### Manage servers

```bash
claude mcp list          # list configured servers
claude mcp get github    # details for a server
claude mcp remove github # remove a server
/mcp                     # check status inside Claude Code
```

### Scopes

```bash
# Local (private, current project only — default)
claude mcp add --scope local ...

# Project (shared via .mcp.json in git)
claude mcp add --scope project ...

# User (available in all projects)
claude mcp add --scope user ...
```

## MCP in Agent SDK — TypeScript

```typescript
import { query } from "@anthropic-ai/claude-agent-sdk";

// External MCP server (Playwright)
for await (const message of query({
  prompt: "Open example.com and describe the page structure",
  options: {
    mcpServers: {
      playwright: { command: "npx", args: ["@playwright/mcp@latest"] },
    },
  },
})) {
  if ("result" in message) console.log(message.result);
}
```

```typescript
// Multiple MCP servers
for await (const message of query({
  prompt: "Check Sentry errors and create GitHub issues for the top 5",
  options: {
    mcpServers: {
      sentry: { type: "http", url: "https://mcp.sentry.dev/mcp" },
      github: { type: "http", url: "https://api.githubcopilot.com/mcp/" },
    },
  },
})) {
  if ("result" in message) console.log(message.result);
}
```

## In-process custom MCP tools (TypeScript)

Define custom tools that run in-process and expose them as MCP:

```typescript
import { query, tool, createSdkMcpServer } from "@anthropic-ai/claude-agent-sdk";
import { z } from "zod";

const searchInventory = tool(
  "search_inventory",
  "Search internal product inventory by name or SKU",
  { query: z.string(), limit: z.number().optional().default(10) },
  async ({ query, limit }) => {
    // Your actual implementation
    const results = await db.inventory.search(query, limit);
    return { content: [{ type: "text", text: JSON.stringify(results) }] };
  }
);

const server = createSdkMcpServer({
  name: "inventory-server",
  tools: [searchInventory],
});

for await (const message of query({
  prompt: "Find all products matching 'wireless headphones' under $100",
  options: { mcpServers: { inventory: server } },
})) {
  if ("result" in message) console.log(message.result);
}
```

## Popular MCP servers

| Service | Command |
|---|---|
| Playwright (browser) | `npx @playwright/mcp@latest` |
| GitHub | HTTP: `https://api.githubcopilot.com/mcp/` |
| Sentry | HTTP: `https://mcp.sentry.dev/mcp` |
| Notion | HTTP: `https://mcp.notion.com/mcp` |
| PostgreSQL | `npx @bytebase/dbhub --dsn "postgresql://..."` |
| Airtable | `npx airtable-mcp-server` |
| Stripe | HTTP: `https://mcp.stripe.com` |

## Build your own MCP server

Use the official `/mcp-builder` skill or the `mcp-builder` Anthropic skill to scaffold a new MCP server with proper SKILL.md and tool definitions.

## MCP + Agent SDK combined pattern

```typescript
for await (const message of query({
  prompt: "Review open GitHub PRs, run Playwright tests on them, log errors to Sentry",
  options: {
    allowedTools: ["Read", "Bash", "Agent"],
    mcpServers: {
      github: { type: "http", url: "https://api.githubcopilot.com/mcp/" },
      playwright: { command: "npx", args: ["@playwright/mcp@latest"] },
      sentry: { type: "http", url: "https://mcp.sentry.dev/mcp" },
    },
    agents: {
      "pr-reviewer": {
        description: "Reviews GitHub PRs and runs tests",
        prompt: "Check PR diff, run tests, report issues",
      },
    },
  },
})) {
  if ("result" in message) console.log(message.result);
}
```
