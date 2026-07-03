import { Reveal } from "@/components/site/Reveal";
import { PLAN_CONTENIDO } from "@/content/serpientes-plan";
import { VerEnDocumento } from "@/components/serpientes/VerEnDocumento";

export function ContenidoCalendario() {
  const pretemporada = PLAN_CONTENIDO.fases[0];
  const playoffs = PLAN_CONTENIDO.fases[1];
  const { calendarioSemanal } = PLAN_CONTENIDO;

  return (
    <section className="st-band st-band-surface border-t border-[var(--st-line)] px-6 py-20 md:px-10 md:py-28">
      <span className="st-ghostnum -top-6 right-2 md:right-10" aria-hidden>
        {PLAN_CONTENIDO.numero}
      </span>
      <div className="mx-auto max-w-[1280px]">
        <Reveal className="mb-14 flex flex-wrap items-baseline gap-x-6 gap-y-2 md:mb-20">
          <span className="st-display st-num text-[var(--st-gold)]">
            {PLAN_CONTENIDO.numero}
          </span>
          <h2 className="st-display max-w-[14ch] st-h2 text-[var(--st-chalk)]">
            {PLAN_CONTENIDO.titulo}
          </h2>
        </Reveal>

        {/* Sub-vista A: Pretemporada como split editorial, listado + frases-guía. */}
        <div className="grid gap-10 md:grid-cols-[1fr_1fr] md:gap-16">
          <Reveal>
            <div className="flex items-baseline gap-3">
              <span className="st-eyebrow text-[12px] text-[var(--st-gold)]">Fase</span>
              <h3 className="st-display st-h3 text-[var(--st-chalk)]">
                {pretemporada.nombre}
              </h3>
            </div>
            <p className="mt-3 text-[15px] text-[var(--st-bone)]">{pretemporada.objetivo}</p>
            <ul className="mt-7 grid grid-cols-2 gap-x-6 gap-y-2.5">
              {pretemporada.contenido.slice(0, 6).map((c, i) => (
                <li
                  key={i}
                  className="grid grid-cols-[auto_1fr] gap-2.5 text-[13.5px] leading-[1.45] text-[var(--st-chalk)]"
                >
                  <span
                    className="text-[11px] text-[var(--st-ash)] [font-family:var(--font-plex-mono)]"
                    aria-hidden
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {c}
                </li>
              ))}
            </ul>
            {pretemporada.contenido.length > 6 && (
              <VerEnDocumento
                count={pretemporada.contenido.length - 6}
                sectionId="plan-contenido"
              />
            )}
          </Reveal>

          <div className="grid content-start gap-4 border-l border-[var(--st-line)] pl-6 md:pl-10">
            {pretemporada.ideasPost?.map((idea, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <p className="st-display text-[clamp(18px,2.6vw,26px)] leading-[1.1] text-[var(--st-bone)]">
                  {idea}
                </p>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Sub-vista B: frecuencia real (no diaria) + menú de formatos que rota. */}
        <div className="mt-24 border-t border-[var(--st-line)] pt-10 md:mt-32">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <h3 className="st-display st-h3 text-[var(--st-chalk)]">
              Ritmo de publicación
            </h3>
            <span className="max-w-[30ch] text-right text-[13px] leading-[1.4] text-[var(--st-bone)]">
              {calendarioSemanal.objetivo}
            </span>
          </Reveal>
          <Reveal
            delay={0.06}
            className="mt-8 grid grid-cols-1 gap-px overflow-hidden border border-[var(--st-line)] sm:grid-cols-3"
          >
            {[
              { valor: calendarioSemanal.frecuencia.mensual, etiqueta: "Publicaciones" },
              { valor: calendarioSemanal.frecuencia.semanal, etiqueta: "Ritmo semanal" },
              { valor: calendarioSemanal.frecuencia.diaJuego, etiqueta: "Día de juego" },
            ].map((f) => (
              <div key={f.etiqueta} className="bg-[var(--st-void)] p-6 md:p-7">
                <span className="st-display text-[clamp(22px,3vw,32px)] leading-none text-[var(--st-gold)]">
                  {f.valor}
                </span>
                <span className="st-eyebrow mt-3 block text-[11px] text-[var(--st-ash)]">
                  {f.etiqueta}
                </span>
              </div>
            ))}
          </Reveal>
        </div>
        <Reveal className="mt-10 mb-8">
          <span className="st-eyebrow text-[12px] text-[var(--st-bone)]">
            Formatos que rotan
          </span>
        </Reveal>
        <div className="st-hscroll -mx-6 flex snap-x snap-mandatory gap-px overflow-x-auto px-6 md:mx-0 md:grid md:grid-cols-7 md:overflow-visible md:px-0">
          {calendarioSemanal.dias.map((d, i) => (
            <Reveal
              key={d.dia}
              delay={i * 0.05}
              className="w-[62vw] shrink-0 snap-start sm:w-[40vw] md:w-auto"
            >
              <div className="flex h-full flex-col bg-[var(--st-void)] p-4 md:min-h-[220px]">
                <span className="st-display text-[15px] uppercase leading-[1.05] text-[var(--st-gold)]">
                  {d.dia}
                </span>
                <span className="mt-3 h-px w-6 bg-[var(--st-line)]" aria-hidden />
                <p className="mt-3 text-[12.5px] leading-[1.5] text-[var(--st-bone)]">
                  {d.contenido}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Sub-vista C: Playoffs como banner de intensidad, tono rojo. */}
        <Reveal className="mt-20 md:mt-28" y={40}>
          <div className="relative overflow-hidden border border-[var(--st-red)]/50 bg-[var(--st-void)] px-7 py-12 md:px-12 md:py-16">
            <span
              className="st-display pointer-events-none absolute -right-6 -top-10 select-none text-[110px] leading-none text-[var(--st-red)]/10 md:text-[190px]"
              aria-hidden
            >
              {playoffs.nombre}
            </span>
            <div className="relative">
              <span className="st-eyebrow text-[12px] text-[var(--st-red)]">
                {playoffs.objetivo}
              </span>
              <h3 className="st-display mt-3 text-[clamp(26px,5vw,56px)] leading-[0.95] text-[var(--st-chalk)]">
                {playoffs.nombre}
              </h3>
              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
                {playoffs.contenido.slice(0, 5).map((c, i) => (
                  <li
                    key={i}
                    className="st-eyebrow text-[13px] tracking-[0.06em] text-[var(--st-bone)]"
                  >
                    {c}
                  </li>
                ))}
              </ul>
              {playoffs.contenido.length > 5 && (
                <VerEnDocumento
                  count={playoffs.contenido.length - 5}
                  sectionId="plan-contenido"
                />
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
