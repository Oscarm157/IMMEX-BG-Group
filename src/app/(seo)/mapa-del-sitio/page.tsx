import Link from "next/link";
import type { Metadata } from "next";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Reveal } from "@/components/site/Reveal";
import { GUIAS } from "@/content/guias";
import { UBICACIONES } from "@/content/ubicaciones";
import { SERVICE_SLUGS } from "@/content/service-slugs";
import { getDictionary } from "@/content/dictionaries";

export const metadata: Metadata = {
  title: "Mapa del sitio | BG Consulting Group",
  description: "La estructura completa del sitio de BG Consulting Group, sección por sección.",
  robots: { index: false, follow: false },
};

type Item = { label: string; href: string };
type Grupo = { eyebrow: string; titulo: string; nota?: string; items: Item[] };

// Etiqueta corta de cada guía: el concepto antes de los dos puntos del H1.
const tituloCorto = (h1: string) => h1.split(":")[0].trim();

export default function MapaDelSitio() {
  const dict = getDictionary("es");

  const grupos: Grupo[] = [
    {
      eyebrow: "Sitio corporativo",
      titulo: "Corporativo",
      nota: "Bilingüe · español e inglés",
      items: [
        { label: "Inicio", href: "/es" },
        { label: dict.nav.about, href: "/es/about" },
        { label: dict.nav.software, href: "/es/software" },
        { label: dict.nav.blog, href: "/es/blog" },
        { label: dict.nav.contact, href: "/es/contact" },
      ],
    },
    {
      eyebrow: "Áreas de práctica",
      titulo: "Servicios",
      items: [
        { label: "Todos los servicios", href: "/es/services" },
        ...SERVICE_SLUGS.map((slug, i) => ({
          label: dict.services.items[i].name,
          href: `/es/services/${slug}`,
        })),
      ],
    },
    {
      eyebrow: "Comercio exterior",
      titulo: "Guías",
      nota: "Conceptos de aduanas e IMMEX con fundamento legal",
      items: [
        { label: "Índice de guías", href: "/guias" },
        ...GUIAS.map((g) => ({ label: tituloCorto(g.h1), href: `/guias/${g.slug}` })),
      ],
    },
    {
      eyebrow: "Cobertura",
      titulo: "Ubicaciones",
      items: [
        { label: "Índice de ubicaciones", href: "/ubicaciones" },
        ...UBICACIONES.map((u) => ({ label: u.ciudad, href: `/ubicaciones/${u.slug}` })),
      ],
    },
    {
      eyebrow: "Comunidad",
      titulo: "Foro",
      items: [{ label: "Foro", href: "/foro" }],
    },
    {
      eyebrow: "Acceso interno",
      titulo: "Panel de administración",
      nota: "Gestión de leads, contenido y campañas (CRM)",
      items: [{ label: "Entrar al panel", href: "/admin/login" }],
    },
  ];

  const totalPaginas = grupos.reduce((n, g) => n + g.items.length, 0);

  return (
    <section className="mx-auto max-w-[1320px] px-5 pb-28 pt-36 sm:px-8 sm:pt-44">
      <SectionHeading
        eyebrow="Mapa del sitio"
        title="Todo el sitio, de un vistazo"
        lead="La estructura completa de BG Consulting Group: sitio corporativo, guías de comercio exterior, cobertura y el panel de gestión."
        className="mb-6"
      />
      <p className="mb-14 font-mono text-[12px] uppercase tracking-[0.18em] text-smoke">
        {grupos.length} secciones · {totalPaginas} páginas
      </p>

      <div className="columns-1 gap-5 md:columns-2">
        {grupos.map((g, i) => (
          <Reveal key={g.titulo} delay={i * 0.05} className="mb-5 block break-inside-avoid">
            <div className="console-panel rounded-[16px] bg-surface-1 px-7 py-7">
              <div className="flex items-baseline justify-between gap-4">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">{g.eyebrow}</span>
                <span className="font-mono text-[11px] tabular-nums text-smoke">
                  {String(g.items.length).padStart(2, "0")}
                </span>
              </div>
              <h2 className="mt-3 font-display text-xl font-medium tracking-[-0.01em] text-chalk">{g.titulo}</h2>
              {g.nota && <p className="mt-1.5 text-[13px] leading-relaxed text-bone/60">{g.nota}</p>}

              <ul className="mt-5 border-t border-line">
                {g.items.map((it) => (
                  <li key={it.href} className="border-b border-line">
                    <Link
                      href={it.href}
                      className="group flex items-center justify-between gap-4 py-3 transition-colors"
                    >
                      <span className="text-[15px] text-bone/90 transition-colors group-hover:text-accent">
                        {it.label}
                      </span>
                      <span className="shrink-0 font-mono text-[11px] text-smoke transition-colors group-hover:text-accent-ink">
                        {it.href}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
