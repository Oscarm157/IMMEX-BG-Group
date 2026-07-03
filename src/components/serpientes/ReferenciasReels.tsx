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
          <h2 className="st-display text-[clamp(30px,5.4vw,58px)] text-[var(--st-chalk)]">
            {r.titulo}
          </h2>
        </Reveal>
        <Reveal className="mb-14 max-w-[64ch] md:mb-20">
          <p className="text-[15px] leading-[1.6] text-[var(--st-bone)] md:text-[16px]">
            {r.intro}
          </p>
        </Reveal>

        {r.benchmark.map((grupo) => (
          <div key={grupo.fuente} className="mb-12 md:mb-16">
            <Reveal className="mb-5 border-b border-[var(--st-line)] pb-3">
              <h3 className="st-eyebrow text-[13px] text-[var(--st-chalk)]">
                {grupo.fuente}
              </h3>
            </Reveal>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {grupo.reels.map((reel, i) => (
                <Reveal key={reel.url} delay={i * 0.05}>
                  <ReelCard
                    url={reel.url}
                    label={reel.label}
                    vistas={reel.vistas}
                    fuente={grupo.fuente.split(" · ")[0]}
                  />
                </Reveal>
              ))}
            </div>
          </div>
        ))}

        {/* Ideas de activación de otras ligas (referencia, no benchmark). */}
        <div className="mt-8 border-t-2 border-[var(--st-gold)] pt-12">
          <Reveal className="mb-5">
            <h3 className="st-eyebrow text-[13px] text-[var(--st-gold)]">
              {r.ideas.fuente} · ideas de activación
            </h3>
            <p className="mt-2 max-w-[54ch] text-[13px] leading-[1.5] text-[var(--st-ash)]">
              {r.ideas.nota}
            </p>
          </Reveal>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {r.ideas.reels.map((reel, i) => (
              <Reveal key={reel.url} delay={i * 0.05}>
                <ReelCard
                  url={reel.url}
                  label={reel.label}
                  vistas={reel.vistas}
                  fuente={r.ideas.fuente}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
