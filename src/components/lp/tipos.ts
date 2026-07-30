// Tipos del molde de landings de pauta (/lp/*). Un LandingPautaConfig por
// landing; LandingPauta.tsx los orquesta en el orden canónico.

export type Causa = { titulo: string; fundamento: string; ocurre: string; hace: string };
export type Paso = { paso: string; desc: string };
export type Servicio = { momento: string; servicio: string; puntos: readonly string[] };
export type QA = { q: string; a: string };

export type BloquePropio = {
  eyebrow: string;
  title: string;
  lead?: string;
  posicion: "tras-causas" | "tras-consecuencias" | "tras-servicios";
  familia: string; // etiqueta de auditoría, no cambia el render
  render: React.ReactNode; // el layout lo escribe cada landing
};

export type LandingPautaConfig = {
  campaign: string;
  hero: { eyebrow: string; h1: string; lead: string; medida?: string };
  causas: {
    eyebrow: string;
    title: string;
    lead: string;
    etiquetas?: readonly [string, string]; // default ["Qué ocurre", "Qué se hace"]
    items: readonly Causa[]; // 3 a 5
  };
  consecuencias: { eyebrow: string; title: string; lead: string; items: readonly Paso[]; nota?: string };
  faq: { title?: string; items: readonly QA[] };
  revision: readonly string[]; // alcance del LeadPanel
  // Cada landing nueva declara su ancla propia. Opcional solo porque vucem, el
  // piloto, nació sin ella y su contenido no da para una sin inventar nada.
  bloque?: BloquePropio;
  servicios?: readonly Servicio[]; // default: SERVICIOS de constantes.ts
};
