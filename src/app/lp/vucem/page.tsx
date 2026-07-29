import type { Metadata } from "next";
import { LandingPauta } from "@/components/lp/LandingPauta";
import type { Causa, LandingPautaConfig, Paso, QA } from "@/components/lp/tipos";

// Tráfico pagado: fuera del índice para no competir con /guias.
export const metadata: Metadata = {
  title: "Operación en VUCEM: rechazos, valor y cumplimiento | BG Consulting Group",
  description:
    "Causas frecuentes de rechazo en la VUCEM, lo que exponen frente a la autoridad y cómo se corrigen. Firma de consultoría legal en comercio exterior.",
  robots: { index: false, follow: false },
};

// Contenido derivado del corpus de /guias (vucem, pedimento, manifestacion-de-valor,
// valoracion-aduanera, anexo-24, encargo-conferido) y de docs/bgcg-source.md.
const CAUSAS: readonly Causa[] = [
  {
    titulo: "El COVE no coincide con el pedimento",
    fundamento: "Arts. 36 y 36-A Ley Aduanera · Anexo 22 de las RGCE",
    ocurre:
      "Diferencias de valor, cantidades o datos del proveedor entre el COVE y el pedimento impiden que la operación avance.",
    hace: "Verificar la captura del COVE antes de pagar el pedimento. Corregir después cuesta más que revisar antes.",
  },
  {
    titulo: "La manifestación de valor no está integrada",
    fundamento: "Art. 59 fracción III y art. 81 Ley Aduanera",
    ocurre:
      "El valor declarado queda sin respaldo documental. La obligación de sustentarlo es del importador, no del agente aduanal.",
    hace: "Integrar la manifestación y sus incrementables antes de cada operación: fletes hasta la aduana, seguros, comisiones y regalías.",
  },
  {
    titulo: "Fracción arancelaria o clave de pedimento equivocada",
    fundamento: "Arts. 35 a 37 Ley Aduanera · Anexo 22 de las RGCE",
    ocurre:
      "La operación pasa con el trato fiscal incorrecto: la fracción determina los impuestos y la clave, el régimen.",
    hace: "Dictaminar la clasificación antes de operar y verificar que la clave corresponda al régimen real de la mercancía.",
  },
  {
    titulo: "e.firma o sellos vencidos",
    fundamento: "Arts. 36 y 36-A Ley Aduanera",
    ocurre: "Sin certificado vigente no hay transmisión y el despacho se detiene con la mercancía ya en la aduana.",
    hace: "Renovar antes del vencimiento y llevar esas fechas en el calendario de la operación.",
  },
];

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
    q: "¿Por dónde se empieza cuando la ventanilla rechaza la transmisión?",
    a: "Por la vigencia de la e.firma y los sellos, y por la correspondencia entre el COVE y el pedimento.",
  },
  {
    q: "¿Quién responde si el agente aduanal capturó mal el valor?",
    a: "El importador. La obligación de manifestar y sustentar el valor en aduana es de la empresa, aunque el agente aduanal presente el pedimento bajo el encargo conferido.",
  },
  {
    q: "¿BG tramita en la VUCEM o solo asesora?",
    a: "BG es una firma de consultoría legal. El despacho se tramita a través de agentes aduanales; la asesoría revisa el valor, la clasificación y el control interno, y representa a la empresa ante una determinación.",
  },
];

// Alcance de la primera revisión. Vive dentro del formulario, no como sección.
const REVISION = [
  "Causa del rechazo en la ventanilla.",
  "Sustento del valor declarado.",
  "Control de inventarios contra pedimentos.",
];

// Sin bloque propio: el piloto nació sin él y su material no da para uno sin
// repetir los fundamentos que ya se citan en cada causa. Queda pendiente.
const CONFIG: LandingPautaConfig = {
  campaign: "Landing VUCEM (pauta)",
  hero: {
    eyebrow: "VUCEM · Operación y cumplimiento",
    h1: "Asesoría legal para operaciones detenidas en la VUCEM",
    lead: "Revisión de la causa del rechazo, del sustento del valor declarado y de lo que la operación expone frente a la autoridad.",
    medida: "18ch",
  },
  causas: {
    eyebrow: "Operación",
    title: "Causas frecuentes de rechazo",
    lead: "Cuatro causas concentran la mayoría de los rechazos y las observaciones.",
    items: CAUSAS,
  },
  consecuencias: {
    eyebrow: "Riesgo",
    title: "Consecuencias de una operación mal documentada",
    lead: "Un rechazo se resuelve el mismo día. Lo que se declaró mal escala.",
    items: ESCALADA,
    nota: "El control de inventarios es la primera puerta que revisa la autoridad en una visita domiciliaria: un Anexo 24 que no cuadra con los pedimentos deriva en crédito fiscal.",
  },
  faq: { items: PREGUNTAS },
  revision: REVISION,
};

export default function LpVucemPage() {
  return <LandingPauta config={CONFIG} />;
}
