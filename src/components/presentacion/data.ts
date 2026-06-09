/* Contenido del deck. Una sola fuente de verdad para extenderlo después.
   Datos reales del proyecto; cero invención. */

export const meta = {
  client: "BG Consulting Group",
  title: "Renovación digital",
  date: "Junio 2026",
  domain: "bgconsultingroup.com",
};

/* Qué mejora (el porqué de la renovación), en lenguaje claro. */
export const frentes = [
  {
    n: "01",
    title: "Personalización total",
    body: "Código desarrollado a la medida, no una plantilla. Permite ajustar cualquier elemento del sitio sin las limitaciones de los temas y plugins de terceros.",
    icon: "tune",
  },
  {
    n: "02",
    title: "Bilingüe español e inglés",
    body: "El sitio completo en ambos idiomas, con cambio en un clic. Pensado para clientes de los dos lados de la frontera.",
    icon: "language",
  },
  {
    n: "03",
    title: "Posicionamiento en buscadores",
    body: "Estructura orientada a SEO, con un blog propio que aporta contenido y posiciona a la firma en sus áreas de especialidad.",
    icon: "search",
  },
  {
    n: "04",
    title: "Carga rápida",
    body: "Tiempos de carga reducidos. El desempeño deja de depender de la acumulación de plugins propia de WordPress.",
    icon: "bolt",
  },
];

/* Chatbot del sitio: primera atención automatizada. */
export const chatbot = {
  title: "Atención inicial automatizada",
  body: "El sitio incorpora un asistente con inteligencia artificial que recibe a cada visitante desde el primer momento.",
  puntos: [
    "Atiende a cada visitante de inmediato, sin horarios ni tiempos de espera",
    "La respuesta inmediata incrementa la conversión de visitantes en prospectos",
    "Resuelve dudas frecuentes y orienta hacia el servicio adecuado",
    "Refuerza la imagen profesional de la firma",
    "Registra el contacto como prospecto en el panel",
  ],
};

/* Módulos reales del panel admin, agrupados como en la navegación. */
export const modulos = {
  comercial: [
    { name: "Resumen", desc: "Tablero con KPIs, embudo, tendencia y desglose por fuente, servicio y agente." },
    { name: "Leads", desc: "Lista de prospectos con alta, calificación, asignación y archivo de cada contacto." },
    { name: "Pipeline", desc: "Tablero kanban: arrastras cada lead por etapa, con carril por responsable." },
    { name: "Campañas", desc: "Anuncios de Meta, Google, TikTok y LinkedIn con presupuesto, leads, CPL y conversión." },
  ],
  contenido: [
    { name: "Blog", desc: "Artículos públicos del sitio con estado borrador, programada o publicada." },
    { name: "Generador de posts", desc: "IA que toma un PDF, URL o texto y produce variantes por red social." },
  ],
  cuenta: [
    { name: "Usuarios", desc: "Equipo con roles Admin, Agente y Lector, alta, edición y baja de accesos." },
  ],
};

/* Capturas reales (se generan con Playwright en public/presentacion/). */
export const shots = {
  homeHero: { src: "/presentacion/home-hero.png", url: "bgconsultingroup.com/es" },
  homeTelemetry: { src: "/presentacion/home-telemetry.png", url: "bgconsultingroup.com/es" },
  software: { src: "/presentacion/software.png", url: "bgconsultingroup.com/es/software" },
  blog: { src: "/presentacion/blog.png", url: "bgconsultingroup.com/es/blog" },
  contact: { src: "/presentacion/contact.png", url: "bgconsultingroup.com/es/contact" },
  chatbot: { src: "/presentacion/chatbot.png", url: "bgconsultingroup.com/es" },
  panelResumen: { src: "/presentacion/panel-resumen.png", url: "bgconsultingroup.com/admin/dashboard" },
  panelLeads: { src: "/presentacion/panel-leads.png", url: "bgconsultingroup.com/admin" },
  panelPipeline: { src: "/presentacion/panel-pipeline.png", url: "bgconsultingroup.com/admin/board" },
  panelCampanas: { src: "/presentacion/panel-campanas.png", url: "bgconsultingroup.com/admin/ads" },
  panelBlog: { src: "/presentacion/panel-blog.png", url: "bgconsultingroup.com/admin/blog" },
  panelContenido: { src: "/presentacion/panel-contenido.png", url: "bgconsultingroup.com/admin/posts" },
};

/* Pauta digital (siguiente paso). Destilado de docs/investigacion-pauta-digital.md. */
export const pauta = {
  google: {
    rol: "Base siempre encendida",
    body: "Búsqueda en español. Captura a quien ya tiene el problema y lo busca: una revisión, un saldo de IVA atorado, un sistema para Anexo 24.",
    keywords: {
      bg: [
        "auditoría IMMEX",
        "devolución IVA SAT",
        "recurso de revocación SAT",
        "clasificación arancelaria",
        "VUCEM",
        "Portal ADUANAS SAT",
      ],
      bms: [
        "software anexo 24",
        "software anexo 30",
        "sistema control inventarios IMMEX",
        "ERP aduanero",
      ],
    },
  },
  linkedin: {
    rol: "En ráfagas, no continuo",
    body: "El único canal que segmenta por cargo, empresa e industria. Se enciende por fases para empujes concretos: lanzar BMS ante directores de comercio exterior, mover un contenido de autoridad.",
  },
  presupuesto: {
    rango: "$5,000 a $10,000 MXN al mes",
    nota: "A este nivel, Google de base y LinkedIn concentrado en una ráfaga por trimestre, en vez de diluir los dos.",
    estimados: [
      { monto: "~$5,000 MXN", out: "3 a 5 prospectos / mes" },
      { monto: "~$10,000 MXN", out: "6 a 10 prospectos / mes" },
    ],
  },
  email: [
    {
      title: "Arrancar con valor",
      body: "Una invitación con un recurso útil (una guía de auditoría IMMEX, un diagnóstico) para activar a la lista del evento.",
      icon: "redeem",
    },
    {
      title: "Segmentar por oferta",
      body: "Perfil legal y compliance hacia el ángulo BG (defensa, auditoría, riesgo IMMEX). Perfil operativo y sistemas hacia BMS (inventarios, Anexo 24/30, reportería).",
      icon: "splitscreen",
    },
    {
      title: "Secuencia de seguimiento",
      body: "Cinco correos en cerca de 28 días: presentación, problema concreto, prueba (20+ años, 180+ empresas), oferta blanda y cierre. Sin saturar; el ciclo de venta del giro es de meses.",
      icon: "mail",
    },
    {
      title: "Del correo a la llamada",
      body: "Cuando un contacto abre varios correos o visita el sitio, es señal para llamar. El correo abre la puerta; la persona cierra.",
      icon: "call",
    },
  ],
};
