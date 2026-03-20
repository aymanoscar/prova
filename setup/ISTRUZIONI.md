# Come Installare Tutto — Guida per chi NON programma

## Cosa ti serve sul PC (una volta sola)

### 1. Node.js (il "motore" che fa girare gli MCP)

- Vai su https://nodejs.org
- Scarica la versione LTS (il bottone verde grande)
- Installalo come un qualsiasi programma (avanti, avanti, fine)
- Per verificare: apri il Terminale (Mac) o Prompt dei comandi (Windows) e scrivi:
  ```
  node --version
  ```
  Se vedi un numero tipo `v22.x.x` sei a posto.

## Come installare gli MCP Server

### METODO FACILE (consigliato)

1. Apri Claude Desktop sul tuo PC
2. Digli:

> "Ho scaricato un file claude_desktop_config.json che contiene la configurazione per 5 MCP server: memory, sequential-thinking, filesystem, context7 e playwright. Puoi installarmeli? Il file e' sul Desktop nella cartella setup. Prima pero' controlla se ho gia' qualche MCP configurato e non sovrascriverlo."

Claude Desktop ha accesso al tuo PC e puo' farlo per te.

### METODO MANUALE (se preferisci fare da solo)

#### Su Mac:
1. Apri Finder
2. Premi `Cmd + Shift + G`
3. Incolla: `~/Library/Application Support/Claude/`
4. Se esiste gia' un file `claude_desktop_config.json`, APRILO e aggiungi i server
5. Se NON esiste, copia il file dalla cartella `setup/`
6. Chiudi e riapri Claude Desktop

#### Su Windows:
1. Premi `Win + R`
2. Scrivi: `%APPDATA%\Claude\`
3. Se esiste gia' un file `claude_desktop_config.json`, APRILO e aggiungi i server
4. Se NON esiste, copia il file dalla cartella `setup/`
5. Chiudi e riapri Claude Desktop

### IMPORTANTE — Personalizzare il file

Nel file `claude_desktop_config.json` c'e' scritto `/Users/TUONOME/Desktop`.
Devi sostituire `TUONOME` con il tuo nome utente del computer.

- Mac: di solito e' `/Users/ayman/Desktop`
- Windows: di solito e' `C:\\Users\\ayman\\Desktop`

Questo serve solo per il server "filesystem" (quello che permette a Claude di leggere file dal tuo PC).

## Come installare le Skills

Le skills sono semplici file di testo. Per installarle:

1. Copia tutta la cartella `skills/` che trovi in questa repo
2. Mettila in `~/.claude/skills/` sul tuo PC:
   - Mac: `/Users/TUONOME/.claude/skills/`
   - Windows: `C:\Users\TUONOME\.claude\skills\`
3. Fatto. Claude le trova automaticamente.

## Cosa fa ogni MCP Server

| Server | A cosa serve | Esempio d'uso |
|--------|-------------|---------------|
| **memory** | Claude si ricorda cose tra una chat e l'altra | "Ricordati che il mio progetto usa React" |
| **sequential-thinking** | Claude ragiona passo-passo su problemi complessi | Si attiva da solo su problemi difficili |
| **filesystem** | Claude legge e scrive file sul tuo PC | "Leggi il file sul Desktop e modificalo" |
| **context7** | Claude accede a documentazione aggiornata | "use context7 — come funziona Next.js 15?" |
| **playwright** | Claude naviga siti web per te | "Vai su quel sito e compila il form" |

## Verifica che funziona

Dopo aver riavviato Claude Desktop:
1. Apri una nuova chat
2. Scrivi: "Quali strumenti MCP hai disponibili?"
3. Claude ti elenchera' tutti i server attivi
4. Se ne manca qualcuno, probabilmente Node.js non e' installato o il file JSON ha un errore

## Problemi comuni

- **"npx: command not found"** → Node.js non e' installato. Torna al punto 1.
- **Claude non vede i server** → Hai riavviato Claude Desktop dopo aver modificato il file?
- **Errore nel JSON** → Controlla che non manchino virgole o parentesi. Chiedi a Claude di controllare il file.
