import type { MetadataRoute } from "next";
import { locales } from "@/content/dictionaries";
import { SERVICE_SLUGS } from "@/content/service-slugs";
import { GUIA_SLUGS } from "@/content/guias";
import { UBICACION_SLUGS } from "@/content/ubicaciones";

const BASE_URL = "https://bgconsultingroup.com";

// Rutas estáticas del sitio corporativo bilingüe (el blog es dinámico desde DB
// y se añadirá cuando se genere su sitemap propio).
export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const lang of locales) {
    entries.push({ url: `${BASE_URL}/${lang}`, changeFrequency: "monthly", priority: 1 });
    for (const p of ["services", "software", "about", "contact"]) {
      entries.push({ url: `${BASE_URL}/${lang}/${p}`, changeFrequency: "monthly", priority: 0.8 });
    }
    for (const slug of SERVICE_SLUGS) {
      entries.push({ url: `${BASE_URL}/${lang}/services/${slug}`, changeFrequency: "monthly", priority: 0.7 });
    }
  }

  // Corpus SEO español-first (sin prefijo de idioma).
  entries.push({ url: `${BASE_URL}/guias`, changeFrequency: "weekly", priority: 0.6 });
  for (const slug of GUIA_SLUGS) {
    entries.push({ url: `${BASE_URL}/guias/${slug}`, changeFrequency: "monthly", priority: 0.6 });
  }
  entries.push({ url: `${BASE_URL}/ubicaciones`, changeFrequency: "monthly", priority: 0.6 });
  for (const slug of UBICACION_SLUGS) {
    entries.push({ url: `${BASE_URL}/ubicaciones/${slug}`, changeFrequency: "monthly", priority: 0.7 });
  }

  return entries;
}
