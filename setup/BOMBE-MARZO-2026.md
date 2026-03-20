# BOMBE DI MARZO 2026 — I Tool/Plugin/MCP Piu' Esplosivi

## PLUGIN CHE SPACCANO

### 1. Feature-Dev (UFFICIALE ANTHROPIC) — 89,000+ installi
IL plugin piu' popolare di Claude Code. Workflow automatico in 7 fasi:
1. Capisce i requisiti
2. Esplora il codebase
3. Fa domande per chiarire
4. Progetta l'architettura
5. Implementa il codice
6. Revisione qualita'
7. Sommario finale

**3 agenti specializzati inclusi:**
- code-explorer (mappa l'architettura)
- code-architect (propone approcci con pro/contro)
- code-reviewer (trova bug, problemi sicurezza)

**COME INSTALLARE:**
```
/plugin marketplace add anthropics/claude-code
/plugin install feature-dev
```
Poi basta scrivere: `/feature-dev Aggiungi autenticazione utente`

**Link:** https://github.com/anthropics/claude-code/tree/main/plugins/feature-dev

---

### 2. Claude-Mem — Memoria Permanente tra Sessioni
Cattura TUTTO quello che Claude fa durante le sessioni, lo comprime con AI,
e lo re-inietta nelle sessioni future. Non perdi mai il contesto.

**Come funziona:**
- Registra ogni comando, modifica, decisione
- Comprime in riassunti semantici
- Ricerca vettoriale: "cosa abbiamo fatto la scorsa settimana?"
- Funziona cross-progetto
- Tutto LOCALE sul tuo PC (SQLite + Chroma)

**COME INSTALLARE:**
```
/plugin marketplace add thedotmack/claude-mem
/plugin install claude-mem
```

**Link:** https://github.com/thedotmack/claude-mem

---

### 3. Ars Contexta — Secondo Cervello Personalizzato (~2,700 stars)
Il piu' intelligente: genera un sistema di conoscenza PERSONALIZZATO su di te.
Tu parli con Claude, lui crea un "vault" (archivio) di file Markdown
collegati tra loro che riflettono come TU pensi e lavori.

**Cosa genera:**
- Struttura cartelle su misura per il tuo modo di pensare
- Pipeline di elaborazione automatica
- Note collegate da wiki links (come Obsidian)
- Hooks per auto-commit e manutenzione
- 10 comandi: setup, help, ask, health, recommend, architect...

**LA BOMBA:** Puoi disinstallare il plugin e il sistema continua a funzionare
perche' sono solo file Markdown tuoi.

**COME INSTALLARE:**
```
/plugin marketplace add agenticnotetaking/arscontexta
/plugin install arscontexta
```

**Link:** https://github.com/agenticnotetaking/arscontexta

---

### 4. Superpowers — 92,100 stars su GitHub (IL PIU' STELLATO)
Framework di skills agentiche per sviluppo software:
planning, TDD, debugging, code review. In cima ai trending di GitHub.

**Link:** https://github.com/obra/superpowers

---

### 5. Second Brain Skills (Cole Medin)
Collezione di skills che trasformano Claude Code in un sistema per
catturare e usare conoscenza: integrazioni esterne, video, presentazioni,
documentazione, sviluppo skills.

**Link:** https://github.com/coleam00/second-brain-skills

---

## MCP SERVER BOMBA DI MARZO 2026

### 6. mTarsier — Gestore Unificato MCP (Lanciato 16 Marzo 2026)
App desktop GRATIS che gestisce TUTTI i tuoi server MCP da UN SOLO posto.
- Supporta 12+ client: Claude Desktop, Claude Code, Cursor, VS Code, ChatGPT...
- Dashboard unica per tutti i server
- Validazione JSON (trova errori prima che rompano tutto)
- Marketplace integrato per installare server con un click
- Gira tutto locale, nessun account richiesto
- Mac, Windows, Linux

**Link:** https://github.com/mcp360/mtarsier (MIT license)

---

### 7. Figma MCP (Aggiornato 6 Marzo 2026)
Ora puo' GENERARE layer di design da VS Code, non solo leggerli.
Workflow bidirezionale: design → codice → design → codice.

---

### 8. GitHub MCP — Secret Scanning (17 Marzo 2026)
Scansiona il codice per segreti esposti (password, token API) PRIMA del commit.
Prevenzione leak in tempo reale.

---

### 9. Codebase Feature Graph (Nuovo Marzo 2026)
Trasforma codebase grandi in un grafo navigabile e cercabile.
Combina AST parsing + spectral clustering + link stile Obsidian.
Utile per capire progetti enormi.

---

### 10. AI Content Pipeline (Nuovo Marzo 2026)
Pipeline completa: scoperta trending topic → ricerca → generazione contenuto → pubblicazione multi-piattaforma.

---

## CHANNELS — LA NOVITA' PIU' GROSSA (20 Marzo 2026)

Claude Code ora e' raggiungibile da **Telegram** e **Discord**.
Puoi mandare un messaggio al bot dal telefono e Claude lavora sul tuo PC.

**Setup Telegram:**
1. Apri @BotFather su Telegram, crea un bot con /newbot
2. In Claude Code: `/plugin install telegram@claude-plugins-official`
3. Avvia: `claude --channels plugin:telegram@claude-plugins-official`
4. Scrivi al bot su Telegram, ricevi il codice di pairing

**Setup Discord:**
1. Vai su Discord Developer Portal, crea applicazione
2. Abilita Message Content Intent
3. Genera URL OAuth2, aggiungi bot al server
4. DM al bot per il pairing

**Requisiti:** Claude Code v2.1.80+, Bun runtime, login claude.ai

---

## /voice — PARLA CON CLAUDE (3 Marzo 2026)

- `/voice` per attivare
- Tieni SPAZIO, parla, rilascia
- 20 lingue incluso ITALIANO
- Speech-to-text (non ti risponde a voce)
- Alternativa bidirezionale: VoiceMode MCP (open source)
  https://github.com/mbailey/voicemode

---

## PROMOZIONE LIMITI DOPPI (fino al 27 Marzo!)

- TUTTI i piani (anche FREE) raddoppiati
- Off-peak: Lun-Ven fuori 14:00-20:00 (ora italiana), Sab-Dom 24/7
- Automatico, non devi fare nulla
- SCADE il 27 Marzo 2026

---

## INSTALLAZIONE RAPIDA — Le 5 bombe da avere SUBITO

In Claude Code, esegui questi comandi uno dopo l'altro:

```
/plugin marketplace add anthropics/claude-code
/plugin install feature-dev

/plugin marketplace add thedotmack/claude-mem
/plugin install claude-mem

/plugin marketplace add agenticnotetaking/arscontexta
/plugin install arscontexta
```

Per i Channels (Telegram):
```
/plugin install telegram@claude-plugins-official
claude --channels plugin:telegram@claude-plugins-official
```
