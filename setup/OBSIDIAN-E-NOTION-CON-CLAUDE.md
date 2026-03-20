# Obsidian e Notion con Claude — Guida Completa

## OBSIDIAN + CLAUDE

Obsidian e' diventato IL compagno perfetto di Claude nel 2026.
Motivo: Obsidian salva tutto in file Markdown sul tuo PC. Claude legge e scrive Markdown.
Combo perfetta.

### Cosa puo' fare Claude con il tuo Obsidian

- Leggere TUTTE le tue note
- Cercare informazioni nel vault (anche per significato, non solo parole)
- Creare nuove note
- Modificare note esistenti
- Organizzare e ristrutturare il vault
- Generare riassunti, dashboard, report
- Rispondere a domande sulle tue note ("Cosa ho scritto sulla strategia marketing?")

### I Migliori MCP Server per Obsidian (tutti GRATIS)

#### 1. MCPVault (Consigliato per Claude Desktop)
- Il piu' aggiornato (v0.10.0, Marzo 2026)
- Locale, sicuro, no cloud
- Blocca symlink che puntano fuori dal vault (sicurezza)
- **Sito:** https://mcp-obsidian.org
- **Install:** `npx -y @bitbonsai/mcpvault`

**Configurazione per Claude Desktop:**
```json
{
  "mcpServers": {
    "obsidian": {
      "command": "npx",
      "args": ["-y", "@bitbonsai/mcpvault", "/percorso/al/tuo/vault"]
    }
  }
}
```
Sostituisci `/percorso/al/tuo/vault` con il percorso della cartella Obsidian sul tuo PC.

#### 2. mcp-obsidian (Smithery) — Il piu' semplice
- Legge e cerca in qualsiasi cartella Markdown
- **Install:** `npx -y @smithery/cli install mcp-obsidian --client claude`
- **Link:** https://github.com/smithery-ai/mcp-obsidian

#### 3. obsidian-claude-code-mcp (Plugin Obsidian)
- Si installa DENTRO Obsidian come plugin
- Doppio trasporto: WebSocket (Claude Code) + HTTP (Claude Desktop)
- Auto-discovery del vault
- **Link:** https://github.com/iansinnott/obsidian-claude-code-mcp

#### 4. Claudian (Plugin Obsidian)
- Integra Claude Code DENTRO Obsidian
- Il vault diventa la directory di lavoro di Claude
- Supporto MCP, scelta modello (Haiku/Sonnet/Opus)
- **Link:** https://github.com/YishenTu/claudian

#### 5. Nexus (ex Claudesidian)
- Architettura a 2 tool (riduce token del 95%)
- Lettura, scrittura, ricerca, memoria long-term
- MIT License
- **Link:** cerca "Claudesidian MCP" su GitHub

### Workflow Quotidiano Consigliato

```
Mattina:
  "Claude, quali sono le mie priorita' oggi?"
  → Legge task, note recenti, scadenze

Lavoro:
  "Crea una nota con il riassunto della riunione"
  → Crea nota formattata con metadata

Sera:
  "Cosa ho fatto oggi? Aggiorna il diario"
  → Legge le modifiche del giorno, scrive il diario
```

### Secondo Cervello con Obsidian + Claude

La combinazione piu' potente del 2026:
- Obsidian tiene tutto in locale, in Markdown, nessun lock-in
- Claude ragiona sulle tue note, le collega, trova pattern
- COG Second Brain (https://github.com/huytieu/COG-second-brain)
  si auto-evolve e si auto-ripara. Ruoli: PM, Engineer, Designer, Founder, Marketer

---

## NOTION + CLAUDE

Tu usi gia' Notion! Ecco come potenziarlo con Claude.

### Notion MCP Server UFFICIALE (Consigliato)

Notion ha il suo MCP server ufficiale, mantenuto direttamente da Notion.
Ottimizzato per AI: converte tutto in Markdown (meno token, piu' veloce).

**COME INSTALLARE (1 comando):**

Per Claude Code:
```
claude mcp add --transport http notion https://mcp.notion.com/mcp
```

Per Claude Desktop, aggiungi al `claude_desktop_config.json`:
```json
{
  "mcpServers": {
    "notion": {
      "command": "npx",
      "args": ["-y", "@notionhq/notion-mcp-server"],
      "env": {
        "OPENAPI_MCP_HEADERS": "{\"Authorization\": \"Bearer IL_TUO_TOKEN\", \"Notion-Version\": \"2022-06-28\"}"
      }
    }
  }
}
```

**Per ottenere il token Notion:**
1. Vai su https://www.notion.so/my-integrations
2. Crea una nuova integrazione
3. Copia il token (inizia con `ntn_` o `secret_`)
4. Condividi le pagine/database con l'integrazione

### Notion Plugin per Claude Code (UFFICIALE)

C'e' anche un plugin ufficiale che include:
- Skills specifiche per Notion (dal Notion Cookbook)
- MCP Server integrato
- Slash Commands per workflow comuni

**Install:**
```
/plugin marketplace add makenotion/claude-code-notion-plugin
/plugin install notion
```

**Link:** https://github.com/makenotion/claude-code-notion-plugin

### Cosa puo' fare Claude con Notion

- Cercare nel workspace
- Leggere pagine e database
- Creare nuove pagine (PRD, tech spec, meeting notes)
- Aggiornare task e stati
- Costruire report
- Gestire il content calendar

### Nota sulla Sicurezza
- Crea un token "Read only" se vuoi solo leggere
- Non puoi cancellare database via MCP (Notion lo blocca)
- Tutto passa per le API ufficiali Notion

---

## OBSIDIAN vs NOTION — Quale usare con Claude?

| Aspetto | Obsidian | Notion |
|---------|----------|--------|
| **Dove vivono i dati** | Sul TUO PC (file .md) | Cloud (server Notion) |
| **Privacy** | Massima — tutto locale | Dipende da Notion |
| **Claude puo' scrivere?** | Si, direttamente | Si, via API |
| **Velocita'** | Velocissimo (file locali) | Dipende dalla connessione |
| **Collaborazione** | Limitata | Eccellente |
| **Per il libro** | PERFETTO (Markdown = libro) | Buono per organizzare |
| **Costo** | Gratis | Gratis (base) / A pagamento (pro) |
| **Offline** | Si | No |

### Il Mio Consiglio per Te

**Usa ENTRAMBI:**
- **Obsidian** per scrivere il libro (capitoli in Markdown, Claude li legge e li aiuta)
- **Notion** per organizzare il progetto (task, timeline, ricerche, collaborazione)
- Claude collegato a entrambi via MCP

```
Notion (organizzazione)     Obsidian (scrittura)
       \                        /
        \                      /
         ╲                    ╱
          ╲                  ╱
           Claude (AI)
```

---

## CONFIGURAZIONE COMPLETA PER CLAUDE DESKTOP

Ecco il `claude_desktop_config.json` aggiornato con Obsidian + Notion:

```json
{
  "mcpServers": {
    "memory": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory"]
    },
    "sequential-thinking": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sequential-thinking"]
    },
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem",
               "/Users/TUONOME/Desktop",
               "/Users/TUONOME/Documents"]
    },
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp"]
    },
    "obsidian": {
      "command": "npx",
      "args": ["-y", "@bitbonsai/mcpvault",
               "/Users/TUONOME/PERCORSO-VAULT-OBSIDIAN"]
    },
    "notion": {
      "command": "npx",
      "args": ["-y", "@notionhq/notion-mcp-server"],
      "env": {
        "OPENAPI_MCP_HEADERS": "{\"Authorization\": \"Bearer IL_TUO_TOKEN_NOTION\", \"Notion-Version\": \"2022-06-28\"}"
      }
    }
  }
}
```

**Da personalizzare:**
- `TUONOME` → il tuo nome utente del computer
- `PERCORSO-VAULT-OBSIDIAN` → la cartella del tuo vault Obsidian
- `IL_TUO_TOKEN_NOTION` → il token dalla pagina integrazioni Notion
