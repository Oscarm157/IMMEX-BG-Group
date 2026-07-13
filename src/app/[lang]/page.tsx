import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getDictionary, isLocale } from "@/content/dictionaries";
import { SERVICE_SLUGS } from "@/content/service-slugs";
import { siteConfig } from "@/lib/site-config";
import { Reveal } from "@/components/site/Reveal";
import { PillButton } from "@/components/site/PillButton";
import { TelemetryPanel } from "@/components/site/TelemetryPanel";
import { CustomsFlow } from "@/components/site/CustomsFlow";
import { SectionHeading } from "@/components/site/SectionHeading";
import { OperationViz } from "@/components/site/OperationViz";
import { Logo } from "@/components/Logo";

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
      {/* Hero — video full-bleed (layout Sequel) */}
      <section className="relative h-[100svh] min-h-[600px] w-full overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/video/hero-poster.jpg"
          aria-hidden
          className="absolute inset-0 h-full w-full scale-[1.06] object-cover blur-[4px]"
        >
          <source src="/video/hero.mp4" type="video/mp4" />
        </video>
        {/* Overlay para legibilidad (más fuerte abajo, donde va el texto) */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/55 to-ink/55" />

        <div className="relative z-10 mx-auto flex h-full max-w-[1280px] flex-col justify-end px-5 pb-14 sm:px-8 sm:pb-16">
          <div className="grid gap-8 sm:grid-cols-[1.5fr_1fr] sm:items-end">
            <Reveal>
              <h1 className="font-display text-[clamp(2.8rem,7.5vw,6rem)] font-medium leading-[0.95] tracking-[-0.03em] text-chalk [text-shadow:0_2px_24px_rgba(0,0,0,0.55)]">
                {d.hero.title}{" "}
                <span className="font-serif font-normal italic text-bone">{d.hero.titleAccent}</span>
              </h1>
            </Reveal>
            <Reveal delay={0.1} className="flex flex-col items-start gap-5 sm:items-end sm:text-right">
              <p className="max-w-xs text-[15px] leading-relaxed text-chalk [text-shadow:0_1px_12px_rgba(0,0,0,0.7)]">{d.hero.lead}</p>
              <PillButton href={`/${lang}/services`} variant="ghost" arrow>
                {d.hero.ctaSecondary}
              </PillButton>
            </Reveal>
          </div>
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
                className="rounded-md border border-line px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-bone/90"
              >
                {f}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Telemetría — la consola (bajó del hero) */}
      <section className="mx-auto max-w-[1280px] px-5 py-24 sm:px-8 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16">
          <SectionHeading
            index="01"
            eyebrow={d.telemetry.header}
            title={d.telemetry.title}
            lead={d.telemetry.lead}
          />
          <TelemetryPanel
            header={d.telemetry.header}
            live={d.telemetry.live}
            status={d.telemetry.status}
            stages={d.flow.stages}
            metrics={d.telemetry.metrics}
          />
        </div>
      </section>

      {/* Sinergia BG + BMS — 2-col asimétrico (interludio claro) */}
      <section className="grid-field-light bg-paper">
        <div className="mx-auto max-w-[1280px] px-5 py-24 sm:px-8 sm:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <SectionHeading
              index="02"
              eyebrow={d.synergy.eyebrow}
              title={d.synergy.title}
              lead={d.synergy.lead}
              tone="light"
              className="lg:sticky lg:top-32 lg:self-start"
            />
            <div className="flex flex-col gap-5">
              {synergyPanels.map((p, i) => (
                <Reveal
                  key={p.kicker}
                  delay={i * 0.1}
                  className="card-light flex flex-col rounded-[14px]"
                >
                  <div className="flex items-center justify-between border-b border-line-soft px-7 py-3.5">
                    <Logo
                      variant={i === 0 ? "bg" : "bms"}
                      tone="dark"
                      size="sm"
                      className={i === 0 ? "h-12 w-auto" : undefined}
                    />
                    <span aria-hidden className="font-mono text-[11px] tabular-nums text-graphite/60">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="px-7 py-8">
                    <h3 className="font-display text-3xl font-medium tracking-[-0.02em] text-ink sm:text-4xl">
                      {p.title}
                    </h3>
                    <p className="mt-4 max-w-md text-[15px] leading-relaxed text-graphite">{p.body}</p>
                    <ul className="mt-7 flex flex-col gap-3 border-t border-line-soft pt-6">
                      {p.points.map((pt) => (
                        <li key={pt} className="flex items-center gap-3 font-mono text-[13px] text-graphite">
                          <span aria-hidden className="h-1 w-1 shrink-0 rounded-full bg-accent-ink" />
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Banda de video del corredor MX-US (antes de "cómo trabajamos") */}
      <section className="relative h-[70vh] min-h-[440px] w-full overflow-hidden border-y border-line">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/video/banda-poster.jpg"
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/video/banda.mp4" type="video/mp4" />
        </video>
        <div className="pointer-events-none absolute inset-0 bg-ink/55" />
        <div className="relative z-10 flex h-full items-center justify-center px-5 text-center">
          <Reveal>
            <h2 className="max-w-4xl text-balance font-display text-[clamp(2.4rem,6vw,5rem)] font-medium leading-[1.02] tracking-[-0.03em] text-chalk [text-shadow:0_2px_28px_rgba(0,0,0,0.55)]">
              {d.bandCta.title}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-balance text-[16px] leading-relaxed text-bone/85 [text-shadow:0_1px_16px_rgba(0,0,0,0.6)]">
              {d.bandCta.sub}
            </p>
          </Reveal>
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

      {/* Servicios + Valores — capítulo claro */}
      <section className="grid-field-light bg-paper">
        <div className="mx-auto max-w-[1280px] px-5 py-24 sm:px-8 sm:py-32">
          <SectionHeading index="03" eyebrow={d.servicesPreview.eyebrow} title={d.servicesPreview.title} tone="light" className="mb-12" />
          <div className="card-light overflow-hidden rounded-[14px]">
            {/* Encabezado del ledger */}
            <div className="hidden grid-cols-[3rem_1fr_1.4fr] gap-6 border-b border-line-soft px-7 py-3.5 font-mono text-[10px] uppercase tracking-[0.16em] text-graphite/60 sm:grid">
              <span>{d.servicesPreview.colIndex}</span>
              <span>{d.servicesPreview.colService}</span>
              <span>{d.servicesPreview.colScope}</span>
            </div>
            {d.services.items.map((s, i) => (
              <Reveal key={s.name} delay={Math.min(i, 4) * 0.04} className="border-b border-line-soft last:border-b-0">
                <Link
                  href={`/${lang}/services/${SERVICE_SLUGS[i]}`}
                  className="group grid grid-cols-1 gap-2 px-7 py-6 transition-colors hover:bg-paper-2/70 sm:grid-cols-[3rem_1fr_1.4fr] sm:items-baseline sm:gap-6"
                >
                  <span className="font-mono text-[13px] tabular-nums text-accent-ink">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-lg font-medium tracking-[-0.01em] text-ink transition-colors group-hover:text-accent-ink sm:text-xl">
                    {s.name}
                  </h3>
                  <p className="text-[14px] leading-relaxed text-graphite">{s.summary}</p>
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10">
            <PillButton href={`/${lang}/services`} variant="ghost" arrow tone="light">
              {d.servicesPreview.cta}
            </PillButton>
          </Reveal>

          {/* Valores — registros */}
          <SectionHeading index="04" eyebrow={d.values.eyebrow} title={d.values.title} tone="light" className="mb-12 mt-24 sm:mt-32" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {d.values.items.map((v, i) => (
              <Reveal
                key={v.name}
                delay={(i % 4) * 0.08}
                className="group relative flex flex-col overflow-hidden rounded-[16px] border border-line-soft bg-paper-2/40 p-7 transition-colors duration-300 hover:bg-ink"
              >
                <span className="font-display text-[clamp(2.6rem,5vw,3.6rem)] font-medium leading-none tabular-nums text-accent-ink transition-colors duration-300 group-hover:text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-6 font-display text-xl font-medium tracking-[-0.01em] text-ink transition-colors duration-300 group-hover:text-chalk">{v.name}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-graphite transition-colors duration-300 group-hover:text-bone/80">{v.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Operación — diagrama animado (SVG), movido debajo de servicios */}
      <OperationViz
        eyebrow={d.operationViz.eyebrow}
        title={d.operationViz.title}
        intro={d.operationViz.intro}
        opLabel={d.operationViz.opLabel}
        opId={d.operationViz.opId}
        statusLabel={d.operationViz.statusLabel}
        statusNote={d.operationViz.statusNote}
        barLabel={d.operationViz.barLabel}
        stages={d.flow.stages.map((s) => s.name)}
        metrics={d.telemetry.metrics}
      />

      {/* CTA — banda cinematográfica de cierre */}
      <section className="relative overflow-hidden border-t border-line">
        <Image
          src="/img/gen/border-crossing.webp"
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          className="object-cover object-center opacity-[0.22]"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-ink via-ink/95 to-ink/70" />
        <div className="relative z-10 mx-auto max-w-[1280px] px-5 py-28 sm:px-8 sm:py-36">
          <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:items-end lg:gap-20">
            <Reveal>
              <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-accent signal-glow" />
                {d.nav.contact}
              </span>
              <h2 className="mt-6 max-w-2xl font-display text-[clamp(2rem,5vw,3.6rem)] font-medium leading-[1.02] tracking-[-0.03em] text-chalk">
                {d.homeCta.title}
              </h2>
              <p className="mt-7 max-w-xl text-[18px] leading-relaxed text-bone/90">{d.homeCta.body}</p>
              <Link
                href={`/${lang}/contact`}
                className="group mt-9 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-4 text-[15px] font-medium tracking-[-0.01em] text-on-accent transition-all duration-300 hover:-translate-y-px hover:bg-accent-dim active:scale-[0.98]"
              >
                {d.homeCta.cta}
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">&rarr;</span>
              </Link>
            </Reveal>
            <Reveal delay={0.12} className="flex flex-col gap-7 lg:border-l lg:border-line/60 lg:pl-16">
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-smoke">
                {lang === "es" ? "Directo con el equipo" : "Straight to the team"}
              </span>
              {siteConfig.offices.map((o) => (
                <a key={o.city} href={`tel:${o.phone.replace(/[^+\d]/g, "")}`} className="group flex flex-col gap-1">
                  <span className="font-mono text-[12px] uppercase tracking-[0.16em] text-smoke">{o.city}</span>
                  <span className="font-display text-[clamp(1.4rem,3vw,2rem)] font-medium tracking-[-0.01em] text-chalk transition-colors group-hover:text-accent">
                    {o.phone}
                  </span>
                </a>
              ))}
              <a href={`mailto:${siteConfig.email}`} className="font-mono text-[14px] text-bone/80 transition-colors hover:text-accent">
                {siteConfig.email}
              </a>
            </Reveal>
          </div>
          <dl className="mt-16 flex flex-wrap gap-x-12 gap-y-5 border-t border-line/60 pt-8">
            {[d.stats.items[0], d.stats.items[3], d.stats.items[1]].map((s) => (
              <div key={s.label} className="flex items-center gap-3">
                <dt className="font-display text-2xl font-medium tabular-nums text-accent sm:text-3xl">{s.value}</dt>
                <dd className="max-w-[9rem] text-[13px] leading-snug text-bone/70">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
