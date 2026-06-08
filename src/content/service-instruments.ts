import { SERVICE_SLUGS } from "./service-slugs";

export type Motif =
  | "dictamen"
  | "matrix"
  | "classify"
  | "corridor"
  | "sync"
  | "ledger"
  | "origin"
  | "pedimento";

export type InstrumentLabels = {
  /** [estado inicial, estado final] que muestra la cabecera del panel */
  status: [string, string];
  /** etiquetas del motivo (nodos, celdas, barras o etapas, segun el motivo) */
  items: string[];
  /** anclas para motivos de dos extremos (corridor, sync) */
  a?: string;
  b?: string;
};

type Entry = {
  code: string;
  motif: Motif;
  es: InstrumentLabels;
  en: InstrumentLabels;
};

type Slug = (typeof SERVICE_SLUGS)[number];

// Estados y etiquetas reales del dominio aduanal. Sin cifras: el instrumento es
// esquematico (estados, etapas, flujos), nunca un grafico con datos inventados.
export const SERVICE_INSTRUMENTS: Record<Slug, Entry> = {
  "legal-consulting": {
    code: "SVC-01",
    motif: "dictamen",
    es: { status: ["EN REVISIÓN", "DICTAMEN"], items: ["Expediente", "Criterio", "Resolución"] },
    en: { status: ["UNDER REVIEW", "RESOLVED"], items: ["Case file", "Criterion", "Resolution"] },
  },
  "compliance-and-assurance": {
    code: "SVC-02",
    motif: "matrix",
    es: { status: ["AUDITORÍA", "EN REGLA"], items: ["Anexo 24", "Anexo 30", "IMMEX", "NOM", "Origen", "Valor"] },
    en: { status: ["AUDIT", "COMPLIANT"], items: ["Annex 24", "Annex 30", "IMMEX", "NOM", "Origin", "Value"] },
  },
  "foreign-trade": {
    code: "SVC-03",
    motif: "classify",
    es: { status: ["ENTRADA", "CLASIFICADO"], items: ["Arancel", "Permiso", "NOM"] },
    en: { status: ["INTAKE", "CLASSIFIED"], items: ["Duty", "Permit", "NOM"] },
  },
  "international-trade-experts": {
    code: "SVC-04",
    motif: "corridor",
    es: { status: ["EN TRÁNSITO", "CRUCE EN REGLA"], items: ["Origen", "Destino"], a: "Tijuana", b: "San Diego" },
    en: { status: ["IN TRANSIT", "CLEARED"], items: ["Origin", "Destination"], a: "Tijuana", b: "San Diego" },
  },
  "information-technology": {
    code: "SVC-05",
    motif: "sync",
    es: { status: ["SINCRONIZANDO", "AL DÍA"], items: ["EDI", "Anexo 24", "Anexo 30"], a: "BMS", b: "Aduana" },
    en: { status: ["SYNCING", "UP TO DATE"], items: ["EDI", "Annex 24", "Annex 30"], a: "BMS", b: "Customs" },
  },
  "fiscal-services": {
    code: "SVC-06",
    motif: "ledger",
    es: { status: ["EN PROCESO", "RECUPERADO"], items: ["IVA", "IEPS", "DTA"] },
    en: { status: ["IN PROCESS", "RECOVERED"], items: ["VAT", "IEPS", "DTA"] },
  },
  "trade-agreements": {
    code: "SVC-07",
    motif: "origin",
    es: { status: ["ORIGEN", "CERTIFICADO"], items: ["T-MEC", "TLCUEM", "CPTPP"] },
    en: { status: ["ORIGIN", "CERTIFIED"], items: ["USMCA", "EU-MX", "CPTPP"] },
  },
  "import-services": {
    code: "SVC-08",
    motif: "pedimento",
    es: { status: ["ABIERTO", "LIBERADO"], items: ["Origen", "Clasificación", "Valor", "Pedimento", "Liberado"] },
    en: { status: ["OPEN", "RELEASED"], items: ["Origin", "Classification", "Value", "Entry", "Released"] },
  },
};
