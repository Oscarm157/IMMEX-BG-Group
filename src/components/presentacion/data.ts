/* Contenido del deck. Una sola fuente de verdad para extenderlo después.
   Datos reales del proyecto; cero invención. */

export const meta = {
  client: "BG Consulting Group",
  title: "Renovación digital",
  date: "Junio 2026",
  domain: "bgconsultingroup.com",
};

/* Los cinco frentes del cambio (el porqué de la renovación). */
export const frentes = [
  {
    n: "01",
    title: "Sitio renovado y bilingüe",
    body: "Pasamos de una landing de evento a un sitio formal de la firma, en español e inglés, con páginas reales: inicio, servicios, software, nosotros, blog y contacto.",
    icon: "language",
  },
  {
    n: "02",
    title: "SEO",
    body: "Estructura pensada para buscar: metadatos por idioma, rutas limpias /es y /en, Open Graph y contenido editorial en el blog para ganar posición en Google.",
    icon: "search",
  },
  {
    n: "03",
    title: "Velocidad de carga",
    body: "Render estático donde se puede, imágenes en WebP optimizadas y fuentes servidas localmente. El sitio abre rápido, no pesa.",
    icon: "bolt",
  },
  {
    n: "04",
    title: "Mayor personalización",
    body: "Todo el contenido vive en el panel: servicios, blog y campañas se editan sin tocar código. El sitio se adapta a la operación, no al revés.",
    icon: "tune",
  },
  {
    n: "05",
    title: "Integración con IA",
    body: "Un asistente conversacional en el sitio que califica visitantes, y un generador de contenido para redes dentro del panel. La IA trabaja, no decora.",
    icon: "neurology",
  },
];

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
  panelResumen: { src: "/presentacion/panel-resumen.png", url: "bgconsultingroup.com/admin/dashboard" },
  panelLeads: { src: "/presentacion/panel-leads.png", url: "bgconsultingroup.com/admin" },
  panelPipeline: { src: "/presentacion/panel-pipeline.png", url: "bgconsultingroup.com/admin/board" },
  panelCampanas: { src: "/presentacion/panel-campanas.png", url: "bgconsultingroup.com/admin/ads" },
  panelBlog: { src: "/presentacion/panel-blog.png", url: "bgconsultingroup.com/admin/blog" },
  panelContenido: { src: "/presentacion/panel-contenido.png", url: "bgconsultingroup.com/admin/posts" },
};
