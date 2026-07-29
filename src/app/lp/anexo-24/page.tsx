import type { Metadata } from "next";
import { LandingPauta } from "@/components/lp/LandingPauta";
import { PliegoRequisitos } from "@/components/lp/familias/PliegoRequisitos";
import type { Causa, LandingPautaConfig, Paso, QA } from "@/components/lp/tipos";

// Tráfico pagado: fuera del índice para no competir con /guias.
export const metadata: Metadata = {
  title: "Anexo 24: control de inventarios IMMEX | BG Consulting Group",
  description:
    "Qué debe registrar el sistema de control de inventarios que exige el Anexo 24, su fundamento legal y qué expone un saldo que no concilia contra los pedimentos. Firma de consultoría legal en comercio exterior.",
  robots: { index: false, follow: false },
};

// Contenido derivado del corpus de /guias, guía anexo-24: fundamento (art. 59-I
// LA, Anexo 24 de las RGCE y Decreto IMMEX), errores (saldos descuadrados,
// descargos fuera de plazo, control en Excel) para las causas, y puntosClave
// más el FAQ propio de la guía (disponibilidad ante la autoridad) para el
// pliego. El programa IMMEX y sus causales son tema de /lp/immex; el Anexo 30
// y el 31 son tema de /lp/certificacion-iva-ieps: aquí solo se distinguen en
// una línea, sin desarrollarlos.
const CAUSAS: readonly Causa[] = [
  {
    titulo: "Saldos negativos o que no cuadran contra los pedimentos",
    fundamento: "Art. 59, fracción I, Ley Aduanera · Anexo 24 de las RGCE",
    ocurre: "El sistema arroja saldos negativos o no coincide con los pedimentos.",
    hace: "Se concilia el saldo de cada insumo temporal contra sus pedimentos.",
  },
  {
    titulo: "Descargos que se registran fuera del plazo del programa",
    fundamento: "Art. 59, fracción I, Ley Aduanera · Decreto IMMEX",
    ocurre: "El retorno, la transferencia virtual o el cambio de régimen se capturan fuera de plazo.",
    hace: "Se revisa que cada descargo quede registrado dentro de su propio plazo.",
  },
  {
    titulo: "El control se lleva en hojas de cálculo, no en un sistema automatizado",
    fundamento: "Art. 59, fracción I, Ley Aduanera · Anexo 24 de las RGCE",
    ocurre: "El inventario temporal se registra en Excel, sin trazabilidad automatizada.",
    hace: "Se evalúa si el control actual sostiene el requisito de automatización.",
  },
];

// Ancla de especialista, distinta de las causas: no qué falla, sino qué debe
// tener el sistema. Registro por pedimento y trazabilidad de mermas vienen de
// puntosClave; disponibilidad ante la autoridad, del FAQ de la guía. Ninguna
// fila repite el matiz de "automatizado", que ya cubre la causa 3.
const PLIEGO = [
  {
    clave: "Registro por pedimento",
    valor: "Cada entrada y salida se liga al pedimento que la ampara: fracción, cantidad y unidad de medida.",
  },
  {
    clave: "Tipos de descargo",
    valor: "El sistema distingue el retorno, la transferencia por pedimento virtual y el cambio de régimen.",
  },
  {
    clave: "Mermas y desperdicios",
    valor: "Los consumos, mermas y desperdicios del proceso productivo también se registran y descargan.",
  },
  {
    clave: "Disponibilidad ante la autoridad",
    valor: "No se presenta como declaración: debe operar y estar disponible cuando la autoridad lo revisa.",
  },
] as const;

const ESCALADA: readonly Paso[] = [
  {
    paso: "El saldo no cuadra con los pedimentos",
    desc: "La diferencia entre lo registrado y lo declarado queda expuesta en cuanto se coteja.",
  },
  {
    paso: "Se presume que la mercancía no retornó",
    desc: "Sin el descargo correspondiente, la autoridad presume que el insumo salió del régimen sin cumplir.",
  },
  {
    paso: "Determinación de crédito fiscal y multas",
    desc: "Se calculan los impuestos y el IVA omitidos, con los recargos y las multas que procedan.",
  },
];

const PREGUNTAS: readonly QA[] = [
  {
    q: "¿Qué revisa primero la autoridad en una visita a una empresa IMMEX?",
    a: "Si el saldo cuadra contra los pedimentos y los descargos están registrados a tiempo.",
  },
  {
    q: "¿El Anexo 24 es lo mismo que el Anexo 30?",
    a: "No. El Anexo 24 controla el inventario temporal IMMEX; el Anexo 30 es el sistema de descargos de la certificación en IVA e IEPS.",
  },
  {
    q: "¿BG proporciona el sistema de control de inventarios?",
    a: "BG revisa el sistema y su sustento legal. El grupo también opera BMS, con un módulo para el Anexo 24.",
  },
];

// Alcance de la primera revisión. Vive dentro del formulario, no como sección.
const REVISION = [
  "Conciliación del saldo contra los pedimentos.",
  "Registro de descargos dentro de plazo.",
  "Sustento del sistema frente a una visita domiciliaria.",
];

const CONFIG: LandingPautaConfig = {
  campaign: "Landing Anexo 24 (pauta)",
  hero: {
    eyebrow: "Anexo 24 · Control de inventarios IMMEX",
    h1: "Anexo 24: qué debe llevar el sistema de control de inventarios",
    lead: "El sistema que exige el Anexo 24 es lo primero que revisa la autoridad en una visita. Un saldo descuadrado hace presumir que la mercancía no retornó.",
    medida: "27ch",
  },
  causas: {
    eyebrow: "Control de inventarios",
    title: "Dónde se descuadra el sistema del Anexo 24",
    lead: "Tres fallas concentran las observaciones más comunes sobre el sistema del Anexo 24.",
    etiquetas: ["Qué se descuadra", "Qué se concilia"],
    items: CAUSAS,
  },
  consecuencias: {
    eyebrow: "Visita domiciliaria",
    title: "De un saldo descuadrado a la determinación de crédito fiscal",
    lead: "Cuando el sistema no cuadra con los pedimentos, la autoridad presume, determina y multa.",
    items: ESCALADA,
  },
  faq: { items: PREGUNTAS },
  revision: REVISION,
  bloque: {
    eyebrow: "Sistema de control de inventarios",
    title: "Qué debe registrar el sistema del Anexo 24",
    lead: "Los módulos y datos mínimos que exige el Anexo 24 de las RGCE.",
    posicion: "tras-servicios",
    familia: "PliegoRequisitos",
    render: <PliegoRequisitos filas={PLIEGO} />,
  },
};

export default function LpAnexo24Page() {
  return <LandingPauta config={CONFIG} />;
}
