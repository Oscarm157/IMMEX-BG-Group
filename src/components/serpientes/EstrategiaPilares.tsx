import { Reveal } from "@/components/site/Reveal";
import { ESTRATEGIA } from "@/content/serpientes-plan";

export function EstrategiaPilares() {
  const [primero, ...secundarios] = ESTRATEGIA.pilares;

  return (
    <section className="border-t border-[var(--st-line)] px-6 py-24 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1280px]">
        <Reveal className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
          <span className="st-display text-[clamp(40px,7vw,88px)] leading-none text-[var(--st-gold)]">
            {ESTRATEGIA.numero}
          </span>
          <h2 className="st-display text-[clamp(28px,5vw,56px)] text-[var(--st-chalk)]">
            {ESTRATEGIA.titulo}
          </h2>
        </Reveal>

        <Reveal delay={0.1} y={40}>
          <p className="st-display mt-8 max-w-[18ch] text-[clamp(30px,6vw,74px)] leading-[0.98] text-[var(--st-chalk)] md:mt-10">
            {ESTRATEGIA.subtitulo}
          </p>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="st-eyebrow mt-6 text-[13px] text-[var(--st-gold)]">
            {ESTRATEGIA.intro}
          </p>
        </Reveal>

        {/* Bloques asimétricos: el pilar 1 domina, los otros dos apilan a la derecha. */}
        <div className="mt-14 grid gap-10 md:mt-20 md:grid-cols-[1.35fr_1fr] md:gap-12">
          <Reveal y={40}>
            <article className="flex h-full flex-col border-t-2 border-[var(--st-gold)] pt-8">
              <div className="flex items-baseline gap-4">
                <span className="st-display text-[clamp(52px,9vw,120px)] leading-none text-[var(--st-gold)]">
                  {primero.numero}
                </span>
                <h3 className="st-display text-[clamp(26px,4vw,44px)] text-[var(--st-chalk)]">
                  {primero.titulo}
                </h3>
              </div>
              <p className="mt-6 max-w-[42ch] text-[16px] leading-[1.65] text-[var(--st-bone)] md:text-[18px]">
                {primero.descripcion}
              </p>
              {primero.conceptos && (
                <ul className="mt-8 flex flex-wrap gap-2.5 md:mt-auto md:pt-8">
                  {primero.conceptos.map((c, i) => (
                    <li
                      key={i}
                      className="border border-[var(--st-line)] bg-[var(--st-surface-1)] px-3.5 py-2 text-[13px] leading-none text-[var(--st-chalk)]"
                    >
                      {c}
                    </li>
                  ))}
                </ul>
              )}
            </article>
          </Reveal>

          <div className="grid gap-6">
            {secundarios.map((pilar, i) => (
              <Reveal key={pilar.numero} delay={0.1 + i * 0.1} y={32}>
                <article className="border-t border-[var(--st-line)] pt-6">
                  <div className="flex items-baseline gap-3">
                    <span className="st-display text-[clamp(28px,5vw,48px)] leading-none text-[var(--st-gold)]">
                      {pilar.numero}
                    </span>
                    <h3 className="st-display text-[clamp(20px,3vw,30px)] text-[var(--st-chalk)]">
                      {pilar.titulo}
                    </h3>
                  </div>
                  <p className="mt-4 text-[15px] leading-[1.62] text-[var(--st-bone)] md:text-[16px]">
                    {pilar.descripcion}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
