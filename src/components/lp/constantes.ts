// Constantes compartidas por todas las landings de pauta. Datos reales del
// repo, sostenidos en el corpus de /guias y docs/bgcg-source.md: no se
// inventa nada nuevo aquí, solo se centraliza lo que ya vivía duplicado en
// vucem/page.tsx y cove/page.tsx.

import type { Servicio } from "./tipos";

// Mismo ancho y padding que el resto del sitio (ver src/app/[lang]/page.tsx).
export const CONTENEDOR = "mx-auto w-full max-w-[1280px] px-5 sm:px-8";

// Escalón por eslabón de la cadena de consecuencias. Solo desde sm: en 375px
// la sangría dejaría el texto en una columna inservible.
export const SANGRIA = ["", "sm:pl-5", "sm:pl-10"];

// Tira de credenciales del hero: idéntica en las dos landings hoy, es un dato
// de la firma, no de la campaña.
export const CREDENCIALES_HERO = ["20 años de experiencia en promedio entre los socios", "Legal, trade compliance e IT", "Tijuana y San Diego"];

export const SERVICIOS: readonly Servicio[] = [
  {
    momento: "Antes de operar",
    servicio: "Expertos en comercio internacional",
    puntos: ["Clasificación arancelaria", "Origen de la mercancía", "Criterios aduaneros"],
  },
  {
    momento: "Sobre la documentación",
    servicio: "Comercio exterior",
    puntos: ["Valor en aduana", "Criterios de valoración aduanera", "Presentación de pedimentos"],
  },
  {
    momento: "Antes de una revisión",
    servicio: "Compliance y aseguramiento",
    puntos: ["Evaluación de riesgos", "Auditorías preventivas", "Análisis de control interno"],
  },
  {
    momento: "Ante una determinación",
    servicio: "Consultoría legal",
    puntos: ["Recursos administrativos", "Acuerdos conclusivos", "Tribunal Federal de Justicia Administrativa"],
  },
];

// Las tres cifras que el repo sostiene. El pie de la primera dice "en promedio
// entre los socios" porque eso es lo que dice la fuente, no "años de experiencia".
export const CIFRAS = [
  { cifra: "20", pie: "años en promedio entre los socios" },
  { cifra: "8", pie: "áreas de práctica" },
  { cifra: "2", pie: "oficinas: Tijuana y San Diego" },
];

// Áreas de práctica reales, tal cual en src/content/dictionaries.ts (services.items).
export const AREAS = [
  "Consultoría legal",
  "Compliance y aseguramiento",
  "Comercio exterior",
  "Expertos en comercio internacional",
  "Tecnología de la información",
  "Servicios fiscales",
  "Acuerdos comerciales",
  "Servicios de importación",
];
