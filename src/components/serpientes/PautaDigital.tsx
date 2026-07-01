import { Reveal } from "@/components/site/Reveal";
import { PAUTA_DIGITAL } from "@/content/serpientes-plan";

export function PautaDigital() {
  return (
    <section className="border-t border-[var(--st-line)] bg-[var(--st-surface-1)] px-6 py-24 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1280px]">
        <Reveal className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
          <span className="st-display text-[clamp(32px,5vw,64px)] leading-none text-[var(--st-gold)]">
            {PAUTA_DIGITAL.numero}
          </span>
          <h2 className="st-display max-w-[16ch] text-[clamp(22px,3.6vw,40px)] text-[var(--st-chalk)]">
            {PAUTA_DIGITAL.titulo}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="st-eyebrow mt-6 text-[13px] text-[var(--st-gold)]">
            {PAUTA_DIGITAL.intro}
          </p>
        </Reveal>

        {/* Embudo: cada objetivo escalona hacia la derecha y estrecha, de
            reconocimiento a conversión. */}
        <div className="mt-14 grid gap-4 md:mt-20">
          {PAUTA_DIGITAL.objetivos.map((obj, i) => (
            <Reveal
              key={obj.numero}
              delay={i * 0.1}
              y={32}
              className={
                i === 1
                  ? "md:ml-[9%] md:mr-[9%]"
                  : i === 2
                    ? "md:ml-[18%]"
                    : "md:mr-[18%]"
              }
            >
              <div className="grid gap-5 border border-[var(--st-line)] bg-[var(--st-void)] p-6 md:grid-cols-[auto_1fr] md:items-center md:gap-8 md:p-8">
                <div className="flex items-baseline gap-4 md:flex-col md:items-start md:gap-1">
                  <span className="st-display text-[clamp(26px,4vw,48px)] leading-none text-[var(--st-gold)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="st-display text-[clamp(18px,2.4vw,26px)] text-[var(--st-chalk)]">
                    {obj.titulo}
                  </h3>
                </div>
                <div>
                  <p className="text-[14px] leading-[1.55] text-[var(--st-bone)] md:text-[15px]">
                    {obj.descripcion}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {obj.contenido.map((c, j) => (
                      <li
                        key={j}
                        className="border border-[var(--st-line)] px-2.5 py-1 text-[12px] leading-none text-[var(--st-chalk)] [font-family:var(--font-plex-mono)]"
                      >
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Segmentación: banda de chips mono, tratamiento distinto al embudo. */}
        <Reveal className="mt-16 border-t border-[var(--st-line)] pt-10 md:mt-24">
          <span className="st-eyebrow mb-6 block text-[12px] text-[var(--st-gold)]">
            Segmentación
          </span>
          <ul className="flex flex-wrap gap-2.5">
            {PAUTA_DIGITAL.segmentacion.map((s, i) => (
              <li
                key={i}
                className="rounded-full border border-[var(--st-line)] bg-[var(--st-void)] px-4 py-2 text-[13px] text-[var(--st-bone)]"
              >
                {s}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
