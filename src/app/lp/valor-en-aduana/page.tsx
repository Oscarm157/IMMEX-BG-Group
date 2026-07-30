import type { Metadata } from "next";
import { LandingPauta } from "@/components/lp/LandingPauta";
import { LineaSecuencia } from "@/components/lp/familias/LineaSecuencia";
import type { Causa, LandingPautaConfig, Paso, QA } from "@/components/lp/tipos";

// Tráfico pagado: fuera del índice para no competir con /guias.
export const metadata: Metadata = {
  title: "Valor en aduana: cómo se sustenta y se determina | BG Consulting Group",
  description:
    "Cómo se integra el valor en aduana con sus incrementables, qué lo respalda ante la autoridad y qué método aplica cuando el valor de transacción no procede. Firma de consultoría legal en comercio exterior.",
  robots: { index: false, follow: false },
};

// Contenido derivado del corpus de /guias: valoracion-aduanera (definicion,
// fundamento arts. 64 a 78 LA, puntosClave sobre el valor de transacción, los
// incrementables, la vinculación y los métodos secundarios en orden, y
// errores) y manifestacion-de-valor (fundamento arts. 59-III y 81 LA,
// puntosClave y errores sobre el documento que sustenta el valor). Quién
// responde por el valor frente al agente aduanal es tema de /lp/agencia-
// aduanal: aquí se cita una vez, sin desarrollarlo como causa.
const CAUSAS: readonly Causa[] = [
  {
    titulo: "El precio de factura, sin incrementables sumados",
    fundamento: "Art. 64 y art. 65 Ley Aduanera",
    ocurre: "Se declara el precio de la factura tal cual, sin sumar los conceptos que la ley agrega al valor de transacción.",
    hace: "Fletes hasta la aduana, seguros, comisiones y regalías se identifican y se suman antes de declarar el valor.",
  },
  {
    titulo: "La vinculación entre comprador y vendedor, sin analizar",
    fundamento: "Arts. 64 a 78 Ley Aduanera (Acuerdo de Valoración de la OMC)",
    ocurre: "Las partes están relacionadas y nadie revisó si esa relación influyó en el precio pactado.",
    hace: "Se analiza si la vinculación distorsionó el precio antes de que lo haga la autoridad.",
  },
  {
    titulo: "La manifestación de valor, sin integrar",
    fundamento: "Art. 59, fracción III, y art. 81 Ley Aduanera",
    ocurre: "El valor declarado no trae el documento que lo respalda con pruebas ante la autoridad.",
    hace: "Se integra con la factura, los contratos y los pagos que sustentan cada cifra del valor.",
  },
];

// Ancla de especialista, distinta de las causas: no por qué se cae el valor de
// transacción, sino qué método sigue cuando ya se cayó. Tal cual el orden de
// la guía valoracion-aduanera (puntosClave "Métodos secundarios en orden"):
// idénticas, similares, precio unitario de venta, valor reconstruido. El
// corpus no nombra un sexto método, así que no se agrega uno de memoria.
const METODOS = [
  {
    marca: "01",
    titulo: "Valor de transacción",
    desc: "Precio pagado o por pagar por la mercancía, ajustado con los incrementables que exige la ley. Método principal; los demás solo aplican cuando este no procede.",
  },
  {
    marca: "02",
    titulo: "Valor de mercancías idénticas",
    desc: "Primero de los métodos secundarios, cuando el valor de transacción no es aceptable.",
  },
  {
    marca: "03",
    titulo: "Valor de mercancías similares",
    desc: "Sigue en el orden cuando no hay una mercancía idéntica con la cual comparar.",
  },
  {
    marca: "04",
    titulo: "Precio unitario de venta",
    desc: "Corresponde cuando ninguno de los métodos anteriores resultó aplicable.",
  },
  {
    marca: "05",
    titulo: "Valor reconstruido",
    desc: "Cierra la secuencia, cuando ninguno de los cuatro métodos anteriores procedió.",
  },
] as const;

const ESCALADA: readonly Paso[] = [
  {
    paso: "Valor de transacción rechazado",
    desc: "La autoridad deja de aceptar el precio declarado como base gravable.",
  },
  {
    paso: "Determinación por método secundario",
    desc: "El valor se recalcula con el siguiente método de la prelación, no con el que convenga a la empresa.",
  },
  {
    paso: "Crédito fiscal y multas",
    desc: "Sobre la nueva base gravable se determinan el impuesto omitido, los recargos y las multas.",
  },
];

const PREGUNTAS: readonly QA[] = [
  {
    q: "¿El valor en aduana es el precio de la factura?",
    a: "No exactamente. Parte del precio pagado o por pagar, pero se le suman los incrementables que marca la ley: fletes hasta la aduana, seguros, comisiones y regalías.",
  },
  {
    q: "¿Qué documento sustenta el valor declarado?",
    a: "La manifestación de valor. La entrega y conserva el importador, con la factura, los contratos y las pruebas que respaldan cada cifra del pedimento.",
  },
  {
    q: "¿BG determina el valor o solo lo asesora?",
    a: "BG es una firma de consultoría legal: revisa la manifestación de valor, la vinculación entre las partes y el método que corresponde frente a la autoridad. El despacho se tramita a través de agentes aduanales.",
  },
];

// Alcance de la primera revisión. Vive dentro del formulario, no como sección.
const REVISION = [
  "Sustento del valor de transacción y sus incrementables.",
  "Integración de la manifestación de valor.",
  "Exposición ante una determinación por método secundario.",
];

const CONFIG: LandingPautaConfig = {
  campaign: "Landing Valor en aduana (pauta)",
  hero: {
    eyebrow: "Valor en aduana · Valoración aduanera",
    h1: "Valor en aduana: cómo se determina y se sustenta",
    lead: "El valor de transacción es el método principal, con sus incrementables sumados. Cuando no procede, la ley determina qué método sigue: no se elige.",
    medida: "23ch",
  },
  causas: {
    eyebrow: "Base gravable",
    title: "Dónde se rompe el valor declarado",
    lead: "Tres fallas concentran la mayoría de los rechazos y determinaciones sobre el valor en aduana.",
    etiquetas: ["Qué falla", "Qué corrige"],
    items: CAUSAS,
  },
  consecuencias: {
    eyebrow: "Determinación",
    title: "De valor rechazado a crédito fiscal",
    lead: "Cuando el valor de transacción no se sostiene, la autoridad no se detiene: recalcula y determina.",
    items: ESCALADA,
  },
  faq: { items: PREGUNTAS },
  revision: REVISION,
  bloque: {
    eyebrow: "Métodos de valoración",
    title: "La prelación de los métodos de valoración",
    lead: "Cuando el valor de transacción no procede, la ley no deja a elección qué sigue: fija un orden que se recorre en secuencia.",
    posicion: "tras-causas",
    familia: "LineaSecuencia",
    render: <LineaSecuencia hitos={METODOS} />,
  },
};

export default function LpValorEnAduanaPage() {
  return <LandingPauta config={CONFIG} />;
}
