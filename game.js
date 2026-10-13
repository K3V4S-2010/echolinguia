/**
 * EchoLingua - Controlador Principal del Juego Accesible
 */

class EchoGame {
  constructor() {
    this.currentMode = null; // 'listening', 'spelling', 'sentence'
    this.currentDifficulty = 'basic'; // 'basic', 'intermediate', 'advanced'
    this.currentIndex = 0;
    this.questions = [];
    this.currentQuestion = null;
    this.isAnsweringAllowed = false;
    this.isFeedbackActive = false;

    // Métricas
    this.score = 0;
    this.streak = 0;
    this.correctCount = 0;
    this.totalRounds = 10;

    // Temas y accesibilidad
    this.themes = ['theme-high-contrast', 'theme-white-black', 'theme-light-contrast'];
    this.currentThemeIndex = 0;
    this.fontSizes = ['medium', 'large', 'extra-large'];
    this.currentFontSizeIndex = 0;

    this.cacheElements();
    this.loadSavedSettings();
    this.bindEvents();
    this.bindKeyboardShortcuts();

    // Mensaje de bienvenida inicial audible
    setTimeout(() => {
      this.welcomeUser();
    }, 800);
  }

  cacheElements() {
    // Pantallas
    this.screenMenu = document.getElementById('screen-menu');
    this.screenGame = document.getElementById('screen-game');
    this.modalHelp = document.getElementById('modal-help');

    // Botones globales
    this.btnHelp = document.getElementById('btn-help');
    this.btnCloseHelp = document.getElementById('btn-close-help');
    this.btnTheme = document.getElementById('btn-theme');
    this.btnFontSize = document.getElementById('btn-font-size');
    this.btnVoiceSpeed = document.getElementById('btn-voice-speed');
    this.btnStopSpeech = document.getElementById('btn-stop-speech');
    this.btnBackMenu = document.getElementById('btn-back-menu');

    // Modos de juego
    this.modeButtons = {
      listening: document.getElementById('mode-listening'),
      spelling: document.getElementById('mode-spelling'),
      sentence: document.getElementById('mode-sentence')
    };

    // Botones de dificultad
    this.diffButtons = document.querySelectorAll('.diff-btn');

    // Métricas en interfaz
    this.lblGlobalScore = document.getElementById('global-score');
    this.lblGlobalStreak = document.getElementById('global-streak');
    this.lblGlobalCorrect = document.getElementById('global-correct');
    this.lblCurrentScore = document.getElementById('current-score');
    this.lblCurrentStreak = document.getElementById('current-streak');
    this.lblRoundNumber = document.getElementById('round-number');

    // Elementos del Reto
    this.challengeBox = document.getElementById('challenge-box');
    this.challengeInstruction = document.getElementById('challenge-instruction');
    this.targetWordDisplay = document.getElementById('target-word');
    this.targetTipDisplay = document.getElementById('target-tip');

    // Botones de acción auditiva
    this.btnReplay = document.getElementById('btn-replay');
    this.btnSlow = document.getElementById('btn-slow');
    this.btnSpellOut = document.getElementById('btn-spell-out');

    // Contenedores de respuesta
    this.containerMultipleChoice = document.getElementById('container-multiple-choice');
    this.optionsGrid = document.getElementById('options-grid');
    this.optionsHelperText = document.getElementById('options-helper-text');

    // Contenedor de Spelling
    this.containerSpelling = document.getElementById('container-spelling');
    this.spellingSlots = document.getElementById('spelling-slots');
    this.spellingInput = document.getElementById('spelling-input');
    this.btnCheckSpelling = document.getElementById('btn-check-spelling');
    this.btnClearSpelling = document.getElementById('btn-clear-spelling');

    // Panel de Feedback
    this.feedbackPanel = document.getElementById('feedback-panel');
    this.feedbackIcon = document.getElementById('feedback-icon');
    this.feedbackTitle = document.getElementById('feedback-title');
    this.feedbackDetail = document.getElementById('feedback-detail');
    this.btnNextQuestion = document.getElementById('btn-next-question');
  }

  loadSavedSettings() {
    try {
      const savedScore = localStorage.getItem('echolingua_score');
      if (savedScore) this.score = parseInt(savedScore, 10) || 0;

      const savedStreak = localStorage.getItem('echolingua_streak');
      if (savedStreak) this.streak = parseInt(savedStreak, 10) || 0;

      const savedCorrect = localStorage.getItem('echolingua_correct');
      if (savedCorrect) this.correctCount = parseInt(savedCorrect, 10) || 0;

      const savedTheme = localStorage.getItem('echolingua_theme');
      if (savedTheme) {
        document.body.className = savedTheme;
        const idx = this.themes.indexOf(savedTheme);
        if (idx !== -1) this.currentThemeIndex = idx;
      }

      const savedFont = localStorage.getItem('echolingua_fontsize');
      if (savedFont) {
        document.body.setAttribute('data-font-size', savedFont);
        const fIdx = this.fontSizes.indexOf(savedFont);
        if (fIdx !== -1) this.currentFontSizeIndex = fIdx;
      }

      this.updateStatsDisplay();
    } catch (e) {
      console.warn("Storage no accesible:", e);
    }
  }

  saveStats() {
    try {
      localStorage.setItem('echolingua_score', this.score);
      localStorage.setItem('echolingua_streak', this.streak);
      localStorage.setItem('echolingua_correct', this.correctCount);
    } catch (e) {}
  }

  welcomeUser() {
    const welcome = "Bienvenido a EchoLingua, tu juego auditivo de inglés accesible. " +
      "Presiona 1 para Modo Escucha y Comprensión, 2 para Modo Deletreo, o 3 para Completar Frases. " +
      "En cualquier momento presiona la tecla H para ayuda y atajos de teclado.";
    window.speech.speak(welcome, 'es');
  }

  bindEvents() {
    // Selección de modo
    this.modeButtons.listening.addEventListener('click', () => this.startMode('listening'));
    this.modeButtons.spelling.addEventListener('click', () => this.startMode('spelling'));
    this.modeButtons.sentence.addEventListener('click', () => this.startMode('sentence'));

    // Dificultad
    this.diffButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        window.soundFx.playNav();
        this.diffButtons.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
        this.currentDifficulty = btn.getAttribute('data-diff');
        const diffNames = { basic: 'Básico A 1', intermediate: 'Intermedio A 2', advanced: 'Avanzado B 1' };
        window.speech.speak(`Dificultad cambiada a nivel ${diffNames[this.currentDifficulty]}`, 'es');
      });
    });

    // Controles de audio auxiliares
    this.btnReplay.addEventListener('click', () => this.replayTargetAudio(1.0));
    this.btnSlow.addEventListener('click', () => this.replayTargetAudio(0.65));
    this.btnSpellOut.addEventListener('click', () => this.spellCurrentWord());

    // Siguiente pregunta
    this.btnNextQuestion.addEventListener('click', () => this.advanceToNextQuestion());

    // Volver al menú
    this.btnBackMenu.addEventListener('click', () => this.showMenu());

    // Botones de la barra superior
    this.btnHelp.addEventListener('click', () => this.openHelpModal());
    this.btnCloseHelp.addEventListener('click', () => this.closeHelpModal());
    this.btnTheme.addEventListener('click', () => this.cycleTheme());
    this.btnFontSize.addEventListener('click', () => this.cycleFontSize());
    this.btnVoiceSpeed.addEventListener('click', () => this.cycleVoiceSpeed());
    this.btnStopSpeech.addEventListener('click', () => {
      window.speech.cancel();
      window.soundFx.playNav();
    });

    // Eventos de Spelling
    this.btnCheckSpelling.addEventListener('click', () => this.submitSpellingAnswer());
    this.btnClearSpelling.addEventListener('click', () => {
      this.spellingInput.value = '';
      this.updateSpellingVisualSlots('');
      window.soundFx.playNav();
      window.speech.speak("Texto borrado", 'es');
    });

    this.spellingInput.addEventListener('input', (e) => {
      const val = this.spellingInput.value.toUpperCase();
      this.updateSpellingVisualSlots(val);
      if (val.length > 0) {
        const lastChar = val[val.length - 1];
        if (/[A-Z]/.test(lastChar)) {
          window.speech.speak(lastChar, 'en', 1.0);
        }
      }
    });

    this.spellingInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        this.submitSpellingAnswer();
      }
    });
  }

  bindKeyboardShortcuts() {
    window.addEventListener('keydown', (e) => {
      const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
      const isInputActive = activeTag === 'input' || activeTag === 'textarea';

      // Tecla Escape para cerrar modales o volver a menú
      if (e.key === 'Escape') {
        if (this.modalHelp.open) {
          this.closeHelpModal();
        } else if (!this.screenGame.classList.contains('hidden')) {
          this.showMenu();
        }
        return;
      }

      // Si el modal de ayuda está abierto, no procesar comandos de juego
      if (this.modalHelp.open) return;

      // Atajo global H: Ayuda
      if ((e.key === 'h' || e.key === 'H') && !isInputActive) {
        e.preventDefault();
        this.openHelpModal();
        return;
      }

      // Atajo global T: Tema de contraste
      if ((e.key === 't' || e.key === 'T') && !isInputActive) {
        e.preventDefault();
        this.cycleTheme();
        return;
      }

      // Atajo global Z: Tamaño de fuente
      if ((e.key === 'z' || e.key === 'Z') && !isInputActive) {
        e.preventDefault();
        this.cycleFontSize();
        return;
      }

      // Atajo global V: Velocidad de voz
      if ((e.key === 'v' || e.key === 'V') && !isInputActive) {
        e.preventDefault();
        this.cycleVoiceSpeed();
        return;
      }

      // Atajo global P: Pausar/Silenciar voz
      if ((e.key === 'p' || e.key === 'P') && !isInputActive) {
        e.preventDefault();
        window.speech.cancel();
        window.soundFx.playNav();
        return;
      }

      // Atajo global M: Menú principal
      if ((e.key === 'm' || e.key === 'M') && !isInputActive) {
        e.preventDefault();
        this.showMenu();
        return;
      }

      // Si estamos en la pantalla del Menú:
      if (!this.screenMenu.classList.contains('hidden')) {
        if (e.key === '1') {
          e.preventDefault();
          this.startMode('listening');
        } else if (e.key === '2') {
          e.preventDefault();
          this.startMode('spelling');
        } else if (e.key === '3') {
          e.preventDefault();
          this.startMode('sentence');
        } else if (e.key === 'b' || e.key === 'B') {
          e.preventDefault();
          document.getElementById('diff-basic').click();
        } else if (e.key === 'i' || e.key === 'I') {
          e.preventDefault();
          document.getElementById('diff-inter').click();
        } else if (e.key === 'a' || e.key === 'A') {
          e.preventDefault();
          document.getElementById('diff-adv').click();
        }
        return;
      }

      // Si estamos en la pantalla de Juego Activo:
      if (!this.screenGame.classList.contains('hidden')) {
        // Si el feedback está activo (esperando para continuar):
        if (this.isFeedbackActive) {
          if (e.key === 'Enter' || e.key === 'n' || e.key === 'N') {
            e.preventDefault();
            this.advanceToNextQuestion();
            return;
          }
        }

        // Si el input de ortografía está enfocado y es modo spelling, permitir tipear letras normales
        if (isInputActive && this.currentMode === 'spelling') {
          return;
        }

        // Tecla Espacio o R: Repetir audio
        if (e.code === 'Space' || e.key === 'r' || e.key === 'R') {
          e.preventDefault();
          this.replayTargetAudio(1.0);
          return;
        }

        // Tecla L: Escuchar lento
        if (e.key === 'l' || e.key === 'L') {
          e.preventDefault();
          this.replayTargetAudio(0.65);
          return;
        }

        // Tecla S: Deletreo letra a letra
        if (e.key === 's' || e.key === 'S') {
          e.preventDefault();
          this.spellCurrentWord();
          return;
        }

        // Teclas 1, 2, 3, 4 para selección múltiple
        if (['1', '2', '3', '4'].includes(e.key) && this.currentMode !== 'spelling') {
          e.preventDefault();
          const optionIndex = parseInt(e.key, 10) - 1;
          this.selectOption(optionIndex);
          return;
        }
      }
    });
  }

  showMenu() {
    window.soundFx.playNav();
    window.speech.cancel();
    this.screenGame.classList.add('hidden');
    this.screenMenu.classList.remove('hidden');
    this.currentMode = null;
    this.isAnsweringAllowed = false;
    this.isFeedbackActive = false;

    this.updateStatsDisplay();
    document.getElementById('menu-title').focus();
    window.speech.speak("Has vuelto al Menú principal. Selecciona un modo de juego presionando 1, 2 o 3.", 'es');
  }

  startMode(mode) {
    window.soundFx.playNav();
    window.speech.cancel();
    this.currentMode = mode;
    this.currentIndex = 0;

    // Obtener preguntas según modo y dificultad
    const bank = QUESTION_BANK[mode] && QUESTION_BANK[mode][this.currentDifficulty]
      ? QUESTION_BANK[mode][this.currentDifficulty]
      : QUESTION_BANK[mode]['basic'];

    // Barajar aleatoriamente
    this.questions = [...bank].sort(() => Math.random() - 0.5);
    this.totalRounds = Math.min(10, this.questions.length);

    this.screenMenu.classList.add('hidden');
    this.screenGame.classList.remove('hidden');

    const modeTitles = {
      listening: "Modo Escucha y Comprensión",
      spelling: "Modo Deletreo y Ortografía",
      sentence: "Modo Completa la Frase"
    };

    window.speech.speak(`Iniciando ${modeTitles[mode]}. Ronda 1 de ${this.totalRounds}.`, 'es', 1.0, () => {
      this.loadQuestion(this.currentIndex);
    });
  }

  loadQuestion(index) {
    if (index >= this.totalRounds || index >= this.questions.length) {
      this.finishSession();
      return;
    }

    this.isFeedbackActive = false;
    this.isAnsweringAllowed = true;
    this.currentQuestion = this.questions[index];
    this.feedbackPanel.classList.add('hidden');

    this.lblRoundNumber.textContent = `${index + 1} / ${this.totalRounds}`;
    this.lblCurrentScore.textContent = this.score;
    this.lblCurrentStreak.textContent = this.streak;

    if (this.currentMode === 'listening') {
      this.setupListeningView();
    } else if (this.currentMode === 'spelling') {
      this.setupSpellingView();
    } else if (this.currentMode === 'sentence') {
      this.setupSentenceView();
    }
  }

  setupListeningView() {
    this.containerMultipleChoice.classList.remove('hidden');
    this.containerSpelling.classList.add('hidden');

    const q = this.currentQuestion;
    this.challengeInstruction.textContent = "🎧 Escucha atentamente la pronunciación en inglés:";
    this.targetWordDisplay.textContent = q.english;
    this.targetTipDisplay.textContent = `Fonética: ${q.phonetic} | Presiona 1, 2, 3 o 4 para responder`;

    this.renderMultipleChoiceOptions(q.options);

    // Narración guiada
    const sequence = [
      { text: `Pregunta número ${this.currentIndex + 1}. Escucha con atención:`, lang: 'es' },
      { text: q.english, lang: 'en', rate: 0.9 },
      { text: `¿Qué significa ${q.english}?`, lang: 'es' }
    ];

    q.options.forEach((opt, idx) => {
      sequence.push({ text: `Opción ${idx + 1}: ${opt}.`, lang: 'es' });
    });

    window.speech.speakSequence(sequence, 0, () => {
      this.focusFirstOption();
    });
  }

  setupSentenceView() {
    this.containerMultipleChoice.classList.remove('hidden');
    this.containerSpelling.classList.add('hidden');

    const q = this.currentQuestion;
    this.challengeInstruction.textContent = "🧩 Escucha la frase y elige la palabra que falta:";
    this.targetWordDisplay.textContent = q.sentence;
    this.targetTipDisplay.textContent = `Presiona Espacio para repetir la frase completa`;

    this.renderMultipleChoiceOptions(q.options);

    const sequence = [
      { text: `Pregunta número ${this.currentIndex + 1}. Completa la oración:`, lang: 'es' },
      { text: q.spokenSentence, lang: 'en', rate: 0.9 },
      { text: "Elige la palabra correcta:", lang: 'es' }
    ];

    q.options.forEach((opt, idx) => {
      sequence.push({ text: `Opción ${idx + 1}:`, lang: 'es' });
      sequence.push({ text: opt, lang: 'en' });
    });

    window.speech.speakSequence(sequence, 0, () => {
      this.focusFirstOption();
    });
  }

  setupSpellingView() {
    this.containerMultipleChoice.classList.add('hidden');
    this.containerSpelling.classList.remove('hidden');

    const q = this.currentQuestion;
    this.challengeInstruction.textContent = "⌨️ Escucha la palabra y teclea sus letras:";
    this.targetWordDisplay.textContent = "🔊 [Escucha la palabra]";
    this.targetTipDisplay.textContent = `Pista: ${q.hint} (${q.english.length} letras)`;

    this.spellingInput.value = '';
    this.updateSpellingVisualSlots('');

    const sequence = [
      { text: `Ronda de deletreo ${this.currentIndex + 1}.`, lang: 'es' },
      { text: `Palabra en inglés:`, lang: 'es' },
      { text: q.english, lang: 'en', rate: 0.85 },
      { text: `Significa ${q.meaning}. Tiene ${q.english.length} letras. Escribe las letras y presiona Enter.`, lang: 'es' }
    ];

    window.speech.speakSequence(sequence, 0, () => {
      this.spellingInput.focus();
    });
  }

  renderMultipleChoiceOptions(options) {
    this.optionsGrid.innerHTML = '';
    options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'answer-btn';
      btn.setAttribute('data-index', idx);
      btn.setAttribute('aria-label', `Opción ${idx + 1}: ${opt}. Presiona ${idx + 1}`);
      
      const badge = document.createElement('span');
      badge.className = 'answer-badge';
      badge.textContent = idx + 1;

      const text = document.createElement('span');
      text.className = 'answer-text';
      text.textContent = opt;

      btn.appendChild(badge);
      btn.appendChild(text);

      btn.addEventListener('click', () => this.selectOption(idx));
      this.optionsGrid.appendChild(btn);
    });
  }

  focusFirstOption() {
    const first = this.optionsGrid.querySelector('.answer-btn');
    if (first) first.focus();
  }

  updateSpellingVisualSlots(currentText) {
    this.spellingSlots.innerHTML = '';
    const wordLen = this.currentQuestion ? this.currentQuestion.english.length : 4;
    for (let i = 0; i < wordLen; i++) {
      const box = document.createElement('div');
      box.className = 'spell-box';
      box.textContent = currentText[i] || '_';
      this.spellingSlots.appendChild(box);
    }
  }

  selectOption(selectedIndex) {
    if (!this.isAnsweringAllowed || this.isFeedbackActive) return;
    this.isAnsweringAllowed = false;
    window.speech.cancel();

    const q = this.currentQuestion;
    const isCorrect = selectedIndex === q.correctIndex;
    const buttons = this.optionsGrid.querySelectorAll('.answer-btn');

    buttons.forEach((btn, idx) => {
      if (idx === q.correctIndex) {
        btn.classList.add('correct');
      } else if (idx === selectedIndex) {
        btn.classList.add('incorrect');
      }
      btn.disabled = true;
    });

    if (isCorrect) {
      this.handleCorrectAnswer(q);
    } else {
      this.handleIncorrectAnswer(q, selectedIndex);
    }
  }

  submitSpellingAnswer() {
    if (!this.isAnsweringAllowed || this.isFeedbackActive) return;
    this.isAnsweringAllowed = false;
    window.speech.cancel();

    const q = this.currentQuestion;
    const userVal = this.spellingInput.value.trim().toUpperCase();
    const targetVal = q.english.toUpperCase();
    const isCorrect = userVal === targetVal;

    this.targetWordDisplay.textContent = q.english;

    if (isCorrect) {
      this.handleCorrectAnswer(q, true);
    } else {
      this.handleIncorrectSpellingAnswer(q, userVal);
    }
  }

  handleCorrectAnswer(q, isSpelling = false) {
    window.soundFx.playCorrect();
    this.score += 100;
    this.streak += 1;
    this.correctCount += 1;
    this.saveStats();
    this.updateStatsDisplay();

    this.feedbackPanel.className = 'feedback-panel success';
    this.feedbackIcon.textContent = '🌟';
    this.feedbackTitle.textContent = `¡Correcto! (+100 puntos)`;

    let detail = "";
    if (this.currentMode === 'listening') {
      detail = `"${q.english}" significa "${q.meaning}". Ejemplo: ${q.example}`;
    } else if (this.currentMode === 'sentence') {
      detail = `${q.explanation} Traducción: "${q.translation}"`;
    } else if (isSpelling) {
      detail = `¡Deletreo exacto! "${q.english}" significa "${q.meaning}". Ejemplo: ${q.example}`;
    }

    this.feedbackDetail.textContent = detail;
    this.feedbackPanel.classList.remove('hidden');
    this.isFeedbackActive = true;

    const speechSeq = [
      { text: "¡Excelente! Respuesta correcta. Ganaste 100 puntos.", lang: 'es' },
      { text: isSpelling ? `La palabra deletreada es:` : `En inglés:`, lang: 'es' },
      { text: q.english || q.blankWord, lang: 'en', rate: 0.9 },
      { text: detail, lang: 'es' },
      { text: "Presiona Enter o N para pasar a la siguiente pregunta.", lang: 'es' }
    ];

    window.speech.speakSequence(speechSeq, 0, () => {
      this.btnNextQuestion.focus();
    });
  }

  handleIncorrectAnswer(q, selectedIndex) {
    window.soundFx.playIncorrect();
    this.streak = 0;
    this.saveStats();
    this.updateStatsDisplay();

    this.feedbackPanel.className = 'feedback-panel error';
    this.feedbackIcon.textContent = '💡';
    this.feedbackTitle.textContent = `No te rindas, ¡aprendamos juntos!`;

    const correctText = q.options[q.correctIndex];
    let detail = "";
    if (this.currentMode === 'listening') {
      detail = `La respuesta correcta era "${correctText}". "${q.english}" significa "${q.meaning}".`;
    } else if (this.currentMode === 'sentence') {
      detail = `La respuesta correcta era "${correctText}". ${q.explanation}`;
    }

    this.feedbackDetail.textContent = detail;
    this.feedbackPanel.classList.remove('hidden');
    this.isFeedbackActive = true;

    const speechSeq = [
      { text: "Respuesta incorrecta, pero cada intento te hace más fuerte.", lang: 'es' },
      { text: `La opción correcta era: ${correctText}.`, lang: 'es' },
      { text: detail, lang: 'es' },
      { text: "Presiona Enter o N para continuar.", lang: 'es' }
    ];

    window.speech.speakSequence(speechSeq, 0, () => {
      this.btnNextQuestion.focus();
    });
  }

  handleIncorrectSpellingAnswer(q, userVal) {
    window.soundFx.playIncorrect();
    this.streak = 0;
    this.saveStats();
    this.updateStatsDisplay();

    this.feedbackPanel.className = 'feedback-panel error';
    this.feedbackIcon.textContent = '🔤';
    this.feedbackTitle.textContent = `La palabra correcta es: ${q.english}`;
    const detail = `Escribiste "${userVal || 'nada'}". La ortografía exacta es ${q.english}. Significa "${q.meaning}".`;
    this.feedbackDetail.textContent = detail;
    this.feedbackPanel.classList.remove('hidden');
    this.isFeedbackActive = true;

    const speechSeq = [
      { text: "No coincide exactamente. La palabra correcta es:", lang: 'es' },
      { text: q.english, lang: 'en', rate: 0.8 },
      { text: `Se deletrea:`, lang: 'es' }
    ];

    q.english.split('').forEach(letter => {
      speechSeq.push({ text: letter, lang: 'en', rate: 0.8 });
    });

    speechSeq.push({ text: "Presiona Enter o N para continuar.", lang: 'es' });

    window.speech.speakSequence(speechSeq, 0, () => {
      this.btnNextQuestion.focus();
    });
  }

  advanceToNextQuestion() {
    window.soundFx.playNav();
    window.speech.cancel();
    this.currentIndex++;
    this.loadQuestion(this.currentIndex);
  }

  finishSession() {
    window.soundFx.playLevelComplete();
    this.feedbackPanel.className = 'feedback-panel success';
    this.feedbackIcon.textContent = '🏆';
    this.feedbackTitle.textContent = `¡Felicitaciones! Has completado el entrenamiento.`;
    this.feedbackDetail.textContent = `Puntos acumulados: ${this.score}. Gran trabajo fortaleciendo tu inglés.`;
    this.btnNextQuestion.textContent = "Volver al Menú Principal (Enter)";
    this.btnNextQuestion.onclick = () => this.showMenu();
    this.feedbackPanel.classList.remove('hidden');

    const msg = `¡Fantástico! Has terminado todas las rondas de este módulo. Tu puntuación acumulada es de ${this.score} puntos. Presiona Enter para regresar al menú.`;
    window.speech.speak(msg, 'es', 1.0, () => {
      this.btnNextQuestion.focus();
    });
  }

  replayTargetAudio(customRate = 1.0) {
    if (!this.currentQuestion) return;
    window.soundFx.playNav();
    let textToPlay = "";
    if (this.currentMode === 'listening' || this.currentMode === 'spelling') {
      textToPlay = this.currentQuestion.english;
    } else if (this.currentMode === 'sentence') {
      textToPlay = this.currentQuestion.spokenSentence;
    }
    window.speech.speak(textToPlay, 'en', customRate);
  }

  spellCurrentWord() {
    if (!this.currentQuestion) return;
    window.soundFx.playNav();
    const word = this.currentQuestion.english || this.currentQuestion.blankWord;
    window.speech.spellWord(word);
  }

  updateStatsDisplay() {
    if (this.lblGlobalScore) this.lblGlobalScore.textContent = this.score;
    if (this.lblGlobalStreak) this.lblGlobalStreak.textContent = this.streak;
    if (this.lblGlobalCorrect) this.lblGlobalCorrect.textContent = this.correctCount;
    if (this.lblCurrentScore) this.lblCurrentScore.textContent = this.score;
    if (this.lblCurrentStreak) this.lblCurrentStreak.textContent = this.streak;
  }

  // Controles de Accesibilidad
  cycleTheme() {
    window.soundFx.playNav();
    this.currentThemeIndex = (this.currentThemeIndex + 1) % this.themes.length;
    const chosenTheme = this.themes[this.currentThemeIndex];
    document.body.className = chosenTheme;
    localStorage.setItem('echolingua_theme', chosenTheme);

    const themeNames = [
      "Alto contraste amarillo sobre negro",
      "Alto contraste blanco sobre negro",
      "Alto contraste oscuro sobre blanco"
    ];
    window.speech.speak(`Tema cambiado a ${themeNames[this.currentThemeIndex]}`, 'es');
  }

  cycleFontSize() {
    window.soundFx.playNav();
    this.currentFontSizeIndex = (this.currentFontSizeIndex + 1) % this.fontSizes.length;
    const chosenSize = this.fontSizes[this.currentFontSizeIndex];
    document.body.setAttribute('data-font-size', chosenSize);
    localStorage.setItem('echolingua_fontsize', chosenSize);

    const sizeNames = ["Mediano grande", "Muy grande", "Ultra grande"];
    window.speech.speak(`Tamaño de letra cambiado a ${sizeNames[this.currentFontSizeIndex]}`, 'es');
  }

  cycleVoiceSpeed() {
    window.soundFx.playNav();
    const newSpeedLabel = window.speech.cycleRate();
    this.btnVoiceSpeed.textContent = `⚡ Voz: ${newSpeedLabel} (V)`;
    window.speech.speak(`Velocidad de voz ajustada a ${newSpeedLabel}`, 'es');
  }

  openHelpModal() {
    window.soundFx.playNav();
    window.speech.cancel();
    this.modalHelp.showModal();
    document.getElementById('modal-help-title').focus();
    const helpVoice = "Menú de Ayuda y Atajos de Teclado abierto. " +
      "Atajos principales: Tecla Espacio o R para repetir pronunciación. " +
      "Tecla L para escuchar lento. " +
      "Tecla S para deletrear letra por letra. " +
      "Teclas 1 a 4 para elegir respuesta. " +
      "Tecla N o Enter para la siguiente pregunta. " +
      "Tecla M o Escape para volver al menú. " +
      "Presiona Escape para salir de esta ayuda.";
    window.speech.speak(helpVoice, 'es');
  }

  closeHelpModal() {
    window.soundFx.playNav();
    this.modalHelp.close();
    window.speech.speak("Regresando a la pantalla del juego.", 'es');
  }
}

// Inicializar el juego cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  window.gameInstance = new EchoGame();
});
