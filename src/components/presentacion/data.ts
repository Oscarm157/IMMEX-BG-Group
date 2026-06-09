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
