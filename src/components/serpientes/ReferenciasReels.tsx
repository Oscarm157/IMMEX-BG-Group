import { Reveal } from "@/components/site/Reveal";
import { REFERENCIAS_REELS } from "@/content/serpientes-plan";
import { ReelCard } from "@/components/serpientes/ReelCard";

export function ReferenciasReels() {
  const r = REFERENCIAS_REELS;

  return (
    <section className="st-band st-band-void border-t border-[var(--st-line)] px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1280px]">
        <Reveal className="mb-3">
          <span className="st-eyebrow text-[13px] tracking-[0.22em] text-[var(--st-gold)]">
            {r.eyebrow}
          </span>
        </Reveal>
        <Reveal className="mb-6">
          <h2 className="st-display st-h2 text-[var(--st-chalk)]">
            {r.titulo}
          </h2>
        </Reveal>
        <Reveal className="mb-12 max-w-[64ch] md:mb-16">
          <p className="text-[15px] leading-[1.6] text-[var(--st-bone)] md:text-[16px]">
            {r.intro}
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {r.reels.map((reel, i) => (
            <Reveal key={reel.url} delay={i * 0.06}>
              <ReelCard
                url={reel.url}
                label={reel.label}
                vistas={reel.vistas}
                fuente={reel.fuente}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
