import { getDictionary, type Locale } from "@/content/dictionaries";
import { SERVICE_DETAIL } from "@/content/services-detail";
import { siteConfig } from "@/lib/site-config";

const T = {
  es: { company: "Firma", based: "Sede", offices: "Oficinas", email: "Correo", hours: "Disponibilidad", partner: "Software propio (ERP)", services: "Servicios", scope: "Alcance", software: "BMS (software aduanero)", about: "Cómo trabaja BG" },
  en: { company: "Firm", based: "Based in", offices: "Offices", email: "Email", hours: "Availability", partner: "In-house ERP", services: "Services", scope: "Scope", software: "BMS (customs software)", about: "How BG works" },
} as const;

/**
 * Compila el contenido real de BG (servicios, software, contacto) en un bloque
 * de conocimiento para el system prompt del chat. Lee de las mismas fuentes que
 * renderiza el sitio, así el bot queda en sincronía y no inventa.
 */
export function buildKnowledge(locale: Locale): string {
  const t = T[locale];
  const d = getDictionary(locale);

  const offices = siteConfig.offices
    .map((o) => `- ${o.city}: ${o.address}. Tel: ${o.phone}${"toll" in o && o.toll ? ` / ${o.toll}` : ""}`)
    .join("\n");
  const company = [
    `## ${t.company}`,
    `${siteConfig.legalName}. ${t.based}: Tijuana y San Diego. ${siteConfig.hours[locale]}.`,
    `### ${t.offices}`,
    offices,
    `${t.email}: ${siteConfig.email}.`,
  ].join("\n");

  const services = [
    `## ${t.services}`,
    d.services.items
      .map((s, i) => {
        const det = SERVICE_DETAIL[locale][i];
        const lines = [`### ${s.name}`, det?.overview ?? s.summary];
        if (det?.whatWeDo?.length) {
          lines.push(`${t.scope}: ${det.whatWeDo.map((w) => w.title).join("; ")}.`);
        }
        return lines.join("\n");
      })
      .join("\n\n"),
  ].join("\n\n");

  const sw = d.software;
  const software = [
    `## ${t.software}`,
    sw.lead,
    `${sw.capabilities.map((c) => c.title).join("; ")}.`,
  ].join("\n");

  const about = [`## ${t.about}`, d.about.intro].join("\n");

  return [company, services, software, about].join("\n\n");
}
