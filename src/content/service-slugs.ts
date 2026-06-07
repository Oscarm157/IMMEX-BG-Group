// Slugs estables (del sitio real bgconsulting.mx) en el MISMO orden que
// dictionaries.services.items. Se usan en /[lang]/services/[slug].
export const SERVICE_SLUGS = [
  "legal-consulting",
  "compliance-and-assurance",
  "foreign-trade",
  "international-trade-experts",
  "information-technology",
  "fiscal-services",
  "trade-agreements",
  "import-services",
] as const;

export type ServiceSlug = (typeof SERVICE_SLUGS)[number];
