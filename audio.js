/**
 * EchoLingua - Módulo de Audio y Síntesis de Voz
 * Combina Web Audio API para efectos sonoros y Web Speech API para narración accesible.
 */

class SoundFX {
  constructor() {
    this.ctx = null;
    this.initAudioContext();
  }

  initAudioContext() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    } catch (e) {
      console.warn("Web Audio API no soportada:", e);
    }
  }

  ensureContext() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Tono de navegación / interacción sutil
  playNav() {
    if (!this.ctx) return;
    this.ensureContext();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.06);

    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.06);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.06);
  }

  // Sonido de Acierto: Arpegio mayor alegre (Do - Mi - Sol - Do)
  playCorrect() {
    if (!this.ctx) return;
    this.ensureContext();
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const startTime = this.ctx.currentTime + (idx * 0.07);

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.18, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.22);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + 0.22);
    });
  }

  // Sonido de Fallo: Tono suave no agresivo descendente
  playIncorrect() {
    if (!this.ctx) return;
    this.ensureContext();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(260, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(140, this.ctx.currentTime + 0.28);

    gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.28);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.28);
  }

  // Sonido de Ronda completada / Éxito
  playLevelComplete() {
    if (!this.ctx) return;
    this.ensureContext();
    const chord = [523.25, 659.25, 783.99]; // Acorde mayor sostenido
    chord.forEach((freq) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.7);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.7);
    });
  }
}

class SpeechEngine {
  constructor() {
    this.synth = window.speechSynthesis || null;
    this.voices = [];
    this.voiceEn = null;
    this.voiceEs = null;
    this.rateMultiplier = 1.0; // Normal
    this.rates = [
      { label: "Normal (1.0x)", value: 1.0 },
      { label: "Lento (0.75x)", value: 0.75 },
      { label: "Rápido (1.25x)", value: 1.25 }
    ];
    this.currentRateIndex = 0;
    this.isMuted = false;

    if (this.synth) {
      this.loadVoices();
      if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  loadVoices() {
    if (!this.synth) return;
    this.voices = this.synth.getVoices();

    // Buscar la mejor voz en inglés
    this.voiceEn = this.voices.find(v => v.lang.startsWith('en-US') && !v.name.includes('Google') === false) ||
                   this.voices.find(v => v.lang.startsWith('en')) || null;

    // Buscar la mejor voz en español
    this.voiceEs = this.voices.find(v => (v.lang.startsWith('es-MX') || v.lang.startsWith('es-ES') || v.lang.startsWith('es-US'))) ||
                   this.voices.find(v => v.lang.startsWith('es')) || null;
  }

  cycleRate() {
    this.currentRateIndex = (this.currentRateIndex + 1) % this.rates.length;
    this.rateMultiplier = this.rates[this.currentRateIndex].value;
    return this.rates[this.currentRateIndex].label;
  }

  cancel() {
    if (this.synth) {
      this.synth.cancel();
    }
  }

  announceToScreenReader(text) {
    const announcer = document.getElementById('screen-reader-announcer');
    if (announcer) {
      announcer.textContent = '';
      setTimeout(() => {
        announcer.textContent = text;
      }, 50);
    }
  }

  /**
   * Habla un texto en el idioma especificado ('es' o 'en')
   * @param {string} text - Contenido a narrar
   * @param {string} lang - 'es' o 'en'
   * @param {number} customRate - Modificador opcional de velocidad
   * @param {function} onEnd - Callback al finalizar
   */
  speak(text, lang = 'es', customRate = null, onEnd = null) {
    if (!this.synth || this.isMuted) {
      if (onEnd) onEnd();
      return;
    }

    this.cancel();
    this.announceToScreenReader(text);

    const utterance = new SpeechSynthesisUtterance(text);
    const chosenRate = customRate !== null ? customRate : this.rateMultiplier;
    utterance.rate = Math.max(0.5, Math.min(2.0, chosenRate));

    if (lang === 'en') {
      utterance.lang = 'en-US';
      if (this.voiceEn) utterance.voice = this.voiceEn;
    } else {
      utterance.lang = 'es-ES';
      if (this.voiceEs) utterance.voice = this.voiceEs;
    }

    if (onEnd) {
      utterance.onend = () => onEnd();
      utterance.onerror = () => onEnd();
    }

    this.synth.speak(utterance);
  }

  /**
   * Habla una secuencia en dos idiomas (primero español explicativo, luego inglés)
   */
  speakSequence(items, currentIndex = 0, onComplete = null) {
    if (currentIndex >= items.length) {
      if (onComplete) onComplete();
      return;
    }

    const item = items[currentIndex];
    this.speak(item.text, item.lang, item.rate || null, () => {
      // Pequeña pausa de 200ms entre frases para claridad auditiva
      setTimeout(() => {
        this.speakSequence(items, currentIndex + 1, onComplete);
      }, 200);
    });
  }

  /**
   * Deletrea una palabra en inglés letra por letra con pronunciación clara
   */
  spellWord(word, onComplete = null) {
    if (!word) return;
    const clean = word.replace(/[^a-zA-Z]/g, '');
    const letters = clean.toUpperCase().split('');
    
    const items = [
      { text: `Deletreando la palabra ${word}:`, lang: 'es' }
    ];

    letters.forEach(letter => {
      items.push({ text: letter, lang: 'en', rate: 0.8 });
    });

    items.push({ text: `Palabra completa: ${word}`, lang: 'en', rate: 0.9 });

    this.speakSequence(items, 0, onComplete);
  }
}

// Instancias globales
window.soundFx = new SoundFX();
window.speech = new SpeechEngine();
