import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDictionary, isLocale } from "@/content/dictionaries";
import { Reveal } from "@/components/site/Reveal";
import { PillButton } from "@/components/site/PillButton";

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
      {/* Hero */}
      <section className="mx-auto max-w-[1280px] px-5 pt-40 pb-16 sm:px-8 sm:pt-48">
        <Reveal>
          <span className="text-[12px] font-medium uppercase tracking-[0.18em] text-accent">
            {s.eyebrow}
          </span>
        </Reveal>
        <Reveal delay={0.06}>
          <h1 className="mt-6 max-w-3xl font-display text-[clamp(2.8rem,7vw,5.5rem)] font-medium leading-[0.98] tracking-[-0.03em] text-chalk">
            {s.title}
          </h1>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-7 max-w-xl text-[18px] leading-relaxed text-bone/80">{s.lead}</p>
        </Reveal>
        <Reveal delay={0.18}>
          <div className="mt-9">
            <PillButton href={s.ctaHref} external variant="primary" arrow>
              {s.cta}
            </PillButton>
          </div>
        </Reveal>
      </section>

      {/* Image band */}
      <section className="relative h-[50vh] min-h-[340px] w-full overflow-hidden sm:h-[64vh]">
        <Image
          src="/img/software-office.webp"
          alt="Operación nocturna en oficina de cristal"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
      </section>

      {/* Slogan pull-quote */}
      <section className="mx-auto max-w-[1280px] px-5 py-24 sm:px-8 sm:py-32">
        <Reveal>
          <p className="max-w-4xl text-balance font-display text-[clamp(1.8rem,4.5vw,3.2rem)] font-medium leading-[1.15] tracking-[-0.02em] text-chalk">
            {s.slogan}
          </p>
        </Reveal>
      </section>

      {/* Capabilities */}
      <section className="mx-auto max-w-[1280px] px-5 pb-24 sm:px-8 sm:pb-32">
        <div className="grid gap-x-12 gap-y-12 md:grid-cols-3">
          {s.capabilities.map((c, i) => (
            <Reveal
              key={c.title}
              delay={(i % 3) * 0.06}
              className="border-t border-white/[0.08] pt-7"
            >
              <h3 className="font-display text-xl font-medium tracking-[-0.01em] text-chalk sm:text-[1.4rem]">
                {c.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-smoke">{c.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Stats + modes (light band) */}
      <section className="bg-paper">
        <div className="mx-auto max-w-[1280px] px-5 py-24 sm:px-8 sm:py-28">
          <div className="grid gap-12 sm:grid-cols-3">
            {s.stats.map((stat) => (
              <Reveal key={stat.label} className="flex flex-col gap-3">
                <span className="font-display text-[clamp(3rem,6.5vw,4.6rem)] font-medium leading-none tracking-[-0.035em] tabular-nums text-ink">
                  {stat.value}
                </span>
                <span className="max-w-[20ch] text-[14px] leading-snug text-ink/55">{stat.label}</span>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-16 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-ink/10 pt-8">
            <span className="text-[13px] uppercase tracking-[0.14em] text-ink/50">{s.modes.label}</span>
            <div className="flex items-center gap-3 text-[15px] text-ink">
              {s.modes.items.map((m, i) => (
                <span key={m} className="flex items-center gap-3">
                  {i > 0 && <span className="h-1 w-1 rounded-full bg-accent-ink" />}
                  {m}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-[1280px] px-5 py-28 sm:px-8 sm:py-36">
        <Reveal className="flex flex-col items-start gap-7">
          <h2 className="max-w-2xl font-display text-[clamp(1.8rem,4.5vw,3rem)] font-medium leading-[1.05] tracking-[-0.02em] text-chalk">
            {d.homeCta.title}
          </h2>
          <div className="flex flex-wrap gap-4">
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
