import { Reveal } from "@/components/site/Reveal";
import { HASHTAGS } from "@/content/serpientes-plan";

export function HashtagMarquee() {
  return (
    <section className="st-band st-band-void overflow-hidden border-t border-[var(--st-line)] py-20 md:py-28">
      <div className="mx-auto mb-12 max-w-[1280px] px-6 md:mb-16 md:px-10">
        <Reveal className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
          <span className="st-display text-[clamp(32px,5vw,64px)] leading-none text-[var(--st-gold)]">
            {HASHTAGS.numero}
          </span>
          <h2 className="st-display text-[clamp(22px,3.6vw,40px)] text-[var(--st-chalk)]">
            {HASHTAGS.titulo}
          </h2>
        </Reveal>
      </div>

      {/* Cinta continua: dos copias de la lista para el loop de -50%. */}
      <div className="flex w-max st-marquee-track">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
            {HASHTAGS.lista.map((tag, i) => (
              <li key={i} className="flex items-center">
                <span className="st-display whitespace-nowrap px-8 text-[clamp(22px,3.8vw,42px)] leading-none text-[var(--st-chalk)]">
                  {tag}
                </span>
                <span className="h-2 w-2 rotate-45 bg-[var(--st-red)]" aria-hidden />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
