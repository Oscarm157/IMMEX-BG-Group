import type { Metadata } from "next";
import { LandingPauta } from "@/components/lp/LandingPauta";
import { TablaCriterios } from "@/components/lp/familias/TablaCriterios";
import type { Causa, LandingPautaConfig, Paso, QA } from "@/components/lp/tipos";

// Tráfico pagado: fuera del índice para no competir con /guias.
export const metadata: Metadata = {
  title: "Régimen aduanero: cuál corresponde a su mercancía | BG Consulting Group",
  description:
    "Qué régimen aduanero corresponde a una mercancía, qué pasa si el régimen temporal se vence sin retorno y qué exige la ley para cambiarlo. Firma de consultoría legal en comercio exterior.",
  robots: { index: false, follow: false },
};

// Contenido derivado del corpus de /guias: regimenes-aduaneros (definicion,
// fundamento art. 90, puntosClave y errores) y, solo como fundamento de
// mención, que-es-immex (art. 108, plazos de permanencia) y pedimento (la
// clave declara el régimen, sin desarrollar su tema aquí).
const CAUSAS: readonly Causa[] = [
  {
    titulo: "Nacionalizar lo que iba a transformarse y salir del país",
    fundamento: "Art. 90 Ley Aduanera",
    ocurre: "Se importa en definitivo mercancía que después se transforma y exporta.",
    hace: "Se revisa el destino real antes de fijar el régimen, no después de pagar.",
  },
  {
    titulo: "Mercancía temporal que agota su plazo sin retornar",
    fundamento: "Art. 108 Ley Aduanera",
    ocurre: "La mercancía temporal no retorna ni cambia de régimen dentro de su plazo.",
    hace: "Se da seguimiento al calendario de retornos antes de que el plazo se agote.",
  },
  {
    titulo: "Régimen elegido pedimento por pedimento",
    fundamento: "Art. 90 Ley Aduanera",
    ocurre: "Cada pedimento se resuelve por separado, sin un criterio que cubra la operación completa.",
    hace: "Se define el régimen a partir del destino real, no operación por operación.",
  },
];

const ESCALADA: readonly Paso[] = [
  {
    paso: "Mercancía sin retorno ni cambio de régimen",
    desc: "El plazo del régimen temporal se cumple sin retorno ni otro destino autorizado.",
  },
  {
    paso: "Estancia irregular",
    desc: "La mercancía deja de estar amparada por el régimen bajo el que entró.",
  },
  {
    paso: "Impuesto diferido, exigible con recargos",
    desc: "El impuesto que el régimen difirió se vuelve exigible, con recargos.",
  },
  {
    paso: "Crédito fiscal determinado",
    desc: "La autoridad finca el crédito fiscal contra la empresa.",
  },
];

const PREGUNTAS: readonly QA[] = [
  {
    q: "¿Cuántos regímenes aduaneros hay y cuál corresponde a mi mercancía?",
    a: "El artículo 90 reconoce seis: definitivo, temporal, depósito fiscal, tránsito, elaboración en recinto fiscalizado y recinto fiscalizado estratégico. Depende del destino real de la mercancía.",
  },
  {
    q: "¿Se puede cambiar de régimen aduanero después de haber elegido uno?",
    a: "Sí, la ley lo prevé en ciertos supuestos, pero exige requisitos y, con frecuencia, pagar lo diferido.",
  },
  {
    q: "¿Qué pasa si la mercancía temporal no retorna en su plazo?",
    a: "Se convierte en estancia irregular y la autoridad puede determinar un crédito fiscal por lo diferido.",
  },
];

// Alcance de la primera revisión. Vive dentro del formulario, no como sección.
const REVISION = [
  "Régimen aduanero bajo el que opera hoy la mercancía.",
  "Plazos de permanencia y condición de retorno.",
  "Alternativa de régimen frente al destino real de la operación.",
];

// Ancla de especialista: los cuatro regímenes con datos propios en la guía
// (los otros dos, tránsito y recinto fiscalizado sin carácter estratégico,
// quedan fuera porque el corpus no sostiene una fila completa para ellos),
// comparados por los criterios que deciden cuál corresponde.
const COLUMNAS = ["Definitivo", "Temporal", "Depósito fiscal", "Recinto fiscalizado estratégico"] as const;

const FILAS = [
  {
    criterio: "Pago de contribuciones",
    celdas: [
      "Al nacionalizar; carga fiscal inmediata.",
      "Diferido, condicionado al retorno en plazo.",
      "Determinado y suspendido en el almacén.",
      "Diferido, con plazos más amplios.",
    ],
  },
  {
    criterio: "Plazo de permanencia",
    celdas: [
      "No aplica: es definitiva.",
      "Limitado; distinto para insumo o activo fijo.",
      "Suspendido hasta que se le da destino.",
      "Amplio: el mayor margen del grupo.",
    ],
  },
  {
    criterio: "Para qué se usa",
    celdas: [
      "Mercancía que se queda o sale en definitiva.",
      "Producir y exportar; base del programa IMMEX.",
      "Almacenar con impuestos suspendidos antes del destino.",
      "Elaborar, transformar o reparar en espacio habilitado.",
    ],
  },
] as const;

const CONFIG: LandingPautaConfig = {
  campaign: "Landing Regímenes aduaneros (pauta)",
  hero: {
    eyebrow: "Regímenes aduaneros · Elección del régimen",
    h1: "Régimen aduanero: cuál corresponde a su mercancía",
    lead: "La mercancía que entra bajo el régimen equivocado paga impuestos que no debía, o pierde el margen para cambiarlo a tiempo. Se revisa cuál corresponde y qué obligación arrastra.",
    medida: "22ch",
  },
  causas: {
    eyebrow: "Elección del régimen",
    title: "Dónde se equivoca la elección del régimen",
    lead: "Tres supuestos donde el régimen aduanero se decide mal, o se deja de vigilar una vez elegido.",
    etiquetas: ["Qué se elige", "Qué corresponde"],
    items: CAUSAS,
  },
  consecuencias: {
    eyebrow: "Riesgo",
    title: "De la mercancía sin retornar al crédito fiscal",
    lead: "El plazo de un régimen temporal se vence sin avisar. La obligación que deja atrás, no.",
    items: ESCALADA,
    nota: "Cambiar de régimen después es posible, pero exige requisitos y, con frecuencia, pagar lo diferido.",
  },
  faq: { items: PREGUNTAS },
  revision: REVISION,
  bloque: {
    eyebrow: "Comparación",
    title: "Los regímenes comparados por criterio",
    lead: "Cuatro de los seis regímenes del artículo 90, frente a frente en lo que distingue a cada uno.",
    posicion: "tras-causas",
    familia: "TablaCriterios",
    render: <TablaCriterios columnas={COLUMNAS} filas={FILAS} />,
  },
};

export default function LpRegimenesAduanerosPage() {
  return <LandingPauta config={CONFIG} />;
}
