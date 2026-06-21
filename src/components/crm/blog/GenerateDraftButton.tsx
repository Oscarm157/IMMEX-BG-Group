"use client";

import { useFormStatus } from "react-dom";
import { Loader2, Sparkles } from "lucide-react";

export function GenerateDraftButton() {
  const { pending } = useFormStatus();
  return (
    <div className="flex items-center gap-3 border-t border-[var(--crm-line)] pt-4">
      <button type="submit" disabled={pending} className="crm-btn crm-btn-primary disabled:opacity-70">
        {pending ? (
          <Loader2 className="size-[15px] motion-safe:animate-spin" strokeWidth={2.1} />
        ) : (
          <Sparkles className="size-[15px]" strokeWidth={2.1} />
        )}
        {pending ? "Generando borrador…" : "Generar borrador"}
      </button>
      <span className="text-[12px] text-[var(--crm-ink-mute)]">
        {pending ? "La IA está redactando español e inglés." : "Tarda unos segundos."}
      </span>
    </div>
  );
}
