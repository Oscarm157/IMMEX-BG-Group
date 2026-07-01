import { Reveal } from "@/components/site/Reveal";
import { ACTIVACIONES } from "@/content/serpientes-plan";

export function Activaciones() {
  return (
    <section className="border-t border-[var(--st-line)] bg-[var(--st-surface-2)] px-6 py-24 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1280px]">
        <Reveal className="mb-12 flex flex-wrap items-baseline gap-x-6 gap-y-2 md:mb-16">
          <span className="st-display text-[clamp(32px,5vw,64px)] leading-none text-[var(--st-gold)]">
            {ACTIVACIONES.numero}
          </span>
          <h2 className="st-display max-w-[16ch] text-[clamp(22px,3.6vw,40px)] text-[var(--st-chalk)]">
            {ACTIVACIONES.titulo}
          </h2>
        </Reveal>

        {/* Playbook: filas numeradas de ancho completo, divididas por hairlines. */}
        <div className="border-t border-[var(--st-line)]">
          {ACTIVACIONES.lista.map((act, i) => (
            <Reveal key={act.numero}>
              <div className="group grid grid-cols-[auto_1fr] items-baseline gap-x-5 border-b border-[var(--st-line)] py-6 md:grid-cols-[80px_minmax(0,0.9fr)_minmax(0,1.4fr)] md:gap-x-10 md:py-8">
                <span className="st-display text-[clamp(28px,5vw,54px)] leading-none text-[var(--st-gold)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="st-display self-baseline text-[clamp(19px,2.6vw,30px)] text-[var(--st-chalk)]">
                  {act.titulo}
                </h3>
                <p className="col-span-2 mt-3 text-[14px] leading-[1.6] text-[var(--st-bone)] md:col-span-1 md:mt-0 md:text-[15px]">
                  {act.descripcion}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
