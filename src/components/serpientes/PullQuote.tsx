import { Reveal } from "@/components/site/Reveal";
import { DIAGNOSTICO } from "@/content/serpientes-plan";

export function PullQuote() {
  return (
    <section
      className="st-band st-band-image border-t border-[var(--st-line)] px-6 py-28 md:px-10 md:py-48"
      style={
        {
          "--st-bg-img": "url(/serpientes/duela-noche.jpg)",
          "--st-bg-opacity": "0.5",
        } as React.CSSProperties
      }
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="grid gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] md:gap-16">
          {/* Análisis de apoyo, en columna angosta. */}
          <div>
            <div className="mb-8 flex items-baseline gap-4">
              <span className="st-display text-[clamp(28px,4.5vw,54px)] leading-none text-[var(--st-gold)]">
                {DIAGNOSTICO.numero}
              </span>
              <span className="st-eyebrow text-[13px] tracking-[0.2em] text-[var(--st-bone)]">
                {DIAGNOSTICO.titulo}
              </span>
            </div>
            <div className="grid gap-5 md:max-w-[46ch]">
              {DIAGNOSTICO.parrafos.map((p, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <p className="text-[15px] leading-[1.7] text-[var(--st-bone)] md:text-[16px]">
                    {p}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Posicionamiento como declaración protagonista. */}
          <Reveal delay={0.15} y={40}>
            <figure className="relative md:pt-4">
              <span
                className="st-display absolute -left-2 -top-8 text-[120px] leading-none text-[var(--st-gold)]/25 md:-top-14 md:text-[200px]"
                aria-hidden
              >
                &ldquo;
              </span>
              <blockquote className="st-display relative text-[clamp(26px,4.6vw,50px)] leading-[1.05] text-[var(--st-chalk)]">
                {DIAGNOSTICO.posicionamiento}
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-3">
                <span className="h-px w-10 bg-[var(--st-gold)]" aria-hidden />
                <span className="st-eyebrow text-[12px] text-[var(--st-gold)]">
                  Posicionamiento
                </span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
