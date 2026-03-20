# MEMORIA OPERATIVA — Istruzioni per Claude Desktop

## Chi sono

Sono Ayman. Non so programmare ma uso Claude per molti progetti inclusi agenti SDK.
Sto scrivendo un libro. Uso Obsidian e Notion. Creo video con piattaforme online.
Voglio potenziare Claude Desktop con MCP server, skills e plugin gratuiti.

## La mia repo di riferimento

Ho una repo su GitHub chiamata `aymanoscar/prova` (branch: `claude/research-online-sources-VmNaM`).
Dentro c'e' una cartella `setup/` con tutto il materiale pronto.

Se la repo e' gia' scaricata sul mio PC, cercala in:
- Desktop
- Documents
- Downloads
- Home directory

Il nome della cartella potrebbe essere `prova` o `prova-main` o `prova-claude-research-online-sources-VmNaM`.

Dentro troverai:
```
setup/
  claude_desktop_config.json      ← Configurazione 7 MCP server
  ISTRUZIONI.md                   ← Guida installazione
  NOVITA-MARZO-2026.md            ← Novita' marzo 2026
  BOMBE-MARZO-2026.md             ← Plugin/MCP esplosivi
  STRUMENTI-SCRITTURA-LIBRI.md    ← Tool per scrivere libri
  OBSIDIAN-E-NOTION-CON-CLAUDE.md ← Guida Obsidian + Notion
  VIDEO-CON-CLAUDE.md             ← Guida generazione video
  RIEPILOGO-COMPLETO.md           ← Indice di tutto
  MEMORIA-PER-CLAUDE-DESKTOP.md   ← Questo file
  skills/                         ← Skills pronte
    code-reviewer/SKILL.md
    project-planner/SKILL.md
    file-organizer/SKILL.md
```

## Cosa devi fare quando Ayman ti chiede di installare

### PASSO 1 — Verifica prerequisiti

Controlla che Node.js sia installato:
```bash
node --version
```
Se non e' installato, digli di scaricarlo da https://nodejs.org (versione LTS).

### PASSO 2 — Trova la configurazione esistente

Leggi il file di configurazione attuale di Claude Desktop:
- Mac: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

Se il file esiste gia', NON sovrascriverlo. Aggiungi i nuovi server a quelli esistenti.
Se il file non esiste, copia quello dalla repo (`setup/claude_desktop_config.json`).

### PASSO 3 — Personalizza la configurazione

Nel file di configurazione ci sono 3 cose da personalizzare:

1. **TUONOME** — Sostituisci con il nome utente del computer di Ayman.
   Per trovarlo: `whoami` nel terminale, oppure `echo $USER` (Mac) o `echo %USERNAME%` (Windows).

2. **PERCORSO-VAULT-OBSIDIAN** — Chiedi ad Ayman dove si trova il suo vault Obsidian.
   Di solito e' in Documents o nella home. Cercalo con:
   - Mac: `find ~ -name ".obsidian" -type d 2>/dev/null | head -5`
   - Windows: `dir /s /b "%USERPROFILE%\.obsidian" 2>nul`

3. **IL_TUO_TOKEN_NOTION** — Ayman deve crearlo su https://www.notion.so/my-integrations
   Guidalo passo passo:
   a) Vai su notion.so/my-integrations
   b) Clicca "New integration"
   c) Dai un nome (es: "Claude")
   d) Seleziona il workspace
   e) Copia il token (inizia con `ntn_` o `secret_`)
   f) Torna nelle pagine Notion che vuoi condividere
   g) Clicca "..." → "Connections" → aggiungi l'integrazione "Claude"

### PASSO 4 — Installa le skills

Copia la cartella `setup/skills/` dalla repo nella cartella skills di Claude:
- Mac: `~/.claude/skills/`
- Windows: `C:\Users\TUONOME\.claude\skills\`

Se la cartella `~/.claude/skills/` non esiste, creala.

Comandi (Mac):
```bash
mkdir -p ~/.claude/skills
cp -r setup/skills/* ~/.claude/skills/
```

### PASSO 5 — Installa i plugin (in Claude Code, non Desktop)

Se Ayman usa anche Claude Code (terminale), questi plugin si installano da li':

```
/plugin marketplace add anthropics/claude-code
/plugin install feature-dev

/plugin marketplace add thedotmack/claude-mem
/plugin install claude-mem
```

### PASSO 6 — Verifica

Dopo aver modificato il file di configurazione, dì ad Ayman di:
1. Chiudere COMPLETAMENTE Claude Desktop (non solo la finestra, ma Quit/Esci)
2. Riaprirlo
3. In una nuova chat, chiedere: "Quali strumenti MCP hai disponibili?"
4. Dovrebbero apparire: memory, sequential-thinking, filesystem, context7, playwright, obsidian, notion

## Catalogo completo di cosa puo' installare

Quando Ayman chiede "cosa posso installare?", consulta questa lista.
Ogni voce ha il file di riferimento nella repo con i dettagli.

### MCP Server (aggiungi al claude_desktop_config.json)

| Server | Gia' nel config? | File guida |
|--------|-------------------|------------|
| Memory | SI | ISTRUZIONI.md |
| Sequential Thinking | SI | ISTRUZIONI.md |
| Filesystem | SI | ISTRUZIONI.md |
| Context7 | SI | ISTRUZIONI.md |
| Playwright | SI | ISTRUZIONI.md |
| Obsidian (MCPVault) | SI | OBSIDIAN-E-NOTION-CON-CLAUDE.md |
| Notion | SI | OBSIDIAN-E-NOTION-CON-CLAUDE.md |
| FFmpeg Video Editor | NO | VIDEO-CON-CLAUDE.md |
| ComfyUI (immagini/video AI) | NO | VIDEO-CON-CLAUDE.md |
| MD Book Tools | NO | STRUMENTI-SCRITTURA-LIBRI.md |
| Ebook MCP | NO | STRUMENTI-SCRITTURA-LIBRI.md |
| Markdownify | NO | STRUMENTI-SCRITTURA-LIBRI.md |
| Forgejo (Codeberg) | NO | RIEPILOGO-COMPLETO.md |
| KEV (vulnerabilita') | NO | RIEPILOGO-COMPLETO.md |
| Shebe (ricerca codice) | NO | RIEPILOGO-COMPLETO.md |

### Plugin Claude Code (si installano con /plugin)

| Plugin | Comando installazione | File guida |
|--------|----------------------|------------|
| Feature-Dev | `/plugin install feature-dev@claude-plugins-official` | BOMBE-MARZO-2026.md |
| Claude-Mem | `/plugin install claude-mem` | BOMBE-MARZO-2026.md |
| Ars Contexta | `/plugin install arscontexta` | BOMBE-MARZO-2026.md |
| Notion Plugin | `/plugin install notion` | OBSIDIAN-E-NOTION-CON-CLAUDE.md |
| Telegram Channel | `/plugin install telegram@claude-plugins-official` | BOMBE-MARZO-2026.md |

### Skills (copia file .md)

| Skill | Nella repo? | File guida |
|-------|-------------|------------|
| Code Reviewer | SI (setup/skills/) | Pronta |
| Project Planner | SI (setup/skills/) | Pronta |
| File Organizer | SI (setup/skills/) | Pronta |
| Claude EPUB Skill | NO (da scaricare) | STRUMENTI-SCRITTURA-LIBRI.md |
| Video Processing | NO (da scaricare) | VIDEO-CON-CLAUDE.md |

### Software da installare sul PC (non MCP)

| Software | Per cosa | Link |
|----------|---------|------|
| Node.js | Far girare gli MCP server | https://nodejs.org |
| FFmpeg | Editing video | https://ffmpeg.org |
| ComfyUI | Generazione immagini/video AI | https://github.com/comfyanonymous/ComfyUI |
| Obsidian | Note e secondo cervello | https://obsidian.md |
| Calibre | Conversione ebook | https://calibre-ebook.com |
| Pandoc | Conversione documenti | https://pandoc.org |

## Come aggiungere un MCP server al config

Per aggiungere un nuovo server che NON e' gia' nel config, apri
`claude_desktop_config.json` e aggiungi un blocco dentro `"mcpServers"`:

```json
"nome-server": {
  "command": "npx",
  "args": ["-y", "nome-pacchetto-npm"]
}
```

Poi chiudi e riapri Claude Desktop.

## Regole importanti

- NON cancellare mai MCP server gia' configurati senza chiedere ad Ayman
- NON modificare file fuori dalla cartella di Claude Desktop senza chiedere
- Mostra sempre un'anteprima dei cambiamenti PRIMA di farli
- Se qualcosa non funziona, controlla che Node.js sia installato
- Se un MCP server non si avvia, prova a cambiare `npx` con `bunx`
- Parla sempre in italiano con Ayman
