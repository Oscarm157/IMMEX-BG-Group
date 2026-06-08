"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export type InputMode = "pdf" | "url" | "text";

interface Props {
  mode: InputMode;
  setMode: (m: InputMode) => void;
  file: File | null;
  setFile: (f: File | null) => void;
  url: string;
  setUrl: (s: string) => void;
  text: string;
  setText: (s: string) => void;
}

const TABS: { id: InputMode; label: string }[] = [
  { id: "pdf", label: "PDF" },
  { id: "url", label: "URL" },
  { id: "text", label: "Texto" },
];

const stepBadge = "grid h-6 w-6 place-items-center rounded-md text-[11px] font-semibold";

export function InputTabs({ mode, setMode, file, setFile, url, setUrl, text, setText }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  return (
    <section className="crm-card p-6">
      <div className="mb-5 flex items-center gap-3">
        <span className={stepBadge} style={{ background: "var(--crm-wine-tint)", color: "var(--crm-wine)" }}>01</span>
        <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--crm-ink-mute)]">Fuente</h2>
      </div>

      <div className="mb-6 flex gap-1 rounded-xl border border-[var(--crm-line)] bg-[var(--crm-surface-2)] p-1">
        {TABS.map((t) => {
          const active = mode === t.id;
          return (
            <button key={t.id} type="button" onClick={() => setMode(t.id)} className="relative flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition">
              {active && (
                <motion.span layoutId="post-tab" transition={{ type: "spring", stiffness: 400, damping: 30 }} className="absolute inset-0 rounded-lg" style={{ background: "var(--crm-wine)" }} />
              )}
              <span className="relative z-10" style={{ color: active ? "var(--crm-on-accent)" : "var(--crm-ink-soft)" }}>{t.label}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {mode === "pdf" && (
          <motion.div key="pdf" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }}>
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files?.[0]; if (f && f.type === "application/pdf") setFile(f); }}
              onClick={() => inputRef.current?.click()}
              className="group relative flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed bg-[var(--crm-surface-2)] p-10 text-center transition"
              style={{ borderColor: dragOver ? "var(--crm-wine)" : "var(--crm-line-strong)" }}
            >
              <input ref={inputRef} type="file" accept="application/pdf" className="hidden" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
              {file ? (
                <>
                  <p className="font-medium text-[var(--crm-ink)]">{file.name}</p>
                  <p className="mt-1 text-sm text-[var(--crm-ink-mute)]">{(file.size / 1024).toFixed(1)} KB</p>
                  <button type="button" onClick={(e) => { e.stopPropagation(); setFile(null); }} className="mt-4 text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--crm-wine)]">Quitar archivo</button>
                </>
              ) : (
                <>
                  <div className="mb-3 grid h-12 w-12 place-items-center rounded-xl" style={{ background: "var(--crm-wine-tint)", color: "var(--crm-wine)" }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 3v12m0-12-4 4m4-4 4 4M5 21h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                  <p className="font-medium text-[var(--crm-ink)]">Arrastra un PDF o haz clic para seleccionar</p>
                  <p className="mt-2 max-w-xs text-sm text-[var(--crm-ink-mute)]">Solo archivos PDF. Se procesan en el servidor.</p>
                </>
              )}
            </div>
          </motion.div>
        )}

        {mode === "url" && (
          <motion.div key="url" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }}>
            <label className="mb-2 block text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--crm-ink-mute)]">URL fuente</label>
            <input type="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://www.dof.gob.mx/..." className="crm-input" />
            <p className="mt-3 text-[13px] text-[var(--crm-ink-mute)]">Portales oficiales, blogs y comunicados. No funciona con contenido JS-renderizado.</p>
          </motion.div>
        )}

        {mode === "text" && (
          <motion.div key="text" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }}>
            <label className="mb-2 flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--crm-ink-mute)]">
              <span>Texto fuente</span>
              <span>{text.length.toLocaleString()} caracteres</span>
            </label>
            <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Pega aquí el texto de la nota, comunicado o boletín…" rows={10} className="crm-textarea min-h-[220px] resize-y" />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
