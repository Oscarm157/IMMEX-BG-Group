// Convierte el output del workflow a src/content/services-detail.ts (forma rica).
import fs from "node:fs";

const OUT = "/tmp/claude-0/-root/f0a48071-15fe-4be3-bde3-04c1bf25d62c/tasks/wjgrcwgeb.output";
const SLUGS = [
  "legal-consulting",
  "compliance-and-assurance",
  "foreign-trade",
  "international-trade-experts",
  "information-technology",
  "fiscal-services",
  "trade-agreements",
  "import-services",
];

const raw = JSON.parse(fs.readFileSync(OUT, "utf8"));
const arr = raw.result;
if (!Array.isArray(arr)) throw new Error("result no es array");
const bySlug = Object.fromEntries(arr.map((x) => [x.slug, x.content]));

// saneo: em-dash -> coma; espacios raros
const clean = (o) => JSON.parse(JSON.stringify(o).replace(/—/g, ", ").replace(/–/g, "-"));

const es = [];
const en = [];
for (const s of SLUGS) {
  const c = bySlug[s];
  if (!c || !c.es || !c.en) throw new Error("falta contenido para " + s);
  es.push(clean(c.es));
  en.push(clean(c.en));
}

const ts = `// Contenido rico por servicio (problema -> solución), generado y verificado con orquestación
// multi-agente a partir del contenido real del sitio (docs/bgcg-site-content.txt) + dominio
// aduanero/fiscal. Factual, sin invenciones, sin vende-humos. Orden = SERVICE_SLUGS.

export type ServiceDetail = {
  overview: string;
  pains: { title: string; desc: string }[];
  whatWeDo: { title: string; desc: string }[];
  outcomes: string[];
  faq: { q: string; a: string }[];
};

export const SERVICE_DETAIL: Record<"es" | "en", readonly ServiceDetail[]> = ${JSON.stringify({ es, en }, null, 2)};
`;

fs.writeFileSync("src/content/services-detail.ts", ts);
console.log("✓ services-detail.ts escrito:", es.length, "servicios ES/EN");
