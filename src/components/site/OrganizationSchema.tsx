import { siteConfig } from "@/lib/site-config";

// JSON-LD de la entidad, a nivel sitio. Los bots de los LLMs leen el schema
// primero para evaluar la ENTIDAD (autoridad EAT). Todo sale de siteConfig.
const BASE = "https://bgconsultingroup.com";

export function OrganizationSchema() {
  const sede = siteConfig.offices[0];

  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${BASE}/#organization`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: `${BASE}/es`,
    logo: `${BASE}/BG_Logo_Color.png`,
    image: `${BASE}/opengraph-image`,
    description:
      "Firma de comercio exterior, aduanas, legal, fiscal y cumplimiento con más de 20 años de práctica entre Tijuana y San Diego. Asesoría legal y de defensa, cumplimiento IMMEX (Anexo 24, 30 y 31), certificación IVA/IEPS, clasificación y valoración aduanera, y el software BMS.",
    email: siteConfig.email,
    telephone: sede.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Miguel Alemán 3231 B, Col. Gabilondo",
      addressLocality: "Tijuana",
      addressRegion: "Baja California",
      postalCode: "22044",
      addressCountry: "MX",
    },
    areaServed: [
      { "@type": "Country", name: "México" },
      { "@type": "City", name: "Tijuana" },
      { "@type": "City", name: "San Diego" },
    ],
    knowsAbout: [
      "Comercio exterior",
      "Aduanas",
      "IMMEX",
      "Anexo 24",
      "Anexo 30",
      "Certificación IVA e IEPS",
      "Clasificación arancelaria",
      "Valoración aduanera",
      "Cumplimiento aduanero",
    ],
    sameAs: siteConfig.social.map((s) => s.href),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
