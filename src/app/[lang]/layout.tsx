import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { LangSetter } from "@/components/site/LangSetter";
import { ChatWidget } from "@/components/site/ChatWidget";
import { getDictionary, isLocale, locales } from "@/content/dictionaries";
import { SERVICE_SLUGS } from "@/content/service-slugs";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const d = getDictionary(lang);
  return {
    description: d.footer.tagline,
    openGraph: {
      type: "website",
      locale: lang === "es" ? "es_MX" : "en_US",
      siteName: "BG Consulting Group",
      description: d.footer.tagline,
    },
    alternates: {
      languages: { es: "/es", en: "/en" },
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <>
      <LangSetter lang={lang} />
      <div className="grain" aria-hidden />
      <Nav
        lang={lang}
        dict={dict.nav}
        langSwitch={dict.langSwitch}
        services={dict.services.items}
        slugs={SERVICE_SLUGS}
        servicesCta={dict.servicesPreview.cta}
        software={{
          items: dict.software.capabilities.map((c) => c.title),
          cta: dict.software.cta,
          external: dict.software.ctaHref,
        }}
      />
      <main>{children}</main>
      <Footer lang={lang} dict={dict} />
      <ChatWidget />
    </>
  );
}
