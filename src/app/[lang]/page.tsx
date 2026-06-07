import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getDictionary, isLocale } from "@/content/dictionaries";
import { Reveal } from "@/components/site/Reveal";
import { PillButton } from "@/components/site/PillButton";
import { TelemetryPanel } from "@/components/site/TelemetryPanel";
import { CustomsFlow } from "@/components/site/CustomsFlow";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ParallaxMedia } from "@/components/site/ParallaxMedia";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const d = getDictionary(lang);

  const synergyPanels = [d.synergy.bg, d.synergy.bms];

  return (
    <>
      {/* Hero — consola con atmósfera */}
      <section className="hero-aura grid-field grid-fade relative overflow-hidden">
        <div className="relative z-10 mx-auto grid max-w-[1280px] items-center gap-16 px-5 pb-20 pt-36 sm:px-8 sm:pt-44 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:pb-28">
          <div>
            <Reveal>
              <span className="flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.2em] text-accent">
                <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-accent signal-glow" />
                {d.hero.eyebrow}
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="mt-6 max-w-2xl text-balance font-display text-[clamp(2.9rem,6.5vw,5.6rem)] font-medium leading-[0.98] tracking-[-0.035em] text-chalk">
                {d.hero.title}{" "}
                <span className="text-bone">{d.hero.titleAccent}</span>
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-7 max-w-md text-[17px] leading-relaxed text-bone/85 sm:text-[18px]">
                {d.hero.lead}
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <PillButton href={`/${lang}/contact`} variant="accent" arrow>
                  {d.hero.ctaPrimary}
                </PillButton>
                <PillButton href={`/${lang}/services`} variant="ghost">
                  {d.hero.ctaSecondary}
                </PillButton>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.18}>
            <TelemetryPanel
              header={d.telemetry.header}
              live={d.telemetry.live}
              status={d.telemetry.status}
              stages={d.flow.stages}
              metrics={d.telemetry.metrics}
            />
          </Reveal>
        </div>
      </section>

      {/* Rail de frameworks reales (en vez de logos inventados) */}
      <section className="border-y border-line bg-surface-1/40">
        <div className="mx-auto flex max-w-[1280px] flex-wrap items-center gap-x-6 gap-y-3 px-5 py-6 sm:px-8">
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ash">
            {d.frameworks.label}
          </span>
          <div className="flex flex-wrap items-center gap-2.5">
            {d.frameworks.items.map((f) => (
              <span
                key={f}
                className="rounded-md border border-line px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-bone/80"
              >
                {f}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Sinergia BG + BMS — 2-col asimétrico */}
      <section className="mx-auto max-w-[1280px] px-5 py-24 sm:px-8 sm:py-32">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <SectionHeading
            index="01"
            eyebrow={d.synergy.eyebrow}
            title={d.synergy.title}
            lead={d.synergy.lead}
            className="lg:sticky lg:top-32 lg:self-start"
          />
          <div className="flex flex-col gap-5">
            {synergyPanels.map((p, i) => (
              <Reveal
                key={p.kicker}
                delay={i * 0.1}
                className="console-panel flex flex-col rounded-[14px] bg-surface-1"
              >
                <div className="flex items-center justify-between border-b border-line px-7 py-3.5">
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">{p.kicker}</span>
                  <span aria-hidden className="font-mono text-[11px] tabular-nums text-ash">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="px-7 py-8">
                  <h3 className="font-display text-3xl font-medium tracking-[-0.02em] text-chalk sm:text-4xl">
                    {p.title}
                  </h3>
                  <p className="mt-4 max-w-md text-[15px] leading-relaxed text-bone/80">{p.body}</p>
                  <ul className="mt-7 flex flex-col gap-3 border-t border-line pt-6">
                    {p.points.map((pt) => (
                      <li key={pt} className="flex items-center gap-3 font-mono text-[13px] text-bone/85">
                        <span aria-hidden className="h-1 w-1 shrink-0 rounded-full bg-accent" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Flujo aduanal — instrumento interactivo */}
      <CustomsFlow
        eyebrow={d.flow.eyebrow}
        title={d.flow.title}
        lead={d.flow.lead}
        stages={d.flow.stages}
        panelLabel={d.flow.panel}
      />

      {/* Banda corredor full-bleed (parallax) */}
      <section className="relative border-y border-line">
        <ParallaxMedia
          src="/img/gen/corridor-wide.webp"
          alt="Corredor comercial Tijuana San Diego renderizado como datos"
          className="h-[44vh] min-h-[300px] w-full"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink via-ink/20 to-ink" />
        <div className="pointer-events-none absolute inset-0 flex items-end justify-center pb-10">
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-bone/70">
            {d.hero.eyebrow} · {d.flow.eyebrow}
          </span>
        </div>
      </section>

      {/* Servicios — ledger */}
      <section className="mx-auto max-w-[1280px] px-5 py-24 sm:px-8 sm:py-32">
        <SectionHeading index="02" eyebrow={d.servicesPreview.eyebrow} title={d.servicesPreview.title} className="mb-12" />
        <div className="console-panel overflow-hidden rounded-[14px] bg-surface-1">
          {/* Encabezado del ledger */}
          <div className="hidden grid-cols-[3rem_1fr_1.4fr] gap-6 border-b border-line px-7 py-3.5 font-mono text-[10px] uppercase tracking-[0.16em] text-ash sm:grid">
            <span>{d.servicesPreview.colIndex}</span>
            <span>{d.servicesPreview.colService}</span>
            <span>{d.servicesPreview.colScope}</span>
          </div>
          {d.services.items.map((s, i) => (
            <Reveal
              key={s.name}
              delay={Math.min(i, 4) * 0.04}
              className="grid grid-cols-1 gap-2 border-b border-line px-7 py-6 transition-colors last:border-b-0 hover:bg-surface-2/60 sm:grid-cols-[3rem_1fr_1.4fr] sm:items-baseline sm:gap-6"
            >
              <span className="font-mono text-[13px] tabular-nums text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-lg font-medium tracking-[-0.01em] text-chalk sm:text-xl">
                {s.name}
              </h3>
              <p className="text-[14px] leading-relaxed text-bone/70">{s.summary}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10">
          <PillButton href={`/${lang}/services`} variant="ghost" arrow>
            {d.servicesPreview.cta}
          </PillButton>
        </Reveal>
      </section>

      {/* Valores — registros */}
      <section className="mx-auto max-w-[1280px] px-5 pb-24 sm:px-8 sm:pb-32">
        <SectionHeading index="03" eyebrow={d.values.eyebrow} title={d.values.title} className="mb-12" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {d.values.items.map((v, i) => (
            <Reveal
              key={v.name}
              delay={(i % 4) * 0.06}
              className="console-panel flex flex-col rounded-[14px] bg-surface-1 p-7"
            >
              <span className="font-mono text-[12px] tabular-nums text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 font-display text-xl font-medium tracking-[-0.01em] text-chalk">{v.name}</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-bone/75">{v.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA — panel de consola con aura */}
      <section className="px-5 pb-24 sm:px-8 sm:pb-32">
        <Reveal className="console-panel hero-aura relative mx-auto flex max-w-[1280px] flex-col items-start gap-7 overflow-hidden rounded-[18px] bg-surface-1 px-8 py-16 sm:px-16 sm:py-20">
          <Image
            src="/img/gen/core.webp"
            alt=""
            aria-hidden
            width={460}
            height={460}
            className="pointer-events-none absolute -right-12 -top-16 z-0 w-[240px] opacity-50 mix-blend-screen sm:w-[420px]"
          />
          <span className="relative z-10 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
            <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-accent signal-glow" />
            {d.nav.contact}
          </span>
          <h2 className="relative z-10 max-w-2xl font-display text-[clamp(2rem,5vw,3.4rem)] font-medium leading-[1.05] tracking-[-0.02em] text-chalk">
            {d.homeCta.title}
          </h2>
          <p className="relative z-10 max-w-lg text-[17px] leading-relaxed text-bone/75">{d.homeCta.body}</p>
          <Link
            href={`/${lang}/contact`}
            className="group relative z-10 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-[15px] font-medium tracking-[-0.01em] text-on-accent transition-all duration-300 hover:-translate-y-px hover:bg-accent-dim active:scale-[0.98]"
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
