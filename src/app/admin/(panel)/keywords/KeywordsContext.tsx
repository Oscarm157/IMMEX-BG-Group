"use client";

import { useEffect, useMemo, useSyncExternalStore, type ReactNode } from "react";
import type { IdeaFila } from "@/lib/keywords-data";

/**
 * El estado de la tabla (filtros, orden, selección) vive en un store de módulo para
 * que la tabla y la calculadora lean lo mismo sin pasarse props por toda la página.
 */

export type Columna = "keyword" | "servicio" | "volumen" | "competencia" | "cpc";
export type Filtros = {
  busqueda: string;
  minVolumen: number;
  competencias: string[];
  soloConPuja: boolean;
};
export type Orden = { col: Columna; desc: boolean };

const PESO: Record<string, number> = { LOW: 1, MEDIUM: 2, HIGH: 3 };
export const claveIdea = (k: IdeaFila) => `${k.keyword}·${k.mercado}`;

const FILTROS_VACIOS: Filtros = {
  busqueda: "",
  minVolumen: 0,
  competencias: [],
  soloConPuja: false,
};

type Estado = {
  ideas: IdeaFila[];
  filtros: Filtros;
  orden: Orden;
  elegidas: Set<string>;
  /** Sube al cambiar orden o filtro de servidor para re-animar la cascada. */
  gen: number;
};

let estado: Estado = {
  ideas: [],
  filtros: FILTROS_VACIOS,
  orden: { col: "volumen", desc: true },
  elegidas: new Set(),
  gen: 0,
};

const suscriptores = new Set<() => void>();
const avisar = () => suscriptores.forEach((f) => f());

function set(parcial: Partial<Estado>) {
  estado = { ...estado, ...parcial };
  avisar();
}

export const keywordsStore = {
  suscribir(f: () => void) {
    suscriptores.add(f);
    return () => {
      suscriptores.delete(f);
    };
  },
  leer: () => estado,

  cargarIdeas(ideas: IdeaFila[]) {
    // Al cambiar de servicio o plaza la página trae otras keywords: la selección
    // previa ya no aplica.
    set({ ideas, elegidas: new Set(), gen: estado.gen + 1 });
  },
  setFiltros(parcial: Partial<Filtros>) {
    set({ filtros: { ...estado.filtros, ...parcial } });
  },
  setOrden(orden: Orden) {
    set({ orden, gen: estado.gen + 1 });
  },
  alternar(k: IdeaFila) {
    const next = new Set(estado.elegidas);
    const c = claveIdea(k);
    if (next.has(c)) next.delete(c);
    else next.add(c);
    set({ elegidas: next });
  },
  alternarTodas(visibles: IdeaFila[]) {
    const todas = visibles.length > 0 && visibles.every((k) => estado.elegidas.has(claveIdea(k)));
    const next = new Set(estado.elegidas);
    visibles.forEach((k) => (todas ? next.delete(claveIdea(k)) : next.add(claveIdea(k))));
    set({ elegidas: next });
  },
  limpiarSeleccion() {
    set({ elegidas: new Set() });
  },
};

/** Aplica filtros y orden. Fuera del store para que sea puro y memoizable. */
export function calcularVisibles(estado: Estado): IdeaFila[] {
  const { ideas, filtros, orden } = estado;
  const q = filtros.busqueda.trim().toLowerCase();
  const filtradas = ideas.filter((k) => {
    if (q && !k.keyword.toLowerCase().includes(q)) return false;
    if (k.volumen < filtros.minVolumen) return false;
    if (filtros.competencias.length && !filtros.competencias.includes(k.competencia)) return false;
    if (filtros.soloConPuja && k.cpc <= 0) return false;
    return true;
  });
  const signo = orden.desc ? -1 : 1;
  return [...filtradas].sort((a, b) => {
    switch (orden.col) {
      case "keyword":
        return signo * a.keyword.localeCompare(b.keyword);
      case "servicio":
        return signo * (a.servicio.localeCompare(b.servicio) || b.volumen - a.volumen);
      case "competencia":
        return (
          signo * ((PESO[a.competencia] ?? 0) - (PESO[b.competencia] ?? 0) || a.indice - b.indice)
        );
      case "cpc":
        return signo * (a.cpc - b.cpc);
      default:
        return signo * (a.volumen - b.volumen);
    }
  });
}

export function useKeywords() {
  const snapshot = useSyncExternalStore(
    keywordsStore.suscribir,
    keywordsStore.leer,
    keywordsStore.leer,
  );
  const visibles = useMemo(() => calcularVisibles(snapshot), [snapshot]);
  const seleccion = useMemo(
    () => visibles.filter((k) => snapshot.elegidas.has(claveIdea(k))),
    [visibles, snapshot.elegidas],
  );
  return {
    ...snapshot,
    visibles,
    seleccion,
    setFiltros: keywordsStore.setFiltros,
    setOrden: keywordsStore.setOrden,
    alternar: keywordsStore.alternar,
    alternarTodas: () => keywordsStore.alternarTodas(visibles),
    limpiarSeleccion: keywordsStore.limpiarSeleccion,
  };
}

/** Carga en el store las keywords que trajo el servidor para el filtro actual. */
export function KeywordsProvider({ ideas, children }: { ideas: IdeaFila[]; children: ReactNode }) {
  // Sembrar en el primer render, no solo en el efecto: si no, el HTML del servidor sale
  // con la tabla vacía y se lee "ninguna keyword pasa estos filtros" hasta que hidrata.
  if (!estado.ideas.length && ideas.length) {
    estado = { ...estado, ideas };
  }
  useEffect(() => {
    keywordsStore.cargarIdeas(ideas);
  }, [ideas]);
  return <>{children}</>;
}
