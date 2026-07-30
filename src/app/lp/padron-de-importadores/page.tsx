import type { Metadata } from "next";
import { LandingPauta } from "@/components/lp/LandingPauta";
import { IndiceDenso } from "@/components/lp/familias/IndiceDenso";
import type { Causa, LandingPautaConfig, Paso, QA } from "@/components/lp/tipos";

// Tráfico pagado: fuera del índice para no competir con /guias.
export const metadata: Metadata = {
  title: "Padrón de Importadores suspendido: causas y reactivación | BG Consulting Group",
  description:
    "Por qué el SAT suspende el Padrón de Importadores, cuándo se necesita además el de Sectores Específicos y qué se revisa para reactivarlo. Firma de consultoría legal en comercio exterior.",
  robots: { index: false, follow: false },
};

// Contenido derivado del corpus de /guias: padron-de-importadores (definicion,
// fundamento, puntosClave, distincion, errores y faq completos). encargo-conferido
// y que-es-immex se citan solo de paso para distinguir el registro de otras
// figuras del cluster; su desarrollo es tema de otras landings.
const CAUSAS: readonly Causa[] = [
  {
    titulo: "Padrón sectorial, dado por incluido en el general",
    fundamento: "Art. 59, fracción IV, Ley Aduanera · Anexo 10 de las RGCE",
    ocurre: "La fracción arancelaria del producto está en el Anexo 10 y solo se tramitó el padrón general.",
    hace: "La aduana no despacha el pedimento hasta que la empresa también esté inscrita en el Padrón de Sectores Específicos de ese sector.",
  },
  {
    titulo: "Domicilio fiscal no localizado",
    fundamento: "Art. 59, fracción IV, Ley Aduanera · Reglas Generales de Comercio Exterior (padrones)",
    ocurre: "El SAT visita el domicilio fiscal registrado y no localiza a la empresa operando ahí.",
    hace: "Es, por sí sola, causa de suspensión del padrón completo, no solo de la operación en trámite.",
  },
  {
    titulo: "Incumplimiento fiscal ajeno a la operación aduanera",
    fundamento: "Art. 59, fracción IV, Ley Aduanera · Reglas Generales de Comercio Exterior (padrones)",
    ocurre: "Una declaración omitida o una inconsistencia fiscal se acumula sin que nadie la ligue al padrón.",
    hace: "El SAT suspende por incumplimientos fiscales o aduaneros, aunque la empresa nunca haya tenido un problema en la aduana.",
  },
];

// Ancla de especialista: a qué obliga cada padrón sectorial del Anexo 10, más
// el registro que corre del lado de la exportación. Distinto de las causas de
// arriba (qué suspende el registro): esto recapitula qué registros existen y
// para qué sirve cada uno. Tal cual en la guía padron-de-importadores
// (definicion párrafo 2, distincion y fundamento).
const PADRONES = [
  { clave: "Padrón de Sectores Específicos", nota: "adicional al general; sin él no se despacha aunque el general esté vigente" },
  { clave: "Siderúrgico", nota: "Anexo 10 RGCE" },
  { clave: "Textil", nota: "Anexo 10 RGCE" },
  { clave: "Calzado", nota: "Anexo 10 RGCE" },
  { clave: "Alcoholes", nota: "Anexo 10 RGCE" },
  { clave: "Hidrocarburos", nota: "Anexo 10 RGCE" },
  { clave: "Padrón de Exportadores Sectorial", nota: "minerales y alcohol; registro distinto, del lado de la exportación" },
] as const;

const ESCALADA: readonly Paso[] = [
  {
    paso: "Suspensión descubierta con la mercancía ya en la aduana",
    desc: "La empresa se entera de que el padrón está suspendido cuando el embarque llega, no antes.",
  },
  {
    paso: "Pedimento sin despachar",
    desc: "Sin inscripción vigente, la aduana no permite presentar el pedimento a nombre de la empresa.",
  },
  {
    paso: "Todas las importaciones detenidas, no solo esa",
    desc: "La suspensión aplica al padrón completo. Mientras dure, ninguna importación de la empresa se despacha.",
  },
  {
    paso: "Reactivación por aclaración, no automática",
    desc: "Se corrige la causa y se presenta la aclaración ante el SAT. Cada día que tarda corre en almacenaje.",
  },
];

const PREGUNTAS: readonly QA[] = [
  {
    q: "¿Se puede seguir importando mientras el padrón está suspendido?",
    a: "No. La suspensión detiene todas las importaciones de la empresa, no solo el pedimento que reveló el problema, hasta que el SAT reactiva la inscripción.",
  },
  {
    q: "¿El Padrón de Sectores Específicos sustituye al padrón general?",
    a: "No. Es un registro adicional. Si la fracción arancelaria está en el Anexo 10, se necesitan los dos: el padrón general y el de Sectores Específicos del sector correspondiente.",
  },
  {
    q: "¿BG gestiona la reactivación del padrón ante el SAT?",
    a: "BG revisa la causa de la suspensión, prepara la aclaración ante la autoridad y da seguimiento a la reactivación. El despacho de pedimentos sigue a cargo de la agencia aduanal.",
  },
];

// Alcance de la primera revisión. Vive dentro del formulario, no como sección.
const REVISION = [
  "Causa exacta de la suspensión del padrón.",
  "Si el producto exige el padrón de Sectores Específicos.",
  "Domicilio fiscal y cumplimiento vigente ante el SAT.",
];

const CONFIG: LandingPautaConfig = {
  campaign: "Landing Padrón de importadores (pauta)",
  hero: {
    eyebrow: "Padrón de importadores · SAT",
    h1: "Padrón de Importadores suspendido: qué lo detiene y cómo se reactiva",
    lead: "Sin el registro vigente ante el SAT, la aduana no despacha ningún pedimento. Se revisa la causa de la suspensión y el camino para reactivarlo.",
    medida: "22ch",
  },
  causas: {
    eyebrow: "Suspensión del padrón",
    title: "Qué pone en riesgo el Padrón de Importadores",
    lead: "Tres supuestos que suspenden el registro y detienen, de golpe, todas las importaciones de la empresa.",
    etiquetas: ["Supuesto", "Efecto en el padrón"],
    items: CAUSAS,
  },
  consecuencias: {
    eyebrow: "Reactivación",
    title: "De la suspensión detectada en la aduana a la reactivación",
    lead: "Un pedimento se corrige el mismo día. El padrón suspendido, no.",
    items: ESCALADA,
  },
  faq: { items: PREGUNTAS },
  revision: REVISION,
  bloque: {
    eyebrow: "Padrones sectoriales",
    title: "A qué obliga cada padrón sectorial",
    lead: "Los registros adicionales del Anexo 10 de las RGCE, y el que corre del lado de la exportación.",
    posicion: "tras-causas",
    familia: "IndiceDenso",
    render: <IndiceDenso entradas={PADRONES} />,
  },
};

export default function LpPadronDeImportadoresPage() {
  return <LandingPauta config={CONFIG} />;
}
