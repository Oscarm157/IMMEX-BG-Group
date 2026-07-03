import { Reveal } from "@/components/site/Reveal";
import { CONTEXTO } from "@/content/serpientes-plan";
import { Highlight } from "@/components/serpientes/Highlight";

export function Contexto() {
  const [lead, ...rest] = CONTEXTO.parrafos;

  return (
    <section className="st-band st-band-void border-t border-[var(--st-line)] px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1280px]">
        {/* Header: número + título en línea (escala unificada del deck). */}
        <Reveal className="mb-10 flex items-baseline gap-x-5 md:mb-14">
          <span className="st-display st-num text-[var(--st-gold)]">
            {CONTEXTO.numero}
          </span>
          <h2 className="st-display st-h2 text-[var(--st-chalk)]">
            {CONTEXTO.titulo}
          </h2>
        </Reveal>

        {/* Lead editorial: capitular + frase clave en dorado, tamaño de lectura
            (no un bloque inflado). */}
        <Reveal delay={0.06} y={40}>
          <p className="st-dropcap max-w-[52ch] text-[clamp(17px,1.9vw,22px)] leading-[1.55] text-[var(--st-chalk)]">
            <Highlight
              text={lead}
              phrase="temporada 2025 altamente positiva"
            />
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
