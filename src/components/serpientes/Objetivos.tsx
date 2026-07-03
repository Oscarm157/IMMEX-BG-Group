import { Reveal } from "@/components/site/Reveal";
import { OBJETIVOS } from "@/content/serpientes-plan";
import { VerEnDocumento } from "@/components/serpientes/VerEnDocumento";

export function Objetivos() {
  return (
    <section className="st-band st-band-surface border-t border-[var(--st-line)] px-6 py-20 md:px-10 md:py-28">
      <span className="st-ghostnum -top-6 right-2 md:right-10" aria-hidden>
        {OBJETIVOS.numero}
      </span>
      <div className="mx-auto max-w-[1280px]">
        <Reveal className="mb-10 flex flex-wrap items-baseline gap-x-6 gap-y-2 md:mb-14">
          <span className="st-display text-[clamp(32px,5vw,64px)] leading-none text-[var(--st-gold)]">
            {OBJETIVOS.numero}
          </span>
          <h2 className="st-display text-[clamp(22px,3.6vw,40px)] text-[var(--st-chalk)]">
            {OBJETIVOS.titulo}
          </h2>
        </Reveal>

        {/* Objetivo general como declaración de ancho completo. */}
        <Reveal delay={0.08} y={40}>
          <div className="border-y border-[var(--st-line)] py-10 md:py-14">
            <span className="st-eyebrow mb-5 block text-[12px] text-[var(--st-gold)]">
              Objetivo general
            </span>
            <p className="max-w-[26ch] text-[clamp(20px,3.4vw,38px)] font-light leading-[1.2] text-[var(--st-chalk)]">
              {OBJETIVOS.general}
            </p>
          </div>
        </Reveal>

        {/* Objetivos específicos como índice: filas de ancho completo, categoría a
            la izquierda, ítems fluyendo a la derecha. No columnas gemelas. */}
        <div className="mt-4 md:mt-8">
          {OBJETIVOS.especificos.map((grupo, i) => (
            <Reveal
              key={grupo.categoria}
              delay={i * 0.08}
              className="grid gap-x-10 gap-y-6 border-b border-[var(--st-line)] py-10 md:grid-cols-[minmax(0,0.85fr)_minmax(0,2fr)] md:py-14"
            >
              <div className="flex items-baseline gap-4 md:flex-col md:items-start md:gap-4">
                <span className="st-display text-[clamp(40px,6vw,88px)] leading-[0.85] text-[var(--st-gold)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="st-display text-[clamp(20px,2.6vw,30px)] leading-[1.05] text-[var(--st-chalk)]">
                  {grupo.categoria}
                </h3>
              </div>
              <div>
                <ul className="grid gap-x-10 gap-y-3.5 sm:grid-cols-2">
                  {grupo.items.slice(0, 4).map((item, j) => (
                    <li
                      key={j}
                      className="grid grid-cols-[auto_1fr] gap-3 text-[14px] leading-[1.55] text-[var(--st-bone)] md:text-[15px]"
                    >
                      <span className="mt-[9px] h-px w-3 bg-[var(--st-ash)]" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
                {grupo.items.length > 4 && (
                  <VerEnDocumento
                    count={grupo.items.length - 4}
                    sectionId="objetivos"
                  />
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
