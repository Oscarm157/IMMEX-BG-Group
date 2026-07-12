import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLocale } from "@/content/dictionaries";
import { getPublishedArticleBySlug, localize, fmtArticleDate, type Locale } from "@/lib/blog/data";
import { Reveal } from "@/components/site/Reveal";
import { PillButton } from "@/components/site/PillButton";
import { MediaFrame } from "@/components/site/MediaFrame";
import { Markdown } from "@/components/site/Markdown";

export const dynamic = "force-dynamic";

const BASE_URL = "https://bgconsultingroup.com";
const FALLBACK_OG = "/img/gen/border-crossing.webp";

const COPY = {
  es: { back: "Todas las noticias", recommendations: "Recomendaciones de BG", source: "Fuente", cta: "Si un cambio normativo toca tu operación, el equipo de BG te dice qué significa y qué ajustar." },
  en: { back: "All news", recommendations: "BG recommendations", source: "Source", cta: "When a regulatory change touches your operation, the BG team tells you what it means and what to adjust." },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};
  const a = await getPublishedArticleBySlug(slug);
  if (!a) return {};
  const l = localize(a, lang as Locale);
  const canonicalPath = `/${lang}/blog/${slug}`;
  const ogImage = a.coverUrl ?? FALLBACK_OG;
  const description = l.excerpt ?? undefined;

  return {
    title: l.title,
    description,
    alternates: {
      canonical: canonicalPath,
      languages: { es: `/es/blog/${slug}`, en: `/en/blog/${slug}` },
    },
    openGraph: {
      type: "article",
      locale: lang === "es" ? "es_MX" : "en_US",
      siteName: "BG Consulting Group",
      title: l.title,
      description,
      url: `${BASE_URL}${canonicalPath}`,
      publishedTime: a.publishedAt ? new Date(a.publishedAt).toISOString() : undefined,
      modifiedTime: a.updatedAt ? new Date(a.updatedAt).toISOString() : undefined,
      section: a.category ?? undefined,
      images: [{ url: ogImage, width: 1280, height: 720, alt: l.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: l.title,
      description,
      images: [ogImage],
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const a = await getPublishedArticleBySlug(slug);
  if (!a) notFound();
  const t = COPY[lang as Locale];
  const l = localize(a, lang as Locale);

  const articleUrl = `${BASE_URL}/${lang}/blog/${slug}`;
  const ogImage = a.coverUrl ? `${BASE_URL}${a.coverUrl}` : `${BASE_URL}${FALLBACK_OG}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "NewsArticle",
        headline: l.title,
        description: l.excerpt ?? undefined,
        image: [ogImage],
        datePublished: a.publishedAt ? new Date(a.publishedAt).toISOString() : undefined,
        dateModified: a.updatedAt ? new Date(a.updatedAt).toISOString() : undefined,
        inLanguage: lang === "es" ? "es-MX" : "en-US",
        articleSection: a.category ?? undefined,
        author: { "@type": "Organization", name: "BG Consulting Group", url: `${BASE_URL}/${lang}` },
        publisher: {
          "@type": "Organization",
          name: "BG Consulting Group",
          logo: { "@type": "ImageObject", url: `${BASE_URL}/BG_Logotipo.png` },
        },
        mainEntityOfPage: articleUrl,
        ...(a.sourceUrl ? { isBasedOn: a.sourceUrl } : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: lang === "es" ? "Inicio" : "Home", item: `${BASE_URL}/${lang}` },
          { "@type": "ListItem", position: 2, name: lang === "es" ? "Noticias" : "News", item: `${BASE_URL}/${lang}/blog` },
          { "@type": "ListItem", position: 3, name: l.title, item: articleUrl },
        ],
      },
    ],
  };

  return (
    <article className="mx-auto max-w-[980px] px-5 pb-28 pt-36 sm:px-8 sm:pt-44">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Reveal>
        <Link href={`/${lang}/blog`} className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent transition-colors hover:text-accent-dim">
          &larr; {t.back}
        </Link>
      </Reveal>

      <Reveal delay={0.06}>
        <span className="mt-8 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ash">
          {[a.category, fmtArticleDate(a, lang as Locale)].filter(Boolean).join(" · ")}
        </span>
        <h1 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.4rem)] font-medium leading-[1.04] tracking-[-0.03em] text-chalk">
          {l.title}
        </h1>
        {l.excerpt && <p className="mt-5 max-w-[720px] text-[19px] leading-relaxed text-bone/90">{l.excerpt}</p>}
      </Reveal>

      <Reveal delay={0.12} className="mt-10">
        <MediaFrame src={a.coverUrl ?? undefined} ratio="16/9" caption={a.category ?? "Noticia"} />
      </Reveal>

      {l.body && (
        <div className="mt-12 max-w-[760px]">
          <Markdown>{l.body}</Markdown>
        </div>
      )}

      {l.recommendations && (
        <div className="console-panel mt-12 rounded-[16px] bg-surface-1 p-7 sm:p-9">
          <h2 className="flex items-center gap-2.5 font-display text-xl font-medium tracking-[-0.01em] text-chalk">
            <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-accent signal-glow" />
            {t.recommendations}
          </h2>
          <div className="mt-2">
            <Markdown>{l.recommendations}</Markdown>
          </div>
        </div>
      )}

      {a.sourceUrl && (
        <p className="mt-10 font-mono text-[12px] uppercase tracking-[0.12em] text-ash">
          {t.source}:{" "}
          <a href={a.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-bone/80 underline underline-offset-2 hover:text-accent">
            {a.sourceName ?? a.sourceUrl}
          </a>
        </p>
      )}

      <div className="mt-16 border-t border-line pt-10">
        <p className="mb-5 max-w-2xl font-display text-2xl font-medium leading-snug tracking-[-0.01em] text-chalk">{t.cta}</p>
        <PillButton href={`/${lang}/contact`} variant="accent" arrow>
          {lang === "es" ? "Hablemos" : "Let's talk"}
        </PillButton>
      </div>
    </article>
  );
}
