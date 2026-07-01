import { Reveal } from "@/components/site/Reveal";
import { TIPOS_CONTENIDO } from "@/content/serpientes-plan";
import { VerEnDocumento } from "@/components/serpientes/VerEnDocumento";

export function TiposDeContenido() {
  const { reels, historias, jugadores, aficion } = TIPOS_CONTENIDO;
  const secundarios = [historias, jugadores, aficion];

  return (
    <section className="border-t border-[var(--st-line)] px-6 py-24 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1280px]">
        <Reveal className="mb-12 flex flex-wrap items-baseline gap-x-6 gap-y-2 md:mb-16">
          <span className="st-display text-[clamp(32px,5vw,64px)] leading-none text-[var(--st-gold)]">
            {TIPOS_CONTENIDO.numero}
          </span>
          <h2 className="st-display text-[clamp(22px,3.6vw,40px)] text-[var(--st-chalk)]">
            {TIPOS_CONTENIDO.titulo}
          </h2>
        </Reveal>

        {/* Reels: pieza destacada, prioridad #1, con sus tres sub-secciones. */}
        <Reveal y={40}>
          <article className="border border-[var(--st-gold)]/40 bg-[var(--st-surface-1)] p-7 md:p-12">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h3 className="st-display text-[clamp(20px,3.4vw,36px)] text-[var(--st-gold)]">
                {reels.titulo}
              </h3>
              <span className="st-eyebrow text-[11px] text-[var(--st-red)]">
                Prioridad
              </span>
            </div>
            <p className="mt-4 max-w-[60ch] text-[16px] leading-[1.6] text-[var(--st-bone)] md:text-[18px]">
              {reels.intro}
            </p>
            <div className="mt-10 grid gap-8 border-t border-[var(--st-line)] pt-8 md:grid-cols-3 md:gap-10">
              <div>
                <span className="st-eyebrow mb-4 block text-[12px] text-[var(--st-chalk)]">
                  Ideas
                </span>
                <ul className="grid gap-2 text-[13.5px] leading-[1.45] text-[var(--st-bone)]">
                  {reels.ideas.slice(0, 5).map((x, i) => (
                    <li key={i}>{x}</li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="st-eyebrow mb-4 block text-[12px] text-[var(--st-chalk)]">
                  Formato
                </span>
                <ul className="grid gap-2 text-[13.5px] leading-[1.45] text-[var(--st-bone)]">
                  {reels.formato.map((x, i) => (
                    <li key={i} className="grid grid-cols-[auto_1fr] gap-2.5">
                      <span className="mt-[7px] h-1 w-1 bg-[var(--st-gold)]" aria-hidden />
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="st-eyebrow mb-4 block text-[12px] text-[var(--st-chalk)]">
                  Frases de cierre
                </span>
                <ul className="grid gap-3">
                  {reels.frases.slice(0, 3).map((x, i) => (
                    <li
                      key={i}
                      className="st-display text-[clamp(15px,1.8vw,19px)] leading-[1.1] text-[var(--st-chalk)]"
                    >
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <VerEnDocumento
              count={reels.ideas.length - 5 + (reels.frases.length - 3)}
              sectionId="tipos-contenido"
            />
          </article>
        </Reveal>

        {/* Los otros tres tipos, en columnas de apoyo. */}
        <div className="mt-6 grid gap-px overflow-hidden border border-[var(--st-line)] md:mt-8 md:grid-cols-3">
          {secundarios.map((tipo, i) => (
            <Reveal key={tipo.titulo} delay={i * 0.1}>
              <div className="h-full bg-[var(--st-surface-1)] p-6 md:p-8">
                <h3 className="st-display text-[clamp(19px,2.4vw,26px)] text-[var(--st-chalk)]">
                  {tipo.titulo}
                </h3>
                <p className="mt-2 text-[13px] text-[var(--st-gold)]">{tipo.intro}</p>
                <ul className="mt-5 grid gap-2 text-[13px] leading-[1.45] text-[var(--st-bone)]">
                  {tipo.ideas.slice(0, 4).map((x, j) => (
                    <li key={j} className="grid grid-cols-[auto_1fr] gap-2.5">
                      <span className="mt-[7px] h-px w-2.5 bg-[var(--st-ash)]" aria-hidden />
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
        <VerEnDocumento
          count={secundarios.reduce((sum, t) => sum + Math.max(0, t.ideas.length - 4), 0)}
          sectionId="tipos-contenido"
        />
      </div>
    </section>
  );
}
