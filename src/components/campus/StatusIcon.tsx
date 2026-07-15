import type { TopicState } from "@/lib/campus-data";

// Estados del PRD: completado = disco mint con check; en progreso = anillo
// parcial mint; no iniciado = círculo vacío. Nunca verde-semáforo.
export function StatusIcon({ state, size = 18 }: { state: TopicState; size?: number }) {
  if (state === "done") {
    return (
      <svg width={size} height={size} viewBox="0 0 20 20" aria-label="Completado" className="shrink-0">
        <circle cx="10" cy="10" r="10" fill="var(--accent)" />
        <path d="M6 10.5l2.5 2.5L14 7.5" fill="none" stroke="var(--color-on-accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (state === "in_progress") {
    return (
      <svg width={size} height={size} viewBox="0 0 20 20" aria-label="En progreso" className="shrink-0">
        <circle cx="10" cy="10" r="9" fill="none" stroke="var(--color-line)" strokeWidth="2" />
        <path d="M10 1a9 9 0 019 9" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" aria-label="No iniciado" className="shrink-0">
      <circle cx="10" cy="10" r="9" fill="none" stroke="var(--color-line)" strokeWidth="2" />
    </svg>
  );
}
