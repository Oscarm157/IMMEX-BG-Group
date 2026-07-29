import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Seccion } from "./Seccion";
import { SANGRIA } from "./constantes";
import type { Paso } from "./tipos";

// 3 · Consecuencias: cadena vertical escalonada sobre panel de consola.
// pegadoArriba: cuando un bloque propio (sin fondo propio) va justo antes,
// esta sección ya trae suficiente aire de ese bloque y no necesita el propio.
export function CadenaConsecuencias({
  index,
  eyebrow,
  title,
  lead,
  items,
  nota,
  pegadoArriba = false,
}: {
  index: string;
  eyebrow: string;
  title: string;
  lead: string;
  items: readonly Paso[];
  nota?: string;
  pegadoArriba?: boolean;
}) {
  return (
    <Seccion variant="plano" className={pegadoArriba ? "pb-20" : "py-20"}>
      <div className="console-panel rounded-[16px] bg-surface-1 px-6 py-12 sm:px-10 sm:py-14">
        <SectionHeading eyebrow={eyebrow} index={index} title={title} lead={lead} rule={false} className="mb-12" />
        <ol className="relative border-l border-line pl-7 sm:pl-9">
          {items.map((e, i) => (
            <Reveal key={e.paso} delay={i * 0.06} as="li" className="relative pb-9 last:pb-0">
              <span
                aria-hidden
                className="absolute -left-[calc(1.75rem+3.5px)] top-2 h-1.5 w-1.5 rounded-full bg-accent sm:-left-[calc(2.25rem+3.5px)]"
              />
              <div className={SANGRIA[i]}>
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-[12px] tabular-nums text-ash">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="font-display text-[19px] font-medium tracking-[-0.015em] text-chalk">{e.paso}</h3>
                </div>
                <p className="mt-2 max-w-xl text-[16px] leading-relaxed text-bone/85">{e.desc}</p>
              </div>
            </Reveal>
          ))}
        </ol>
        {nota && (
          <p className="mt-10 max-w-2xl border-l-2 border-accent pl-5 text-[16px] leading-relaxed text-bone/90">{nota}</p>
        )}
      </div>
    </Seccion>
  );
}
