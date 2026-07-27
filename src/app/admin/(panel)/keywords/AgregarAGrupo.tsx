"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { FolderPlus } from "lucide-react";
import type { IdeaFila } from "@/lib/keywords-data";
import { etiquetaServicio, SERVICIOS, type KwServicio } from "@/lib/keywords-schema";
import { agregarKeywords, crearGrupo } from "./actions";

/**
 * Manda la selección a un grupo: uno existente o uno nuevo. El nombre, el servicio
 * y la plaza se proponen desde lo que está seleccionado, para no teclear lo obvio.
 */

type GrupoBreve = { id: string; nombre: string; servicio: string };

export function AgregarAGrupo({
  seleccion,
  grupos,
  onListo,
}: {
  seleccion: IdeaFila[];
  grupos: GrupoBreve[];
  onListo: () => void;
}) {
  const router = useRouter();
  const [abierto, setAbierto] = useState(false);
  const [pendiente, arranca] = useTransition();
  const [error, setError] = useState<string | null>(null);

  // Si la selección está mezclada, gana la mayoría.
  const servicioSugerido = (masComun(seleccion.map((k) => k.servicio)) ?? "Sin clasificar") as KwServicio;
  const plaza = masComun(seleccion.map((k) => k.plaza)) ?? "Nacional";
  const mercado = masComun(seleccion.map((k) => k.mercado)) ?? "nacional_es";

  const [nombre, setNombre] = useState("");
  const [servicio, setServicio] = useState<KwServicio>(servicioSugerido);

  const payload = seleccion.map((k) => ({
    keyword: k.keyword,
    volumen: k.volumen,
    cpc: k.cpc,
    competencia: k.competencia,
  }));

  const nombrePropuesto = `${etiquetaServicio(servicio)} · ${plaza}`;

  function cerrar() {
    setAbierto(false);
    setError(null);
    setNombre("");
  }

  function aExistente(grupoId: string) {
    setError(null);
    arranca(async () => {
      try {
        await agregarKeywords({ grupoId, keywords: payload });
        cerrar();
        onListo();
        router.refresh();
      } catch (e) {
        setError(e instanceof Error ? e.message : "No se pudo agregar.");
      }
    });
  }

  function aNuevo() {
    setError(null);
    arranca(async () => {
      try {
        const r = await crearGrupo({
          nombre: nombre.trim() || nombrePropuesto,
          servicio,
          plaza: plaza === "Nacional" ? null : plaza,
          mercado: mercado as "nacional_es" | "extranjero_en",
          keywords: payload,
        });
        cerrar();
        onListo();
        router.push(`/admin/keywords/grupos/${r.id}`);
      } catch (e) {
        setError(e instanceof Error ? e.message : "No se pudo crear el grupo.");
      }
    });
  }

  if (!abierto) {
    return (
      <button
        type="button"
        onClick={() => setAbierto(true)}
        className="crm-btn crm-btn-sm crm-btn-primary"
      >
        <FolderPlus className="size-3.5" />
        Agregar a grupo
      </button>
    );
  }

  return (
    <div className="w-full">
      <div className="crm-card mt-2 p-3.5">
        <div className="mb-3 flex items-baseline justify-between gap-3">
          <h3 className="text-[13.5px] font-medium text-[var(--crm-ink)]">
            {seleccion.length} keywords a un grupo
          </h3>
          <button type="button" onClick={cerrar} className="crm-btn crm-btn-sm crm-btn-ghost">
            Cancelar
          </button>
        </div>

        {grupos.length > 0 && (
          <div className="mb-4">
            <p className="mb-1.5 text-[12.5px] text-[var(--crm-ink-mute)]">A un grupo que ya existe</p>
            <div className="flex flex-wrap gap-1.5">
              {grupos.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  disabled={pendiente}
                  onClick={() => aExistente(g.id)}
                  className="crm-btn crm-btn-sm crm-btn-secondary"
                >
                  {g.nombre}
                </button>
              ))}
            </div>
          </div>
        )}

        <p className="mb-1.5 text-[12.5px] text-[var(--crm-ink-mute)]">O crear uno nuevo</p>
        <div className="flex flex-wrap items-center gap-2">
          <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder={nombrePropuesto}
            className="crm-input w-full sm:w-[280px]"
          />
          <select
            value={servicio}
            onChange={(e) => setServicio(e.target.value as KwServicio)}
            className="crm-select w-[170px]"
          >
            {SERVICIOS.map((s) => (
              <option key={s} value={s}>
                {etiquetaServicio(s)}
              </option>
            ))}
          </select>
          <button
            type="button"
            disabled={pendiente}
            onClick={aNuevo}
            className="crm-btn crm-btn-sm crm-btn-primary"
          >
            {pendiente ? "Guardando..." : "Crear grupo"}
          </button>
        </div>

        <p className="mt-2 text-[12px] text-[var(--crm-ink-faint)]">
          Plaza: {plaza} · {mercado === "nacional_es" ? "Nacional" : "Extranjero"}
        </p>

        {error && <p className="mt-2 text-[13px] text-[var(--crm-ink)]">{error}</p>}
      </div>
    </div>
  );
}

function masComun<T>(valores: T[]): T | null {
  const cuenta = new Map<T, number>();
  for (const v of valores) cuenta.set(v, (cuenta.get(v) ?? 0) + 1);
  let mejor: T | null = null;
  let max = 0;
  for (const [v, n] of cuenta) if (n > max) [mejor, max] = [v, n];
  return mejor;
}
