import { Reveal } from "@/components/site/Reveal";
import { ALIANZAS } from "@/content/serpientes-plan";
import { VerEnDocumento } from "@/components/serpientes/VerEnDocumento";

export function Alianzas() {
  return (
    <section className="st-band st-band-surface border-t border-[var(--st-line)] px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] md:gap-16">
          <div className="md:sticky md:top-28 md:self-start">
            <Reveal className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
              <span className="st-display text-[clamp(32px,5vw,64px)] leading-none text-[var(--st-gold)]">
                {ALIANZAS.numero}
              </span>
              <h2 className="st-display text-[clamp(22px,3.6vw,38px)] leading-[0.95] text-[var(--st-chalk)]">
                {ALIANZAS.titulo}
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-6 max-w-[38ch] text-[15px] leading-[1.65] text-[var(--st-bone)] md:text-[16px]">
                {ALIANZAS.intro}
              </p>
            </Reveal>
          </div>

          <div>
            {/* Aliados como muro tipográfico, separados por diamante dorado. */}
            <span className="st-eyebrow mb-6 block text-[12px] text-[var(--st-gold)]">
              Aliados
            </span>
            <Reveal>
              <p className="flex flex-wrap items-center gap-x-4 gap-y-3">
                {ALIANZAS.aliados.slice(0, 6).map((a, i, arr) => (
                  <span key={i} className="inline-flex items-center gap-4">
                    <span className="st-display text-[clamp(16px,2.2vw,24px)] leading-none text-[var(--st-chalk)]">
                      {a}
                    </span>
                    {i < arr.length - 1 && (
                      <span
                        className="h-1.5 w-1.5 rotate-45 bg-[var(--st-gold)]"
                        aria-hidden
                      />
                    )}
                  </span>
                ))}
              </p>
            </Reveal>

            {/* Ideas de colaboración como lista con hairlines. */}
            <span className="st-eyebrow mb-2 mt-14 block text-[12px] text-[var(--st-gold)]">
              Ideas de colaboración
            </span>
            <ul className="border-t border-[var(--st-line)]">
              {ALIANZAS.ideas.slice(0, 4).map((idea, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <li className="flex items-baseline gap-4 border-b border-[var(--st-line)] py-3.5 text-[15px] leading-[1.4] text-[var(--st-bone)]">
                    <span
                      className="text-[11px] text-[var(--st-ash)] [font-family:var(--font-plex-mono)]"
                      aria-hidden
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {idea}
                  </li>
                </Reveal>
              ))}
            </ul>
            <VerEnDocumento
              count={ALIANZAS.aliados.length - 6 + (ALIANZAS.ideas.length - 4)}
              sectionId="alianzas"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
