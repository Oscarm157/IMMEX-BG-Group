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

export function InputTabs({ mode, setMode, file, setFile, url, setUrl, text, setText }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  return (
    <section className="crm-card flex flex-col p-5">
      <div className="mb-4 flex items-baseline gap-2.5">
        <span className="crm-eyebrow">Paso 1</span>
        <h2 className="crm-h2">Fuente</h2>
      </div>

      <div className="mb-5 flex gap-1 rounded-[var(--crm-r-md)] border border-[var(--crm-line)] bg-[var(--crm-surface)] p-1">
        {TABS.map((t) => {
          const active = mode === t.id;
          return (
            <button key={t.id} type="button" onClick={() => setMode(t.id)} className="relative flex-1 rounded-[6px] px-4 py-2 text-[13px] font-medium transition-colors">
              {active && (
                <motion.span layoutId="post-tab" transition={{ type: "spring", stiffness: 400, damping: 32 }} className="absolute inset-0 rounded-[6px] border border-[var(--crm-line-strong)] bg-[var(--crm-surface-3)]" />
              )}
              <span className="relative z-10" style={{ color: active ? "var(--crm-ink)" : "var(--crm-ink-mute)" }}>{t.label}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {mode === "pdf" && (
          <motion.div key="pdf" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.18 }} className="flex-1">
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files?.[0]; if (f && f.type === "application/pdf") setFile(f); }}
              onClick={() => inputRef.current?.click()}
              data-accepts="true"
              data-over={dragOver || undefined}
              className="crm-dropzone group flex h-full min-h-[220px] cursor-pointer flex-col items-center justify-center p-8 text-center"
            >
              <input ref={inputRef} type="file" accept="application/pdf" className="hidden" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
              {file ? (
                <>
                  <div className="mb-3 grid h-11 w-11 place-items-center rounded-[var(--crm-r-md)] border border-[var(--crm-line-strong)] bg-[var(--crm-surface-2)] text-[var(--crm-ink-soft)]">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M14 3v4a1 1 0 0 0 1 1h4M6 21V3a1 1 0 0 1 1-1h7l5 5v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></svg>
                  </div>
                  <p className="max-w-full truncate font-medium text-[var(--crm-ink)]">{file.name}</p>
                  <p className="crm-num mt-1 text-[13px] text-[var(--crm-ink-mute)]">{(file.size / 1024).toFixed(1)} KB</p>
                  <button type="button" onClick={(e) => { e.stopPropagation(); setFile(null); }} className="mt-4 text-[12px] font-medium text-[var(--crm-accent-strong)] transition-colors hover:text-[var(--crm-accent)]">Quitar archivo</button>
                </>
              ) : (
                <>
                  <div className="mb-3 grid h-11 w-11 place-items-center rounded-[var(--crm-r-md)] border border-[var(--crm-line-strong)] bg-[var(--crm-surface-2)] text-[var(--crm-ink-mute)] transition-colors group-hover:text-[var(--crm-ink-soft)]">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 3v12m0-12-4 4m4-4 4 4M5 21h14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                  <p className="font-medium text-[var(--crm-ink)]">Arrastra un PDF o haz clic para seleccionar</p>
                  <p className="mt-1.5 max-w-xs text-[13px] text-[var(--crm-ink-mute)]">Solo archivos PDF. Se procesan en el servidor.</p>
                </>
              )}
            </div>
          </motion.div>
        )}

        {mode === "url" && (
          <motion.div key="url" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.18 }} className="flex-1">
            <label className="mb-2 block text-[13px] font-medium text-[var(--crm-ink-soft)]">URL fuente</label>
            <input type="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://www.dof.gob.mx/..." className="crm-input" />
            <p className="mt-3 text-[13px] leading-relaxed text-[var(--crm-ink-mute)]">Portales oficiales, blogs y comunicados. No funciona con contenido renderizado por JavaScript.</p>
          </motion.div>
        )}

        {mode === "text" && (
          <motion.div key="text" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.18 }} className="flex flex-1 flex-col">
            <label className="mb-2 flex items-center justify-between text-[13px] font-medium text-[var(--crm-ink-soft)]">
              <span>Texto fuente</span>
              <span className="crm-num text-[12px] text-[var(--crm-ink-mute)]">{text.length.toLocaleString()} caracteres</span>
            </label>
            <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Pega aquí el texto de la nota, comunicado o boletín…" rows={10} className="crm-textarea min-h-[220px] flex-1 resize-y" />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
