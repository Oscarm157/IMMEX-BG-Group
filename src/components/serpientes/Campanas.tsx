import { Reveal } from "@/components/site/Reveal";
import { CAMPANAS } from "@/content/serpientes-plan";

export function Campanas() {
  return (
    <section className="st-band st-band-red border-t border-[var(--st-line)] px-6 py-20 md:px-10 md:py-28">
      <span className="st-ghostnum -top-6 right-2 md:right-10" aria-hidden>
        {CAMPANAS.numero}
      </span>
      <div className="mx-auto max-w-[1280px]">
        <Reveal className="mb-12 flex flex-wrap items-baseline gap-x-6 gap-y-2 md:mb-16">
          <span className="st-display st-num text-[var(--st-gold)]">
            {CAMPANAS.numero}
          </span>
          <h2 className="st-display st-h2 text-[var(--st-chalk)]">
            {CAMPANAS.titulo}
          </h2>
        </Reveal>

        {/* Excepción de card autorizada: contorno 1px, fondo un tono más oscuro
            (void) que la franja contenedora (surface-1). Cuatro campañas comparables. */}
        <div className="grid gap-5 md:grid-cols-2">
          {CAMPANAS.lista.map((camp, i) => (
            <Reveal key={camp.numero} delay={(i % 2) * 0.08} y={36}>
              <article className="flex h-full flex-col border border-[var(--st-line)] bg-[var(--st-void)] p-7 md:p-9">
                <div className="flex items-baseline gap-4">
                  <span className="st-display text-[clamp(24px,3.2vw,40px)] leading-none text-[var(--st-gold)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="st-display st-h3 text-[var(--st-chalk)]">
                    {camp.nombre}
                  </h3>
                </div>
                <p className="mt-4 text-[14px] leading-[1.55] text-[var(--st-bone)]">
                  {camp.objetivo}
                </p>
                <ul className="mt-6 grid gap-2.5 border-t border-[var(--st-line)] pt-6">
                  {camp.mensajes.map((m, j) => (
                    <li
                      key={j}
                      className="grid grid-cols-[auto_1fr] gap-3 text-[14px] leading-[1.5] text-[var(--st-chalk)]"
                    >
                      <span className="mt-[8px] h-1 w-1 bg-[var(--st-red)]" aria-hidden />
                      {m}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
