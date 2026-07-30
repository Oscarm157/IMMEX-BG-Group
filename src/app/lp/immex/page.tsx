import type { Metadata } from "next";
import { LandingPauta } from "@/components/lp/LandingPauta";
import { EscaleraNiveles } from "@/components/lp/familias/EscaleraNiveles";
import type { Causa, LandingPautaConfig, Paso, QA } from "@/components/lp/tipos";

// Tráfico pagado: fuera del índice para no competir con /guias.
export const metadata: Metadata = {
  title: "Programa IMMEX en riesgo: obligaciones y causales | BG Consulting Group",
  description:
    "Qué obligaciones sostienen un programa IMMEX vigente y por qué causales la autoridad lo suspende o cancela. Firma de consultoría legal en comercio exterior.",
  robots: { index: false, follow: false },
};

// Contenido derivado del corpus de /guias: que-es-immex (puntosClave, distincion
// y errores) y decreto-immex (puntosClave, errores y fundamento de arts. 11, 24 y
// 27). El Anexo 24, la certificación IVA/IEPS y el régimen de importación
// temporal se citan como referencia, sin desarrollarlos: son tema de otras
// landings del cluster.
const CAUSAS: readonly Causa[] = [
  {
    titulo: "Domicilio fiscal no localizado",
    fundamento: "Decreto IMMEX (DOF 1 de noviembre de 2006) · art. 27",
    ocurre: "El domicilio debe ser localizable por la autoridad en todo momento.",
    hace: "Si no está vigente, la autoridad puede suspender el programa.",
  },
  {
    titulo: "Inconsistencias graves en el inventario",
    fundamento: "Art. 59, fracción I, Ley Aduanera · Decreto IMMEX, art. 27",
    ocurre: "El sistema de inventarios debe cuadrar contra los pedimentos.",
    hace: "Se revisa que concilie antes de una visita de la autoridad.",
  },
  {
    titulo: "Mercancía sin retornar en el plazo del régimen",
    fundamento: "Art. 108 Ley Aduanera",
    ocurre: "Insumos y activo fijo tienen plazos de permanencia distintos.",
    hace: "Se revisa el calendario de retornos antes de agotarse el plazo.",
  },
  {
    titulo: "Operación fuera de la modalidad autorizada",
    fundamento: "Decreto IMMEX, arts. 4 y 5",
    ocurre: "El programa se otorga en una modalidad concreta.",
    hace: "Se revisa que la operación corresponda a esa modalidad.",
  },
  {
    titulo: "Reporte anual no presentado",
    fundamento: "Decreto IMMEX (DOF 1 de noviembre de 2006) · art. 24",
    ocurre: "El decreto impone presentar cada año el reporte anual.",
    hace: "Omitirlo es, por sí solo, causal de cancelación.",
  },
];

// Ancla de especialista: de qué norma cuelga cada parte del programa. Las
// causas de arriba dicen qué falla; esto dice dónde está escrito, que es lo
// que no se encuentra reunido en un solo lugar. Tal cual en la guía
// decreto-immex (fundamento y puntosClave).
const NIVELES = [
  {
    nivel: "Decreto IMMEX",
    titulo: "Compromisos, obligaciones y causales",
    desc: "El artículo 11 fija los compromisos del programa, el 24 las obligaciones de operación y reporte, y el 27 las causales de cancelación.",
  },
  {
    nivel: "Ley Aduanera",
    titulo: "Régimen temporal y plazos de permanencia",
    desc: "El régimen y los plazos no viven en el decreto: los aporta el artículo 108, distintos para insumos y para activo fijo.",
  },
  {
    nivel: "Reglas Generales",
    titulo: "Cómo se acredita el cumplimiento",
    desc: "Las Reglas Generales y su Anexo 24 fijan el estándar de control de inventarios con el que se demuestra lo anterior.",
  },
] as const;

const ESCALADA: readonly Paso[] = [
  {
    paso: "Impuestos diferidos exigibles",
    desc: "La mercancía que no retorna a tiempo pierde el beneficio: el impuesto no pagado al importar se vuelve exigible, con recargos.",
  },
  {
    paso: "Suspensión del programa",
    desc: "Domicilio no localizado o inconsistencias graves de inventario autorizan a la autoridad a suspenderlo.",
  },
  {
    paso: "Cancelación del programa",
    desc: "Sostener la causal sin corregirla, o no presentar el reporte anual, deriva en cancelación del programa.",
  },
];

const PREGUNTAS: readonly QA[] = [
  {
    q: "¿Por cuáles causales puede la autoridad suspender o cancelar el programa IMMEX?",
    a: "Domicilio no localizado, inconsistencias de inventario, incumplir compromisos declarados o no presentar el reporte anual, según el artículo 27 del decreto.",
  },
  {
    q: "¿El programa IMMEX exenta el IVA y el IEPS de la importación temporal?",
    a: "No de forma automática. IMMEX difiere el impuesto de importación; el IVA y el IEPS requieren la certificación en esa materia.",
  },
  {
    q: "¿Qué pasa si la mercancía no retorna dentro del plazo del régimen temporal?",
    a: "Depende del bien: la Ley Aduanera fija plazos distintos para insumos y maquinaria. Sin retorno, el impuesto se vuelve exigible.",
  },
];

// Alcance de la primera revisión. Vive dentro del formulario, no como sección.
const REVISION = [
  "Causales de suspensión o cancelación que aplican al programa.",
  "Estado del control de inventarios contra los pedimentos.",
  "Plazos de retorno y modalidad autorizada.",
];

const CONFIG: LandingPautaConfig = {
  campaign: "Landing IMMEX (pauta)",
  hero: {
    eyebrow: "IMMEX · Vigencia del programa",
    h1: "Asesoría legal para no perder el programa IMMEX",
    lead: "Revisión de las obligaciones que sostienen la autorización, antes de que una inconsistencia derive en suspensión o cancelación.",
    medida: "20ch",
  },
  causas: {
    eyebrow: "Vigencia del programa",
    title: "Causales que ponen en riesgo el programa",
    lead: "Cinco causales concentran la mayoría de las suspensiones y cancelaciones de un programa IMMEX.",
    etiquetas: ["Qué exige", "Qué se revisa"],
    items: CAUSAS,
  },
  consecuencias: {
    eyebrow: "Escalada",
    title: "De la exigibilidad del impuesto a la cancelación",
    lead: "Una causal se corrige antes de que la autoridad la detecte. La que no se corrige, escala.",
    items: ESCALADA,
  },
  faq: { items: PREGUNTAS },
  revision: REVISION,
  bloque: {
    eyebrow: "Normativa",
    title: "De qué norma cuelga cada parte del programa",
    lead: "El programa no se rige por un solo ordenamiento.",
    posicion: "tras-consecuencias",
    familia: "EscaleraNiveles",
    render: <EscaleraNiveles niveles={NIVELES} />,
  },
};

export default function LpImmexPage() {
  return <LandingPauta config={CONFIG} />;
}
