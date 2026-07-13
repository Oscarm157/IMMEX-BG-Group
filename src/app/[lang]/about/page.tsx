import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDictionary, isLocale } from "@/content/dictionaries";
import { TEAM } from "@/content/team";
import { Reveal } from "@/components/site/Reveal";
import { PillButton } from "@/components/site/PillButton";
import { SectionHeading } from "@/components/site/SectionHeading";
import { MediaFrame } from "@/components/site/MediaFrame";
import { ContactCta } from "@/components/site/ContactCta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const d = getDictionary(lang);
  return { title: d.about.title };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const d = getDictionary(lang);
  const a = d.about;
  const role = (m: (typeof TEAM)[number]) => (lang === "es" ? m.es : m.en);
  const owners = TEAM.filter((m) => m.owner);
  const directors = TEAM.filter((m) => m.lead && !m.owner);
  const rest = TEAM.filter((m) => !m.lead);
  const initials = (name: string) => {
    const parts = name.split(" ").filter(Boolean);
    return ((parts[0]?.[0] ?? "") + (parts[parts.length - 1]?.[0] ?? "")).toUpperCase();
  };
  const tier = {
    owners: lang === "es" ? "Socios" : "Partners",
    directors: lang === "es" ? "Dirección" : "Leadership",
    team: lang === "es" ? "Especialistas" : "Specialists",
  };

  return (
    <>
      {/* Hero */}
      <section className="grid-field relative overflow-hidden">
        <div className="relative z-10 mx-auto grid max-w-[1280px] items-center gap-12 px-5 pb-16 pt-36 sm:px-8 sm:pt-44 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:pb-24">
          <div>
            <Reveal>
              <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-accent signal-glow" />
                {a.eyebrow}
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="mt-6 max-w-2xl text-balance font-display text-[clamp(2.4rem,5.5vw,4.4rem)] font-medium leading-[1.0] tracking-[-0.03em] text-chalk">
                {a.title}
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-bone/90">{a.intro}</p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-8">
                <PillButton href={`/${lang}/contact`} variant="accent" arrow>
                  {d.nav.cta}
                </PillButton>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.18} className="relative">
            <div className="overflow-hidden rounded-[20px] border border-line/70 bg-surface-1 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)]">
              <Image
                src="/nosotros/socios.jpg"
                alt="Mario A. Cortés y Edgardo Romero, socios de BG Consulting Group"
                width={1400}
                height={1166}
                priority
                className="h-full w-full object-cover"
              />
            </div>
            <span className="mt-3 block text-center font-mono text-[11px] uppercase tracking-[0.14em] text-bone/50">
              Mario A. Cortés · Edgardo Romero
            </span>
          </Reveal>
        </div>
      </section>

      {/* Narrativa — interludio claro */}
      <section className="grid-field-light bg-paper">
        <div className="mx-auto max-w-[1280px] px-5 py-16 sm:px-8 sm:py-20">
          <div className="grid gap-x-16 gap-y-5 border-t border-line-soft pt-12 md:grid-cols-2">
            {a.paragraphs.map((p, i) => (
              <Reveal key={i} delay={(i % 2) * 0.06}>
                <p className="text-[16px] leading-relaxed text-graphite">{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Banda visual: oficinas */}
      <section className="relative border-y border-line-soft">
        <MediaFrame
          src="/oficinas__.webp"
          ratio="21/9"
          panel={false}
          caption="Oficinas Tijuana y San Diego"
          className="!rounded-none"
        />
      </section>

      {/* Valores — interludio claro */}
      <section className="grid-field-light bg-paper">
        <div className="mx-auto max-w-[1280px] px-5 py-16 sm:px-8 sm:py-20">
          <SectionHeading eyebrow={d.values.eyebrow} title={d.values.title} tone="light" className="mb-10" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {d.values.items.map((v, i) => (
              <Reveal key={v.name} delay={(i % 4) * 0.08} className="group relative flex flex-col overflow-hidden rounded-[16px] border border-line-soft bg-paper-2/40 p-7 transition-colors duration-300 hover:bg-ink">
                <span className="font-display text-[clamp(2.6rem,5vw,3.6rem)] font-medium leading-none tabular-nums text-accent-ink transition-colors duration-300 group-hover:text-accent">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-6 font-display text-xl font-medium tracking-[-0.01em] text-ink transition-colors duration-300 group-hover:text-chalk">{v.name}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-graphite transition-colors duration-300 group-hover:text-bone/80">{v.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Equipo */}
      <section className="mx-auto max-w-[1280px] border-t border-line px-5 pb-24 pt-24 sm:px-8 sm:pb-32 sm:pt-32">
        <SectionHeading eyebrow={a.teamEyebrow} title={a.teamTitle} lead={a.teamLead} className="mb-12" />

        {/* Socios (dueños) — card destacada */}
        <h3 className="font-display text-2xl font-medium tracking-[-0.01em] text-chalk sm:text-3xl">{tier.owners}</h3>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {owners.map((m) => (
            <Reveal key={m.name} className="console-panel flex flex-col items-center rounded-[18px] bg-surface-1 p-6 sm:p-7">
              {m.photo ? (
                <Image
                  src={m.photo}
                  alt={m.name}
                  width={800}
                  height={1200}
                  className="w-full max-w-[306px] rounded-[14px] object-cover"
                />
              ) : (
                <span className="flex aspect-[2/3] w-full max-w-[306px] items-center justify-center rounded-[14px] bg-accent/10 font-display text-7xl font-medium text-accent">
                  {initials(m.name)}
                </span>
              )}
              <div className="mt-5 text-center">
                <span className="block font-display text-2xl font-medium leading-tight text-chalk">{m.name}</span>
                <span className="mt-1.5 block font-mono text-[12px] uppercase tracking-[0.12em] text-accent">{role(m)}</span>
                {m.linkedin && (
                  <a
                    href={m.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`LinkedIn de ${m.name}`}
                    className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-[12px] font-medium text-bone transition-colors hover:border-accent/50 hover:text-accent"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="h-3.5 w-3.5">
                      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
                    </svg>
                    LinkedIn
                  </a>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        {/* Dirección */}
        <span className="mt-14 block font-mono text-[11px] uppercase tracking-[0.16em] text-accent">{tier.directors}</span>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {directors.map((m) => (
            <Reveal key={m.name} className="console-panel flex flex-col rounded-[14px] bg-surface-1 px-6 py-6">
              <span className="font-display text-lg font-medium text-chalk">{m.name}</span>
              <span className="mt-1 font-mono text-[11px] uppercase tracking-[0.1em] text-accent">{role(m)}</span>
            </Reveal>
          ))}
        </div>

        {/* Equipo */}
        <span className="mt-14 block font-mono text-[11px] uppercase tracking-[0.16em] text-accent">{tier.team}</span>
        <div className="console-panel mt-5 grid gap-px overflow-hidden rounded-[14px] bg-line sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((m) => (
            <div
              key={m.name}
              className="flex flex-col gap-1 bg-surface-1 px-6 py-4"
            >
              <span className="text-[14px] text-chalk">{m.name}</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-bone/60">
                {role(m)}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <ContactCta lang={lang} />
    </>
  );
}
