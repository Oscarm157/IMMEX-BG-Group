import { Reveal } from "@/components/site/Reveal";
import { meta, clubTagline } from "@/content/serpientes-plan";

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden px-6 pb-14 pt-24 md:px-10 md:pb-20 md:pt-28">
      {/* Geometría de cancha, decorativa, sin fotografía. */}
      <svg
        aria-hidden
        viewBox="0 0 600 600"
        className="pointer-events-none absolute -right-24 top-1/2 h-[720px] w-[720px] -translate-y-1/2 opacity-[0.06] md:-right-16"
      >
        <circle cx="300" cy="300" r="298" fill="none" stroke="var(--st-gold)" strokeWidth="1.5" />
        <circle cx="300" cy="300" r="150" fill="none" stroke="var(--st-gold)" strokeWidth="1.5" />
        <line x1="300" y1="2" x2="300" y2="598" stroke="var(--st-gold)" strokeWidth="1.5" />
      </svg>

      {/* Franja de identidad de marca, separada del bloque analítico. */}
      <div className="relative">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="h-2.5 w-2.5 bg-[var(--st-gold)]" aria-hidden />
            <span className="st-eyebrow text-[13px] text-[var(--st-bone)]">
              {meta.subtitle}
            </span>
          </div>
        </Reveal>
      </div>

      <div className="relative">
        <Reveal delay={0.05}>
          <p className="st-eyebrow ml-1 text-[clamp(14px,3.5vw,26px)] tracking-[0.5em] text-[var(--st-chalk)]">
            Tijuana
          </p>
        </Reveal>
        <Reveal delay={0.12} y={40}>
          <h1 className="st-display st-wordmark text-[clamp(72px,20vw,320px)] leading-[0.82]">
            Serpientes
          </h1>
        </Reveal>

        {/* Tagline oficial del club: chip de marca, aislado del copy analítico. */}
        <Reveal delay={0.22}>
          <p className="mt-6 inline-flex border-l-2 border-[var(--st-gold)] pl-4 font-[var(--font-label)] text-[clamp(13px,2.4vw,18px)] font-semibold uppercase tracking-[0.16em] text-[var(--st-chalk)]">
            {clubTagline}
          </p>
        </Reveal>
      </div>

      {/* Encabezado analítico: qué es este documento. */}
      <div className="relative border-t border-[var(--st-line)] pt-8">
        <div className="grid gap-6 md:grid-cols-[auto_1fr] md:items-end md:gap-14">
          <Reveal delay={0.1}>
            <h2 className="st-display max-w-[16ch] text-[clamp(26px,5vw,46px)] text-[var(--st-chalk)]">
              {meta.title}
            </h2>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="flex items-center gap-3 text-[var(--st-ash)] md:justify-end">
              <span className="st-eyebrow text-[12px]">Desliza</span>
              <span className="h-px w-12 bg-[var(--st-line)]" aria-hidden />
              <span className="st-eyebrow text-[12px]">15 secciones</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
