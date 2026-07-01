import Link from "next/link";
import { Reveal } from "@/components/site/Reveal";
import { CONCLUSION, meta } from "@/content/serpientes-plan";

export function Cierre() {
  return (
    <section className="border-t border-[var(--st-line)] px-6 py-24 md:px-10 md:py-44">
      <div className="mx-auto max-w-[1280px]">
        <Reveal className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
          <span className="st-display text-[clamp(32px,5vw,64px)] leading-none text-[var(--st-gold)]">
            {CONCLUSION.numero}
          </span>
          <h2 className="st-display text-[clamp(22px,3.6vw,40px)] text-[var(--st-chalk)]">
            {CONCLUSION.titulo}
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-2 md:gap-16">
          <div className="grid content-start gap-5">
            {CONCLUSION.parrafos.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className="text-[16px] leading-[1.7] text-[var(--st-bone)] md:text-[18px]">
                  {p}
                </p>
              </Reveal>
            ))}
          </div>

          {/* Tres puntos clave, enumerados con fuerza. */}
          <div className="grid content-start gap-px overflow-hidden border-y border-[var(--st-line)]">
            {CONCLUSION.puntos.map((punto, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="flex items-baseline gap-5 py-5">
                  <span className="st-display text-[clamp(24px,3.2vw,36px)] leading-none text-[var(--st-gold)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="st-display text-[clamp(16px,2.2vw,22px)] leading-[1.1] text-[var(--st-chalk)]">
                    {punto}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Declaración de cierre, protagonista. */}
        <Reveal className="mt-20 border-t border-[var(--st-line)] pt-14 md:mt-28 md:pt-20" y={40}>
          <p className="st-display max-w-[22ch] text-[clamp(28px,5vw,60px)] leading-[1.02] text-[var(--st-chalk)]">
            {CONCLUSION.cierre}
          </p>
          <div className="mt-12 flex flex-wrap items-center gap-4">
            <Link
              href="/serpientes-tijuana/documento"
              className="st-eyebrow rounded-full bg-[var(--st-red)] px-5 py-2.5 text-[13px] text-[var(--st-chalk)] transition hover:brightness-110"
            >
              Documento completo
            </Link>
            <span className="h-px w-12 bg-[var(--st-gold)]" aria-hidden />
            <span className="st-eyebrow text-[12px] text-[var(--st-gold)]">
              {meta.subtitle}
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
