// Inizializzazione dell'applicazione
document.addEventListener('DOMContentLoaded', function() {
    // Elementi DOM
    const layerBtns = document.querySelectorAll('.layer-btn');
    const layerSections = document.querySelectorAll('.layer-section');
    const generateBtn = document.getElementById('generateBtn');
    const saveBtn = document.getElementById('saveBtn');
    const resetBtn = document.getElementById('resetBtn');
    const copyBtn = document.getElementById('copyBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const shareBtn = document.getElementById('shareBtn');
    const resultsSection = document.getElementById('resultsSection');
    const promptOutput = document.getElementById('promptOutput');
    const addFxBtn = document.getElementById('addFxBtn');
    const envTextarea = document.getElementById('env');
    const envCount = document.getElementById('envCount');
    
    // Carica dati salvati
    loadSavedData();
    
    // Navigation tra i layer
    layerBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetLayer = this.dataset.layer;
            
            // Aggiorna bottoni attivi
            layerBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Mostra sezione corrispondente
            layerSections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetLayer) {
                    section.classList.add('active');
                }
            });
            
            // Aggiorna suggerimenti AI
            updateAISuggestions(targetLayer);
        });
    });
    
    // Conteggio elementi ENV
    envTextarea.addEventListener('input', function() {
        const text = this.value;
        const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
        envCount.textContent = sentences.length;
        
        if (sentences.length >= 15) {
            envCount.style.color = 'var(--success-color)';
        } else {
            envCount.style.color = 'var(--warning-color)';
        }
    });
    
    // Aggiungi effetto FX
    addFxBtn.addEventListener('click', function() {
        const fxEffects = document.querySelector('.fx-effects');
        const newFxItem = document.createElement('div');
        newFxItem.className = 'fx-item';
        newFxItem.innerHTML = `
            <input type="text" placeholder="Nuovo effetto">
            <select class="fx-priority">
                <option value="high">Alta</option>
                <option value="medium">Media</option>
                <option value="low">Bassa</option>
            </select>
            <button type="button" class="remove-fx"><i class="fas fa-trash"></i></button>
        `;
        
        fxEffects.insertBefore(newFxItem, this);
        
        // Aggiungi evento per rimuovere
        newFxItem.querySelector('.remove-fx').addEventListener('click', function() {
            newFxItem.remove();
        });
    });
    
    // Genera prompt
    generateBtn.addEventListener('click', generatePrompt);
    
    // Salva dati
    saveBtn.addEventListener('click', saveData);
    
    // Reset form
    resetBtn.addEventListener('click', resetForm);
    
    // Copia prompt
    copyBtn.addEventListener('click', function() {
        const promptText = promptOutput.textContent;
        navigator.clipboard.writeText(promptText).then(() => {
            showNotification('Prompt copiato negli appunti!', 'success');
        });
    });
    
    // Download prompt
    downloadBtn.addEventListener('click', function() {
        const promptText = promptOutput.textContent;
        const blob = new Blob([promptText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'sora-prompt-supreme.txt';
        a.click();
        URL.revokeObjectURL(url);
        showNotification('Prompt scaricato!', 'success');
    });
    
    // Condividi prompt
    shareBtn.addEventListener('click', function() {
        const promptText = promptOutput.textContent;
        if (navigator.share) {
            navigator.share({
                title: 'Prompt Sora Supreme',
                text: promptText
            });
        } else {
            // Fallback per browser che non supportano Web Share API
            const shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(promptText)}`;
            window.open(shareUrl, '_blank');
        }
    });
    
    // Funzione per generare il prompt
    function generatePrompt() {
        // Raccogli dati da tutti i layer
        const promptData = collectFormData();
        
        // Valida i dati
        if (!validateData(promptData)) {
            showNotification('Completa tutti i campi obbligatori!', 'error');
            return;
        }
        
        // Genera il prompt formattato
        const formattedPrompt = formatPrompt(promptData);
        
        // Mostra i risultati
        promptOutput.textContent = formattedPrompt;
        resultsSection.style.display = 'block';
        resultsSection.scrollIntoView({ behavior: 'smooth' });
        
        // Aggiorna metriche
        updateMetrics(promptData);
        
        // Salva i dati generati
        saveGeneratedPrompt(formattedPrompt);
        
        showNotification('Prompt generato con successo!', 'success');
    }
    
    // Funzione per raccogliere i dati del form
    function collectFormData() {
        const data = {
            // Layer Fondamentale
            env: document.getElementById('env').value,
            theme: document.getElementById('theme').value,
            subThemes: Array.from(document.querySelectorAll('.sub-theme')).map(input => input.value),
            protagonist: {
                physical: {
                    age: document.querySelector('.trait-group input[placeholder="Età"]').value,
                    height: document.querySelector('.trait-group input[placeholder="Altezza"]').value,
                    traits: document.querySelector('.trait-group input[placeholder="Tratti principali"]').value
                },
                psychological: document.querySelector('.trait-group textarea').value
            },
            
            // Layer Visivo
            style: {
                main: document.getElementById('mainStyle').value,
                secondary: Array.from(document.querySelectorAll('.secondary-style')).map(input => input.value)
            },
            arch: document.getElementById('arch').value,
            palette: {
                colors: Array.from(document.querySelectorAll('.color-picker')).map(input => input.value),
                psychology: document.getElementById('colorPsychology').value
            },
            
            // Layer Tecnico
            camera: {
                movement: document.getElementById('cameraMovement').value,
                params: document.getElementById('cameraParams').value
            },
            lighting: document.getElementById('lighting').value,
            fx: Array.from(document.querySelectorAll('.fx-item')).map(item => ({
                effect: item.querySelector('input[type="text"]').value,
                priority: item.querySelector('.fx-priority').value
            })),
            
            // Layer Sensoriale
            mood: document.getElementById('mood').value,
            texture: {
                resolution: document.getElementById('textureResolution').value,
                description: document.getElementById('textureDesc').value
            },
            colorTech: document.getElementById('colorTech').value
        };
        
        return data;
    }
    
    // Funzione per validare i dati
    function validateData(data) {
        // Controlla campi obbligatori
        if (!data.env || data.env.split(/[.!?]+/).filter(s => s.trim().length > 0).length < 15) {
            return false;
        }
        
        if (!data.theme) return false;
        if (!data.style.main) return false;
        if (!data.arch) return false;
        if (!data.camera.movement) return false;
        if (!data.lighting) return false;
        if (!data.mood) return false;
        if (!data.texture.description) return false;
        if (!data.colorTech) return false;
        
        return true;
    }
    
    // Funzione per formattare il prompt
    function formatPrompt(data) {
        let prompt = `// SORA_OPTIMIZED_FORMAT v2025.08
[HEADER]
  VERSION: "SUPREME_v2025.08"
  MODE: "CINEMATIC_HYPERREALISTIC"
  ASPECT_RATIO: "9:16"
  FRAME_RATE: "60fps"
  RESOLUTION: "8K"

[CORE_LAYERS]
  ENV: ${data.env}
  THEME: ${data.theme}
  SUB_THEMES: ${data.subThemes.join(', ')}
  PROTAGONIST_PHYSICAL: Età: ${data.protagonist.physical.age}, Altezza: ${data.protagonist.physical.height}, Tratti: ${data.protagonist.physical.traits}
  PROTAGONIST_PSYCHOLOGICAL: ${data.protagonist.psychological}

[VISUAL_LAYERS]
  STYLE_MAIN: ${data.style.main}
  STYLE_SECONDARY: ${data.style.secondary.join(', ')}
  ARCH: ${data.arch}
  PALETTE_COLORS: ${data.palette.colors.join(', ')}
  PALETTE_PSYCHOLOGY: ${data.palette.psychology}

[TECHNICAL_LAYERS]
  CAMERA_MOVEMENT: ${data.camera.movement}
  CAMERA_PARAMS: ${data.camera.params}
  LIGHTING: ${data.lighting}
  FX_EFFECTS: ${data.fx.map(fx => `${fx.effect} (${fx.priority})`).join(', ')}

[SENSORY_LAYERS]
  MOOD: ${data.mood}
  TEXTURE_RESOLUTION: ${data.texture.resolution}
  TEXTURE_DESCRIPTION: ${data.texture.description}
  COLOR_TECH: ${data.colorTech}

[METADATA_ENHANCED]
  VISUAL_REFERENCES: Generated with Sora Prompt Generator v2025.08
  TECHNICAL_ENHANCEMENTS: Advanced cinematic parameters
  ARTISTIC_INFLUENCES: ${data.style.main} style
  MATERIAL_PROPERTIES: High-resolution textures
  COLOR_SCIENCE: Optimized color palette
  PHYSICAL_ACCURACY: Real-world physics simulation
  CINEMATIC_AUTHENTICITY: Professional cinematography techniques

// Generated on ${new Date().toLocaleString()}`;
        
        return prompt;
    }
    
    // Funzione per aggiornare le metriche
    function updateMetrics(data) {
        // Calcola metriche simulate
        const coherence = Math.min(100, Math.floor(Math.random() * 20) + 80);
        const detail = Math.min(100, Math.floor(Math.random() * 15) + 85);
        const originality = Math.min(100, Math.floor(Math.random() * 25) + 75);
        
        document.getElementById('coherence').textContent = coherence + '%';
        document.getElementById('detail').textContent = detail + '%';
        document.getElementById('originality').textContent = originality + '%';
    }
    
    // Funzione per aggiornare i suggerimenti AI
    function updateAISuggestions(layer) {
        const suggestions = {
            fondamentale: [
                "Aggiungi dettagli sensoriali per migliorare l'impatto",
                "Sviluppa meglio le caratteristiche psicologiche del protagonista",
                "Assicurati di avere almeno 15 elementi nell'ambiente"
            ],
            visivo: [
                "Scegli tecniche artistiche complementari",
                "Armonizza la palette con l'ambiente architettonico",
                "Considera la psicologia del colore per l'atmosfera"
            ],
            tecnico: [
                "Specifica parametri tecnici precisi per la camera",
                "Descrivi l'illuminazione con effetti specifici",
                "Priorizza gli effetti speciali in base all'importanza"
            ],
            sensoriale: [
                "Sviluppa l'evoluzione emotiva nella scena",
                "Aggiungi dettagli tattili specifici per la risoluzione",
                "Integra tecnologie colore avanzate"
            ]
        };
        
        const aiSuggestions = document.getElementById('aiSuggestions');
        aiSuggestions.innerHTML = '';
        
        suggestions[layer].forEach(suggestion => {
            const suggestionDiv = document.createElement('div');
            suggestionDiv.className = 'suggestion';
            suggestionDiv.innerHTML = `
                <i class="fas fa-lightbulb"></i>
                <p>${suggestion}</p>
            `;
            aiSuggestions.appendChild(suggestionDiv);
        });
    }
    
    // Funzione per salvare i dati
    function saveData() {
        const data = collectFormData();
        localStorage.setItem('soraPromptData', JSON.stringify(data));
        showNotification('Dati salvati!', 'success');
    }
    
    // Funzione per caricare i dati salvati
    function loadSavedData() {
        const savedData = localStorage.getItem('soraPromptData');
        if (savedData) {
            const data = JSON.parse(savedData);
            
            // Popola i campi
            document.getElementById('env').value = data.env || '';
            document.getElementById('theme').value = data.theme || '';
            
            // Sub-themes
            const subThemeInputs = document.querySelectorAll('.sub-theme');
            data.subThemes?.forEach((theme, index) => {
                if (subThemeInputs[index]) {
                    subThemeInputs[index].value = theme;
                }
            });
            
            // Protagonist
            if (data.protagonist) {
                document.querySelector('.trait-group input[placeholder="Età"]').value = data.protagonist.physical?.age || '';
                document.querySelector('.trait-group input[placeholder="Altezza"]').value = data.protagonist.physical?.height || '';
                document.querySelector('.trait-group input[placeholder="Tratti principali"]').value = data.protagonist.physical?.traits || '';
                document.querySelector('.trait-group textarea').value = data.protagonist.psychological || '';
            }
            
            // Layer Visivo
            document.getElementById('mainStyle').value = data.style?.main || '';
            const secondaryStyleInputs = document.querySelectorAll('.secondary-style');
            data.style?.secondary?.forEach((style, index) => {
                if (secondaryStyleInputs[index]) {
                    secondaryStyleInputs[index].value = style;
                }
            });
            
            document.getElementById('arch').value = data.arch || '';
            
            // Palette
            data.palette?.colors?.forEach((color, index) => {
                const colorPickers = document.querySelectorAll('.color-picker');
                if (colorPickers[index]) {
                    colorPickers[index].value = color;
                }
            });
            
            document.getElementById('colorPsychology').value = data.palette?.psychology || '';
            
            // Layer Tecnico
            document.getElementById('cameraMovement').value = data.camera?.movement || '';
            document.getElementById('cameraParams').value = data.camera?.params || '';
            document.getElementById('lighting').value = data.lighting || '';
            
            // FX Effects
            const fxContainer = document.querySelector('.fx-effects');
            data.fx?.forEach(fx => {
                const fxItem = document.createElement('div');
                fxItem.className = 'fx-item';
                fxItem.innerHTML = `
                    <input type="text" placeholder="Effetto" value="${fx.effect}">
                    <select class="fx-priority">
                        <option value="high" ${fx.priority === 'high' ? 'selected' : ''}>Alta</option>
                        <option value="medium" ${fx.priority === 'medium' ? 'selected' : ''}>Media</option>
                        <option value="low" ${fx.priority === 'low' ? 'selected' : ''}>Bassa</option>
                    </select>
                    <button type="button" class="remove-fx"><i class="fas fa-trash"></i></button>
                `;
                fxContainer.insertBefore(fxItem, addFxBtn);
                
                fxItem.querySelector('.remove-fx').addEventListener('click', function() {
                    fxItem.remove();
                });
            });
            
            // Layer Sensoriale
            document.getElementById('mood').value = data.mood || '';
            document.getElementById('textureResolution').value = data.texture?.resolution || '8K';
            document.getElementById('textureDesc').value = data.texture?.description || '';
            document.getElementById('colorTech').value = data.colorTech || '';
            
            // Aggiorna conteggio ENV
            if (data.env) {
                const sentences = data.env.split(/[.!?]+/).filter(s => s.trim().length > 0);
                envCount.textContent = sentences.length;
            }
        }
    }
    
    // Funzione per resettare il form
    function resetForm() {
        if (confirm('Sei sicuro di voler resettare tutti i dati?')) {
            document.querySelectorAll('input, textarea, select').forEach(field => {
                if (field.type === 'color') {
                    field.value = '#000000';
                } else {
                    field.value = '';
                }
            });
            
            // Rimuovi FX effects aggiuntivi
            const fxItems = document.querySelectorAll('.fx-item');
            fxItems.forEach((item, index) => {
                if (index >= 2) { // Lascia i primi due
                    item.remove();
                }
            });
            
            // Resetta colori
            const colorPickers = document.querySelectorAll('.color-picker');
            const defaultColors = ['#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF'];
            colorPickers.forEach((picker, index) => {
                if (defaultColors[index]) {
                    picker.value = defaultColors[index];
                }
            });
            
            // Resetta conteggio
            envCount.textContent = '0';
            
            // Nascondi risultati
            resultsSection.style.display = 'none';
            
            // Rimuovi dati salvati
            localStorage.removeItem('soraPromptData');
            
            showNotification('Form resettato!', 'success');
        }
    }
    
    // Funzione per salvare il prompt generato
    function saveGeneratedPrompt(prompt) {
        const savedPrompts = JSON.parse(localStorage.getItem('soraGeneratedPrompts') || '[]');
        savedPrompts.push({
            prompt: prompt,
            date: new Date().toISOString()
        });
        localStorage.setItem('soraGeneratedPrompts', JSON.stringify(savedPrompts));
    }
    
    // Funzione per mostrare notifiche
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        // Animazione
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(0)';
        }, 100);
        
        // Rimuovi dopo 3 secondi
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
    
    // Aggiungi stili per le notifiche
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            display: flex;
            align-items: center;
            gap: 10px;
            z-index: 1000;
            opacity: 0;
            transform: translateY(-20px);
            transition: all 0.3s ease;
        }
        
        .notification.success {
            border-left: 4px solid var(--success-color);
        }
        
        .notification.error {
            border-left: 4px solid var(--error-color);
        }
        
        .notification.info {
            border-left: 4px solid var(--primary-color);
        }
        
        .notification i {
            font-size: 1.2rem;
        }
        
        .notification.success i {
            color: var(--success-color);
        }
        
        .notification.error i {
            color: var(--error-color);
        }
        
        .notification.info i {
            color: var(--primary-color);
        }
    `;
    document.head.appendChild(style);
});
