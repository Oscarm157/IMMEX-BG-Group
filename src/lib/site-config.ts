// Configuración específica del sitio. Al clonar la plantilla a otro sitio,
// este archivo (más persona/knowledge del chat y los tokens de marca) es lo único
// que cambia. Datos reales, sin inventar.

export const siteConfig = {
  name: "BG Consulting Group",
  shortName: "BG",
  legalName: "BG Consulting Group",
  domain: "bgconsultingroup.com",
  tagline: {
    es: "Comercio exterior, aduanas y cumplimiento entre Tijuana y San Diego.",
    en: "Foreign trade, customs and compliance between Tijuana and San Diego.",
  },
  email: "contacto@bgc.mx",
  timezone: "America/Tijuana",
  offices: [
    {
      city: "Tijuana",
      address: "Miguel Alemán 3231 B, Col. Gabilondo, Tijuana, B.C. 22044",
      phone: "+52 (664) 607 9642",
    },
    {
      city: "San Diego",
      address: "7577 Airway Road, Suite 106, San Diego, CA 92154",
      phone: "(619) 638-2168",
      toll: "+1 (855) 755 0641",
    },
  ],
  hours: {
    es: "Disponibilidad 24/7",
    en: "Available 24/7",
  },
  // Perfiles oficiales (fuente única; los consume el Footer y el schema Organization).
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/bgconsultingroup/" },
    { label: "Instagram", href: "https://www.instagram.com/bgconsultingroup/" },
    { label: "Facebook", href: "https://www.facebook.com/bgconsulting/" },
    { label: "X", href: "https://twitter.com/BGC_MX" },
  ],
} as const;

// Destinatario de las notificaciones de leads (form y chatbot).
// Override con LEAD_RECIPIENT en env si se quiere enrutar a otra bandeja.
export const leadRecipient = process.env.LEAD_RECIPIENT || siteConfig.email;

// Remitente verificado en Resend. Mientras no se verifique el dominio,
// usar el sandbox onboarding@resend.dev (solo entrega al dueño de la cuenta).
export const mailFrom = process.env.MAIL_FROM || "onboarding@resend.dev";
