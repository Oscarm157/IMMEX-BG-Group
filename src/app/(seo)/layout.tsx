import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { LangSetter } from "@/components/site/LangSetter";
import { ChatWidget } from "@/components/site/ChatWidget";
import { FeedbackWidget } from "@/components/site/FeedbackWidget";
import { getDictionary } from "@/content/dictionaries";
import { SERVICE_SLUGS } from "@/content/service-slugs";

// Corpus SEO español-first. Reusa el shell corporativo con lang fijo "es".
// El langSwitch se oculta: estas rutas no tienen variante /en.
export default function SeoLayout({ children }: { children: React.ReactNode }) {
  const dict = getDictionary("es");

  return (
    <>
      <LangSetter lang="es" />
      <div className="grain" aria-hidden />
      <Nav
        lang="es"
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
        hideLangSwitch
      />
      <main>{children}</main>
      <Footer lang="es" dict={dict} />
      <ChatWidget />
      <FeedbackWidget />
    </>
  );
}
