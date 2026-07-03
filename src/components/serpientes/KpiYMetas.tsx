import { Reveal } from "@/components/site/Reveal";
import { INDICADORES } from "@/content/serpientes-plan";
import { VerEnDocumento } from "@/components/serpientes/VerEnDocumento";

export function KpiYMetas() {
  return (
    <section className="st-band st-band-void border-t border-[var(--st-line)] px-6 py-20 md:px-10 md:py-28">
      <span className="st-ghostnum -top-6 right-2 md:right-10" aria-hidden>
        {INDICADORES.numero}
      </span>
      <div className="mx-auto max-w-[1280px]">
        {/* Sub-sección A: indicadores como tablero de métricas. */}
        <Reveal className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
          <span className="st-display text-[clamp(32px,5vw,64px)] leading-none text-[var(--st-gold)]">
            {INDICADORES.numero}
          </span>
          <h2 className="st-display text-[clamp(22px,3.6vw,40px)] text-[var(--st-chalk)]">
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
                  {grupo.items.slice(0, 5).map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
                {grupo.items.length > 5 && (
                  <VerEnDocumento
                    count={grupo.items.length - 5}
                    sectionId="indicadores"
                  />
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
