# MESSAGGIO DA COPIARE IN CLAUDE DESKTOP

Copia TUTTO il testo qui sotto (da "---INIZIO---" a "---FINE---") e incollalo come primo messaggio in una nuova chat di Claude Desktop.

---INIZIO---

Ciao Claude, devo poteziare Claude Desktop con MCP server, skills e plugin gratuiti. Ho una repo su GitHub con tutto il materiale gia' pronto. Ti spiego tutto qui sotto cosi' sai esattamente cosa fare.

## CHI SONO
Sono Ayman. Non so programmare. Uso Claude per molti progetti, sto scrivendo un libro, uso Obsidian e Notion, creo video.

## COSA DEVI FARE
Devi aiutarmi a installare MCP server, skills e plugin sul mio computer. Ti do tutte le istruzioni qui sotto. Segui i passi in ordine.

## PASSO 1 — CONTROLLA PREREQUISITI

Verifica che Node.js sia installato sul mio PC. Esegui:
```
node --version
```
Se non c'e', dimmi di scaricarlo da https://nodejs.org (versione LTS, il bottone verde grande) e fermati finche' non lo installo.

## PASSO 2 — TROVA IL MIO FILE DI CONFIGURAZIONE

Leggi il mio file di configurazione attuale di Claude Desktop:
- Mac: ~/Library/Application Support/Claude/claude_desktop_config.json
- Windows: %APPDATA%\Claude\claude_desktop_config.json

Mostrami cosa c'e' dentro (se esiste). Se non esiste, dimmelo.

## PASSO 3 — AGGIUNGI I SERVER MCP

Devi aggiungere i seguenti server MCP al mio claude_desktop_config.json. Se alcuni esistono gia', NON duplicarli. Aggiungi solo quelli che mancano.

Ecco la configurazione completa da usare come riferimento:

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
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/TUONOME/Desktop", "/Users/TUONOME/Documents"]
    },
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp"]
    },
    "playwright": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-playwright"]
    },
    "obsidian": {
      "command": "npx",
      "args": ["-y", "@bitbonsai/mcpvault", "/Users/TUONOME/PERCORSO-VAULT-OBSIDIAN"]
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

## PASSO 4 — PERSONALIZZA

Prima di scrivere il file, devi chiedermi:

1. **Il mio nome utente del computer** — per sostituire TUONOME nel percorso filesystem. Puoi anche trovarlo con `whoami` nel terminale.

2. **Il percorso del mio vault Obsidian** — per sostituire PERCORSO-VAULT-OBSIDIAN. Cercalo con:
   - Mac: find ~ -name ".obsidian" -type d 2>/dev/null | head -5
   - Windows: dir /s /b "%USERPROFILE%\.obsidian" 2>nul

3. **Il mio token Notion** — per sostituire IL_TUO_TOKEN_NOTION. Guidami cosi':
   a) Vai su https://www.notion.so/my-integrations
   b) Clicca "New integration"
   c) Nome: "Claude"
   d) Seleziona il workspace
   e) Copia il token (inizia con ntn_ o secret_)
   f) Poi nelle pagine Notion che voglio condividere: "..." → "Connections" → aggiungi "Claude"

Se non uso Obsidian o Notion, salta quel server.

## PASSO 5 — SCRIVI IL FILE

Una volta che hai tutti i dati:
1. Mostrami il file completo personalizzato PRIMA di scriverlo
2. Aspetta il mio OK
3. Scrivi il file nella posizione corretta
4. Dimmi di chiudere COMPLETAMENTE Claude Desktop e riaprirlo

## PASSO 6 — INSTALLA LE SKILLS

Crea la cartella skills se non esiste e copia dentro queste 3 skills:

### Skill 1: code-reviewer
Percorso: ~/.claude/skills/code-reviewer/SKILL.md
```
---
description: "Revisione codice approfondita con focus su sicurezza, performance e leggibilita'"
trigger: "quando l'utente chiede una review, revisione, o controllo del codice"
---
Quando rivedi il codice, segui questa checklist:
## Sicurezza
- Controlla input validation
- Cerca SQL injection, XSS, command injection
- Verifica che segreti/password non siano hardcoded
## Performance
- Cerca loop non necessari o query N+1
- Verifica che non ci siano memory leak
## Leggibilita'
- Nomi variabili chiari e descrittivi
- Funzioni brevi e con singola responsabilita'
## Output
Fornisci un report strutturato con:
1. Problemi CRITICI (da risolvere subito)
2. Suggerimenti (miglioramenti consigliati)
3. Note positive (cosa va bene)
```

### Skill 2: project-planner
Percorso: ~/.claude/skills/project-planner/SKILL.md
```
---
description: "Pianificazione progetti step-by-step con timeline e task breakdown"
trigger: "quando l'utente vuole pianificare un progetto, creare un piano, o organizzare il lavoro"
---
Quando l'utente vuole pianificare un progetto:
## Step 1 — Capire il progetto
Fai domande per chiarire: obiettivo, utenti, vincoli, cosa esiste gia'.
## Step 2 — Struttura
Crea breakdown in fasi (max 5-7), task per fase (max 5), dipendenze.
## Step 3 — Output
1. Elenco ordinato di task con priorita' (P1, P2, P3)
2. Suggerimenti tecnologie/strumenti
3. Rischi e mitigazioni
Usa linguaggio semplice, non tecnico.
```

### Skill 3: file-organizer
Percorso: ~/.claude/skills/file-organizer/SKILL.md
```
---
description: "Organizza, rinomina e struttura file e cartelle"
trigger: "quando l'utente vuole organizzare file, pulire cartelle, o riordinare un progetto"
---
Regole:
- MAI cancellare file senza chiedere conferma
- Mostra anteprima dei cambiamenti PRIMA di farli
- Crea backup se richiesto
Processo:
1. Analizza struttura attuale
2. Proponi nuova struttura organizzata
3. Aspetta conferma
4. Esegui cambiamenti
Nomi: kebab-case per cartelle, descrittivi per file, niente spazi.
```

## PASSO 7 — VERIFICA

Dopo che ho riavviato Claude Desktop, in una nuova chat chiedimi di scrivere:
"Quali strumenti MCP hai disponibili?"

Dovrebbero apparire: memory, sequential-thinking, filesystem, context7, playwright, obsidian, notion.

Se ne manca qualcuno, aiutami a risolvere.

## CATALOGO EXTRA — Se voglio aggiungere altro dopo

Se ti chiedo di aggiungere altri strumenti, ecco il catalogo. Per ognuno ti dico il blocco JSON da aggiungere al config:

### FFmpeg (editing video)
```json
"ffmpeg-video": {
  "command": "npx",
  "args": ["-y", "video-editor-mcp"]
}
```
Richiede FFmpeg installato sul PC (Mac: brew install ffmpeg).

### ComfyUI (generazione immagini/video AI)
```json
"comfyui": {
  "command": "npx",
  "args": ["-y", "comfyui-mcp"],
  "env": { "COMFYUI_URL": "http://localhost:8188" }
}
```
Richiede ComfyUI installato e in esecuzione, e una GPU.

### MD Book Tools (gestione libri in Markdown)
```json
"md-book": {
  "command": "npx",
  "args": ["-y", "md-book-tools"]
}
```

### Ebook MCP (leggere/analizzare ebook)
```json
"ebook": {
  "command": "npx",
  "args": ["-y", "ebook-mcp"]
}
```

### Markdownify (convertire qualsiasi cosa in Markdown)
```json
"markdownify": {
  "command": "npx",
  "args": ["-y", "markdownify-mcp"]
}
```

## REGOLE
- Parla sempre in italiano
- Non cancellare mai configurazioni esistenti senza chiedermi
- Mostra sempre i cambiamenti prima di farli
- Se qualcosa non funziona, prova a cambiare "npx" con "bunx"
- Sii paziente, non so programmare

---FINE---
