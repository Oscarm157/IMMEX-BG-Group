import type { Metadata } from "next";
import { LandingPauta } from "@/components/lp/LandingPauta";
import { LineaSecuencia } from "@/components/lp/familias/LineaSecuencia";
import type { Causa, LandingPautaConfig, Paso, QA } from "@/components/lp/tipos";

// Tráfico pagado: fuera del índice para no competir con /guias.
export const metadata: Metadata = {
  title: "Clasificación arancelaria: sustento de la fracción | BG Consulting Group",
  description:
    "Cómo se determina y se sostiene la fracción arancelaria de una mercancía con las Reglas Generales de Interpretación, y qué se revisa si la autoridad la cuestiona. Firma de consultoría legal en comercio exterior.",
  robots: { index: false, follow: false },
};

// Contenido derivado del corpus de /guias, guía clasificacion-arancelaria:
// definicion (párrafos 2 y 3), fundamento (LIGIE, RGI, Sistema Armonizado,
// art. 47), puntosClave (determina impuestos, se determina con reglas,
// trato preferencial, consulta a la autoridad) y errores (semejanza
// comercial, notas legales, dictamen sin documentar). Valoración, régimen y
// pedimento se citan solo de paso, sin desarrollarlos: son tema de otras
// landings del cluster.
const CAUSAS: readonly Causa[] = [
  {
    titulo: "La fracción, fijada por el nombre comercial o por parecido",
    fundamento: "LIGIE y sus Reglas Generales y Complementarias · Sistema Armonizado",
    ocurre: "Se asigna por cómo se vende la mercancía, o se traslada la de otra parecida que ya se clasificó.",
    hace: "Se determina por la mercancía real: composición, función y grado de elaboración. Dos mercancías casi idénticas pueden clasificar y pagar distinto.",
  },
  {
    titulo: "El criterio de clasificación, sin dictamen que lo sostenga",
    fundamento: "LIGIE y sus Reglas Generales y Complementarias · Sistema Armonizado",
    ocurre: "La fracción queda sin sustento técnico de por qué esa y no otra.",
    hace: "El criterio se documenta en un dictamen, no en la costumbre de quien clasificó.",
  },
  {
    titulo: "El trato preferencial, cotejado contra la fracción declarada",
    fundamento: "LIGIE y sus Reglas Generales y Complementarias · Sistema Armonizado",
    ocurre: "Las reglas de origen y las listas de programas se cotejan contra la fracción declarada.",
    hace: "Una fracción mal determinada pierde el beneficio o lo aplica donde no corresponde.",
  },
];

// Ancla de especialista: la ruta de sustento de una fracción, no las causas
// que ya se listaron arriba. Cuatro niveles tal cual en la guía
// clasificacion-arancelaria (fundamento y puntosClave): la TIGIE como tarifa
// base, las Reglas Generales de Interpretación, las notas legales de sección
// y capítulo, y la consulta a la autoridad del art. 47. Ninguna causa de
// arriba se centra en estos cuatro niveles: describen por qué falla una
// fracción (nombre comercial, mercancías parecidas, dictamen ausente, trato
// preferencial, corrección tardía), no de dónde sale el método para
// sostenerla.
const HITOS = [
  {
    marca: "TIGIE",
    titulo: "La tarifa que ordena las mercancías",
    desc: "Basada en el Sistema Armonizado, asigna a cada mercancía un número dentro de la tarifa.",
  },
  {
    marca: "RGI",
    titulo: "Las Reglas Generales de Interpretación",
    desc: "Fijan cómo se determina la fracción: por reglas, no por parecido.",
  },
  {
    marca: "Notas",
    titulo: "Notas de sección y capítulo",
    desc: "Excluyen o incluyen mercancías de forma específica. Se revisan antes de fijar la fracción.",
  },
  {
    marca: "Art. 47",
    titulo: "Criterios y consulta a la autoridad",
    desc: "Ante duda razonable se consulta a la autoridad y se opera con criterio confirmado.",
  },
] as const;

const ESCALADA: readonly Paso[] = [
  {
    paso: "La autoridad detecta la inconsistencia",
    desc: "En una revisión de gabinete o una visita domiciliaria, la fracción declarada se compara contra la mercancía real.",
  },
  {
    paso: "Reclasificación de oficio",
    desc: "La autoridad determina la fracción que corresponde, y con ella los impuestos y las regulaciones que debieron aplicarse desde el inicio.",
  },
  {
    paso: "Diferencia de impuestos, recargos y multas",
    desc: "Se cobra la diferencia con recargos y multas, y se exigen los permisos omitidos.",
  },
];

const PREGUNTAS: readonly QA[] = [
  {
    q: "¿Cómo se determina la fracción arancelaria de una mercancía?",
    a: "Con las Reglas Generales de Interpretación y las notas legales de sección y capítulo, no por el nombre con el que se vende.",
  },
  {
    q: "¿Se puede pedir certeza sobre una fracción antes de operar?",
    a: "Sí. El artículo 47 de la Ley Aduanera permite consultarla a la autoridad ante duda razonable, en vez de arriesgar una reclasificación.",
  },
  {
    q: "¿Qué hace BG frente a una fracción cuestionada?",
    a: "Se revisa la mercancía contra las reglas y las notas aplicables, se documenta el criterio en un dictamen y se representa a la empresa si la autoridad reclasifica.",
  },
];

// Alcance de la primera revisión. Vive dentro del formulario, no como sección.
const REVISION = [
  "Fracción declarada contra la mercancía real.",
  "Notas legales de sección y capítulo aplicables.",
  "Sustento documental del criterio de clasificación.",
];

const CONFIG: LandingPautaConfig = {
  campaign: "Landing Clasificación arancelaria (pauta)",
  hero: {
    eyebrow: "Clasificación arancelaria · Fracción y sustento",
    h1: "Sustento y defensa de una fracción arancelaria",
    lead: "Cómo se determina la fracción de una mercancía y qué se documenta para sostenerla si la autoridad la cuestiona.",
    medida: "22ch",
  },
  causas: {
    eyebrow: "Determinación de la fracción",
    title: "Errores que exponen una fracción arancelaria",
    lead: "Tres supuestos que comprometen la fracción declarada frente a una revisión de la autoridad.",
    etiquetas: ["Qué falla en la práctica", "Qué exige la regla"],
    items: CAUSAS,
  },
  consecuencias: {
    eyebrow: "Reclasificación",
    title: "Qué pasa cuando la autoridad reclasifica la mercancía",
    lead: "Una fracción se corrige antes de operar. La que se sostiene sin dictamen, no.",
    items: ESCALADA,
  },
  faq: { items: PREGUNTAS },
  revision: REVISION,
  bloque: {
    eyebrow: "Método",
    title: "La ruta de sustento de una fracción arancelaria",
    lead: "Cuatro niveles que ordenan una fracción defendible, del texto de la tarifa a la consulta ante la autoridad.",
    posicion: "tras-servicios",
    familia: "LineaSecuencia",
    render: <LineaSecuencia hitos={HITOS} />,
  },
};

export default function LpClasificacionArancelariaPage() {
  return <LandingPauta config={CONFIG} />;
}
