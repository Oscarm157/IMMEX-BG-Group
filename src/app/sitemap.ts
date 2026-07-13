import type { MetadataRoute } from "next";
import { locales } from "@/content/dictionaries";
import { SERVICE_SLUGS } from "@/content/service-slugs";
import { GUIAS } from "@/content/guias";
import { UBICACION_SLUGS } from "@/content/ubicaciones";
import { getPublishedArticles } from "@/lib/blog/data";

const BASE_URL = "https://bgconsultingroup.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  for (const lang of locales) {
    entries.push({ url: `${BASE_URL}/${lang}`, changeFrequency: "monthly", priority: 1 });
    for (const p of ["services", "software", "about", "contact", "blog"]) {
      entries.push({ url: `${BASE_URL}/${lang}/${p}`, changeFrequency: "monthly", priority: 0.8 });
    }
    for (const slug of SERVICE_SLUGS) {
      entries.push({ url: `${BASE_URL}/${lang}/services/${slug}`, changeFrequency: "monthly", priority: 0.7 });
    }
  }

  // Blog: artículos publicados (bilingües). Si la DB falla, el sitemap no se rompe.
  try {
    const articles = await getPublishedArticles();
    for (const a of articles) {
      const lastModified = a.updatedAt ?? a.publishedAt ?? undefined;
      for (const lang of locales) {
        entries.push({
          url: `${BASE_URL}/${lang}/blog/${a.slug}`,
          lastModified,
          changeFrequency: "monthly",
          priority: 0.6,
        });
      }
    }
  } catch {
    /* sin entradas de blog si la DB no está disponible en build */
  }

  // Corpus SEO español-first (sin prefijo de idioma).
  entries.push({ url: `${BASE_URL}/guias`, changeFrequency: "weekly", priority: 0.6 });
  for (const g of GUIAS) {
    entries.push({
      url: `${BASE_URL}/guias/${g.slug}`,
      lastModified: new Date(g.actualizado),
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }
  entries.push({ url: `${BASE_URL}/ubicaciones`, changeFrequency: "monthly", priority: 0.6 });
  for (const slug of UBICACION_SLUGS) {
    entries.push({ url: `${BASE_URL}/ubicaciones/${slug}`, changeFrequency: "monthly", priority: 0.7 });
  }

  return entries;
}
