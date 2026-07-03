import { Reveal } from "@/components/site/Reveal";
import { CONTEXTO } from "@/content/serpientes-plan";

export function Contexto() {
  const [lead, ...rest] = CONTEXTO.parrafos;

  return (
    <section className="st-band st-band-void border-t border-[var(--st-line)] px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto grid max-w-[1280px] gap-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)] md:gap-20">
        {/* Riel de sección: número gigante + eyebrow. */}
        <div className="md:sticky md:top-28 md:self-start">
          <Reveal>
            <span className="st-display block text-[clamp(48px,8vw,100px)] leading-none text-[var(--st-gold)]">
              {CONTEXTO.numero}
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <span className="st-eyebrow mt-4 block text-[13px] tracking-[0.2em] text-[var(--st-bone)]">
              {CONTEXTO.titulo}
            </span>
          </Reveal>
        </div>

        {/* Columna de lectura: primer párrafo como entrada, resto de apoyo. */}
        <div>
          <Reveal delay={0.06}>
            <p className="text-[clamp(22px,3.2vw,34px)] font-light leading-[1.28] text-[var(--st-chalk)]">
              {lead}
            </p>
          </Reveal>
          <div className="mt-10 grid gap-6 border-l border-[var(--st-line)] pl-6 md:mt-12 md:max-w-[54ch]">
            {rest.map((p, i) => (
              <Reveal key={i} delay={0.12 + i * 0.08}>
                <p className="text-[16px] leading-[1.7] text-[var(--st-bone)] md:text-[17px]">
                  {p}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
