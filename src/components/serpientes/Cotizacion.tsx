import { Reveal } from "@/components/site/Reveal";
import { COTIZACION } from "@/content/serpientes-plan";

export function Cotizacion() {
  const { paquete, cobertura } = COTIZACION;

  return (
    <section className="st-band st-band-surface border-t border-[var(--st-line)] px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1280px]">
        <Reveal className="mb-3">
          <span className="st-eyebrow text-[13px] tracking-[0.22em] text-[var(--st-gold)]">
            {COTIZACION.eyebrow}
          </span>
        </Reveal>
        <Reveal className="mb-6">
          <h2 className="st-display st-h2 text-[var(--st-chalk)]">
            {COTIZACION.titulo}
          </h2>
        </Reveal>
        <Reveal className="mb-14 max-w-[62ch] md:mb-20">
          <p className="text-[15px] leading-[1.6] text-[var(--st-bone)] md:text-[16px]">
            {COTIZACION.intro}
          </p>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-[1.45fr_1fr] md:gap-8">
          {/* Paquete mensual: el core, dominante. */}
          <Reveal>
            <article className="flex h-full flex-col border-2 border-[var(--st-gold)] bg-[var(--st-void)] p-8 md:p-10">
              <span className="st-eyebrow text-[12px] text-[var(--st-gold)]">
                {paquete.nombre}
              </span>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="st-display text-[clamp(48px,8vw,88px)] leading-none text-[var(--st-gold)]">
                  {paquete.precio}
                </span>
                <span className="st-eyebrow text-[14px] text-[var(--st-bone)]">
                  {paquete.periodo}
                </span>
              </div>
              <ul className="mt-8 grid gap-3 border-t border-[var(--st-line)] pt-8">
                {paquete.incluye.map((item, i) => (
                  <li
                    key={i}
                    className="grid grid-cols-[auto_1fr] gap-3 text-[15px] leading-[1.5] text-[var(--st-chalk)]"
                  >
                    <span
                      className="mt-[8px] h-1.5 w-1.5 shrink-0 bg-[var(--st-gold)]"
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-8 border-t border-[var(--st-line)] pt-5 text-[12.5px] leading-[1.5] text-[var(--st-ash)]">
                {paquete.nota}
              </p>
            </article>
          </Reveal>

          {/* Cobertura de partido: add-on variable por encuentro. */}
          <Reveal delay={0.1}>
            <article className="flex h-full flex-col border border-[var(--st-line)] bg-[var(--st-void)] p-8 md:p-10">
              <span className="st-eyebrow text-[12px] text-[var(--st-red)]">
                {cobertura.nombre}
              </span>
              <div className="mt-4">
                <span className="st-display block text-[clamp(26px,3.4vw,38px)] leading-none text-[var(--st-chalk)]">
                  {cobertura.precio}
                </span>
                <span className="mt-2 block text-[14px] text-[var(--st-bone)]">
                  {cobertura.detalle}
                </span>
              </div>
              <ul className="mt-8 grid gap-3 border-t border-[var(--st-line)] pt-8">
                {cobertura.incluye.map((item, i) => (
                  <li
                    key={i}
                    className="grid grid-cols-[auto_1fr] gap-3 text-[14px] leading-[1.5] text-[var(--st-bone)]"
                  >
                    <span
                      className="mt-[7px] h-1 w-1 shrink-0 bg-[var(--st-red)]"
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-auto pt-8 text-[12.5px] leading-[1.5] text-[var(--st-ash)]">
                {cobertura.nota}
              </p>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
