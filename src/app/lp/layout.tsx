import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { LangSetter } from "@/components/site/LangSetter";
import { ChatWidget } from "@/components/site/ChatWidget";
import { getDictionary } from "@/content/dictionaries";
import { SERVICE_SLUGS } from "@/content/service-slugs";

// Shell corporativo, el mismo del corpus SEO: las landings de pauta se leen como
// parte del sitio. Sin FeedbackWidget, que es de calidad interna y no va en
// tráfico pagado. El teléfono ya vive en la nav y en la barra fija de móvil.
export default function LpLayout({ children }: { children: React.ReactNode }) {
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
      {/* La barra fija de CTA en móvil se monta sobre el pie: este hueco evita
          que le tape la última línea. */}
      <div aria-hidden className="h-[68px] lg:hidden" />
      <ChatWidget />
    </>
  );
}
