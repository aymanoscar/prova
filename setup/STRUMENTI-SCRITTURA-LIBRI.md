# Strumenti Open Source per Scrivere Libri con Claude

## SPECIFICI PER CLAUDE CODE — Scrittura Libri

### 1. Claude-Code-Novel-Writer
- **Cosa fa**: Sistema autonomo per scrivere romanzi interi (100,000+ parole)
- **Come funziona**: 7 sub-agenti specializzati, monitoraggio qualita' in tempo reale, auto-correzione errori
- **Costo**: Gratuito, open source
- **Link**: https://github.com/forsonny/Claude-Code-Novel-Writer
- **Utile per**: Chi vuole generare bozze lunghe e poi rielaborarle

### 2. Claude Book (Framework Multi-Agente)
- **Cosa fa**: Sistema di scrittura orchestrato con sub-agenti per controllo coerenza
- **Come funziona**: Usa sub-agenti per verificare continuita', stile, qualita'
- **Costo**: Gratuito
- **Link**: https://hackernoon.com/claude-book-a-multi-agent-framework-for-writing-novels-with-claude-code
- **Utile per**: Progetti di scrittura complessi con molti personaggi/trame

### 3. Claude EPUB Skill (MOLTO UTILE)
- **Cosa fa**: Converte i tuoi capitoli scritti in Markdown in formato EPUB (leggibile su Kindle)
- **Come funziona**: E' una skill — la copi nella cartella skills e Claude la usa automaticamente
- **Costo**: Gratuito, open source
- **Link**: https://github.com/smerchek/claude-epub-skill
- **Utile per**: Esportare il tuo libro in formato ebook senza usare software complicato

### 4. Webnovel Writer
- **Cosa fa**: Pipeline completa per scrivere web novel con 8 agenti specializzati
- **Agenti inclusi**: context-agent, data-agent, consistency-checker, continuity-checker,
  pacing-checker, OOC-checker (fuori personaggio), high-point-checker, reader-pull-checker
- **Costo**: Gratuito, open source
- **Link**: https://openclawapi.org/en/blog/2026-03-07-webnovel-writer-claude-code
- **Utile per**: Fiction seriale, romanzi con struttura a capitoli

### 5. StoryCraftr (CLI Open Source)
- **Cosa fa**: Tool AI per creare storie, worldbuilding, outline e capitoli via terminale
- **Come funziona**: CLI + estensione VS Code, mantieni pieno controllo
- **Costo**: Gratuito, open source
- **Link**: https://github.com/raestrada/storycraftr
- **Utile per**: Chi vuole un tool dedicato alla scrittura creativa

---

## MCP SERVER PER SCRITTURA

### MD Book Tools (IL PIU' UTILE PER TE)
- **Cosa fa**: Legge e scrive libri in Markdown con supporto capitoli
- **Formati**: mdBook, GitBook, Leanpub, Bookdown, auto-detection
- **Funzioni**: Inizializza progetti libro, aggiungi capitoli, genera indice (TOC),
  leggi capitoli interattivamente, estrai metadati (titolo, autore, ecc.)
- **MCP**: Si integra con Claude Code come server MCP
- **Link**: https://lobehub.com/mcp/bobmatnyc-md-book
- **Utile per**: Gestire la struttura del libro direttamente da Claude

### Ebook-MCP
- **Cosa fa**: Server MCP per leggere e processare ebook (EPUB, PDF)
- **Come funziona**: Puoi "conversare" con i tuoi libri — fare domande sul contenuto
- **Link**: https://github.com/onebirdrocks/ebook-mcp
- **Utile per**: Ricerca, analisi di libri di riferimento, studio

### Markdownify-MCP
- **Cosa fa**: Converte qualsiasi cosa in Markdown (PDF, immagini, pagine web, audio)
- **Link**: https://github.com/zcaceres/markdownify-mcp
- **Utile per**: Convertire appunti, ricerche, materiale di riferimento in formato lavorabile

---

## SOFTWARE TRADIZIONALI (Non-AI, Open Source, Gratuiti)

### Per Scrivere

| Software | Cosa fa | Ideale per |
|----------|---------|------------|
| **Manuskript** | Organizzazione completa: outline, personaggi, trame, metodo snowflake | Romanzi complessi |
| **yWriter** | Divide il manoscritto in scene e capitoli, traccia personaggi/luoghi | Narrativa organizzata |
| **FocusWriter** | Scrittura senza distrazioni, interfaccia minimalista | Concentrazione |
| **LibreOffice Writer** | Word processor completo, gratuito | Scrittura tradizionale |

### Per Pubblicare

| Software | Cosa fa | Ideale per |
|----------|---------|------------|
| **Calibre** | Converte tra formati ebook (EPUB, PDF, MOBI, Kindle) | Self-publishing |
| **Pandoc** | Converte Markdown in PDF, EPUB, DOCX, HTML (da terminale) | Conversione automatica |
| **Sigil** | Editor EPUB visuale | Formattazione ebook |
| **Scribus** | Desktop publishing (come InDesign ma gratis) | Layout libro stampato |

### Per Organizzare il Progetto

| Software | Cosa fa | Ideale per |
|----------|---------|------------|
| **Obsidian** | Note in Markdown collegate tra loro (grafo di conoscenza) | Worldbuilding, ricerca |
| **Logseq** | Simile a Obsidian, open source | Note e outline |
| **GitBook** | Scrittura collaborativa con versioning | Libri tecnici/non-fiction |

---

## IL WORKFLOW CONSIGLIATO PER TE

Dato che usi Claude Desktop e non sai programmare, ecco il flusso piu' semplice:

```
1. SCRIVI i capitoli in Markdown
   (file .md semplici, Claude ti aiuta)
        |
        v
2. ORGANIZZA con MD Book Tools (MCP)
   (Claude gestisce capitoli, indice, struttura)
        |
        v
3. REVISIONA con Claude
   (chiedigli di controllare coerenza, stile, errori)
        |
        v
4. ESPORTA con Claude EPUB Skill
   (da Markdown a EPUB per Kindle/ebook)
        |
        v
5. CONVERTI con Calibre (se serve)
   (da EPUB a PDF, MOBI, o altri formati)
```

### Perche' Markdown?

Markdown e' un formato di testo semplicissimo. Esempio:

```markdown
# Capitolo 1 — Il viaggio inizia

Era una mattina fredda quando Marco usci' di casa.
Il cielo era **grigio** come il suo umore.

## La stazione

Il treno delle 7:15 era *sempre* in ritardo.
```

- `#` = titolo grande (capitolo)
- `##` = sottotitolo
- `**grassetto**` = grassetto
- `*corsivo*` = corsivo

E' tutto qui. Non serve sapere programmare.

---

## LINK RAPIDI

- Claude EPUB Skill: https://github.com/smerchek/claude-epub-skill
- Claude Novel Writer: https://github.com/forsonny/Claude-Code-Novel-Writer
- StoryCraftr: https://github.com/raestrada/storycraftr
- MD Book Tools MCP: https://lobehub.com/mcp/bobmatnyc-md-book
- Ebook MCP: https://github.com/onebirdrocks/ebook-mcp
- Markdownify MCP: https://github.com/zcaceres/markdownify-mcp
- Manuskript: https://www.theologeek.ch/manuskript/
- Calibre: https://calibre-ebook.com/
- Pandoc: https://pandoc.org/
- Guida Self-Publishing Markdown: https://gist.github.com/caseywatts/3d8150fe04e0d8462cfc4d51b9856d39
