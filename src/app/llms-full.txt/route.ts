import { GUIAS } from "@/content/guias";
import { UBICACIONES } from "@/content/ubicaciones";
import { SERVICE_SLUGS } from "@/content/service-slugs";
import { getDictionary } from "@/content/dictionaries";
import { siteConfig } from "@/lib/site-config";

// /llms-full.txt — versión extendida (convención llmstxt.org): el contenido
// completo de guías, servicios y ubicaciones inline, con su fundamento legal,
// para que un asistente pueda responder sobre comercio exterior con la info de
// BG. Se genera desde los mismos datos que el sitio. Estático.
export const dynamic = "force-static";

const BASE = "https://bgconsultingroup.com";

export function GET() {
  const dict = getDictionary("es");
  const [tj, sd] = siteConfig.offices;
  const L: string[] = [];

  L.push("# BG Consulting Group — contenido completo");
  L.push("");
  L.push(
    "> Versión extendida para agentes y modelos: el contenido de las guías, servicios, software y ubicaciones de BG Consulting Group, con su fundamento legal. Firma de comercio exterior, aduanas, legal, fiscal y cumplimiento con más de 20 años de práctica entre Tijuana y San Diego. El despacho de pedimentos se realiza a través de una red de agentes aduanales aliados; BG sostiene la asesoría legal y el cumplimiento, no opera con patente propia.",
  );
  L.push("");

  L.push("# Guías de comercio exterior");
  L.push("");
  for (const g of GUIAS) {
    L.push(`## ${g.h1}`);
    L.push(`URL: ${BASE}/guias/${g.slug}`);
    L.push("");
    for (const p of g.definicion) {
      L.push(p);
      L.push("");
    }
    L.push(`**Fundamento legal:** ${g.fundamento.cita}`);
    L.push(g.fundamento.texto);
    L.push("");
    L.push("**Puntos clave:**");
    for (const p of g.puntosClave) L.push(`- ${p.title}: ${p.desc}`);
    L.push("");
    if (g.distincion?.length) {
      L.push("**Diferencias clave:**");
      for (const d of g.distincion) L.push(`- ${d.title}: ${d.desc}`);
      L.push("");
    }
    L.push("**Errores comunes y su consecuencia:**");
    for (const e of g.errores) L.push(`- ${e.title}: ${e.desc}`);
    L.push("");
    L.push("**Preguntas frecuentes:**");
    for (const f of g.faq) {
      L.push(`- ${f.q}`);
      L.push(`  ${f.a}`);
    }
    L.push("");
    L.push("---");
    L.push("");
  }

  L.push("# Servicios");
  L.push("");
  for (let i = 0; i < SERVICE_SLUGS.length; i++) {
    const it = dict.services.items[i];
    L.push(`## ${it.name}`);
    L.push(`URL: ${BASE}/es/services/${SERVICE_SLUGS[i]}`);
    L.push(it.summary);
    if (it.points?.length) {
      L.push("");
      for (const p of it.points) L.push(`- ${p}`);
    }
    L.push("");
  }

  L.push("# Software BMS");
  L.push(`URL: ${BASE}/es/software`);
  L.push(dict.software.lead);
  L.push("");
  for (const c of dict.software.capabilities) L.push(`- ${c.title}: ${c.body}`);
  L.push("");
  L.push(`## ${dict.software.editionsTitle}`);
  for (const e of dict.software.editionsDetail) {
    L.push(`- ${e.name}${e.anexo ? ` (${e.anexo})` : ""}: ${e.body}`);
  }
  L.push(dict.software.editionsNote);
  L.push("");

  L.push("# Ubicaciones");
  L.push("");
  for (const u of UBICACIONES) {
    L.push(`## ${u.h1}`);
    L.push(`URL: ${BASE}/ubicaciones/${u.slug}`);
    L.push("");
    for (const p of u.intro) L.push(p);
    L.push("");
    L.push(`**Aduana:** ${u.aduana.nombre}`);
    for (const c of u.aduana.cruces) L.push(`- ${c.nombre} (${c.tipo}): ${c.nota}`);
    L.push("");
    L.push(`**Sectores:** ${u.sectores.join(", ")}`);
    L.push("");
    L.push("**Operaciones:**");
    for (const o of u.operaciones) L.push(`- ${o.title}: ${o.desc}`);
    L.push("");
    L.push(`**Modelo de operación:** ${u.modelo}`);
    L.push("");
    L.push("**Preguntas frecuentes:**");
    for (const f of u.faq) {
      L.push(`- ${f.q}`);
      L.push(`  ${f.a}`);
    }
    L.push("");
  }

  L.push("# Contacto");
  L.push(`- ${tj.city} (sede): ${tj.address} · ${tj.phone}`);
  L.push(`- ${sd.city}: ${sd.address} · ${sd.phone}`);
  L.push(`- Correo: ${siteConfig.email}`);
  L.push(`- Formulario de contacto: ${BASE}/es/contact`);
  L.push("");

  return new Response(L.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
