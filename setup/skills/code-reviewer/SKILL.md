---
description: "Revisione codice approfondita con focus su sicurezza, performance e leggibilita'"
trigger: "quando l'utente chiede una review, revisione, o controllo del codice"
---

# Code Reviewer

Quando rivedi il codice, segui questa checklist:

## Sicurezza
- Controlla input validation
- Cerca SQL injection, XSS, command injection
- Verifica che segreti/password non siano hardcoded
- Controlla permessi e autenticazione

## Performance
- Cerca loop non necessari o query N+1
- Verifica che non ci siano memory leak
- Controlla uso efficiente delle risorse

## Leggibilita'
- Nomi variabili chiari e descrittivi
- Funzioni brevi e con singola responsabilita'
- Commenti solo dove la logica non e' ovvia

## Output
Fornisci un report strutturato con:
1. Problemi CRITICI (da risolvere subito)
2. Suggerimenti (miglioramenti consigliati)
3. Note positive (cosa va bene)
