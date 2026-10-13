# 🔊 EchoLingua - Juego Auditivo de Inglés Totalmente Accesible

**EchoLingua** es un juego interactivo en HTML5, CSS3 y JavaScript diseñado especialmente para personas con **discapacidad visual (ceguera o baja visión)**, enfocado en el aprendizaje y fortalecimiento del idioma **inglés** a través de la audición, la fonética y el teclado.

---

## 🌟 Características Principales

1. **Sistema de Voz y Audio 100% Integrado (Sin dependencias externas)**:
   - **Instrucción y retroalimentación hablada en español**: Explica cada reto, lee las opciones y ofrece retroalimentación detallada.
   - **Pronunciación nativa en inglés**: Utiliza la Web Speech API (`en-US`) para pronunciar cada término con entonación natural.
   - **Efectos de sonido sintetizados (Web Audio API)**: Tonos musicales distintivos de acierto (arpegio mayor), fallo (tono suave descendente) y navegación, funcionales sin conexión a internet.
   - **Velocidad de voz configurable**: Ajustable entre Lento (0.75x), Normal (1.0x) y Rápido (1.25x) con la tecla `V`.

2. **Diseñado para Personas con Problemas de Visión**:
   - **Operable al 100% a través del teclado** y por medio del audio sin necesidad de mirar la pantalla.
   - **Región ARIA en vivo (`aria-live="assertive"`)**: Compatible de inmediato con lectores de pantalla como **NVDA**, **JAWS** y **VoiceOver**.
   - **Modos de Ultra-Alto Contraste**:
     - *Amarillo eléctrico sobre negro* (máximo contraste para baja visión).
     - *Blanco nítido sobre negro*.
     - *Contraste claro (negro sobre blanco)*.
   - **Tamaño de texto escalable**: Opciones de texto Grande, Muy Grande y Ultra Grande con la tecla `Z`.
   - **Anillo de foco masivo**: Indicador luminoso verde de 4 píxeles para saber en todo momento qué elemento está activo.

3. **Modos de Juego para Fortalecer el Inglés**:
   - **Modo 1: Escucha y Comprende (Listening & Meaning)**: Escucha palabras o frases en inglés y selecciona el significado correcto en español.
   - **Modo 2: Deletreo y Fonética (Spelling Master)**: Escucha una palabra y teclea cada letra. El juego pronuncia cada letra en inglés a medida que la pulsas para reforzar la relación sonido-grafema.
   - **Modo 3: Completa la Frase (Sentence Completion & Grammar)**: Escucha oraciones con espacios en blanco y selecciona la opción gramatical correcta.

4. **Niveles de Dificultad**:
   - **Básico (A1)**: Vocabulario cotidiano, saludos, objetos, colores y animales.
   - **Intermedio (A2)**: Pasado simple, condicionales, adjetivos y expresiones comunes.
   - **Avanzado (B1)**: Modismos (idioms), vocabulario avanzado y estructuras complejas.

---

## ⌨️ Guía de Atajos de Teclado

| Tecla | Acción |
| :--- | :--- |
| <kbd>Espacio</kbd> o <kbd>R</kbd> | **Repetir audio**: Vuelve a pronunciar la palabra o frase en inglés |
| <kbd>L</kbd> | **Audio Lento**: Escucha la palabra a velocidad pausada para captar fonemas |
| <kbd>S</kbd> | **Deletreo (Spell)**: Escucha la palabra deletreada letra por letra |
| <kbd>1</kbd>, <kbd>2</kbd>, <kbd>3</kbd>, <kbd>4</kbd> | Seleccionar la opción de respuesta 1, 2, 3 o 4 (o modo de juego en el menú) |
| <kbd>N</kbd> o <kbd>Enter</kbd> | Avanzar a la siguiente pregunta tras la respuesta |
| <kbd>M</kbd> o <kbd>Escape</kbd> | Volver al Menú Principal |
| <kbd>H</kbd> | Abrir ventana de ayuda y guía de voz |
| <kbd>V</kbd> | Cambiar velocidad de voz (Normal, Lento, Rápido) |
| <kbd>P</kbd> | Silenciar o detener la voz en cualquier momento |
| <kbd>T</kbd> | Cambiar tema de contraste de color |
| <kbd>Z</kbd> | Cambiar tamaño de la letra |
| <kbd>B</kbd>, <kbd>I</kbd>, <kbd>A</kbd> | Elegir dificultad en el menú: **B**ásico, **I**ntermedio o **A**vanzado |

---

## 🚀 Cómo Ejecutar el Juego

No necesitas instalar programas adicionales ni servidores. Simplemente:

1. Ve a la carpeta `c:\Users\Aprendiz\Desktop\Jaylin`.
2. Haz doble clic en el archivo [**`index.html`**](file:///c:/Users/Aprendiz/Desktop/Jaylin/index.html) para abrirlo en tu navegador favorito (Google Chrome, Microsoft Edge, Mozilla Firefox o Safari).
3. Haz un clic o pulsa cualquier tecla para activar el sintetizador de voz (los navegadores requieren una primera interacción para iniciar el audio).
4. ¡Disfruta aprendiendo inglés con voz!
