"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

interface Props {
  phase: "extracting" | "generating";
}

const EXPECTED_SECONDS: Record<Props["phase"], number> = { extracting: 8, generating: 35 };
const PHASE_LABEL: Record<Props["phase"], string> = { extracting: "Extrayendo contenido de la fuente", generating: "Generando 3 variantes con IA" };
const PHASE_HINT: Record<Props["phase"], string> = {
  extracting: "Leyendo PDF, URL o texto y limpiando el contenido.",
  generating: "Contextualizando para México y redactando posts por red.",
};

export function ProgressIndicator({ phase }: Props) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    setElapsed(0);
    const start = Date.now();
    const id = setInterval(() => setElapsed((Date.now() - start) / 1000), 100);
    return () => clearInterval(id);
  }, [phase]);

  const expected = EXPECTED_SECONDS[phase];
  const percent = Math.min(95, (1 - Math.exp(-elapsed / expected)) * 100);

  return (
    <div className="crm-card mt-6 overflow-hidden p-5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-70" style={{ background: "var(--crm-accent)" }} />
            <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: "var(--crm-accent)" }} />
          </span>
          <span className="text-[14px] font-medium tracking-tight text-[var(--crm-ink)]">{PHASE_LABEL[phase]}</span>
        </div>
        <span className="crm-num text-[13px] font-medium text-[var(--crm-ink-mute)]">{elapsed.toFixed(1)}s</span>
      </div>

      <div className="relative mt-3.5 h-1.5 w-full overflow-hidden rounded-full bg-[var(--crm-surface)]">
        <motion.div animate={{ width: `${percent}%` }} transition={{ type: "spring", stiffness: 200, damping: 26 }} className="h-full rounded-full" style={{ background: "var(--crm-accent)" }} />
      </div>

      <p className="mt-3 text-[13px] text-[var(--crm-ink-mute)]">{PHASE_HINT[phase]}</p>
    </div>
  );
}
