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
      {/* Hero */}
      <section className="relative flex min-h-[100dvh] items-end overflow-hidden">
        <Image
          src="/img/hero-border.webp"
          alt="Garita fronteriza Tijuana San Diego de noche"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/55 to-void/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-void/70 to-transparent" />

        <div className="relative mx-auto w-full max-w-[1280px] px-5 pb-20 sm:px-8 sm:pb-28">
          <Reveal>
            <span className="text-[13px] font-medium uppercase tracking-[0.2em] text-bone/80">
              {d.hero.eyebrow}
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.8rem,8vw,6.5rem)] font-medium leading-[0.98] tracking-[-0.03em] text-chalk">
              {d.hero.title}{" "}
              <span className="italic text-bone">{d.hero.titleAccent}</span>
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

      {/* Stats */}
      <section className="mx-auto max-w-[1280px] px-5 py-24 sm:px-8 sm:py-32">
        <StatStrip items={d.stats.items} />
      </section>

      {/* Synergy BG + BMS */}
      <section className="mx-auto max-w-[1280px] px-5 pb-8 sm:px-8">
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

      {/* Customs flow (interactive) */}
      <CustomsFlow
        eyebrow={d.flow.eyebrow}
        title={d.flow.title}
        lead={d.flow.lead}
        stages={d.flow.stages}
      />

      {/* Services index */}
      <section className="mx-auto max-w-[1280px] px-5 py-24 sm:px-8 sm:py-32">
        <SectionHeading title={d.servicesPreview.title} className="mb-16" />
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

      {/* Linen CTA panel */}
      <section className="px-5 pb-24 sm:px-8 sm:pb-32">
        <Reveal className="mx-auto flex max-w-[1280px] flex-col items-start gap-8 rounded-[10px] bg-linen px-8 py-16 sm:px-16 sm:py-24">
          <h2 className="max-w-2xl font-display text-[clamp(2rem,5vw,3.4rem)] font-medium leading-[1.05] tracking-[-0.02em] text-void">
            {d.homeCta.title}
          </h2>
          <p className="max-w-lg text-[17px] leading-relaxed text-void/70">{d.homeCta.body}</p>
          <Link
            href={`/${lang}/contact`}
            className="group inline-flex items-center gap-2 rounded-full bg-void px-6 py-3.5 text-[15px] font-medium tracking-[-0.01em] text-chalk transition-all duration-300 hover:-translate-y-px active:scale-[0.98]"
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
