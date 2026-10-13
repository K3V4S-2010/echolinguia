/**
 * EchoLingua - Base de Conocimiento y Banco de Preguntas en Inglés
 * Diseñado pedagógicamente para fortalecer vocabulario, escucha, ortografía y gramática.
 */

const QUESTION_BANK = {
  // Modo 1: Listening & Comprensión (Escuchar en inglés -> responder significado en español)
  listening: {
    basic: [
      {
        english: "Apple",
        phonetic: "/ˈæp.əl/",
        meaning: "Manzana",
        options: ["Manzana", "Naranja", "Plátano", "Uva"],
        correctIndex: 0,
        tip: "Fruta redonda y dulce, roja o verde.",
        example: "An apple a day keeps the doctor away."
      },
      {
        english: "Good morning",
        phonetic: "/ɡʊd ˈmɔːr.nɪŋ/",
        meaning: "Buenos días",
        options: ["Buenas noches", "Buenos días", "Hasta luego", "Por favor"],
        correctIndex: 1,
        tip: "Saludo común al inicio del día.",
        example: "Good morning, how are you today?"
      },
      {
        english: "House",
        phonetic: "/haʊs/",
        meaning: "Casa",
        options: ["Carro", "Parque", "Casa", "Escuela"],
        correctIndex: 2,
        tip: "Lugar donde vive una familia o persona.",
        example: "Welcome to my house."
      },
      {
        english: "Water",
        phonetic: "/ˈwɔː.tər/",
        meaning: "Agua",
        options: ["Fuego", "Tierra", "Aire", "Agua"],
        correctIndex: 3,
        tip: "Líquido vital transparente sin sabor.",
        example: "I drink two liters of water daily."
      },
      {
        english: "Friend",
        phonetic: "/frend/",
        meaning: "Amigo o amiga",
        options: ["Amigo o amiga", "Hermano", "Vecino", "Profesor"],
        correctIndex: 0,
        tip: "Persona cercana con quien compartes afecto y confianza.",
        example: "Sarah is my best friend."
      },
      {
        english: "Happy",
        phonetic: "/ˈhæp.i/",
        meaning: "Feliz o contento",
        options: ["Triste", "Enojado", "Feliz o contento", "Cansado"],
        correctIndex: 2,
        tip: "Emoción positiva de alegría.",
        example: "I feel very happy today."
      },
      {
        english: "Book",
        phonetic: "/bʊk/",
        meaning: "Libro",
        options: ["Lápiz", "Libro", "Mesa", "Silla"],
        correctIndex: 1,
        tip: "Objeto con páginas para leer historias o aprender.",
        example: "She loves reading a book before bed."
      },
      {
        english: "Thank you",
        phonetic: "/ˈθæŋk juː/",
        meaning: "Gracias",
        options: ["De nada", "Por favor", "Disculpa", "Gracias"],
        correctIndex: 3,
        tip: "Expresión de cortesía y gratitud.",
        example: "Thank you for your help!"
      }
    ],
    intermediate: [
      {
        english: "Weather",
        phonetic: "/ˈweð.ər/",
        meaning: "El clima o tiempo atmosférico",
        options: ["La hora", "El clima", "El camino", "La estación de tren"],
        correctIndex: 1,
        tip: "Condiciones de lluvia, sol o frío.",
        example: "The weather is sunny and warm today."
      },
      {
        english: "Journey",
        phonetic: "/ˈdʒɜː.ni/",
        meaning: "Viaje o trayecto",
        options: ["Viaje o trayecto", "Comida", "Trabajo", "Descanso"],
        correctIndex: 0,
        tip: "El acto de viajar de un lugar a otro.",
        example: "Have a safe journey!"
      },
      {
        english: "Knowledge",
        phonetic: "/ˈnɒl.ɪdʒ/",
        meaning: "Conocimiento o saber",
        options: ["Paciencia", "Fuerza", "Conocimiento", "Habilidad deportiva"],
        correctIndex: 2,
        tip: "Información y comprensión adquirida mediante el estudio.",
        example: "Knowledge gives you confidence."
      },
      {
        english: "Delicious",
        phonetic: "/dɪˈlɪʃ.əs/",
        meaning: "Delicioso o muy sabroso",
        options: ["Picante", "Amargo", "Salado", "Delicioso"],
        correctIndex: 3,
        tip: "Adjetivo para describir comida con sabor muy agradable.",
        example: "This homemade soup is delicious."
      },
      {
        english: "Improve",
        phonetic: "/ɪmˈpruːv/",
        meaning: "Mejorar o progresar",
        options: ["Empeorar", "Mejorar", "Detener", "Dividir"],
        correctIndex: 1,
        tip: "Hacerse mejor en algo con práctica.",
        example: "Practicing English every day will improve your skills."
      }
    ],
    advanced: [
      {
        english: "Overwhelmed",
        phonetic: "/ˌoʊ.vɚˈwelmd/",
        meaning: "Abrumado o sobrecargado",
        options: ["Emocionado", "Abrumado", "Indiferente", "Sorprendido"],
        correctIndex: 1,
        tip: "Sentir que tienes demasiadas cosas o emociones que manejar.",
        example: "He felt overwhelmed by all the work."
      },
      {
        english: "Break a leg",
        phonetic: "/breɪk ə leɡ/",
        meaning: "¡Buena suerte! (modismo teatral)",
        options: ["Ten cuidado", "Rómpele la pierna", "¡Buena suerte!", "Apúrate"],
        correctIndex: 2,
        tip: "Frase idiomática en inglés para desear éxito antes de una presentación.",
        example: "Break a leg on your English interview!"
      },
      {
        english: "Resilient",
        phonetic: "/rɪˈzɪl.jənt/",
        meaning: "Resiliente o tenaz ante las dificultades",
        options: ["Resiliente", "Frágil", "Pesimista", "Orgulloso"],
        correctIndex: 0,
        tip: "Capaz de recuperarse rápidamente de momentos difíciles.",
        example: "She is a very resilient person."
      },
      {
        english: "Once in a blue moon",
        phonetic: "/wʌns ɪn ə bluː muːn/",
        meaning: "Muy rara vez o casi nunca",
        options: ["Todas las noches", "Cada mes", "Al amanecer", "Muy rara vez"],
        correctIndex: 3,
        tip: "Modismo que describe un evento extremadamente poco frecuente.",
        example: "I only eat fast food once in a blue moon."
      }
    ]
  },

  // Modo 2: Spelling (Deletreo y Fonética)
  spelling: {
    basic: [
      {
        english: "CAT",
        meaning: "Gato",
        hint: "Animal doméstico felino de tres letras.",
        example: "The cat is sleeping on the sofa."
      },
      {
        english: "SUN",
        meaning: "Sol",
        hint: "La estrella brillante que ilumina el día.",
        example: "The sun is shining in the sky."
      },
      {
        english: "DOG",
        meaning: "Perro",
        hint: "El mejor amigo del ser humano.",
        example: "My dog barks when someone arrives."
      },
      {
        english: "LOVE",
        meaning: "Amor",
        hint: "Sentimiento profundo de afecto.",
        example: "Love makes the world a better place."
      },
      {
        english: "BLUE",
        meaning: "Azul",
        hint: "Color del cielo en un día despejado.",
        example: "The ocean is deep blue."
      },
      {
        english: "MILK",
        meaning: "Leche",
        hint: "Bebida blanca rica en calcio.",
        example: "I like cereal with cold milk."
      }
    ],
    intermediate: [
      {
        english: "BRAVE",
        meaning: "Valiente",
        hint: "Persona que afronta el miedo con coraje.",
        example: "He was brave enough to speak up."
      },
      {
        english: "LISTEN",
        meaning: "Escuchar",
        hint: "Acción de prestar atención a los sonidos.",
        example: "Listen carefully to the instructions."
      },
      {
        english: "GARDEN",
        meaning: "Jardín",
        hint: "Terreno con plantas, césped y flores.",
        example: "She plants roses in her garden."
      },
      {
        english: "FAMILY",
        meaning: "Familia",
        hint: "Grupo de personas unidas por lazos de parentesco o amor.",
        example: "I spent the weekend with my family."
      },
      {
        english: "WINDOW",
        meaning: "Ventana",
        hint: "Abertura con vidrio para ver hacia afuera.",
        example: "Please open the window for fresh air."
      }
    ],
    advanced: [
      {
        english: "ACHIEVE",
        meaning: "Lograr o alcanzar una meta",
        hint: "Conseguir un objetivo con esfuerzo.",
        example: "You can achieve anything with dedication."
      },
      {
        english: "PATIENCE",
        meaning: "Paciencia",
        hint: "Virtud de esperar con calma y serenidad.",
        example: "Learning a new language requires patience."
      },
      {
        english: "FREEDOM",
        meaning: "Libertad",
        hint: "Derecho a actuar y pensar sin opresión.",
        example: "Freedom of speech is essential."
      },
      {
        english: "COURAGE",
        meaning: "Coraje o valentía",
        hint: "Determinación interna para superar obstáculos.",
        example: "It took courage to start over."
      }
    ]
  },

  // Modo 3: Sentence Completion (Gramática y Contexto)
  sentence: {
    basic: [
      {
        sentence: "She ___ to music every afternoon.",
        blankWord: "listens",
        spokenSentence: "She blank to music every afternoon.",
        options: ["listens", "listen", "listening", "are listen"],
        correctIndex: 0,
        explanation: "En presente simple con tercera persona (she), el verbo agrega una 's': She listens.",
        translation: "Ella escucha música todas las tardes."
      },
      {
        sentence: "They ___ playing soccer in the park.",
        blankWord: "are",
        spokenSentence: "They blank playing soccer in the park.",
        options: ["is", "am", "are", "be"],
        correctIndex: 2,
        explanation: "El sujeto 'They' (ellos) usa la forma 'are' del verbo to be en presente continuo.",
        translation: "Ellos están jugando fútbol en el parque."
      },
      {
        sentence: "I have ___ orange in my bag.",
        blankWord: "an",
        spokenSentence: "I have blank orange in my bag.",
        options: ["a", "an", "the two", "one of"],
        correctIndex: 1,
        explanation: "Se usa el artículo 'an' antes de sustantivos que inician con sonido vocal (orange).",
        translation: "Tengo una naranja en mi bolso."
      },
      {
        sentence: "Where ___ you live?",
        blankWord: "do",
        spokenSentence: "Where blank you live?",
        options: ["does", "are", "do", "is"],
        correctIndex: 2,
        explanation: "En preguntas de presente simple con el pronombre 'you', el auxiliar es 'do'.",
        translation: "¿Dónde vives tú?"
      }
    ],
    intermediate: [
      {
        sentence: "Yesterday, we ___ a great movie together.",
        blankWord: "watched",
        spokenSentence: "Yesterday, we blank a great movie together.",
        options: ["watch", "watched", "will watch", "watching"],
        correctIndex: 1,
        explanation: "'Yesterday' indica tiempo pasado simple, por lo que usamos la forma pasada regular 'watched'.",
        translation: "Ayer vimos una gran película juntos."
      },
      {
        sentence: "If it rains tomorrow, we ___ stay at home.",
        blankWord: "will",
        spokenSentence: "If it rains tomorrow, we blank stay at home.",
        options: ["did", "would", "will", "have"],
        correctIndex: 2,
        explanation: "Primer condicional (futuro probable): If + presente simple, consecuencia con 'will'.",
        translation: "Si llueve mañana, nos quedaremos en casa."
      },
      {
        sentence: "He has lived in London ___ five years.",
        blankWord: "for",
        spokenSentence: "He has lived in London blank five years.",
        options: ["since", "for", "during", "from"],
        correctIndex: 1,
        explanation: "Usamos 'for' con un período o duración de tiempo ('five years'). 'Since' se usa con puntos de inicio.",
        translation: "Él ha vivido en Londres durante cinco años."
      }
    ],
    advanced: [
      {
        sentence: "I wish I ___ speak ten languages fluently.",
        blankWord: "could",
        spokenSentence: "I wish I blank speak ten languages fluently.",
        options: ["can", "could", "will", "would have"],
        correctIndex: 1,
        explanation: "Estructura de deseo sobre el presente: 'wish + could' o pasado de subjuntivo.",
        translation: "Desearía poder hablar diez idiomas con fluidez."
      },
      {
        sentence: "Hardly had the meeting started ___ the phone rang.",
        blankWord: "when",
        spokenSentence: "Hardly had the meeting started blank the phone rang.",
        options: ["than", "then", "when", "that"],
        correctIndex: 2,
        explanation: "Inversión formal: 'Hardly had... when...' se utiliza para expresar que una acción ocurrió inmediatamente después de otra.",
        translation: "Apenas había comenzado la reunión cuando sonó el teléfono."
      }
    ]
  }
};
