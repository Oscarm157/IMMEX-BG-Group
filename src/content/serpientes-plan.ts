/* Fuente única de verdad del copy analítico. Texto verbatim del documento
   "Plan de Crecimiento Digital · Serpientes Tijuana CIBAPAC"
   (public/Plan de Crecimiento Digital Serpientes Tijuana.docx). Cero invención:
   todo lo que aparece aquí viene del documento, salvo donde se indica
   explícitamente que es un dato de marca (tagline oficial del club). */

export const meta = {
  title: "Comparativa y Plan de Crecimiento Digital",
  subtitle: "Serpientes Tijuana CIBAPAC",
  docxHref: "/Plan de Crecimiento Digital Serpientes Tijuana.docx",
};

/* Tagline oficial del club, NO viene del documento del analista.
   Fuente: tijuanaserpientes.com. Se usa solo en el hero, como elemento de
   identidad de marca, separado del copy analítico. */
export const clubTagline = "Letales en la Duela, Imparables en el Juego";

/* Cifras públicas de redes sociales, NO vienen del documento del analista:
   investigación propia sobre las cuentas oficiales, julio 2026. Son cifras
   aproximadas obtenidas de resultados públicos de búsqueda (Instagram y
   Facebook no permiten scraping directo sin sesión iniciada), no de una API
   oficial ni de un panel de analítica. Se usan solo como referencia de
   magnitud en la comparativa, no como dato exacto en tiempo real. */
export const REDES_RIVALES = {
  fuente: "Cifras públicas aproximadas, consultadas julio 2026",
  equipos: {
    "Guaycuras de La Paz": {
      instagram: { seguidores: 2925, handle: "@guaycuraslapazclubdebasquetbol" },
      facebook: { meGusta: 19940 },
    },
    "Lobos de Ensenada": {
      instagram: { seguidores: 4270, handle: "@ensenadalobos" },
      facebook: { meGusta: 11414 },
    },
    "Serpientes Tijuana": {
      instagram: { seguidores: 487, handle: "@serpientestijuana" },
      facebook: null,
    },
  },
} as const;

export const CONTEXTO = {
  numero: "01",
  titulo: "Contexto general",
  parrafos: [
    "Serpientes Tijuana tuvo una temporada 2025 altamente positiva, tanto en lo deportivo como en posicionamiento de marca. Para una franquicia de reciente incorporación, el equipo logró competir al nivel de organizaciones con mayor trayectoria dentro de CIBAPAC, alcanzando instancias importantes y generando una conexión inicial fuerte con la afición local.",
    "Sin embargo, al comparar la presencia digital con franquicias como Guaycuras de La Paz y Lobos de Ensenada, se identifica una oportunidad clara: Serpientes tiene el potencial deportivo y narrativo para crecer, pero necesita convertir ese impacto en una comunidad digital más grande, activa y constante.",
    "El objetivo no debe ser solamente aumentar seguidores, sino construir una marca deportiva reconocible, emocional y comercialmente atractiva para aficionados, patrocinadores, medios e instituciones locales.",
  ],
};

export const COMPARATIVA = {
  numero: "02",
  titulo: "Comparativa general",
  equipos: [
    {
      nombre: "Guaycuras de La Paz",
      resumen:
        "Comunidad digital más consolidada. Su principal fortaleza es la identidad de tribu, el sentido de pertenencia y el impulso generado por haber sido campeón. Su contenido se apoya en una narrativa clara: orgullo local, comunidad, campeonato y representación de La Paz.",
      fortalezas: [
        "Comunidad digital más amplia.",
        "Identidad de marca bien definida.",
        "Mayor trayectoria y reconocimiento.",
        "Contenido emocional relacionado con campeonato y orgullo local.",
        "Mayor facilidad para generar conversación después de los partidos importantes.",
      ],
    },
    {
      nombre: "Lobos de Ensenada",
      resumen:
        "Lobos de Ensenada también tiene una comunidad fuerte, construida a partir de experiencia, continuidad y sentido de pertenencia. La “manada” funciona como concepto de identidad y permite que la afición se sienta parte del equipo.",
      fortalezas: [
        "Comunidad local consolidada.",
        "Trayectoria dentro de CIBAPAC.",
        "Identidad de afición clara.",
        "Buen uso del concepto de familia/manada.",
        "Mayor reconocimiento por haber llegado a la final nacional.",
      ],
    },
    {
      nombre: "Serpientes Tijuana",
      resumen:
        "Serpientes Tijuana tiene una ventaja muy importante: es una marca nueva con resultados deportivos fuertes. Esto permite construir una historia de crecimiento desde cero, con una narrativa fresca, agresiva y muy ligada a Tijuana.",
      fortalezas: [
        "Temporada debut con resultados sobresalientes.",
        "Identidad visual y nombre con alto potencial.",
        "Mercado más grande y con mayor posibilidad comercial.",
        "Afición deportiva activa en Tijuana.",
        "Oportunidad de posicionarse como el equipo emergente más atractivo de CIBAPAC.",
        "Potencial para conectar con jóvenes, familias, escuelas, marcas locales y medios deportivos.",
      ],
      destacado: true,
    },
  ],
};

export const DIAGNOSTICO = {
  numero: "03",
  titulo: "Diagnóstico",
  parrafos: [
    "Serpientes Tijuana no parte desde cero: parte desde una temporada exitosa. El reto principal es transformar el buen desempeño deportivo en una comunidad digital permanente.",
    "Actualmente, Guaycuras y Lobos tienen ventaja por tres razones: mayor trayectoria y reconocimiento previo, comunidades digitales más grandes, y mayor volumen de contenido emocional por finales, campeonato y tradición.",
    "Serpientes puede competir contra esto si deja de comunicar solo como equipo deportivo y comienza a comunicar como una marca de entretenimiento, comunidad y orgullo tijuanense.",
  ],
  posicionamiento:
    "El equipo nuevo que llegó a competir, conectar y representar a Tijuana con una identidad fuerte.",
};

export const OBJETIVOS = {
  numero: "04",
  titulo: "Objetivos",
  general:
    "Incrementar el alcance, interacción, asistencia y reconocimiento de Serpientes Tijuana durante la próxima temporada, con una estrategia digital y presencial que posicione al equipo por encima de Guaycuras de La Paz y Lobos de Ensenada en visibilidad, comunidad y experiencia de juego.",
  especificos: [
    {
      categoria: "Redes sociales",
      items: [
        "Aumentar seguidores en Instagram y Facebook.",
        "Incrementar el alcance promedio por publicación.",
        "Elevar las reproducciones de Reels y videos cortos.",
        "Generar más contenido compartible por aficionados.",
        "Crear una comunidad identificada con el concepto de “La Guarida”.",
        "Lograr que jugadores, patrocinadores, medios y aficionados participen activamente en la difusión.",
      ],
    },
    {
      categoria: "Juegos y asistencia",
      items: [
        "Mejorar la experiencia del público en cada partido local.",
        "Incrementar asistencia por juego.",
        "Crear dinámicas que motiven a la gente a subir contenido.",
        "Convertir cada partido en un evento social y familiar.",
        "Aumentar el valor para patrocinadores mediante activaciones en cancha y redes.",
      ],
    },
    {
      categoria: "Marca",
      items: [
        "Consolidar a Serpientes como una franquicia profesional, moderna y con identidad local.",
        "Generar una narrativa más fuerte alrededor de Tijuana.",
        "Posicionar al equipo como una de las franquicias con mayor crecimiento en CIBAPAC.",
      ],
    },
  ],
};

export const ESTRATEGIA = {
  numero: "05",
  titulo: "Estrategia central",
  subtitulo: "De equipo deportivo a marca de comunidad",
  intro: "La estrategia debe dividirse en tres pilares:",
  pilares: [
    {
      numero: "1",
      titulo: "Identidad: “La Guarida”",
      descripcion:
        "Crear una identidad fuerte alrededor de la afición. No solo decir “ven al juego”, sino hacer que las personas sientan que pertenecen a algo.",
      conceptos: [
        "La Guarida.",
        "Nuestra cancha, nuestra caza.",
        "Tijuana es territorio Serpiente.",
        "La afición que muerde fuerte.",
        "La ciudad se defiende en casa.",
        "Todos a la Guarida.",
      ],
    },
    {
      numero: "2",
      titulo: "Contenido constante",
      descripcion:
        "Publicar antes, durante y después de cada juego. La temporada no debe comunicarse solo los días de partido. Cada semana debe sentirse como una historia.",
    },
    {
      numero: "3",
      titulo: "Experiencia presencial",
      descripcion:
        "El juego debe ser más que basquetbol. Debe sentirse como evento familiar, deportivo, musical, social y local.",
    },
  ],
};

export const PLAN_CONTENIDO = {
  numero: "06",
  titulo: "Plan de contenido para redes sociales",
  fases: [
    {
      nombre: "Pretemporada",
      objetivo: "Construir expectativa.",
      contenido: [
        "Anuncio de regreso.",
        "Tryouts.",
        "Presentación de jugadores.",
        "Frases de jugadores.",
        "Entrenamientos.",
        "Detrás de cámaras.",
        "Presentación del staff.",
        "Cuenta regresiva.",
        "Historia de la temporada pasada.",
        "“Lo que viene para Serpientes 2026”.",
      ],
      ideasPost: [
        "“La Guarida vuelve a abrir.”",
        "“Tijuana tiene equipo. Tijuana tiene Serpientes.”",
        "“No fue suerte, fue el inicio.”",
        "“La temporada pasada llegamos lejos. Esta vamos por más.”",
        "“¿Quién está listo para volver a la Guarida?”",
      ],
    },
    {
      nombre: "Playoffs",
      objetivo: "Convertir cada juego en una campaña.",
      contenido: [
        "Videos emocionales.",
        "Mensajes de jugadores.",
        "“Defendamos la Guarida.”",
        "Recap de temporada.",
        "Gráficos de serie.",
        "Fotos de afición.",
        "Reels con música intensa.",
        "Convocatorias con patrocinadores.",
        "Dinámicas para boletos.",
      ],
    },
  ],
  calendarioSemanal: {
    objetivo: "Generar conversación semanal.",
    dias: [
      { dia: "Lunes", contenido: "Resumen del juego anterior o mensaje motivacional." },
      { dia: "Martes", contenido: "Jugador destacado o estadística." },
      { dia: "Miércoles", contenido: "Contenido de entrenamiento o detrás de cámaras." },
      { dia: "Jueves", contenido: "Promoción del próximo partido." },
      { dia: "Viernes", contenido: "Video emocional de convocatoria." },
      { dia: "Día de juego", contenido: "Historias en vivo, llegada de jugadores, ambiente, marcador, afición, activaciones y clips rápidos." },
      { dia: "Día posterior", contenido: "Highlights, mejores jugadas, fotos de afición, agradecimiento y llamado al siguiente partido." },
    ],
  },
};

export const TIPOS_CONTENIDO = {
  numero: "07",
  titulo: "Tipos de contenido clave",
  reels: {
    titulo: "Reels de alto impacto",
    intro: "Los Reels deben ser prioridad. Son el formato con mayor capacidad de alcance orgánico.",
    ideas: [
      "Clavadas.",
      "Triples.",
      "Bloqueos.",
      "Entradas al vestidor.",
      "Reacciones del público.",
      "Jugadores llegando al auditorio.",
      "Mejores jugadas del partido.",
      "Momentos de tensión.",
      "Celebraciones.",
      "Tomas de la afición.",
    ],
    formato: [
      "Duración: 7 a 20 segundos.",
      "Inicio fuerte en los primeros 2 segundos.",
      "Texto grande en pantalla.",
      "Música en tendencia.",
      "Edición rápida.",
      "Cierre con frase de marca.",
    ],
    frases: [
      "“Tijuana rugió en la Guarida.”",
      "“Esto no es solo basquetbol.”",
      "“Serpientes volvió a morder.”",
      "“La ciudad ya tiene equipo.”",
      "“La Guarida pesa.”",
    ],
  },
  historias: {
    titulo: "Historias de Instagram",
    intro: "10 a 20 historias el día de juego.",
    ideas: [
      "Encuestas.",
      "Preguntas.",
      "Cuenta regresiva.",
      "Reposteos de aficionados.",
      "Menciones a patrocinadores.",
      "Marcador en vivo.",
      "Clips de ambiente.",
      "“Etiqueta a tu grupo para venir al próximo juego.”",
    ],
  },
  jugadores: {
    titulo: "Contenido con jugadores",
    intro: "Los jugadores deben convertirse en personajes de la marca.",
    ideas: [
      "“Conoce a la Serpiente.”",
      "“3 cosas que no sabías de…”",
      "“Jugador responde rápido.”",
      "“Comida favorita en Tijuana.”",
      "“Canción para calentar.”",
      "“Reto de triples.”",
      "“Reto con aficionados.”",
      "“Mensaje a la afición.”",
    ],
  },
  aficion: {
    titulo: "Contenido con afición",
    intro: "La afición debe ser protagonista.",
    ideas: [
      "Foto de la noche.",
      "Fan de la jornada.",
      "Familia Serpiente.",
      "La mejor porra.",
      "Niño/a del partido.",
      "Aficionado con jersey.",
      "Reposteos de historias.",
      "Dinámicas para aparecer en pantalla.",
    ],
  },
};

export const ACTIVACIONES = {
  numero: "08",
  titulo: "Activaciones para aumentar asistencia",
  lista: [
    {
      numero: "1",
      titulo: "Noche de escuelas",
      descripcion: "Invitar a escuelas, academias y equipos juveniles. Ofrecer paquetes especiales.",
    },
    {
      numero: "2",
      titulo: "Noche universitaria",
      descripcion: "Promoción para estudiantes con credencial. Crear contenido especial para universidades.",
    },
    {
      numero: "3",
      titulo: "Noche familiar",
      descripcion: "Paquetes para familias, fotos con jugadores y dinámicas para niños.",
    },
    {
      numero: "4",
      titulo: "Noche de patrocinador",
      descripcion: "Cada patrocinador puede tener una activación especial en cancha y redes.",
    },
    {
      numero: "5",
      titulo: "Reto de la afición",
      descripcion: "Premiar a la sección más ruidosa o a la mejor porra.",
    },
    {
      numero: "6",
      titulo: "Dinámica “Llena la Guarida”",
      descripcion: "Campaña específica para partidos clave.",
    },
    {
      numero: "7",
      titulo: "Boletos por interacción",
      descripcion:
        "Dinámicas en redes: comparte la publicación, etiqueta a tres amigos, sube una historia apoyando al equipo, usa el hashtag oficial, gana boletos o mercancía.",
    },
  ],
};

export const CAMPANAS = {
  numero: "09",
  titulo: "Campañas recomendadas",
  lista: [
    {
      numero: "1",
      nombre: "“La Guarida es Tijuana”",
      objetivo: "Posicionar al equipo como símbolo local.",
      mensajes: [
        "“Tijuana tiene equipo.”",
        "“La ciudad se defiende en casa.”",
        "“Nuestra cancha, nuestra caza.”",
        "“Todos a la Guarida.”",
      ],
    },
    {
      numero: "2",
      nombre: "“Más que basquetbol”",
      objetivo: "Atraer familias y público casual.",
      mensajes: [
        "“Vive el juego, el ambiente y la energía de Serpientes.”",
        "“Un plan diferente para disfrutar en Tijuana.”",
        "“Basquetbol, familia y emoción en un solo lugar.”",
      ],
    },
    {
      numero: "3",
      nombre: "“El equipo que llegó para competir”",
      objetivo: "Reforzar el éxito deportivo.",
      mensajes: [
        "“En nuestro debut demostramos que venimos en serio.”",
        "“La temporada pasada fue el inicio.”",
        "“Ahora vamos por más.”",
      ],
    },
    {
      numero: "4",
      nombre: "“Yo soy de la Guarida”",
      objetivo: "Generar identidad de afición.",
      mensajes: [
        "“Sube tu foto en el juego.”",
        "“Usa el hashtag oficial.”",
        "“Etiqueta a Serpientes y aparece en nuestras redes.”",
      ],
    },
  ],
};

export const HASHTAGS = {
  numero: "10",
  titulo: "Hashtags recomendados",
  lista: [
    "#SerpientesTijuana",
    "#LaGuarida",
    "#NuestraCanchaNuestraCaza",
    "#TijuanaEsSerpientes",
    "#TodosALaGuarida",
    "#CIBAPAC",
    "#BasquetbolTijuana",
    "#OrgulloTijuanense",
    "#TemporadaSerpientes",
  ],
};

export const PAUTA_DIGITAL = {
  numero: "11",
  titulo: "Recomendaciones para pauta digital",
  intro: "La pauta debe dividirse en tres objetivos:",
  objetivos: [
    {
      numero: "1",
      titulo: "Reconocimiento",
      descripcion: "Para llegar a más personas en Tijuana y alrededores.",
      contenido: ["Videos emocionales.", "Presentación de temporada.", "Mejores jugadas.", "Invitación general."],
    },
    {
      numero: "2",
      titulo: "Interacción",
      descripcion: "Para aumentar comentarios, compartidos y mensajes.",
      contenido: ["Dinámicas.", "Sorteos.", "Preguntas.", "Retos."],
    },
    {
      numero: "3",
      titulo: "Conversión a asistencia",
      descripcion: "Para promover partidos específicos.",
      contenido: [
        "Calendario.",
        "Promoción de boletos.",
        "Paquetes familiares.",
        "Partidos importantes.",
        "Llamado directo a comprar o asistir.",
      ],
    },
  ],
  segmentacion: [
    "Tijuana, Rosarito, Tecate y San Diego.",
    "Personas interesadas en basquetbol, deportes, NBA, gimnasios, universidades y entretenimiento familiar.",
    "Padres de familia con hijos en deportes.",
    "Jóvenes de 16 a 34 años.",
    "Aficionados a equipos locales.",
  ],
};

export const ALIANZAS = {
  numero: "12",
  titulo: "Alianzas estratégicas",
  intro: "Para superar a Guaycuras y Lobos en alcance, Serpientes debe apoyarse en la ciudad.",
  aliados: [
    "Medios deportivos locales.",
    "Universidades.",
    "Academias de basquetbol.",
    "Gimnasios.",
    "Restaurantes.",
    "Bares deportivos.",
    "Marcas locales.",
    "Influencers deportivos.",
    "Creadores de contenido de Tijuana.",
    "Ligas escolares y juveniles.",
    "Patrocinadores actuales.",
  ],
  ideas: [
    "Jugadores visitando escuelas.",
    "Clínicas deportivas.",
    "Sorteos con patrocinadores.",
    "Entrevistas en medios locales.",
    "Contenido colaborativo con marcas.",
    "Videos con creadores deportivos.",
    "Paquetes de comida + boleto.",
    "Activaciones en plazas o eventos locales.",
  ],
};

export const INDICADORES = {
  numero: "13",
  titulo: "Indicadores de éxito",
  intro: "Para medir si la estrategia está funcionando, se recomienda revisar mensualmente:",
  grupos: [
    {
      categoria: "Redes sociales",
      items: [
        "Alcance total.",
        "Reproducciones de Reels.",
        "Interacciones.",
        "Compartidos.",
        "Comentarios.",
        "Guardados.",
        "Crecimiento de seguidores.",
        "Visitas al perfil.",
        "Clics a WhatsApp o link de boletos.",
        "Historias etiquetando al equipo.",
      ],
    },
    {
      categoria: "Juegos",
      items: [
        "Asistencia por partido.",
        "Boletos vendidos por dinámica.",
        "Redención de promociones.",
        "Participación en activaciones.",
        "Menciones de patrocinadores.",
        "Contenido generado por aficionados.",
      ],
    },
    {
      categoria: "Marca",
      items: [
        "Nuevas alianzas.",
        "Patrocinadores interesados.",
        "Cobertura en medios.",
        "Apariciones en páginas deportivas.",
        "Crecimiento de comunidad local.",
      ],
    },
  ],
};

export const METAS = {
  numero: "14",
  titulo: "Meta de crecimiento sugerida",
  horizontes: [
    {
      nombre: "Primeros 3 meses",
      items: [
        "Duplicar la comunidad actual en Instagram.",
        "Incrementar el alcance promedio por publicación.",
        "Lograr que cada juego genere contenido de aficionados.",
        "Tener presencia semanal en medios o páginas deportivas.",
        "Consolidar el concepto “La Guarida”.",
      ],
    },
    {
      nombre: "Durante la temporada",
      items: [
        "Lograr que cada partido tenga campaña previa.",
        "Incrementar asistencia en juegos locales.",
        "Generar al menos 3 a 5 Reels fuertes por semana.",
        "Conseguir colaboraciones con jugadores, patrocinadores y creadores.",
        "Posicionar a Serpientes como una de las franquicias con mayor crecimiento digital de CIBAPAC.",
      ],
    },
    {
      nombre: "Al cierre de temporada",
      items: [
        "Superar a competidores directos en crecimiento porcentual.",
        "Tener una comunidad más activa.",
        "Mejorar el valor comercial para patrocinadores.",
        "Convertir la experiencia de juego en un evento esperado por la ciudad.",
      ],
    },
  ],
};

export const CONCLUSION = {
  numero: "15",
  titulo: "Conclusión",
  parrafos: [
    "Serpientes Tijuana ya demostró que puede competir deportivamente. Ahora el siguiente paso es convertir ese rendimiento en una marca más grande, más visible y más conectada con la ciudad.",
    "Guaycuras y Lobos tienen ventaja por trayectoria y comunidad acumulada, pero Serpientes tiene una oportunidad única: construir una franquicia moderna, intensa y representativa de Tijuana desde una etapa temprana.",
  ],
  puntos: [
    "Crear identidad de afición.",
    "Generar contenido constante y emocional.",
    "Convertir cada juego en una experiencia.",
  ],
  cierre:
    "Si Serpientes logra comunicar con fuerza, involucrar a la ciudad y mantener una producción constante de contenido, puede posicionarse como una de las franquicias con mayor crecimiento y alcance dentro de CIBAPAC.",
};

/* Ensamblado para /documento, mismas constantes de arriba, sin reescribir texto. */
export const PLAN_SECTIONS = [
  { id: "contexto", numero: CONTEXTO.numero, titulo: CONTEXTO.titulo, data: CONTEXTO },
  { id: "comparativa", numero: COMPARATIVA.numero, titulo: COMPARATIVA.titulo, data: COMPARATIVA },
  { id: "diagnostico", numero: DIAGNOSTICO.numero, titulo: DIAGNOSTICO.titulo, data: DIAGNOSTICO },
  { id: "objetivos", numero: OBJETIVOS.numero, titulo: OBJETIVOS.titulo, data: OBJETIVOS },
  { id: "estrategia", numero: ESTRATEGIA.numero, titulo: ESTRATEGIA.titulo, data: ESTRATEGIA },
  { id: "plan-contenido", numero: PLAN_CONTENIDO.numero, titulo: PLAN_CONTENIDO.titulo, data: PLAN_CONTENIDO },
  { id: "tipos-contenido", numero: TIPOS_CONTENIDO.numero, titulo: TIPOS_CONTENIDO.titulo, data: TIPOS_CONTENIDO },
  { id: "activaciones", numero: ACTIVACIONES.numero, titulo: ACTIVACIONES.titulo, data: ACTIVACIONES },
  { id: "campanas", numero: CAMPANAS.numero, titulo: CAMPANAS.titulo, data: CAMPANAS },
  { id: "hashtags", numero: HASHTAGS.numero, titulo: HASHTAGS.titulo, data: HASHTAGS },
  { id: "pauta-digital", numero: PAUTA_DIGITAL.numero, titulo: PAUTA_DIGITAL.titulo, data: PAUTA_DIGITAL },
  { id: "alianzas", numero: ALIANZAS.numero, titulo: ALIANZAS.titulo, data: ALIANZAS },
  { id: "indicadores", numero: INDICADORES.numero, titulo: INDICADORES.titulo, data: INDICADORES },
  { id: "metas", numero: METAS.numero, titulo: METAS.titulo, data: METAS },
  { id: "conclusion", numero: CONCLUSION.numero, titulo: CONCLUSION.titulo, data: CONCLUSION },
] as const;
