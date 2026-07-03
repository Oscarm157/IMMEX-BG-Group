import Image from "next/image";
import { Reveal } from "@/components/site/Reveal";
import { meta, clubTagline } from "@/content/serpientes-plan";

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col justify-between overflow-hidden px-6 pb-14 pt-24 md:px-10 md:pb-20 md:pt-28">
      {/* Foto de fondo full-bleed: el duelo 1v1 (techo oscuro con humo arriba,
          deja espacio negativo para el wordmark). */}
      <Image
        src="/serpientes/hero-duelo.jpg"
        alt="Serpientes Tijuana en juego"
        fill
        priority
        sizes="100vw"
        className="z-0 object-cover object-[60%_center] saturate-[0.92] contrast-[1.06]"
      />
      {/* Overlay cinematográfico: denso a la izquierda (legibilidad del wordmark)
          y en la base (franja analítica). */}
      <div
        className="absolute inset-0 z-0 bg-[linear-gradient(100deg,rgba(10,10,11,0.95)_0%,rgba(10,10,11,0.82)_40%,rgba(10,10,11,0.45)_72%,rgba(10,10,11,0.7)_100%)]"
        aria-hidden
      />
      <div
        className="absolute inset-x-0 bottom-0 z-0 h-2/5 bg-[linear-gradient(180deg,transparent,rgba(10,10,11,0.94))]"
        aria-hidden
      />

      {/* Franja de identidad de marca. */}
      <div className="relative z-10">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="h-2.5 w-2.5 bg-[var(--st-gold)]" aria-hidden />
            <span className="st-eyebrow text-[13px] text-[var(--st-bone)]">
              {meta.subtitle}
            </span>
          </div>
        </Reveal>
      </div>

      {/* Wordmark + tagline, con la segunda foto como inset de portada. */}
      <div className="relative z-10 grid items-center gap-10 md:grid-cols-[1.55fr_1fr]">
        <div>
          <Reveal delay={0.05}>
            <p className="st-eyebrow ml-1 text-[clamp(14px,3.5vw,26px)] tracking-[0.5em] text-[var(--st-chalk)]">
              Tijuana
            </p>
          </Reveal>
          <Reveal delay={0.12} y={40}>
            <h1 className="st-display st-wordmark text-[clamp(56px,13vw,200px)] leading-[0.82]">
              Serpientes
            </h1>
          </Reveal>
          <Reveal delay={0.22}>
            <p className="mt-6 inline-flex border-l-2 border-[var(--st-gold)] pl-4 font-[var(--font-label)] text-[clamp(13px,2.4vw,18px)] font-semibold uppercase tracking-[0.16em] text-[var(--st-chalk)]">
              {clubTagline}
            </p>
          </Reveal>
        </div>

        {/* Inset: segunda foto real, marco fino dorado, profundidad de portada. */}
        <Reveal
          delay={0.32}
          y={40}
          className="justify-self-start md:justify-self-end"
        >
          <div className="relative aspect-[3/4] w-[clamp(150px,42vw,320px)] border border-[var(--st-gold)]/40 shadow-[0_24px_70px_rgba(0,0,0,0.6)]">
            <Image
              src="/serpientes/hero-accion.jpg"
              alt="Serpientes Tijuana, tiro en el debut"
              fill
              sizes="(max-width: 768px) 42vw, 320px"
              className="object-cover object-[center_20%] saturate-[0.92] contrast-[1.06]"
            />
          </div>
        </Reveal>
      </div>

      {/* Encabezado analítico: qué es este documento. */}
      <div className="relative z-10 border-t border-[var(--st-line)] pt-8">
        <div className="grid gap-6 md:grid-cols-[auto_1fr] md:items-end md:gap-14">
          <Reveal delay={0.1}>
            <h2 className="st-display max-w-[16ch] text-[clamp(20px,3.4vw,34px)] text-[var(--st-chalk)]">
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
