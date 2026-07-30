import type { Metadata } from "next";
import { LandingPauta } from "@/components/lp/LandingPauta";
import { ParPolar } from "@/components/lp/familias/ParPolar";
import type { Causa, LandingPautaConfig, Paso, QA } from "@/components/lp/tipos";

// Tráfico pagado: fuera del índice para no competir con /guias.
export const metadata: Metadata = {
  title: "COVE rechazado o que no coincide: revisión legal | BG Consulting Group",
  description:
    "Causas frecuentes de rechazo del COVE, su diferencia con la factura y el pedimento, y qué expone frente a la autoridad. Firma de consultoría legal en comercio exterior.",
  robots: { index: false, follow: false },
};

// Contenido derivado del corpus de /guias (guía vucem: puntosClave, distincion y
// errores de COVE, e-document y e.firma) y de docs/bgcg-source.md. Nada fuera de ahí.
const CAUSAS: readonly Causa[] = [
  {
    titulo: "El COVE no coincide con el pedimento",
    fundamento: "Arts. 36 y 36-A Ley Aduanera · Anexo 22 de las RGCE",
    ocurre: "Diferencias de valor, cantidades o datos del proveedor entre el COVE y el pedimento.",
    hace: "Se revisa la captura del COVE antes de pagar el pedimento.",
  },
  {
    titulo: "El valor transmitido no tiene sustento",
    fundamento: "Art. 59 fracción III y art. 81 Ley Aduanera",
    ocurre:
      "Manifestación de valor sin integrar, o incrementables fuera: fletes hasta la aduana, seguros, comisiones, regalías.",
    hace: "Integrar la manifestación de valor y sus incrementables antes de transmitir. La obligación de sustentarlo es del importador, no del agente aduanal.",
  },
  {
    titulo: "El e-document que soporta el COVE, ilegible o incompleto",
    fundamento: "Decreto de la Ventanilla Digital Mexicana de Comercio Exterior",
    ocurre:
      "La ventanilla genera un acuse que se declara en el pedimento; un documento borroso o que no corresponde genera rechazos y observaciones.",
    hace: "La digitalización se cuida como parte del expediente, no como un requisito de forma.",
  },
  {
    titulo: "e.firma o sellos vencidos",
    fundamento: "Arts. 36 y 36-A Ley Aduanera",
    ocurre: "Sin certificado vigente no hay transmisión, y la mercancía ya está en la aduana.",
    hace: "Renovar antes del vencimiento y llevar esas fechas en el calendario de la operación.",
  },
];

// Ancla de especialista de la página: distinción que no aparece en /lp/vucem.
const DISTINCIONES = [
  {
    a: "COVE",
    b: "Factura",
    texto:
      "La factura es el documento comercial. El COVE es su representación electrónica en la ventanilla, con los datos de valor que se ligan al pedimento. El COVE no sustituye a la factura, la declara.",
  },
  {
    a: "COVE",
    b: "Pedimento",
    texto:
      "El COVE se transmite antes, con los datos de valor de la factura. El pedimento se liga a ese COVE: si no coinciden entre sí, la operación no avanza.",
  },
] as const;

const ESCALADA: readonly Paso[] = [
  {
    paso: "Operación detenida",
    desc: "La mercancía no se despacha aunque ya esté en la aduana, y la producción queda esperando.",
  },
  {
    paso: "Valor en aduana recalculado",
    desc: "Sin sustento del valor declarado, la autoridad rechaza el valor de transacción y determina uno por método secundario.",
  },
  {
    paso: "Crédito fiscal y multas",
    desc: "Impuestos omitidos sobre la base gravable correcta, más las multas que correspondan.",
  },
];

const PREGUNTAS: readonly QA[] = [
  {
    q: "¿Qué se revisa primero cuando la ventanilla rechaza el COVE?",
    a: "Primero la vigencia de la e.firma y los sellos, y después la correspondencia entre el COVE y el pedimento en valor, cantidades y datos del proveedor.",
  },
  {
    q: "¿Quién responde si el agente aduanal capturó mal el valor?",
    a: "El importador. La obligación de manifestar y sustentar el valor en aduana es de la empresa; el encargo conferido permite que el agente aduanal presente el pedimento, no traslada esa obligación.",
  },
  {
    q: "¿BG transmite el COVE o solo asesora?",
    a: "BG es una firma de consultoría legal. El COVE y el despacho se tramitan a través de agentes aduanales; la asesoría revisa el valor, la clasificación y el control interno antes de la transmisión.",
  },
];

// Alcance de la primera revisión. Vive dentro del formulario, no como sección.
const REVISION = [
  "Causa del rechazo del COVE.",
  "Correspondencia con la factura y el pedimento.",
  "Sustento del valor declarado.",
];

const CONFIG: LandingPautaConfig = {
  campaign: "Landing COVE (pauta)",
  hero: {
    eyebrow: "COVE · Valor declarado y correspondencia",
    h1: "Asesoría legal para un COVE rechazado o que no cuadra",
    lead: "Revisión del valor transmitido, su correspondencia con el pedimento y lo que la operación expone frente a la autoridad.",
    medida: "19ch",
  },
  causas: {
    eyebrow: "Transmisión",
    title: "Causas frecuentes de rechazo",
    lead: "Cuatro causas concentran la mayoría de los rechazos y las observaciones al COVE.",
    items: CAUSAS,
  },
  consecuencias: {
    eyebrow: "Riesgo",
    title: "Consecuencias de un valor sin sustento",
    lead: "Un rechazo se corrige el mismo día. Lo que se declaró mal escala.",
    items: ESCALADA,
  },
  faq: { items: PREGUNTAS },
  revision: REVISION,
  bloque: {
    eyebrow: "Distinción",
    title: "COVE contra factura y contra pedimento",
    lead: "El ancla de esta página: el COVE es un dato que se transmite, no el canal ni el documento comercial.",
    posicion: "tras-causas",
    familia: "ParPolar",
    render: <ParPolar items={DISTINCIONES} simbolo="≠" />,
  },
};

export default function LpCovePage() {
  return <LandingPauta config={CONFIG} />;
}
