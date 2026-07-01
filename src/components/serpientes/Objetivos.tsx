import { Reveal } from "@/components/site/Reveal";
import { OBJETIVOS } from "@/content/serpientes-plan";
import { VerEnDocumento } from "@/components/serpientes/VerEnDocumento";

export function Objetivos() {
  return (
    <section className="border-t border-[var(--st-line)] bg-[var(--st-surface-1)] px-6 py-24 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1280px]">
        <Reveal className="mb-10 flex flex-wrap items-baseline gap-x-6 gap-y-2 md:mb-14">
          <span className="st-display text-[clamp(32px,5vw,64px)] leading-none text-[var(--st-gold)]">
            {OBJETIVOS.numero}
          </span>
          <h2 className="st-display text-[clamp(22px,3.6vw,40px)] text-[var(--st-chalk)]">
            {OBJETIVOS.titulo}
          </h2>
        </Reveal>

        {/* Objetivo general como declaración de ancho completo. */}
        <Reveal delay={0.08} y={40}>
          <div className="border-y border-[var(--st-line)] py-10 md:py-14">
            <span className="st-eyebrow mb-5 block text-[12px] text-[var(--st-gold)]">
              Objetivo general
            </span>
            <p className="max-w-[26ch] text-[clamp(20px,3.4vw,38px)] font-light leading-[1.2] text-[var(--st-chalk)]">
              {OBJETIVOS.general}
            </p>
          </div>
        </Reveal>

        {/* Objetivos específicos: tres columnas separadas por hairlines, sin cards. */}
        <div className="mt-12 grid gap-y-12 md:mt-16 md:grid-cols-3 md:gap-x-0">
          {OBJETIVOS.especificos.map((grupo, i) => (
            <Reveal
              key={grupo.categoria}
              delay={i * 0.1}
              className={`md:px-9 ${i > 0 ? "md:border-l md:border-[var(--st-line)]" : "md:pl-0"}`}
            >
              <div className="mb-6 flex items-baseline gap-3">
                <span className="st-display text-[22px] text-[var(--st-gold)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="st-eyebrow text-[14px] text-[var(--st-chalk)]">
                  {grupo.categoria}
                </h3>
              </div>
              <ul className="grid gap-3.5">
                {grupo.items.slice(0, 4).map((item, j) => (
                  <li
                    key={j}
                    className="grid grid-cols-[auto_1fr] gap-3 text-[14px] leading-[1.55] text-[var(--st-bone)]"
                  >
                    <span className="mt-[9px] h-px w-3 bg-[var(--st-ash)]" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
              {grupo.items.length > 4 && (
                <VerEnDocumento count={grupo.items.length - 4} sectionId="objetivos" />
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
