import type { Metadata } from "next";
import { LandingPauta } from "@/components/lp/LandingPauta";
import { PliegoRequisitos } from "@/components/lp/familias/PliegoRequisitos";
import type { Causa, LandingPautaConfig, Paso, QA } from "@/components/lp/tipos";

// Tráfico pagado: fuera del índice para no competir con /guias.
export const metadata: Metadata = {
  title: "Pedimento de importación o exportación: revisión legal | BG Consulting Group",
  description:
    "Qué declara cada dato de un pedimento, su sustento documental y la responsabilidad que asume la empresa frente a la autoridad. Firma de consultoría legal en comercio exterior.",
  robots: { index: false, follow: false },
};

// Contenido derivado del corpus de /guias (guía pedimento: definicion, fundamento,
// puntosClave y errores; manifestacion-de-valor y regimenes-aduaneros solo como
// fundamento de mención, sin desarrollar su tema) y de docs/bgcg-source.md.
const CAUSAS: readonly Causa[] = [
  {
    titulo: "La fracción no corresponde a la mercancía",
    fundamento: "Arts. 35 a 37 Ley Aduanera · Anexo 22 de las RGCE",
    ocurre: "La fracción asentada no corresponde a la mercancía presentada, y con ella cambian los impuestos aplicables.",
    hace: "Se coteja la fracción contra la mercancía real antes del despacho.",
  },
  {
    titulo: "El valor declarado no tiene manifestación que lo sostenga",
    fundamento: "Art. 59 fracción III y art. 81 Ley Aduanera",
    ocurre: "El pedimento asienta un valor sin la manifestación de valor que lo respalde.",
    hace: "Se verifica que el valor declarado tenga detrás la manifestación completa.",
  },
  {
    titulo: "La clave no corresponde al régimen real",
    fundamento: "Art. 90 Ley Aduanera",
    ocurre: "Una clave que no coincide con el régimen real desalinea el trato fiscal y el descargo posterior.",
    hace: "Se confirma que la clave corresponda al régimen real antes de pagar.",
  },
  {
    titulo: "El pedimento no trae la documentación que lo soporta",
    fundamento: "Arts. 36 y 36-A Ley Aduanera",
    ocurre: "Sin factura, documento de transporte o permisos, el pedimento no sostiene la legal estancia.",
    hace: "Se arma el expediente documental que respalda cada pedimento.",
  },
];

// Ancla de especialista de la página: los datos que un pedimento asienta,
// tal como los enumera la guía (definicion) y como los fija el Anexo 22.
const PLIEGO = [
  {
    clave: "Régimen y clave de pedimento",
    valor: "El tipo de operación y su trato fiscal.",
  },
  {
    clave: "Fracción arancelaria",
    valor: "La clasificación de la mercancía presentada.",
  },
  {
    clave: "Valor en aduana",
    valor: "La base sobre la que se calculan las contribuciones.",
  },
  {
    clave: "Contribuciones",
    valor: "El impuesto general de importación, el IVA, el IEPS y el DTA, pagados o diferidos según el régimen.",
  },
  {
    clave: "Datos de quien importa o exporta",
    valor: "Identifican a la empresa responsable de la operación, la misma que responde por lo declarado.",
  },
] as const;

const ESCALADA: readonly Paso[] = [
  {
    paso: "La discrepancia queda registrada",
    desc: "Todo lo que después se afirme se compara contra el pedimento: la diferencia con la realidad queda ahí.",
  },
  {
    paso: "Determinación de impuestos y multas",
    desc: "Una fracción, un valor o una clave equivocados derivan en impuestos omitidos y las multas que procedan.",
  },
  {
    paso: "La legal estancia queda sin sostén",
    desc: "Sin la documentación que lo respalda, el pedimento no acredita por sí solo la legal estancia.",
  },
  {
    paso: "El inventario IMMEX deja de conciliar",
    desc: "En una empresa IMMEX, la clave o la fracción equivocada complica la conciliación del Anexo 24.",
  },
];

const PREGUNTAS: readonly QA[] = [
  {
    q: "¿Qué se revisa primero en un pedimento antes de pagarlo?",
    a: "Que la clave corresponda al régimen real, que la fracción y el valor coincidan con la mercancía, y que el expediente tenga soporte documental.",
  },
  {
    q: "¿Quién responde ante la autoridad por lo que declara el pedimento?",
    a: "La empresa que importa o exporta. El pedimento se presenta por un agente aduanal, pero los datos declarados son responsabilidad de quien opera la mercancía.",
  },
  {
    q: "¿El pedimento prueba por sí solo que la mercancía entró legalmente?",
    a: "Es la prueba central, pero se sostiene con la factura, el documento de transporte y los permisos que correspondan.",
  },
];

// Alcance de la primera revisión. Vive dentro del formulario, no como sección.
const REVISION = [
  "Correspondencia entre el pedimento y la mercancía real.",
  "Sustento documental de cada dato declarado.",
  "Consistencia con el control de inventarios.",
];

const CONFIG: LandingPautaConfig = {
  campaign: "Landing Pedimento (pauta)",
  hero: {
    eyebrow: "Pedimento · Documento y responsabilidad",
    h1: "Asesoría legal para revisar lo que declara un pedimento",
    lead: "Revisión de lo que asienta el pedimento, su sustento documental y la responsabilidad que asume la empresa frente a la autoridad.",
    medida: "22ch",
  },
  causas: {
    eyebrow: "Declaración",
    title: "Errores que comprometen un pedimento",
    lead: "Cuatro errores concentran la mayoría de las observaciones sobre lo que un pedimento declara.",
    etiquetas: ["Qué falla", "Qué se revisa"],
    items: CAUSAS,
  },
  consecuencias: {
    eyebrow: "Exposición",
    title: "Qué expone un pedimento que no coincide con la mercancía",
    lead: "Un error de captura se corrige antes de pagar. Lo declarado sin corregir, no.",
    items: ESCALADA,
  },
  faq: { items: PREGUNTAS },
  revision: REVISION,
  bloque: {
    eyebrow: "Contenido del pedimento",
    title: "Qué declara cada bloque del pedimento",
    lead: "Los datos que el pedimento asienta conforme al Anexo 22.",
    posicion: "tras-causas",
    familia: "PliegoRequisitos",
    render: <PliegoRequisitos filas={PLIEGO} />,
  },
};

export default function LpPedimentoPage() {
  return <LandingPauta config={CONFIG} />;
}
