import { Reveal } from "@/components/site/Reveal";
import { DIAGNOSTICO } from "@/content/serpientes-plan";

export function PullQuote() {
  return (
    <section
      className="st-band st-band-image border-t border-[var(--st-line)] px-6 py-24 md:px-10 md:py-36"
      style={
        {
          "--st-bg-img": "url(/serpientes/duela-noche.jpg)",
          "--st-bg-opacity": "0.5",
        } as React.CSSProperties
      }
    >
      <div className="mx-auto max-w-[1280px]">
        {/* Header compacto. */}
        <Reveal className="mb-10 flex items-baseline gap-4 md:mb-14">
          <span className="st-display text-[clamp(28px,4.5vw,54px)] leading-none text-[var(--st-gold)]">
            {DIAGNOSTICO.numero}
          </span>
          <span className="st-eyebrow text-[13px] tracking-[0.2em] text-[var(--st-bone)]">
            {DIAGNOSTICO.titulo}
          </span>
        </Reveal>

        {/* Posicionamiento como statement protagonista, ancho y asimétrico. */}
        <Reveal delay={0.08} y={40}>
          <figure className="relative md:pr-[16%]">
            <span
              className="st-display absolute -left-1 -top-9 text-[100px] leading-none text-[var(--st-gold)]/20 md:-top-16 md:text-[180px]"
              aria-hidden
            >
              &ldquo;
            </span>
            <blockquote className="st-display relative text-[clamp(30px,6vw,74px)] leading-[1.02] text-[var(--st-chalk)]">
              {DIAGNOSTICO.posicionamiento}
            </blockquote>
          </figure>
        </Reveal>

        {/* Hallazgos: tira horizontal de 3 columnas numeradas (breakdown). */}
        <div className="mt-16 grid gap-8 border-t-2 border-[var(--st-gold)] pt-10 md:mt-24 md:grid-cols-3 md:gap-10 md:pt-12">
          {DIAGNOSTICO.parrafos.map((p, i) => (
            <Reveal key={i} delay={0.1 + i * 0.1}>
              <div className="grid gap-3">
                <span className="st-display text-[clamp(24px,3vw,34px)] leading-none text-[var(--st-gold)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-[14px] leading-[1.6] text-[var(--st-bone)] md:text-[15px]">
                  {p}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
