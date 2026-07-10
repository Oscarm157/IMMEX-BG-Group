import { GUIAS } from "@/content/guias";
import { UBICACIONES } from "@/content/ubicaciones";
import { SERVICE_SLUGS } from "@/content/service-slugs";
import { getDictionary } from "@/content/dictionaries";

// /llms.txt — índice legible por modelos (convención llmstxt.org). Se genera
// desde los mismos datos que el sitio para no desincronizarse. Estático.
export const dynamic = "force-static";

const BASE = "https://bgconsultingroup.com";

export function GET() {
  const dict = getDictionary("es");
  const L: string[] = [];

  L.push("# BG Consulting Group");
  L.push("");
  L.push(
    "> Firma de comercio exterior, aduanas y cumplimiento entre Tijuana y San Diego, con más de 20 años de práctica. Asesoría legal, fiscal y de cumplimiento IMMEX, además del software BMS. El despacho de pedimentos se realiza a través de una red de agentes aduanales aliados; BG sostiene la parte legal y el cumplimiento.",
  );
  L.push("");

  L.push("## Guías de comercio exterior");
  for (const g of GUIAS) {
    L.push(`- [${g.h1}](${BASE}/guias/${g.slug}): ${g.seoDescription}`);
  }
  L.push("");

  L.push("## Servicios");
  for (let i = 0; i < SERVICE_SLUGS.length; i++) {
    const item = dict.services.items[i];
    L.push(`- [${item.name}](${BASE}/es/services/${SERVICE_SLUGS[i]}): ${item.summary}`);
  }
  L.push("");

  L.push("## Ubicaciones");
  for (const u of UBICACIONES) {
    L.push(`- [${u.h1}](${BASE}/ubicaciones/${u.slug}): ${u.seoDescription}`);
  }
  L.push("");

  L.push("## Páginas clave");
  L.push(`- [Software BMS](${BASE}/es/software): Cumplimiento IMMEX automatizado (Anexo 24 y 30, EDI, reportería, integración ERP/MRP).`);
  L.push(`- [Nosotros](${BASE}/es/about): Veinte años en aduanas, fiscal y tecnología.`);
  L.push(`- [Contacto](${BASE}/es/contact): Pon tu operación en orden con BG.`);
  L.push(`- [Aviso de privacidad](${BASE}/es/privacy)`);
  L.push("");

  return new Response(L.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
