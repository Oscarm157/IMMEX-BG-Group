"use client";

import { motion, AnimatePresence } from "motion/react";
import { ENFOQUES, type Red } from "@/lib/posts/types";

interface Props {
  networks: Red[];
  toggleNetwork: (n: Red) => void;
  approaches: [string, string, string];
  setApproach: (index: 0 | 1 | 2, value: string) => void;
  onGenerate: () => void;
  loading: boolean;
  canGenerate: boolean;
}

const NETWORKS: { id: Red; label: string }[] = [
  { id: "linkedin", label: "LinkedIn" },
  { id: "instagram", label: "Instagram" },
  { id: "facebook", label: "Facebook" },
];

export function ConfigPanel({ networks, toggleNetwork, approaches, setApproach, onGenerate, loading, canGenerate }: Props) {
  return (
    <section className="crm-card p-6">
      <div className="mb-5 flex items-center gap-3">
        <span className="grid h-6 w-6 place-items-center rounded-md text-[11px] font-semibold" style={{ background: "var(--crm-wine-tint)", color: "var(--crm-wine)" }}>02</span>
        <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--crm-ink-mute)]">Configuración</h2>
      </div>

      <div className="mb-6">
        <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--crm-ink-mute)]">Redes destino</p>
        <div className="grid grid-cols-3 gap-2">
          {NETWORKS.map((n) => {
            const active = networks.includes(n.id);
            return (
              <motion.button
                key={n.id} type="button" whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} onClick={() => toggleNetwork(n.id)}
                className="relative flex h-[72px] flex-col items-start justify-between rounded-xl border p-3 text-left transition"
                style={{ borderColor: active ? "var(--crm-wine-soft)" : "var(--crm-line)", background: active ? "var(--crm-wine-tint)" : "var(--crm-surface-2)" }}
              >
                <NetworkGlyph id={n.id} active={active} />
                <span className="text-[13px] font-medium" style={{ color: active ? "var(--crm-ink)" : "var(--crm-ink-soft)" }}>{n.label}</span>
                <AnimatePresence>
                  {active && (
                    <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ type: "spring", stiffness: 500, damping: 22 }}
                      className="absolute right-2.5 top-2.5 grid h-5 w-5 place-items-center rounded-full" style={{ background: "var(--crm-wine)", color: "var(--crm-on-accent)" }}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="m5 12 5 5 9-10" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="mb-6">
        <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--crm-ink-mute)]">Enfoques (3 variantes)</p>
        <div className="grid gap-3 sm:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i}>
              <label className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--crm-ink-mute)]">Variante {i + 1}</label>
              <select value={approaches[i]} onChange={(e) => setApproach(i as 0 | 1 | 2, e.target.value)} className="crm-select !h-11 text-[13px]">
                {ENFOQUES.map((enf) => <option key={enf} value={enf}>{enf}</option>)}
              </select>
            </div>
          ))}
        </div>
      </div>

      <button type="button" onClick={onGenerate} disabled={!canGenerate || loading} className="crm-btn crm-btn-primary h-12 w-full">
        {loading ? (
          <>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="animate-spin"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.2" strokeOpacity="0.3" /><path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" /></svg>
            <span>Generando…</span>
          </>
        ) : (
          <>
            <span>Generar 3 variantes</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14m0 0-5-5m5 5-5 5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </>
        )}
      </button>
      <p className="mt-3 text-center text-[11px] text-[var(--crm-ink-mute)]">Usa Claude Sonnet 4.6 · contextualizado para México</p>
    </section>
  );
}

function NetworkGlyph({ id, active }: { id: Red; active: boolean }) {
  const color = active ? "var(--crm-wine)" : "var(--crm-ink-mute)";
  const common = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none" } as const;
  if (id === "linkedin") {
    return <svg {...common}><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.5h4V21H3V9.5ZM9 9.5h3.84v1.57h.05a4.2 4.2 0 0 1 3.78-2.08C20 9 21 11 21 14v7h-4v-6.2c0-1.47 0-3.38-2.06-3.38-2.06 0-2.37 1.61-2.37 3.27V21H9V9.5Z" fill={color} /></svg>;
  }
  if (id === "instagram") {
    return <svg {...common}><rect x="3" y="3" width="18" height="18" rx="5" stroke={color} strokeWidth="1.8" /><circle cx="12" cy="12" r="4" stroke={color} strokeWidth="1.8" /><circle cx="17.5" cy="6.5" r="1.1" fill={color} /></svg>;
  }
  return <svg {...common}><path d="M13.5 21v-8h2.7l.4-3.3h-3.1V7.7c0-.95.27-1.6 1.63-1.6h1.74V3.16A24 24 0 0 0 14.4 3C12.1 3 10.5 4.4 10.5 7v2.7H8V13h2.5v8h3Z" fill={color} /></svg>;
}
