import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLocale } from "@/content/dictionaries";
import { getPublishedArticles, localize, fmtArticleDate, type Locale } from "@/lib/blog/data";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { MediaFrame } from "@/components/site/MediaFrame";

export const dynamic = "force-dynamic";

const COPY = {
  es: { eyebrow: "Noticias", title: "Comercio exterior, al día.", lead: "Cambios normativos, criterios y análisis del comercio exterior entre México y Estados Unidos, con la lectura de BG.", empty: "Pronto publicaremos las primeras notas." },
  en: { eyebrow: "News", title: "Foreign trade, current.", lead: "Regulatory changes, criteria and analysis of trade between Mexico and the United States, read through BG.", empty: "The first notes are coming soon." },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const c = COPY[lang as Locale];
  const title = `${c.eyebrow} · ${c.title}`;
  return {
    title,
    description: c.lead,
    alternates: {
      canonical: `/${lang}/blog`,
      languages: { es: "/es/blog", en: "/en/blog" },
    },
    openGraph: {
      type: "website",
      locale: lang === "es" ? "es_MX" : "en_US",
      siteName: "BG Consulting Group",
      title,
      description: c.lead,
      url: `https://bgconsultingroup.com/${lang}/blog`,
    },
  };
}

export default async function BlogIndex({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = COPY[lang as Locale];
  const articles = await getPublishedArticles();
  const featured = articles[0];
  const rest = articles.slice(1);

  return (
    <section className="mx-auto max-w-[1280px] px-5 pb-24 pt-36 sm:px-8 sm:pt-44">
      <SectionHeading eyebrow={t.eyebrow} title={t.title} lead={t.lead} className="mb-14" />

      {articles.length === 0 ? (
        <div className="console-panel grid place-items-center rounded-[16px] bg-surface-1 px-6 py-24 text-center">
          <span className="font-mono text-[12px] uppercase tracking-[0.16em] text-ash">{t.empty}</span>
        </div>
      ) : (
        <div className="flex flex-col gap-14">
          {/* Destacada */}
          {featured && (
            <Reveal>
              <Link href={`/${lang}/blog/${featured.slug}`} className="group grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-center lg:gap-10">
                <MediaFrame
                  src={featured.coverUrl ?? undefined}
                  ratio="16/9"
                  caption={featured.category ?? t.eyebrow}
                />
                <div>
                  <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                    {[featured.category, fmtArticleDate(featured, lang as Locale)].filter(Boolean).join(" · ")}
                  </span>
                  <h2 className="mt-4 font-display text-[clamp(1.6rem,3vw,2.4rem)] font-medium leading-tight tracking-[-0.02em] text-chalk transition-colors group-hover:text-accent">
                    {localize(featured, lang as Locale).title}
                  </h2>
                  <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-bone/90">
                    {localize(featured, lang as Locale).excerpt}
                  </p>
                </div>
              </Link>
            </Reveal>
          )}

          {/* Resto */}
          {rest.length > 0 && (
            <div className="grid gap-x-8 gap-y-12 border-t border-line pt-14 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((a, i) => {
                const l = localize(a, lang as Locale);
                return (
                  <Reveal key={a.id} delay={Math.min(i, 5) * 0.05}>
                    <Link href={`/${lang}/blog/${a.slug}`} className="group flex flex-col gap-4">
                      <MediaFrame src={a.coverUrl ?? undefined} ratio="3/2" caption={a.category ?? t.eyebrow} />
                      <div>
                        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                          {[a.category, fmtArticleDate(a, lang as Locale)].filter(Boolean).join(" · ")}
                        </span>
                        <h3 className="mt-2 font-display text-lg font-medium leading-snug tracking-[-0.01em] text-chalk transition-colors group-hover:text-accent">
                          {l.title}
                        </h3>
                        <p className="mt-2 text-[14px] leading-relaxed text-bone/75">{l.excerpt}</p>
                      </div>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
