import { Reveal } from "@/components/site/Reveal";
import { CONTEXTO } from "@/content/serpientes-plan";

export function Contexto() {
  const [lead, ...rest] = CONTEXTO.parrafos;

  return (
    <section className="st-band st-band-void border-t border-[var(--st-line)] px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1280px]">
        {/* Header: número gigante + título en línea. */}
        <Reveal className="mb-10 flex items-baseline gap-x-5 md:mb-14">
          <span className="st-display text-[clamp(48px,8vw,104px)] leading-[0.8] text-[var(--st-gold)]">
            {CONTEXTO.numero}
          </span>
          <span className="st-eyebrow text-[13px] tracking-[0.2em] text-[var(--st-bone)]">
            {CONTEXTO.titulo}
          </span>
        </Reveal>

        {/* Lead como declaración dominante, medida cómoda (no columna delgada). */}
        <Reveal delay={0.06} y={40}>
          <p className="max-w-[34ch] text-[clamp(26px,3.8vw,46px)] font-medium leading-[1.16] tracking-[-0.015em] text-[var(--st-chalk)]">
            {lead}
          </p>
        </Reveal>

        {/* Apoyo en panel de superficie relleno, dos columnas, regla dorada.
            Da estructura y llena, en vez de texto flotando. */}
        <div className="mt-12 grid gap-x-14 gap-y-6 border-t-2 border-[var(--st-gold)] bg-[var(--st-surface-1)] p-7 md:mt-16 md:grid-cols-2 md:p-10">
          {rest.map((p, i) => (
            <Reveal key={i} delay={0.12 + i * 0.08}>
              <p className="text-[15px] leading-[1.68] text-[var(--st-bone)] md:text-[16px]">
                {p}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
