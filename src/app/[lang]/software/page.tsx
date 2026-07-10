import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDictionary, isLocale } from "@/content/dictionaries";
import { Reveal } from "@/components/site/Reveal";
import { PillButton } from "@/components/site/PillButton";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Faq } from "@/components/site/Faq";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const d = getDictionary(lang);
  return { title: d.software.title };
}

export default async function SoftwarePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const d = getDictionary(lang);
  const s = d.software;

  return (
    <>
      {/* Hero — núcleo BMS */}
      <section className="grid-field relative overflow-hidden">
        <div className="relative z-10 mx-auto grid max-w-[1280px] items-center gap-12 px-5 pb-16 pt-36 sm:px-8 sm:pt-44 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pb-24">
          <div>
            <Reveal>
              <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-accent signal-glow" />
                {s.eyebrow}
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="mt-6 max-w-2xl text-balance font-display text-[clamp(2.6rem,6vw,5rem)] font-medium leading-[1.0] tracking-[-0.03em] text-chalk">
                {s.title}
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-7 max-w-md text-[17px] leading-relaxed text-bone/85">{s.lead}</p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-8">
                <PillButton href={s.ctaHref} external variant="accent" arrow>
                  {s.cta}
                </PillButton>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.18} className="relative flex items-center justify-center">
            <Image
              src="/img/gen/core.webp"
              alt="Núcleo del sistema BMS"
              width={520}
              height={520}
              priority
              className="w-[78%] max-w-[440px] drop-shadow-[0_0_60px_rgba(0,230,160,0.18)]"
            />
          </Reveal>
        </div>
      </section>

      {/* Slogan pull-quote */}
      <section className="mx-auto max-w-[1280px] border-t border-line px-5 py-20 sm:px-8 sm:py-24">
        <Reveal>
          <p className="max-w-4xl text-balance font-display text-[clamp(1.7rem,4vw,3rem)] font-medium leading-[1.15] tracking-[-0.02em] text-chalk">
            {s.slogan}
          </p>
        </Reveal>
      </section>

      {/* Capabilities — módulos (interludio claro) */}
      <section className="grid-field-light bg-paper">
        <div className="mx-auto max-w-[1280px] px-5 py-20 sm:px-8 sm:py-24">
          <SectionHeading eyebrow={s.eyebrow} title={s.capsTitle} tone="light" className="mb-12" />
          <div className="grid gap-4 md:grid-cols-3">
            {s.capabilities.map((c, i) => (
              <Reveal
                key={c.title}
                delay={(i % 3) * 0.06}
                className="card-light flex flex-col rounded-[14px] p-7"
              >
                <span className="font-mono text-[12px] tabular-nums text-accent-ink">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 font-display text-xl font-medium tracking-[-0.01em] text-ink">{c.title}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-graphite">{c.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Ediciones — desglose de módulos */}
      <section className="mx-auto max-w-[1280px] px-5 pb-20 pt-20 sm:px-8 sm:pb-24 sm:pt-24">
        <SectionHeading eyebrow={s.editionsLabel} title={s.editionsTitle} className="mb-12" />
        <div className="grid gap-4 md:grid-cols-2">
          {s.editionsDetail.map((e, i) => (
            <Reveal
              key={e.name}
              delay={(i % 2) * 0.06}
              className="console-panel flex flex-col rounded-[14px] bg-surface-1 px-7 py-7"
            >
              <div className="flex items-center gap-3">
                <h3 className="font-display text-xl font-medium tracking-[-0.01em] text-chalk">{e.name}</h3>
                {e.anexo && (
                  <span className="rounded-md border border-line px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.08em] text-accent">
                    {e.anexo}
                  </span>
                )}
              </div>
              <p className="mt-3 text-[15px] leading-relaxed text-bone/90">{e.body}</p>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 max-w-xl text-[14px] leading-relaxed text-ash">{s.editionsNote}</p>
      </section>

      {/* Readouts BMS */}
      <section className="mx-auto max-w-[1280px] border-t border-line px-5 pb-20 pt-16 sm:px-8 sm:pb-24 sm:pt-20">
        <div className="console-panel overflow-hidden rounded-[14px] bg-surface-1">
          <div className="grid grid-cols-1 sm:grid-cols-3">
            {s.stats.map((stat, i) => (
              <div key={stat.label} className={`px-7 py-8 ${i > 0 ? "border-t border-line sm:border-l sm:border-t-0" : ""}`}>
                <span className="block font-display text-[clamp(2.4rem,5vw,3.4rem)] font-medium leading-none tracking-[-0.035em] tabular-nums text-chalk">
                  {stat.value}
                </span>
                <span className="mt-2 block font-mono text-[11px] uppercase tracking-[0.1em] text-ash">{stat.label}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line px-7 py-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ash">{s.modes.label}</span>
            <div className="flex items-center gap-3 font-mono text-[13px] text-bone">
              {s.modes.items.map((m, i) => (
                <span key={m} className="flex items-center gap-3">
                  {i > 0 && <span className="h-1 w-1 rounded-full bg-accent" />}
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-[1280px] border-t border-line px-5 pb-20 pt-16 sm:px-8 sm:pb-24 sm:pt-20">
        <SectionHeading title={s.faqTitle} className="mb-10" />
        <Faq items={s.faq} />
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-[1280px] border-t border-line px-5 pb-24 pt-16 sm:px-8 sm:pb-32 sm:pt-20">
        <Reveal className="console-panel relative flex flex-col items-start gap-7 overflow-hidden rounded-[18px] bg-surface-1 px-8 py-16 sm:px-16 sm:py-20">
          <h2 className="relative z-10 max-w-2xl font-display text-[clamp(2rem,5vw,3.2rem)] font-medium leading-[1.05] tracking-[-0.02em] text-chalk">
            {d.homeCta.title}
          </h2>
          <div className="relative z-10 flex flex-wrap gap-4">
            <PillButton href={`/${lang}/contact`} variant="accent" arrow>
              {d.nav.cta}
            </PillButton>
            <PillButton href={s.ctaHref} external variant="ghost">
              {s.cta}
            </PillButton>
          </div>
        </Reveal>
      </section>
    </>
  );
}
