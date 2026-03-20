# Novita' Claude & Ecosistema — Marzo 2026

## CLAUDE CODE — Nuove Funzionalita' Marzo 2026

### /voice — Modalita' Vocale (NOVITA' TOP)
- Attiva con `/voice` nel terminale
- Push-to-talk: tieni premuto SPAZIO, parla, rilascia
- NON e' un ascolto continuo — si attiva solo quando premi
- Puoi mescolare testo e voce nella stessa sessione
- Speech-to-text: tu parli, lui trascrive e esegue (non ti risponde a voce)
- 20 lingue supportate incluso ITALIANO
- Tasto personalizzabile in `keybindings.json`
- Gratis per chi ha un piano Claude a pagamento
- Disponibilita': in rollout graduale (~5% utenti, poi tutti)
- Per aggiornare: `npm update -g @anthropic-ai/claude-code`

### /loop — Task Ricorrenti
- Nuovo comando per eseguire prompt a intervalli regolari
- Esempio: `/loop 5m controlla il deploy` (ogni 5 minuti)
- Utile per monitoraggio, polling, task ripetitivi

### Channels — Telegram e Discord (NOVITA' TOP, 20 Marzo 2026)
- Claude Code ora puo' ricevere e inviare messaggi su Telegram e Discord
- Tu scrivi a un bot Telegram/Discord, il messaggio arriva a Claude Code
- Claude risponde e la risposta torna su Telegram/Discord
- Setup Telegram: crea bot con @BotFather, installa plugin, avvia con `--channels`
- Setup Discord: crea app nel Developer Portal, configura permessi
- Richiede: Claude Code v2.1.80+, runtime Bun, login claude.ai
- Research preview — puo' cambiare

### 1 Milione di Token Context Window
- Ora disponibile su Max, Team, Enterprise
- Significa che Claude puo' "leggere" molto piu' contenuto in una sessione

### Opus 4.6 come Modello Default
- Output fino a 64k token (prima era meno)
- Limite superiore fino a 128k token per Opus 4.6 e Sonnet 4.6

### MCP Elicitation (v2.1.73)
- I server MCP possono ora chiedere input strutturato all'utente durante il lavoro
- Apre un dialogo interattivo (form o URL nel browser)

### Altre Novita'
- `/effort` semplificato: basso/medio/alto (simboli: o 0 ●)
- Keyword "ultrathink" per massimo sforzo di ragionamento
- `-n / --name` per dare un nome alle sessioni
- Rate limits visibili nella statusline
- Plugin marketplace inline in settings.json
- Sparse worktrees per monorepo grandi
- Sandbox `allowRead` per permessi file granulari

---

## ANTHROPIC — Annunci Marzo 2026

### Promozione Limiti Doppi (13-27 Marzo 2026)
- TUTTI i piani (anche FREE) hanno il doppio dei limiti
- Solo durante ore off-peak:
  - Lunedi'-Venerdi': fuori dalla fascia 8AM-2PM Eastern (14:00-20:00 ora italiana)
  - Sabato-Domenica: 24 ore su 24
- Automatico, non serve fare nulla
- NON scala dai limiti settimanali — e' capacita' aggiuntiva
- Scade: 27 Marzo 2026 alle 23:59 PT

### Claude Partner Network
- $100 milioni di investimento annunciato il 12 Marzo
- Network di partner per integrazioni e sviluppo

### Enterprise Self-Serve
- Piani Enterprise acquistabili direttamente dal sito, senza parlare con Sales

### Visualizzazioni Inline
- Claude puo' creare grafici, diagrammi e visualizzazioni direttamente nelle risposte

### Web Search & Code Execution
- Web search e programmatic tool calling ora in GA (disponibilita' generale)
- Code execution GRATIS quando usato con web search/fetch

---

## MCP PROTOCOL — Roadmap 2026 (Pubblicata 9 Marzo)

### 4 Priorita'
1. **Scalabilita' Transport** — HTTP stateless, load balancer, "MCP Server Cards" per discovery
2. **Comunicazione tra Agenti** — Task asincroni, sampling agentico
3. **Governance** — Standard aperto sotto Linux Foundation, contributor ladder
4. **Enterprise Ready** — Audit trail, SSO, gateway, configurazione portabile

### Numeri Ecosistema
- 10,000+ server MCP pubblici attivi
- SDK ufficiali Python e TypeScript con 97M+ download mensili
- Adottato da: ChatGPT, Cursor, VS Code, Copilot, e molti altri

---

## PLUGIN PIU' POPOLARI — Marzo 2026

| Plugin | Installi | Cosa fa |
|--------|----------|---------|
| **Feature-Dev** | 89,000+ | Workflow 7 fasi: requisiti → architettura → implementazione → test → review → docs |
| **Code-Review** | Ufficiale | Review gratuita, nessun piano richiesto |
| **Batch** | - | Decompone lavoro in 5-30 unita', worktree paralleli, crea PR automatiche |
| **Superpowers** | 92,100 stars | Framework skills per TDD, debugging, code review |
| **Dev-Browser** | - | Navigazione web leggera, alternativa a Playwright |
| **Claude-Mem** | - | Memoria long-term tra sessioni |

---

## TOOL AI GRATUITI — Marzo 2026

| Tool | Tipo | Nota |
|------|------|------|
| **OpenCode** | CLI open source | 95k+ stars, alternativa a Claude Code, qualsiasi modello |
| **Aider** | Pair programming | Terminale, qualsiasi LLM, auto-commit git |
| **Cline** | VS Code extension | Agentico, MCP integrato, 5M+ sviluppatori |
| **Roo Code** | VS Code extension | Fork di Cline, multi-mode (Code/Architect/Debug) |
| **Continue** | Autopilot dev | 20k+ stars, qualsiasi LLM locale o cloud |
| **Tabby** | Self-hosted | Rust, completion + chat, infrastruttura privata |
| **VoiceMode MCP** | Voce bidirezionale | Parla E ascolta Claude, open source |

---

## LINK UTILI

- [Claude Code Changelog](https://code.claude.com/docs/en/changelog)
- [Claude Code Releases GitHub](https://github.com/anthropics/claude-code/releases)
- [Claude Code Channels Docs](https://code.claude.com/docs/en/channels)
- [MCP Roadmap 2026](http://blog.modelcontextprotocol.io/posts/2026-mcp-roadmap/)
- [Promozione Limiti Doppi](https://support.claude.com/en/articles/14063676-claude-march-2026-usage-promotion)
- [VoiceMode MCP](https://github.com/mbailey/voicemode)
- [OpenCode](https://opencode.ai/)
