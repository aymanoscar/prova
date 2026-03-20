# Generazione Video con Claude — Guida Completa

## SI, E' POSSIBILE! Ecco come.

Ci sono 3 livelli di possibilita', dal piu' semplice al piu' avanzato:

---

## LIVELLO 1 — Video Editing con FFmpeg MCP (Facile)

Claude puo' montare, tagliare, unire, convertire video usando FFmpeg
attraverso linguaggio naturale. Tu dici cosa vuoi, lui lo fa.

### Video Editor MCP Server (di Kush Agrawal)
- **Cosa fa:** Trimming, merge, filtri, conversione, estrazione audio
- **Come funziona:** Tu dici "Taglia i primi 30 secondi del video" e lui lo fa
- **Requisiti:** FFmpeg installato sul PC
- **Link:** https://playbooks.com/mcp/kush36agrawal-video-editor

### FFmpeg MCP Lite (di kevinwatt)
- **Cosa fa:** Conversione, compressione, trimming, estrazione audio
- **Come funziona:** Linguaggio naturale → comandi FFmpeg
- **Link:** https://glama.ai/mcp/servers/@kevinwatt/ffmpeg-mcp-lite

### Video Processing Skill (su MCP Market)
- **Cosa fa:** Trasforma Claude in un ingegnere video specializzato
- **Capacita':** Trimming frame-accurate, mixing audio multi-traccia,
  normalizzazione colore, sottotitoli
- **Link:** https://mcpmarket.com/es/tools/skills/video-processing-editing

**Configurazione per Claude Desktop:**
```json
{
  "mcpServers": {
    "ffmpeg-video": {
      "command": "npx",
      "args": ["-y", "video-editor-mcp"]
    }
  }
}
```

**Requisito:** Installa FFmpeg sul PC
- Mac: `brew install ffmpeg`
- Windows: scarica da https://ffmpeg.org/download.html

---

## LIVELLO 2 — Generazione Immagini/Video con ComfyUI MCP (Intermedio)

ComfyUI e' il framework open source piu' potente per generazione AI.
Con un MCP server, Claude lo controlla direttamente.

### ComfyUI MCP (di artokun) — IL PIU' COMPLETO
- **31 tool MCP**, 10 slash commands, 4 skills, 3 agenti
- Esegui workflow, genera immagini, visualizza pipeline
- Gestisci modelli, controlla VRAM, esplora nodi
- Monitor progresso in tempo reale via WebSocket
- **Link:** https://github.com/artokun/comfyui-mcp

### ComfyUI MCP (di Peleke) — IL PIU' AVANZATO
- Text-to-image, upscaling, ControlNet, inpainting
- Text-to-speech con F5-TTS
- **VIDEO lip-sync con SONIC** (talking head)
- Segmentazione intelligente (GroundingDINO + SAM)
- **Link:** https://github.com/Peleke/comfyui-mcp

### ComfyUI MCP (di shawnrushefsky)
- Genera immagini, audio, video e 3D
- Setup Docker facile
- **Link:** https://github.com/shawnrushefsky/comfyui-mcp

### Come funziona il combo Claude + ComfyUI

```
Tu: "Genera un video di 5 secondi di un tramonto sulla spiaggia"
  ↓
Claude (via MCP) → ComfyUI (sul tuo PC con GPU)
  ↓
ComfyUI scarica/usa il modello AI → genera il video
  ↓
Claude ti restituisce il file video
```

**Requisiti:**
- ComfyUI installato (https://github.com/comfyanonymous/ComfyUI)
- Una GPU con almeno 8-12GB VRAM (meglio 24GB)
- I modelli AI scaricati dentro ComfyUI

---

## LIVELLO 3 — Produzione Video Completa (Avanzato)

### Claude Code Video Toolkit (di DigitalSamba) — IL TOOLKIT COMPLETO

Un toolkit completo che trasforma Claude in uno studio di produzione video.

**Cosa include:**

| Componente | Cosa fa |
|------------|---------|
| **Remotion** | Claude scrive le scene in TypeScript, Remotion le renderizza in video |
| **ElevenLabs** | Voiceover AI, musica di sottofondo, effetti sonori |
| **SadTalker** | Genera talking head (faccia parlante) da una foto + audio |
| **Qwen3-TTS** | Text-to-speech gratuito (alternativa locale a ElevenLabs) |
| **FLUX.2** | Generazione immagini AI (alternativa locale a DALL-E) |
| **FFmpeg** | Post-produzione, conversione, compressione |
| **Playwright** | Registrazione demo di app/siti web |

**Comandi:**
- `/video` — Avvia un progetto video (o riprendi dove eri rimasto)
- `/record-demo` — Registra una demo del tuo sito/app automaticamente

**Workflow tipo:**
1. Tu: "Crea un video explainer sul mio prodotto"
2. Claude scrive lo script
3. Genera la voce (ElevenLabs o Qwen3-TTS locale)
4. Crea le scene animate (Remotion)
5. Aggiunge transizioni e branding
6. Renderizza il video finale

**Container Docker inclusi:**
- `video-toolkit-sadtalker` — Talking head generation
- `video-toolkit-tts` — Text-to-speech (Qwen3, gratis)
- `video-toolkit-flux` — Generazione immagini (FLUX.2, gratis)

**Link:** https://github.com/digitalsamba/claude-code-video-toolkit

**Installazione:**
```bash
git clone https://github.com/digitalsamba/claude-code-video-toolkit.git
cd claude-code-video-toolkit
# Apri con Claude Code e usa /video
```

### ComfyUI Expert (di MCKRUZ)
- 12 skills specializzate per Claude Code
- Image gen, video, voice cloning, LoRA training, publishing
- **Link:** https://github.com/MCKRUZ/ComfyUI-Expert

### Claude + Remotion Kickstart (di jhartquist)
- Template per creare video programmaticamente con Claude + Remotion
- **Link:** https://github.com/jhartquist/claude-remotion-kickstart

---

## MODELLI VIDEO AI OPEN SOURCE (Gratis, locali)

Se vuoi generare video AI sul tuo PC senza abbonamenti:

| Modello | Qualita' | VRAM Minima | Licenza | Note |
|---------|----------|-------------|---------|------|
| **Wan 2.2** (Alibaba) | Eccellente | 12-24 GB | Apache 2.0 | IL MIGLIORE open source |
| **HunyuanVideo 1.5** (Tencent) | Ottima | 14+ GB | Open | 8.3B parametri |
| **Open-Sora 2.0** | Buona | 40+ GB | Apache 2.0 | Clone di Sora |
| **LTX-Video** (Lightricks) | Buona | 12 GB | Open | IL PIU' VELOCE |
| **SkyReels V1** | Cinematica | 24+ GB | Open | Stile film/TV |
| **Mochi 1** (Genmo) | Buona | 24+ GB | Apache 2.0 | Fotorealistico |
| **CogVideoX-5B** | Discreta | 12 GB | Open | Leggero, clip 6 sec |

**Come usarli:** Installa ComfyUI + il modello → collega con ComfyUI MCP → Claude li controlla

---

## COSA TI CONSIGLIO IN BASE AL TUO LIVELLO

### Se NON hai una GPU potente (laptop normale):
→ Usa **FFmpeg MCP** per editing video
→ Usa **Remotion + ElevenLabs** (nel Video Toolkit) per video animati
→ Per generazione AI pura, usa piattaforme gratuite come PixVerse (60 crediti/giorno gratis)

### Se HAI una GPU (RTX 3060 12GB o superiore):
→ Installa **ComfyUI** + **Wan 2.2** o **LTX-Video**
→ Collega con **ComfyUI MCP**
→ Claude controlla tutto dal prompt

### Se vuoi il MASSIMO:
→ **Claude Code Video Toolkit** completo
→ ComfyUI con Wan 2.2 + SkyReels
→ ElevenLabs per voce (o Qwen3-TTS gratis)
→ SadTalker per talking head
→ Remotion per scene animate

---

## CONFIGURAZIONE CLAUDE DESKTOP — Aggiungi Video

Aggiungi questo al `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "ffmpeg-video": {
      "command": "npx",
      "args": ["-y", "video-editor-mcp"]
    },
    "comfyui": {
      "command": "npx",
      "args": ["-y", "comfyui-mcp"],
      "env": {
        "COMFYUI_URL": "http://localhost:8188"
      }
    }
  }
}
```

## LINK RAPIDI

- Video Toolkit: https://github.com/digitalsamba/claude-code-video-toolkit
- ComfyUI MCP (completo): https://github.com/artokun/comfyui-mcp
- ComfyUI MCP (avanzato): https://github.com/Peleke/comfyui-mcp
- FFmpeg MCP: https://playbooks.com/mcp/kush36agrawal-video-editor
- ComfyUI: https://github.com/comfyanonymous/ComfyUI
- Wan 2.2 su ComfyUI: cerca "Wan 2.2 ComfyUI workflow" su YouTube
- Remotion: https://www.remotion.dev/
