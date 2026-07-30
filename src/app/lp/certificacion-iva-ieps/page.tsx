import type { Metadata } from "next";
import { LandingPauta } from "@/components/lp/LandingPauta";
import { EscaleraNiveles } from "@/components/lp/familias/EscaleraNiveles";
import type { Causa, LandingPautaConfig, Paso, QA } from "@/components/lp/tipos";

// Tráfico pagado: fuera del índice para no competir con /guias.
export const metadata: Metadata = {
  title: "Certificación IVA e IEPS: qué la sostiene | BG Consulting Group",
  description:
    "Qué sostiene el crédito de la certificación IVA e IEPS, las modalidades A, AA y AAA, y qué pasa si se pierde. Firma de consultoría legal en comercio exterior.",
  robots: { index: false, follow: false },
};

// Contenido derivado del corpus de /guias: certificacion-iva-ieps (definicion,
// fundamento arts. 28-A LIVA y 15-A LIEPS más Título 7 RGCE, puntosClave sobre
// modalidades y renovación, errores sobre vencimiento y adeudos), anexo-30
// (fundamento y puntosClave del control de descargos) y anexo-31 (fundamento
// y puntosClave del control de créditos y garantías). El Anexo 24 y el
// sistema de control de inventarios son tema de /lp/anexo-24: aquí no se
// desarrollan. El programa IMMEX y sus causales son tema de /lp/immex; el
// padrón de importadores es tema de /lp/padron-de-importadores.
const CAUSAS: readonly Causa[] = [
  {
    titulo: "La renovación, fuera de los 30 días previos",
    fundamento: "Título 7 Reglas Generales de Comercio Exterior",
    ocurre: "La solicitud se deja para después del plazo, o llega con adeudos pendientes.",
    hace: "Se calendariza dentro de los 30 días previos al vencimiento, sin adeudos que objetar.",
  },
  {
    titulo: "El Anexo 30, sin descargos que cuadren",
    fundamento: "Art. 28-A Ley del IVA · Anexo 30 RGCE",
    ocurre: "El control de descargos no refleja qué mercancía ya retornó o cambió de régimen.",
    hace: "Se concilia el descargo contra el crédito aplicado antes de que la autoridad lo objete.",
  },
  {
    titulo: "El Anexo 31, desconectado del crédito real",
    fundamento: "Anexo 31 RGCE · Art. 28-A Ley del IVA",
    ocurre: "El saldo de créditos y garantías no coincide con la operación real bajo el régimen temporal.",
    hace: "Se revisa que cuadre con el Anexo 30 antes de una visita de la autoridad.",
  },
];

// Ancla de especialista, distinta de las causas: las causas dicen qué falla
// en el día a día; esto dice qué modalidad se tiene y qué exige subir de
// nivel. Tal cual el corpus de la guía certificacion-iva-ieps (puntosClave
// "Modalidades A, AA y AAA" y distincion "Modalidad A vs. AAA"): la A es la
// puerta de entrada con vigencia de un año, la AAA exige mayor trayectoria y
// control y da hasta tres años de vigencia. La guía no detalla requisitos
// propios de la AA más allá de la tendencia general (más trayectoria y
// control que A, mayor beneficio y vigencia), así que el nivel intermedio
// se describe con esa misma tendencia, sin inventar cifras que el corpus no
// trae.
const MODALIDADES = [
  {
    nivel: "A",
    titulo: "La puerta de entrada",
    desc: "Vigencia de un año: la modalidad con la que una empresa certificada empieza a aplicar el crédito.",
  },
  {
    nivel: "AA",
    titulo: "El escalón intermedio",
    desc: "Pide más trayectoria y control que la modalidad A, con mayor beneficio y vigencia.",
  },
  {
    nivel: "AAA",
    titulo: "El techo del programa",
    desc: "Exige más que las dos anteriores y da los beneficios más altos, hasta tres años de vigencia.",
  },
] as const;

const ESCALADA: readonly Paso[] = [
  {
    paso: "Descargos y créditos sin conciliar",
    desc: "El Anexo 30 y el Anexo 31 dejan de reflejar qué mercancía ya cumplió su ciclo.",
  },
  {
    paso: "Determinación por crédito indebido",
    desc: "La autoridad presume que la mercancía no retornó y determina el IVA e IEPS acreditado, con recargos.",
  },
  {
    paso: "Renovación negada",
    desc: "Con adeudos firmes o inconsistencias abiertas, el SAT puede negar la solicitud.",
  },
  {
    paso: "IVA e IEPS otra vez en cada pedimento",
    desc: "Sin certificación vigente, la importación temporal vuelve a causar el impuesto en efectivo o por fianza.",
  },
];

const PREGUNTAS: readonly QA[] = [
  {
    q: "¿Qué diferencia hay entre las modalidades A, AA y AAA?",
    a: "A mayor modalidad, más trayectoria y control exigidos, pero también mayor beneficio y vigencia. La A vence en un año; la AAA da hasta tres.",
  },
  {
    q: "¿Qué pasa si pierdo la certificación de IVA e IEPS?",
    a: "Cada importación temporal vuelve a causar el impuesto: se paga en el pedimento o se garantiza con fianza, con su costo financiero.",
  },
  {
    q: "¿BG opera el Anexo 30 y el 31, o solo asesora?",
    a: "BG es una firma de consultoría legal: revisa que los sistemas cuadren con la operación real y representa a la empresa ante la autoridad. Operarlos es tarea de la empresa.",
  },
];

// Alcance de la primera revisión. Vive dentro del formulario, no como sección.
const REVISION = [
  "Vigencia y modalidad de la certificación actual.",
  "Conciliación del Anexo 30 y el 31 contra la operación.",
  "Riesgo de la próxima renovación.",
];

const CONFIG: LandingPautaConfig = {
  campaign: "Landing Certificación IVA e IEPS (pauta)",
  hero: {
    eyebrow: "Certificación IVA e IEPS · Crédito fiscal",
    h1: "Certificación IVA e IEPS: qué exige sostenerla",
    lead: "El crédito del 100% sobre el IVA e IEPS temporal se sostiene con dos sistemas de control y una renovación puntual. Perderlo es pagar el impuesto de nuevo en cada pedimento.",
    medida: "22ch",
  },
  causas: {
    eyebrow: "Certificación vigente",
    title: "Dónde se cae un crédito ya obtenido",
    lead: "Tres fallas concentran el riesgo de una certificación vigente: no al solicitarla, sino al sostenerla.",
    etiquetas: ["Qué se descuida", "Qué la sostiene"],
    items: CAUSAS,
  },
  consecuencias: {
    eyebrow: "Pérdida del crédito",
    title: "De un descargo sin cuadrar al IVA otra vez en efectivo",
    lead: "Perder la certificación no se repite como trámite: es volver a pagar el impuesto que el crédito neutralizaba.",
    items: ESCALADA,
  },
  faq: { items: PREGUNTAS },
  revision: REVISION,
  bloque: {
    eyebrow: "Modalidades",
    title: "Las tres modalidades de la certificación",
    lead: "Cada modalidad exige más trayectoria y control que la anterior, y da más beneficio y vigencia.",
    posicion: "tras-causas",
    familia: "EscaleraNiveles",
    render: <EscaleraNiveles niveles={MODALIDADES} />,
  },
};

export default function LpCertificacionIvaIepsPage() {
  return <LandingPauta config={CONFIG} />;
}
