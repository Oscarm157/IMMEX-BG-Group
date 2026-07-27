"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { etiquetaServicio } from "@/lib/keywords-schema";

/**
 * Las filas de la lista se abren en el lugar para ver las keywords del grupo.
 * Varias pueden estar abiertas a la vez: con tres o cuatro grupos armados, entrar
 * y salir de cada pantalla para compararlos no servía.
 */

const COMPETENCIA: Record<string, string> = { LOW: "Baja", MEDIUM: "Media", HIGH: "Alta" };

const num = (n: number, d = 0) =>
  n.toLocaleString("es-MX", { minimumFractionDigits: d, maximumFractionDigits: d });

const fmtFecha = (d: string | null) =>
  d ? new Intl.DateTimeFormat("es-MX", { day: "2-digit", month: "short" }).format(new Date(d)) : "—";

const ESTADOS: Record<string, { label: string; clase: string }> = {
  borrador: { label: "Borrador", clase: "" },
  listo: { label: "Listo", clase: "crm-badge-amber" },
  lanzado: { label: "Correr en Google Ads", clase: "crm-badge-violet" },
};

export type FilaGrupo = {
  id: string;
  nombre: string;
  servicio: string;
  plaza: string | null;
  mercado: string;
  estado: string;
  keywords: number;
  volumen: number;
  cpc: number;
  disputa: number;
  techoClics: number;
  costoMes: number;
  actualizado: string | null;
};

export type ItemGrupo = {
  keyword: string;
  volumen: number;
  cpc: string | null;
  competencia: string;
};

export function FilasGrupos({
  grupos,
  items,
  escala,
}: {
  grupos: FilaGrupo[];
  items: Record<string, ItemGrupo[]>;
  escala: number;
}) {
  const [abiertos, setAbiertos] = useState<Set<string>>(new Set());
  const alternar = (id: string) =>
    setAbiertos((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <>
      {grupos.map((g) => {
        const abierto = abiertos.has(g.id);
        const suyas = items[g.id] ?? [];
        return (
          <>
            <tr key={g.id} className="crm-row border-t border-[var(--crm-line)]">
              <td className="crm-td">
                <div className="flex items-start gap-2">
                  <button
                    type="button"
                    onClick={() => alternar(g.id)}
                    aria-label={abierto ? `Cerrar ${g.nombre}` : `Ver keywords de ${g.nombre}`}
                    aria-expanded={abierto}
                    className="mt-0.5 text-[var(--crm-ink-faint)] transition-colors hover:text-[var(--crm-ink)]"
                  >
                    <ChevronDown
                      className={`size-4 transition-transform ${abierto ? "" : "-rotate-90"}`}
                    />
                  </button>
                  <div className="min-w-0">
                    <Link
                      href={`/admin/keywords/grupos/${g.id}`}
                      className="text-[14px] font-medium text-[var(--crm-ink)] transition-colors hover:text-[var(--crm-accent-strong)]"
                    >
                      {g.nombre}
                    </Link>
                    <div className="mt-0.5 text-[12px] text-[var(--crm-ink-faint)]">
                      {etiquetaServicio(g.servicio)} · {g.plaza ?? "Nacional"} ·{" "}
                      {g.mercado === "nacional_es" ? "Nacional" : "Extranjero"} · {num(g.keywords)}{" "}
                      kw{g.actualizado ? ` · ${fmtFecha(g.actualizado)}` : ""}
                    </div>
                  </div>
                </div>
              </td>
              <td className="crm-td w-[130px]">
                <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--crm-surface-3)]">
                  <span
                    className="block h-full bg-[var(--crm-accent)]"
                    style={{ width: `${(g.volumen / escala) * 100}%` }}
                  />
                </div>
              </td>
              <td className="crm-td crm-num text-right text-[13.5px] font-semibold text-[var(--crm-ink)]">
                {num(g.volumen)}
              </td>
              <td className="crm-td crm-num text-right text-[13px] text-[var(--crm-ink-soft)]">
                ${g.cpc.toFixed(2)}
              </td>
              <td className="crm-td crm-num text-right text-[13px] text-[var(--crm-ink-mute)]">
                {num(g.disputa * 100)}%
              </td>
              <td className="crm-td crm-num text-right text-[13px] text-[var(--crm-ink-soft)]">
                {num(g.techoClics)}
              </td>
              <td className="crm-td crm-num text-right text-[13px] text-[var(--crm-ink-soft)]">
                ${num(g.costoMes)}
              </td>
              <td className="crm-td text-right">
                <span className={`crm-badge ${ESTADOS[g.estado]?.clase ?? ""}`}>
                  {ESTADOS[g.estado]?.label ?? g.estado}
                </span>
              </td>
            </tr>
            {abierto && (
              <tr key={`${g.id}-kw`} className="border-t border-[var(--crm-line)]">
                <td colSpan={8} className="bg-[var(--crm-surface-2)] px-4 py-3">
                  {suyas.length === 0 ? (
                    <p className="text-[13px] text-[var(--crm-ink-mute)]">
                      Este grupo se quedó sin keywords.
                    </p>
                  ) : (
                    <table className="w-full text-[12.5px]">
                      <tbody>
                        {suyas.map((k) => (
                          <tr key={k.keyword}>
                            <td className="py-1 pr-3 text-[var(--crm-ink)]">{k.keyword}</td>
                            <td className="crm-num w-[90px] py-1 text-right text-[var(--crm-ink-soft)]">
                              {num(k.volumen)}
                            </td>
                            <td className="w-[80px] py-1 text-right text-[var(--crm-ink-mute)]">
                              {COMPETENCIA[k.competencia] ?? "Sin dato"}
                            </td>
                            <td className="crm-num w-[80px] py-1 text-right text-[var(--crm-ink-soft)]">
                              {Number(k.cpc) > 0 ? `$${Number(k.cpc).toFixed(2)}` : "—"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </td>
              </tr>
            )}
          </>
        );
      })}
    </>
  );
}
