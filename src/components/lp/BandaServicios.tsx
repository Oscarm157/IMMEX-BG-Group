import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Seccion } from "./Seccion";
import type { Servicio } from "./tipos";

// 4 · Servicios: interludio claro, servicio en display grande con sus
// sub-puntos reales en línea. Banda de fondo propia: no necesita pegadoArriba,
// el cambio de superficie (paper sobre ink) ya marca la separación.
export function BandaServicios({ index, servicios }: { index: string; servicios: readonly Servicio[] }) {
  return (
    <Seccion variant="banda-clara" className="py-20 sm:py-24">
      <SectionHeading
        eyebrow="Firma"
        index={index}
        title="Servicios"
        lead="Ordenados por el momento de la operación en que se necesitan."
        tone="light"
        className="mb-14"
      />
      <div className="flex flex-col gap-11">
        {servicios.map((s, i) => (
          <Reveal key={s.servicio} delay={i * 0.05}>
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent-ink">{s.momento}</span>
            <h3 className="mt-3 font-display text-[clamp(1.5rem,3vw,2.1rem)] font-medium leading-tight tracking-[-0.025em] text-ink">
              {s.servicio}
            </h3>
            <ul className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-[16px] leading-relaxed text-graphite">
              {s.puntos.map((p, j) => (
                <li key={p} className="flex items-center gap-3">
                  {j > 0 && (
                    <span aria-hidden className="text-line-soft">
                      ·
                    </span>
                  )}
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Seccion>
  );
}
