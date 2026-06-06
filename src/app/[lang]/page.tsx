import Image from "next/image";
import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "@/content/dictionaries";
import { Reveal } from "@/components/site/Reveal";
import { PillButton } from "@/components/site/PillButton";
import { StatStrip } from "@/components/site/StatStrip";
import { EditorialImageCard } from "@/components/site/EditorialImageCard";
import { CustomsFlow } from "@/components/site/CustomsFlow";
import { SectionHeading } from "@/components/site/SectionHeading";
import Link from "next/link";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const d = getDictionary(lang);

  return (
    <>
      {/* Hero (dark) */}
      <section className="relative flex min-h-[100dvh] items-end overflow-hidden">
        <Image
          src="/img/hero-border.webp"
          alt="Garita fronteriza Tijuana San Diego de noche"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/75 to-transparent" />
        <div className="hero-glow" />

        <div className="relative mx-auto w-full max-w-[1280px] px-5 pb-20 sm:px-8 sm:pb-28">
          <Reveal>
            <span className="text-[13px] font-medium uppercase tracking-[0.2em] text-accent">
              {d.hero.eyebrow}
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-6 max-w-4xl text-balance font-display text-[clamp(2.7rem,7.5vw,6rem)] font-medium leading-[1.0] tracking-[-0.03em] text-chalk">
              {d.hero.title}{" "}
              <span className="text-bone">{d.hero.titleAccent}</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-7 max-w-md text-[17px] leading-relaxed text-bone/85 sm:text-[19px]">
              {d.hero.lead}
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <PillButton href={`/${lang}/contact`} variant="primary" arrow>
                {d.hero.ctaPrimary}
              </PillButton>
              <PillButton href={`/${lang}/services`} variant="ghost">
                {d.hero.ctaSecondary}
              </PillButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stats (light band) */}
      <section className="bg-paper">
        <div className="mx-auto max-w-[1280px] px-5 py-20 sm:px-8 sm:py-24">
          <Reveal>
            <span className="mb-10 block text-[12px] font-medium uppercase tracking-[0.18em] text-accent-ink">
              {d.stats.eyebrow}
            </span>
          </Reveal>
          <StatStrip items={d.stats.items} tone="light" />
        </div>
      </section>

      {/* Valores (dark) */}
      <section className="mx-auto max-w-[1280px] px-5 py-24 sm:px-8 sm:py-32">
        <SectionHeading eyebrow={d.values.eyebrow} title={d.values.title} className="mb-14" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {d.values.items.map((v, i) => (
            <Reveal
              key={v.name}
              delay={(i % 4) * 0.06}
              className="flex flex-col rounded-[14px] border border-line bg-surface-1 p-7"
            >
              <span className="font-display text-[13px] font-medium tabular-nums text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 font-display text-xl font-medium tracking-[-0.01em] text-chalk">
                {v.name}
              </h3>
              <p className="mt-3 text-[14px] leading-relaxed text-bone/75">{v.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Synergy BG + BMS (dark) */}
      <section className="mx-auto max-w-[1280px] px-5 pb-24 sm:px-8 sm:pb-28">
        <SectionHeading title={d.synergy.title} lead={d.synergy.lead} className="mb-14" />
        <div className="grid gap-5 md:grid-cols-2">
          <EditorialImageCard
            src="/img/documents.webp"
            alt="Documentos aduanales bajo una luz cálida"
            kicker={d.synergy.bg.kicker}
            title={d.synergy.bg.title}
            body={d.synergy.bg.body}
            points={d.synergy.bg.points}
          />
          <EditorialImageCard
            src="/img/software-office.webp"
            alt="Oficina de cristal de noche"
            kicker={d.synergy.bms.kicker}
            title={d.synergy.bms.title}
            body={d.synergy.bms.body}
            points={d.synergy.bms.points}
            delay={0.1}
          />
        </div>
      </section>

      {/* Customs flow (interactive, light blueprint) */}
      <CustomsFlow
        eyebrow={d.flow.eyebrow}
        title={d.flow.title}
        lead={d.flow.lead}
        stages={d.flow.stages}
        tone="light"
      />

      {/* Services index (dark) */}
      <section className="mx-auto max-w-[1280px] px-5 py-24 sm:px-8 sm:py-32">
        <SectionHeading eyebrow={d.servicesPreview.eyebrow} title={d.servicesPreview.title} className="mb-16" />
        <div className="grid gap-x-12 md:grid-cols-2">
          {d.services.items.map((s, i) => (
            <Reveal
              key={s.name}
              delay={(i % 2) * 0.06}
              className="flex gap-6 border-t border-white/[0.08] py-7"
            >
              <span className="font-display text-xl text-accent tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-display text-xl text-chalk sm:text-2xl">{s.name}</h3>
                <p className="mt-1.5 text-[14px] leading-relaxed text-smoke">{s.summary}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-14">
          <PillButton href={`/${lang}/services`} variant="ghost" arrow>
            {d.servicesPreview.cta}
          </PillButton>
        </Reveal>
      </section>

      {/* CTA panel (light) */}
      <section className="px-5 pb-24 sm:px-8 sm:pb-32">
        <Reveal className="mx-auto flex max-w-[1280px] flex-col items-start gap-8 rounded-[18px] bg-paper px-8 py-16 sm:px-16 sm:py-24">
          <h2 className="max-w-2xl font-display text-[clamp(2rem,5vw,3.4rem)] font-medium leading-[1.05] tracking-[-0.02em] text-ink">
            {d.homeCta.title}
          </h2>
          <p className="max-w-lg text-[17px] leading-relaxed text-ink/70">{d.homeCta.body}</p>
          <Link
            href={`/${lang}/contact`}
            className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-[15px] font-medium tracking-[-0.01em] text-chalk transition-all duration-300 hover:-translate-y-px active:scale-[0.98]"
          >
            {d.homeCta.cta}
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">
              &rarr;
            </span>
          </Link>
        </Reveal>
      </section>
    </>
  );
}
