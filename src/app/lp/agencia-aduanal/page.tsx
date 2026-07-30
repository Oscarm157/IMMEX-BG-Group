import type { Metadata } from "next";
import { LandingPauta } from "@/components/lp/LandingPauta";
import { CitaFundamento } from "@/components/lp/familias/CitaFundamento";
import type { Causa, LandingPautaConfig, Paso, QA } from "@/components/lp/tipos";

// Tráfico pagado: fuera del índice para no competir con /guias.
export const metadata: Metadata = {
  title: "Agente aduanal: qué obligación conserva el importador | BG Consulting Group",
  description:
    "Qué autoriza el encargo conferido, qué obligación conserva el importador sobre el valor declarado y qué se revisa antes de una operación aduanera. Firma de consultoría legal en comercio exterior.",
  robots: { index: false, follow: false },
};

// Contenido derivado del corpus de /guias: encargo-conferido (definicion,
// puntosClave, errores y fundamento de arts. 40 y 59-III) y manifestacion-de-valor
// (fundamento de arts. 59-III y 81, puntosClave sobre la responsabilidad del
// importador). El padrón de importadores y la anatomía del pedimento son tema
// de otras landings del cluster: aquí solo se citan de paso, sin desarrollarlos.
const CAUSAS: readonly Causa[] = [
  {
    titulo: "El encargo conferido, tomado como transferencia de responsabilidad",
    fundamento: "Arts. 40 y 59, fracción III, Ley Aduanera",
    ocurre: "Firmar el encargo conferido traslada al agente aduanal la responsabilidad de lo despachado.",
    hace: "El encargo autoriza a presentar pedimentos a nombre de la empresa. Lo que se despache bajo un encargo vigente se imputa al importador, no a quien lo firmó.",
  },
  {
    titulo: "El valor declarado, delegado por completo al agente aduanal",
    fundamento: "Art. 59, fracción III, y art. 81 Ley Aduanera",
    ocurre: "El agente aduanal calcula y respalda el valor en aduana con la información comercial que recibe.",
    hace: "La manifestación de valor y sus incrementables (fletes, seguros, comisiones, regalías) las integra y conserva el importador.",
  },
  {
    titulo: "El encargo conferido, abierto y sin revisar",
    fundamento: "Art. 40 Ley Aduanera · reglas de encargo conferido en las RGCE",
    ocurre: "Basta con haber conferido el encargo una vez, sin revisar después a quién sigue abierto.",
    hace: "El encargo se otorga y se revoca ante la autoridad, agente por agente. Uno que sigue abierto a quien ya no opera queda como una vía de despacho activa fuera de control.",
  },
];

const ESCALADA: readonly Paso[] = [
  {
    paso: "Encargo abierto sin revisión",
    desc: "Cada pedimento que se firma bajo un encargo conferido vigente se imputa a la empresa, lo haya revisado o no.",
  },
  {
    paso: "Valor sin sustento propio",
    desc: "Si la manifestación de valor no la integró el importador, el valor declarado queda sin respaldo en cuanto la autoridad lo cuestiona.",
  },
  {
    paso: "Determinación a nombre de la empresa",
    desc: "El crédito fiscal y las multas se fincan contra el importador, no contra el agente aduanal que presentó el pedimento.",
  },
];

const PREGUNTAS: readonly QA[] = [
  {
    q: "¿El agente aduanal responde si el pedimento sale mal?",
    a: "El encargo conferido lo autoriza a presentarlo a nombre de la empresa; no traslada la obligación de sustentar el valor declarado, que sigue siendo del importador.",
  },
  {
    q: "¿Qué control tiene la empresa sobre el encargo conferido?",
    a: "El encargo se otorga y se revoca ante la autoridad, agente por agente. Uno que sigue abierto a quien ya no opera queda como una vía de despacho fuera de control.",
  },
  {
    q: "¿BG sustituye a la agencia aduanal?",
    a: "No. La agencia aduanal presenta el pedimento. BG es una firma de consultoría legal que revisa el sustento del valor, la clasificación y el control del encargo conferido, y representa a la empresa ante la autoridad.",
  },
];

// Alcance de la primera revisión. Vive dentro del formulario, no como sección.
const REVISION = ["Encargo conferido: a quién y con qué vigencia.", "Sustento de la manifestación de valor.", "Pedimentos firmados bajo el encargo actual."];

const CONFIG: LandingPautaConfig = {
  campaign: "Landing Agencia aduanal (pauta)",
  hero: {
    eyebrow: "Agencia aduanal · Encargo conferido",
    h1: "Encargo conferido: qué obligación conserva el importador",
    lead: "El agente aduanal presenta el pedimento bajo un encargo conferido. El valor declarado, su sustento y el control de ese encargo siguen siendo del importador.",
    medida: "21ch",
  },
  causas: {
    eyebrow: "Encargo conferido",
    title: "Alcance del encargo conferido",
    lead: "Tres supuestos que se dan por hecho al contratar una agencia aduanal, frente a lo que la ley establece.",
    etiquetas: ["Lo que se asume", "Lo que dice la ley"],
    items: CAUSAS,
  },
  consecuencias: {
    eyebrow: "Riesgo",
    title: "Consecuencias de no vigilar el encargo conferido",
    lead: "Un pedimento se corrige el mismo día. La responsabilidad sobre lo despachado, no.",
    items: ESCALADA,
  },
  faq: { items: PREGUNTAS },
  revision: REVISION,
  bloque: {
    eyebrow: "Fundamento",
    title: "La obligación es del importador",
    lead: "Lo fijan el artículo 59 de la Ley Aduanera y las reglas del encargo conferido, no una lectura de BG.",
    posicion: "tras-causas",
    familia: "CitaFundamento",
    render: (
      <CitaFundamento
        cita="El encargo conferido autoriza a presentar el pedimento. No traslada la obligación de sustentar el valor declarado."
        texto="Art. 59, fracción III, y art. 40 Ley Aduanera: el importador confiere el encargo y conserva la obligación de manifestar y sustentar el valor; quien lo despacha no la asume en su lugar."
      />
    ),
  },
};

export default function LpAgenciaAduanalPage() {
  return <LandingPauta config={CONFIG} />;
}
