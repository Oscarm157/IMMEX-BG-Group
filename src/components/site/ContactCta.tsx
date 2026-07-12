import Image from "next/image";
import Link from "next/link";
import { getDictionary, type Locale } from "@/content/dictionaries";
import { siteConfig } from "@/lib/site-config";
import { Reveal } from "@/components/site/Reveal";
import { PillButton } from "@/components/site/PillButton";

// Banda de contacto de cierre, versión semi-compacta de la del home.
// Misma familia (foto del cruce a sangre + canales directos), tipografía y
// padding menores, sin la fila de stats (esa queda exclusiva del home).
export function ContactCta({
  lang,
  secondaryHref,
  secondaryLabel,
  secondaryExternal,
}: {
  lang: Locale;
  secondaryHref?: string;
  secondaryLabel?: string;
  secondaryExternal?: boolean;
}) {
  const d = getDictionary(lang);

  return (
    <section className="relative overflow-hidden border-t border-line">
      <Image
        src="/img/gen/border-crossing.webp"
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        className="object-cover object-center opacity-[0.16]"
      />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-ink via-ink/95 to-ink/75" />
      <div className="relative z-10 mx-auto max-w-[1280px] px-5 py-20 sm:px-8 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end lg:gap-16">
          <Reveal>
            <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
              <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-accent signal-glow" />
              {d.nav.contact}
            </span>
            <h2 className="mt-5 max-w-2xl font-display text-[clamp(1.9rem,4vw,3rem)] font-medium leading-[1.04] tracking-[-0.02em] text-chalk">
              {d.homeCta.title}
            </h2>
            <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-bone/90">{d.homeCta.body}</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href={`/${lang}/contact`}
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-[15px] font-medium tracking-[-0.01em] text-on-accent transition-all duration-300 hover:-translate-y-px hover:bg-accent-dim active:scale-[0.98]"
              >
                {d.homeCta.cta}
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">&rarr;</span>
              </Link>
              {secondaryHref && secondaryLabel && (
                <PillButton href={secondaryHref} external={secondaryExternal} variant="ghost">
                  {secondaryLabel}
                </PillButton>
              )}
            </div>
          </Reveal>
          <Reveal delay={0.12} className="flex flex-col gap-6 lg:border-l lg:border-line/60 lg:pl-14">
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-smoke">
              {lang === "es" ? "Directo con el equipo" : "Straight to the team"}
            </span>
            {siteConfig.offices.map((o) => (
              <a key={o.city} href={`tel:${o.phone.replace(/[^+\d]/g, "")}`} className="group flex flex-col gap-1">
                <span className="font-mono text-[12px] uppercase tracking-[0.16em] text-smoke">{o.city}</span>
                <span className="font-display text-[clamp(1.3rem,2.6vw,1.75rem)] font-medium tracking-[-0.01em] text-chalk transition-colors group-hover:text-accent">
                  {o.phone}
                </span>
              </a>
            ))}
            <a href={`mailto:${siteConfig.email}`} className="font-mono text-[14px] text-bone/80 transition-colors hover:text-accent">
              {siteConfig.email}
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
