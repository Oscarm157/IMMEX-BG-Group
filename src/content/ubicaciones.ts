// Corpus SEO — silo geográfico (/ubicaciones/). Plantilla "Ubicación".
// Español-first. Solo la sede real (Tijuana) lleva NAP + LocalBusiness; el
// resto se presenta como "servicio operado desde Tijuana / cobertura nacional",
// sin fingir oficinas. Modelo de despacho: mixto / vía red de agentes aliados.

import { siteConfig } from "@/lib/site-config";
import type { QA } from "./guias";

export type Ubicacion = {
  slug: string;
  ciudad: string;
  esSede: boolean;
  eyebrow: string;
  h1: string;
  seoTitle: string;
  seoDescription: string;
  intro: string[];
  // Datos únicos de la plaza (aduana y cruces reales) — evita doorway page.
  aduana: { nombre: string; cruces: { nombre: string; tipo: string; nota: string }[] };
  sectores: string[];
  operaciones: { title: string; desc: string }[];
  // Cómo opera BG en esta plaza (modelo mixto explícito).
  modelo: string;
  // Solo la sede real. Ausente = no se finge dirección.
  nap?: { address: string; phone: string; hours: string };
  faq: QA[];
  // Servicios corporativos relevantes (ruta /es/services/<slug>).
  servicios: { slug: string; label: string }[];
  actualizado: string;
};

const tijuana = siteConfig.offices[0];

export const UBICACIONES: Ubicacion[] = [
  {
    slug: "tijuana",
    ciudad: "Tijuana",
    esSede: true,
    eyebrow: "Ubicación · Sede",
    h1: "Comercio exterior y cumplimiento aduanero en Tijuana",
    seoTitle: "Agencia y asesoría aduanal en Tijuana | Comercio exterior IMMEX",
    seoDescription:
      "Asesoría en comercio exterior, IMMEX y cumplimiento aduanero en Tijuana, con despacho vía agentes aduanales aliados en Otay. Sede de BG Consulting Group.",
    intro: [
      "Tijuana es la sede de BG Consulting Group y una de las plazas de mayor movimiento de comercio exterior del país. Aquí operamos la asesoría legal, fiscal y de cumplimiento para empresas IMMEX, y coordinamos el despacho con una red de agentes aduanales aliados en el cruce de Otay.",
      "Trabajamos el corredor Tijuana-San Diego de punta a punta: importación temporal, control de inventarios Anexo 24, cumplimiento de NOM y defensa ante el SAT y la ANAM. Sobre esta base atendemos también operaciones del resto del país de forma remota.",
    ],
    aduana: {
      nombre: "Aduana de Tijuana",
      cruces: [
        {
          nombre: "Garita de Otay (Mesa de Otay)",
          tipo: "Carga comercial",
          nota: "Cruce comercial principal de la plaza para importación y exportación de mercancía por transporte terrestre.",
        },
        {
          nombre: "Otay II / Mesa de Otay East",
          tipo: "Cruce comercial nuevo",
          nota: "Nuevo cruce diseñado para descongestionar el tráfico de carga entre Tijuana y San Diego.",
        },
        {
          nombre: "Cruce terrestre Tijuana-San Diego",
          tipo: "Corredor binacional",
          nota: "Movimiento diario de insumos y producto terminado de la industria maquiladora de la región.",
        },
      ],
    },
    sectores: [
      "Dispositivos médicos",
      "Electrónica y electrodomésticos",
      "Aeroespacial",
      "Automotriz y autopartes",
      "Manufactura de exportación IMMEX",
    ],
    operaciones: [
      {
        title: "Importación temporal IMMEX",
        desc: "Entrada de insumos y maquinaria bajo régimen temporal, con control de inventarios Anexo 24 y descargos en tiempo.",
      },
      {
        title: "Despacho en Otay vía agentes aliados",
        desc: "Coordinamos el despacho de tus operaciones con agentes aduanales de la plaza, mientras BG sostiene la asesoría legal y el cumplimiento.",
      },
      {
        title: "Operaciones virtuales y transferencias",
        desc: "Transferencias entre empresas IMMEX por pedimento virtual, con la trazabilidad que exige la autoridad.",
      },
      {
        title: "Cumplimiento y defensa",
        desc: "Auditoría preventiva, NOM, certificación IVA/IEPS y defensa ante el SAT, la ANAM y el TFJA desde la sede.",
      },
    ],
    modelo:
      "BG asesora y sostiene el cumplimiento; el despacho de pedimentos se realiza a través de una red de agentes aduanales aliados en Tijuana. No operamos con patente propia: coordinamos la operación para que respondas a la autoridad con soporte legal detrás de cada movimiento.",
    nap: {
      address: tijuana.address,
      phone: tijuana.phone,
      hours: siteConfig.hours.es,
    },
    faq: [
      {
        q: "¿BG es una agencia aduanal con patente propia?",
        a: "No. BG es una firma de asesoría legal, fiscal y de cumplimiento en comercio exterior. El despacho de pedimentos se realiza a través de agentes aduanales aliados en Tijuana, mientras nosotros sostenemos la parte legal y el control de la operación.",
      },
      {
        q: "¿Atienden empresas fuera de Tijuana?",
        a: "Sí. La sede está en Tijuana, pero el modelo legal más software es atendible en remoto, así que damos servicio a empresas de todo el país.",
      },
      {
        q: "¿Por qué cruce opera la carga en Tijuana?",
        a: "La carga comercial de la plaza cruza principalmente por la Garita de Otay (Mesa de Otay), con el nuevo cruce de Otay II sumando capacidad al corredor Tijuana-San Diego.",
      },
    ],
    servicios: [
      { slug: "foreign-trade", label: "Comercio exterior y operación aduanera" },
      { slug: "compliance-and-assurance", label: "Auditoría IMMEX y aseguramiento" },
      { slug: "import-services", label: "Importación y despacho Tijuana-San Diego" },
    ],
    actualizado: "2026-07-10",
  },
];

export const UBICACION_SLUGS = UBICACIONES.map((u) => u.slug);

export function getUbicacion(slug: string): Ubicacion | undefined {
  return UBICACIONES.find((u) => u.slug === slug);
}
