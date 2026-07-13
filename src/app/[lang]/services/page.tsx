import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDictionary, isLocale } from "@/content/dictionaries";
import { SERVICE_SLUGS } from "@/content/service-slugs";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ContactCta } from "@/components/site/ContactCta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const d = getDictionary(lang);
  return { title: d.services.title };
}

export default async function ServicesPage({
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
      <section className="grid-field relative overflow-hidden">
        <div className="relative z-10 mx-auto grid max-w-[1280px] items-center gap-12 px-5 pb-16 pt-36 sm:px-8 sm:pt-44 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:pb-20">
          <SectionHeading eyebrow={d.services.eyebrow} title={d.services.title} lead={d.services.lead} />
          <Reveal delay={0.16}>
            <div className="console-panel relative overflow-hidden rounded-[16px]">
              <Image
                src="/img/gen/servicios-comercio-exterior.jpg"
                alt="Patio de inspección aduanal en la frontera con contenedores y tráileres"
                width={1024}
                height={768}
                className="h-full max-h-[320px] w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Ledger de servicios (enlazados) — interludio claro */}
      <section className="grid-field-light bg-paper">
        <div className="mx-auto max-w-[1280px] px-5 py-24 sm:px-8 sm:py-28">
          <div className="card-light overflow-hidden rounded-[14px]">
            <div className="hidden grid-cols-[3rem_1fr_1.4fr_2rem] gap-6 border-b border-line-soft px-7 py-3.5 font-mono text-[10px] uppercase tracking-[0.16em] text-graphite/60 sm:grid">
              <span>{d.servicesPreview.colIndex}</span>
              <span>{d.servicesPreview.colService}</span>
              <span>{d.servicesPreview.colScope}</span>
              <span />
            </div>
            {d.services.items.map((s, i) => (
              <Reveal key={s.name} delay={Math.min(i, 4) * 0.04}>
                <Link
                  href={`/${lang}/services/${SERVICE_SLUGS[i]}`}
                  className="group grid grid-cols-1 gap-2 border-b border-line-soft px-7 py-6 transition-colors last:border-b-0 hover:bg-paper-2/70 sm:grid-cols-[3rem_1fr_1.4fr_2rem] sm:items-baseline sm:gap-6"
                >
                  <span className="font-mono text-[13px] tabular-nums text-accent-ink">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="font-display text-lg font-medium tracking-[-0.01em] text-ink sm:text-xl">
                    {s.name}
                  </h2>
                  <p className="text-[14px] leading-relaxed text-graphite">{s.summary}</p>
                  <span
                    aria-hidden
                    className="hidden self-center text-right text-accent-ink transition-transform duration-300 group-hover:translate-x-1 sm:block"
                  >
                    &rarr;
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Servicios complementarios (secundarios) */}
      <section className="mx-auto max-w-[1280px] px-5 pb-8 pt-20 sm:px-8 sm:pt-24">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-smoke">
          {d.services.complementaryLabel}
        </span>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {d.services.complementary.map((c) => {
            const inner = (
              <>
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-[17px] font-medium tracking-[-0.01em] text-bone">{c.name}</h3>
                  {"external" in c && c.external && (
                    <span aria-hidden className="text-[13px] text-smoke transition-colors group-hover:text-accent">
                      &#8599;
                    </span>
                  )}
                </div>
                <p className="mt-2 text-[13px] leading-relaxed text-ash">{c.summary}</p>
              </>
            );
            return "href" in c && c.href ? (
              <a
                key={c.name}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-[12px] border border-line px-5 py-5 transition-colors hover:border-accent/40"
              >
                {inner}
              </a>
            ) : (
              <div key={c.name} className="rounded-[12px] border border-line px-5 py-5">
                {inner}
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA — misma banda compacta que Nosotros */}
      <ContactCta lang={lang} />
    </>
  );
}
