"use client";

import { useState, useTransition } from "react";
import { Check, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { updateLeadRotationConfig } from "@/app/admin/settings-actions";
import type { RotationConfig, RotationMode } from "@/lib/lead-rotation";

type Agent = { id: string; name: string };

const MODE_OPTIONS: { value: RotationMode; label: string; hint: string }[] = [
  {
    value: "off",
    label: "Sin asignar",
    hint: "Los leads nuevos entran sin dueño, como hasta ahora. Un administrador los asigna a mano.",
  },
  {
    value: "round_robin",
    label: "Round robin (turnos iguales)",
    hint: "Reparte los leads uno a uno, en partes iguales, entre los agentes elegibles. Al que lleva más tiempo sin recibir le toca el siguiente.",
  },
  {
    value: "percentage",
    label: "Por porcentaje",
    hint: "Como round robin, pero cada agente recibe una cuota fija en vez de un turno igual (por ejemplo 60/40). El reparto se empareja con el tiempo, no lead por lead.",
  },
];

export function LeadRotationForm({ config, agents }: { config: RotationConfig; agents: Agent[] }) {
  const [pending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<RotationMode>(config.mode);
  const [weights, setWeights] = useState<Record<string, number>>(
    Object.fromEntries(agents.map((a) => [a.id, config.weights[a.id] ?? 0]))
  );

  const total = Object.values(weights).reduce((a, b) => a + b, 0);

  return (
    <form
      action={(fd) =>
        startTransition(async () => {
          setSaved(false);
          setError(null);
          fd.set("mode", mode);
          if (mode === "percentage") {
            for (const [id, w] of Object.entries(weights)) fd.set(`weight:${id}`, String(w));
          }
          const res = await updateLeadRotationConfig(fd);
          if (res.error) setError(res.error);
          else {
            setSaved(true);
            setTimeout(() => setSaved(false), 2200);
          }
        })
      }
      className="space-y-4"
    >
      <div>
        <p className="mb-1.5 block text-[12.5px] font-medium text-[var(--crm-ink)]">Asignación automática de leads</p>
        <p className="mb-2 text-[11.5px] text-[var(--crm-ink-mute)]">
          Aplica a los leads del chatbot y del formulario de contacto. Los leads creados a mano no se tocan.
        </p>
        <div className="space-y-1.5">
          {MODE_OPTIONS.map((opt) => {
            const sel = mode === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => setMode(opt.value)}
                className={`flex w-full flex-col items-start gap-0.5 rounded-lg border px-3 py-2.5 text-left transition-colors ${
                  sel
                    ? "border-[var(--crm-accent)] bg-[var(--crm-accent-tint)]"
                    : "border-[var(--crm-line)] bg-[var(--crm-surface-2)] hover:border-[var(--crm-line-strong)]"
                }`}
              >
                <span className={`text-[13px] font-medium ${sel ? "text-[var(--crm-accent-strong)]" : "text-[var(--crm-ink)]"}`}>
                  {opt.label}
                </span>
                <span className="text-[11.5px] text-[var(--crm-ink-mute)]">{opt.hint}</span>
              </button>
            );
          })}
        </div>
      </div>

      {mode !== "percentage" && (
        <p className="text-[11.5px] text-[var(--crm-ink-mute)]">
          {agents.length === 0
            ? "No hay agentes en rotación: un usuario elegible debe tener rol Agente y estar activo."
            : `${agents.length} agente${agents.length === 1 ? "" : "s"} en rotación: ${agents.map((a) => a.name).join(", ")}. La elegibilidad se maneja desde Usuarios.`}
        </p>
      )}

      {mode === "percentage" && (
        <div>
          {agents.length === 0 ? (
            <p className="text-[11.5px] text-[var(--crm-ink-mute)]">
              No hay agentes a los que asignar un porcentaje: un usuario elegible debe tener rol Agente y estar activo.
            </p>
          ) : (
            <div className="space-y-2">
              {agents.map((a) => (
                <div key={a.id} className="flex items-center justify-between gap-3">
                  <span className="text-[13px] text-[var(--crm-ink)]">{a.name}</span>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={weights[a.id] ?? 0}
                      onChange={(e) =>
                        setWeights((prev) => ({ ...prev, [a.id]: Math.max(0, Number(e.target.value) || 0) }))
                      }
                      className="crm-input h-9 w-20 text-right tabular-nums"
                    />
                    <span className="text-[13px] text-[var(--crm-ink-mute)]">%</span>
                  </div>
                </div>
              ))}
              <p className={`pt-1 text-[12px] font-medium ${total === 100 ? "text-[var(--crm-ink-mute)]" : "text-[var(--destructive)]"}`}>
                Total: {total}%
              </p>
            </div>
          )}
        </div>
      )}

      {error && <p className="text-[12.5px] text-[var(--destructive)]">{error}</p>}

      <div className="flex items-center gap-3 pt-1">
        <button type="submit" disabled={pending} className="crm-btn crm-btn-primary">
          {pending && <Loader2 className="size-3.5 animate-spin" />}
          {pending ? "Guardando…" : "Guardar cambios"}
        </button>
        <AnimatePresence>
          {saved && (
            <motion.span
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="inline-flex items-center gap-1 text-[12.5px] text-[var(--crm-accent-strong)]"
            >
              <Check className="size-3.5" /> Guardado
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}
