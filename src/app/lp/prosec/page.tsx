import type { Metadata } from "next";
import { LandingPauta } from "@/components/lp/LandingPauta";
import { ParPolar } from "@/components/lp/familias/ParPolar";
import type { Causa, LandingPautaConfig, Paso, QA } from "@/components/lp/tipos";

// Tráfico pagado: fuera del índice para no competir con /guias.
export const metadata: Metadata = {
  title: "PROSEC: cuándo aplica el arancel preferencial | BG Consulting Group",
  description:
    "Cuándo procede el arancel preferencial de PROSEC, qué exige mantenerlo vigente y en qué se distingue de la Regla 8ª. Firma de consultoría legal en comercio exterior.",
  robots: { index: false, follow: false },
};

// Contenido derivado del corpus de /guias: prosec (definicion, fundamento del
// Decreto PROSEC, puntosClave y errores) y regla-octava (fundamento y
// distincion, para el bloque propio). El programa IMMEX es tema de
// /lp/immex: aquí solo se cita de paso como programa distinto que puede
// convivir con PROSEC. La fracción y las RGI son tema de
// /lp/clasificacion-arancelaria: el capítulo 98 solo se toca como mecanismo
// de la Regla 8ª.
const CAUSAS: readonly Causa[] = [
  {
    titulo: "Fracción importada sin amparo del sector autorizado",
    fundamento: "Decreto PROSEC (Programas de Promoción Sectorial)",
    ocurre: "Se aplica el arancel preferencial a una fracción que el sector autorizado no ampara.",
    hace: "Se coteja cada fracción contra el listado vigente del sector antes de declarar el arancel.",
  },
  {
    titulo: "Insumo usado para producir bienes de otro sector",
    fundamento: "Decreto PROSEC (Programas de Promoción Sectorial)",
    ocurre: "El insumo importado con arancel PROSEC termina en la producción de un sector distinto al autorizado.",
    hace: "Se revisa que el destino productivo corresponda al sector para el que se otorgó el programa.",
  },
  {
    titulo: "Uso productivo sin trazabilidad que lo compruebe",
    fundamento: "Decreto PROSEC (Programas de Promoción Sectorial)",
    ocurre: "No hay evidencia que ligue el insumo importado con el bien que produjo.",
    hace: "Se documenta la trazabilidad entre lo importado y lo producido, antes de una verificación.",
  },
];

// Ancla de especialista, distinta de las causas: no por qué se pierde el
// arancel PROSEC, sino en qué se distingue de la Regla 8ª, con la que
// convive y con la que se confunde. Tal cual el corpus (prosec.distincion y
// regla-octava.distincion): son dos autorizaciones separadas que suelen
// operarse juntas, no una la contiene a la otra.
const DISTINCIONES = [
  {
    a: "PROSEC",
    b: "Regla 8ª",
    texto:
      "PROSEC fija el arancel preferencial por sector. La Regla 8ª autoriza, aparte, clasificar esos insumos en el capítulo 98. Una fija el beneficio, la otra abre la vía para aplicarlo.",
  },
  {
    a: "PROSEC solo",
    b: "PROSEC con Regla 8ª",
    texto:
      "Un programa PROSEC opera declarando cada insumo por su fracción específica. Sumar la Regla 8ª permite agruparlos en el capítulo 98, con la autorización propia de esa regla.",
  },
] as const;

const ESCALADA: readonly Paso[] = [
  {
    paso: "Diferencia de arancel detectada",
    desc: "La autoridad identifica una fracción o un uso que el sector autorizado no ampara.",
  },
  {
    paso: "Arancel general determinado",
    desc: "Se recalcula la importación con el arancel general, sin el beneficio de PROSEC.",
  },
  {
    paso: "Crédito fiscal y recargos",
    desc: "Sobre la diferencia de arancel se determinan el crédito fiscal y los recargos correspondientes.",
  },
  {
    paso: "Programa expuesto a revisión",
    desc: "Sostener la irregularidad compromete la vigencia del programa PROSEC autorizado a la empresa.",
  },
];

const PREGUNTAS: readonly QA[] = [
  {
    q: "¿El arancel preferencial de PROSEC aplica sin importar el origen del insumo?",
    a: "Sí. A diferencia de un tratado, el arancel de PROSEC no depende del país de origen, siempre que la fracción esté amparada por el sector autorizado.",
  },
  {
    q: "¿PROSEC y la Regla 8ª son el mismo trámite?",
    a: "No. PROSEC autoriza el arancel preferencial por sector; la Regla 8ª autoriza, por separado, clasificar esos insumos en el capítulo 98.",
  },
  {
    q: "¿BG tramita la autorización de PROSEC o solo asesora?",
    a: "BG es una firma de consultoría legal: revisa el sector, las fracciones amparadas y la trazabilidad del uso productivo. El trámite ante la Secretaría de Economía se gestiona aparte.",
  },
];

// Alcance de la primera revisión. Vive dentro del formulario, no como sección.
const REVISION = [
  "Fracciones amparadas por el sector autorizado.",
  "Trazabilidad del uso productivo del insumo.",
  "Vigencia y actualización del programa PROSEC.",
];

const CONFIG: LandingPautaConfig = {
  campaign: "Landing PROSEC (pauta)",
  hero: {
    eyebrow: "PROSEC · Arancel preferencial por sector",
    h1: "PROSEC: cuándo procede el arancel preferencial y qué lo sostiene",
    lead: "El arancel de 0% o 5% no aplica solo por estar autorizado en el sector: depende de la fracción, el uso productivo y la trazabilidad que lo respalde.",
    medida: "22ch",
  },
  causas: {
    eyebrow: "Beneficio arancelario",
    title: "Dónde se pierde el arancel preferencial",
    lead: "Tres fallas concentran los casos en que la autoridad desconoce el arancel PROSEC ya aplicado.",
    etiquetas: ["Qué se pierde", "Qué se corrige"],
    items: CAUSAS,
  },
  consecuencias: {
    eyebrow: "Determinación",
    title: "De arancel mal aplicado a riesgo para el programa",
    lead: "Cuando el arancel preferencial no se sostiene, la autoridad no se limita a cobrar la diferencia.",
    items: ESCALADA,
  },
  faq: { items: PREGUNTAS },
  revision: REVISION,
  bloque: {
    eyebrow: "Distinción",
    title: "PROSEC contra Regla 8ª",
    lead: "Dos autorizaciones que se complementan y se confunden por igual: una fija el beneficio, la otra abre la vía para aplicarlo.",
    posicion: "tras-consecuencias",
    familia: "ParPolar",
    render: <ParPolar items={DISTINCIONES} simbolo="+" />,
  },
};

export default function LpProsecPage() {
  return <LandingPauta config={CONFIG} />;
}
