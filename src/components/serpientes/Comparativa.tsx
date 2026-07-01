import { Reveal } from "@/components/site/Reveal";
import { COMPARATIVA } from "@/content/serpientes-plan";

export function Comparativa() {
  return (
    <section className="border-t border-[var(--st-line)] bg-[var(--st-surface-1)] px-6 py-24 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1280px]">
        <Reveal className="mb-12 flex flex-wrap items-baseline gap-x-6 gap-y-2 md:mb-16">
          <span className="st-display text-[clamp(32px,5vw,64px)] leading-none text-[var(--st-gold)]">
            {COMPARATIVA.numero}
          </span>
          <h2 className="st-display text-[clamp(22px,3.6vw,40px)] text-[var(--st-chalk)]">
            {COMPARATIVA.titulo}
          </h2>
        </Reveal>

        {/* Desktop: 3 columnas. Mobile: scroll-snap horizontal para leer la
            comparativa completa de un vistazo, sin apilar. */}
        <div className="st-hscroll -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 md:mx-0 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0 md:pb-0">
          {COMPARATIVA.equipos.map((equipo, i) => {
            const destacado = "destacado" in equipo && equipo.destacado;
            return (
              <Reveal
                key={equipo.nombre}
                delay={i * 0.1}
                className="w-[82vw] shrink-0 snap-start sm:w-[62vw] md:w-auto"
              >
                <article
                  className={`flex h-full flex-col border p-6 md:p-7 ${
                    destacado
                      ? "border-[var(--st-gold)] bg-[var(--st-void)]"
                      : "border-[var(--st-line)] bg-[var(--st-void)]/40"
                  }`}
                >
                  <header className="mb-5 flex items-start justify-between gap-3 border-b border-[var(--st-line)] pb-5">
                    <h3
                      className={`st-display text-[22px] leading-[1.05] md:text-[26px] ${
                        destacado ? "text-[var(--st-gold)]" : "text-[var(--st-chalk)]"
                      }`}
                    >
                      {equipo.nombre}
                    </h3>
                    <span
                      className="st-eyebrow shrink-0 pt-1 text-[11px] text-[var(--st-ash)]"
                      aria-hidden
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </header>

                  <p className="text-[14px] leading-[1.62] text-[var(--st-bone)] md:text-[15px]">
                    {equipo.resumen}
                  </p>

                  <ul className="mt-6 grid gap-2.5 border-t border-[var(--st-line)] pt-6">
                    {equipo.fortalezas.map((f, j) => (
                      <li
                        key={j}
                        className="grid grid-cols-[auto_1fr] gap-3 text-[13px] leading-[1.5] text-[var(--st-chalk)]"
                      >
                        <span
                          className={`mt-[7px] h-1 w-1 ${
                            destacado ? "bg-[var(--st-gold)]" : "bg-[var(--st-ash)]"
                          }`}
                          aria-hidden
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
