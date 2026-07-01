import { Reveal } from "@/components/site/Reveal";
import { INDICADORES, METAS } from "@/content/serpientes-plan";

export function KpiYMetas() {
  return (
    <section className="border-t border-[var(--st-line)] bg-[var(--st-surface-1)] px-6 py-24 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1280px]">
        {/* Sub-sección A: indicadores como tablero de métricas. */}
        <Reveal className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
          <span className="st-display text-[clamp(40px,7vw,88px)] leading-none text-[var(--st-gold)]">
            {INDICADORES.numero}
          </span>
          <h2 className="st-display text-[clamp(28px,5vw,56px)] text-[var(--st-chalk)]">
            {INDICADORES.titulo}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-6 max-w-[52ch] text-[15px] leading-[1.6] text-[var(--st-bone)] md:text-[16px]">
            {INDICADORES.intro}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-px overflow-hidden border border-[var(--st-line)] md:mt-16 md:grid-cols-3">
          {INDICADORES.grupos.map((grupo, i) => (
            <Reveal key={grupo.categoria} delay={i * 0.08}>
              <div className="flex h-full flex-col bg-[var(--st-void)] p-6 md:p-8">
                <div className="flex items-baseline justify-between border-b border-[var(--st-line)] pb-4">
                  <h3 className="st-eyebrow text-[13px] text-[var(--st-chalk)]">
                    {grupo.categoria}
                  </h3>
                  <span className="st-display text-[22px] leading-none text-[var(--st-gold)]">
                    {String(grupo.items.length).padStart(2, "0")}
                  </span>
                </div>
                <ul className="mt-5 grid gap-2 text-[13px] leading-[1.45] text-[var(--st-bone)]">
                  {grupo.items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Sub-sección B: metas como línea de tiempo de tres horizontes. */}
        <Reveal className="mt-24 flex flex-wrap items-baseline gap-x-6 gap-y-2 md:mt-32">
          <span className="st-display text-[clamp(34px,6vw,72px)] leading-none text-[var(--st-gold)]">
            {METAS.numero}
          </span>
          <h2 className="st-display text-[clamp(26px,4.5vw,48px)] text-[var(--st-chalk)]">
            {METAS.titulo}
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-8 md:mt-16 md:grid-cols-3 md:gap-0">
          {METAS.horizontes.map((h, i) => (
            <Reveal key={h.nombre} delay={i * 0.1} y={36} className="md:px-8 md:first:pl-0 md:last:pr-0">
              <div className="border-t-2 border-[var(--st-gold)] pt-6">
                <div className="mb-5 flex items-baseline gap-3">
                  <span className="st-display text-[clamp(28px,4vw,44px)] leading-none text-[var(--st-gold)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="st-display text-[clamp(18px,2.4vw,26px)] leading-[1.05] text-[var(--st-chalk)]">
                    {h.nombre}
                  </h3>
                </div>
                <ul className="grid gap-3">
                  {h.items.map((item, j) => (
                    <li
                      key={j}
                      className="grid grid-cols-[auto_1fr] gap-3 text-[14px] leading-[1.5] text-[var(--st-bone)]"
                    >
                      <span className="mt-[8px] h-1 w-1 bg-[var(--st-red)]" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
