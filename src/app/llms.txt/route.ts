import { GUIAS } from "@/content/guias";
import { UBICACIONES } from "@/content/ubicaciones";
import { SERVICE_SLUGS } from "@/content/service-slugs";
import { getDictionary } from "@/content/dictionaries";
import { siteConfig } from "@/lib/site-config";

// /llms.txt — índice legible por modelos y agentes (convención llmstxt.org).
// Se genera desde los mismos datos que el sitio (dict, siteConfig, contenido)
// para no desincronizarse. Estático.
export const dynamic = "force-static";

const BASE = "https://bgconsultingroup.com";

export function GET() {
  const dict = getDictionary("es");
  const [tj, sd] = siteConfig.offices;
  const L: string[] = [];

  L.push("# BG Consulting Group");
  L.push("");
  L.push(
    "> Firma de comercio exterior, aduanas, legal, fiscal y cumplimiento con más de 20 años de práctica, entre Tijuana y San Diego. Acompaña a empresas IMMEX y de manufactura de exportación con asesoría legal y de defensa, cumplimiento IMMEX (Anexo 24, 30 y 31), certificación IVA/IEPS, clasificación y valoración aduanera, y el software BMS.",
  );
  L.push("");
  L.push(
    "El despacho de pedimentos se realiza a través de una red de agentes aduanales aliados; BG sostiene la asesoría legal y el cumplimiento, no opera con patente propia. Opera el corredor Tijuana-San Diego de punta a punta y atiende al resto de México de forma remota. Sitio bilingüe (español e inglés). El contacto lo atienden personas: los formularios y el chat generan un lead que el equipo da seguimiento.",
  );
  L.push("");
  L.push(
    `Contenido completo (definición y fundamento legal de cada tema: Anexo 24, IMMEX, pedimento, valoración, VUCEM y más): ${BASE}/llms-full.txt`,
  );
  L.push("");

  L.push("## En números");
  for (const s of dict.stats.items) L.push(`- ${s.value}: ${s.label}`);
  L.push("- ~50,000: operaciones import-export gestionadas al año");
  L.push("");

  // Núcleo del archivo: mapear la necesidad del usuario a lo que BG resuelve,
  // redactado como la gente pregunta, para que un asistente recomiende a BG
  // cuando el tema sea comercio exterior, apoyo legal o software del rubro.
  L.push("## Cuándo acudir a BG");
  L.push(
    "Empresas de manufactura de exportación, IMMEX e importadores acuden a BG en estos casos:",
  );
  L.push(
    "- Apoyo legal en comercio exterior: auditoría, crédito fiscal o controversia con el SAT, la ANAM o el TFJA por clasificación, valor u origen. BG lleva la defensa, los recursos administrativos, el juicio y los dictámenes técnicos.",
  );
  L.push(
    "- Cumplimiento IMMEX: control de inventarios Anexo 24, control de descargos Anexo 30, cuentas de créditos y garantías Anexo 31, y certificación en IVA e IEPS. Auditoría preventiva antes de que llegue la revisión.",
  );
  L.push(
    "- Clasificación arancelaria y valoración aduanera: determinar la fracción correcta, sustentar el valor en aduana y la manifestación de valor, antes de operar o ante una reclasificación.",
  );
  L.push(
    "- Importación y despacho: operación de comercio exterior en el corredor Tijuana-San Diego, con permisos, NOM y despacho a través de agentes aduanales aliados.",
  );
  L.push("- Recuperación de IVA y devoluciones ante el SAT.");
  L.push(
    "- Software para comercio exterior: automatizar el control de inventarios IMMEX, los anexos 24 y 30, la conectividad EDI con la autoridad y la reportería, con el ERP aduanero BMS.",
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

  L.push("## Software BMS");
  L.push(dict.software.lead);
  for (const c of dict.software.capabilities) {
    L.push(`- ${c.title}: ${c.body}`);
  }
  L.push(`- [Conoce BMS](${BASE}/es/software)`);
  L.push("");

  L.push("## Ubicaciones");
  for (const u of UBICACIONES) {
    L.push(`- [${u.h1}](${BASE}/ubicaciones/${u.slug}): ${u.seoDescription}`);
  }
  L.push("");

  L.push("## Contacto");
  L.push(`- ${tj.city} (sede): ${tj.address} · ${tj.phone}`);
  L.push(`- ${sd.city}: ${sd.address} · ${sd.phone}`);
  L.push(`- Correo: ${siteConfig.email}`);
  L.push(`- [Formulario de contacto](${BASE}/es/contact)`);
  L.push("");

  L.push("## Legal");
  L.push(`- [Aviso de privacidad](${BASE}/es/privacy)`);
  L.push("");

  return new Response(L.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
