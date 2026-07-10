import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLocale } from "@/content/dictionaries";
import { siteConfig } from "@/lib/site-config";
import { SectionHeading } from "@/components/site/SectionHeading";

// Aviso de privacidad base (LFPDPPP), anclado a los datos reales de siteConfig.
// El texto es una base estándar: el área legal de BG debe validarlo y ajustar
// finalidades/transferencias específicas antes de considerarlo definitivo.

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const title = lang === "es" ? "Aviso de privacidad" : "Privacy notice";
  return { title, alternates: { canonical: `/${lang}/privacy` } };
}

const ACTUALIZADO = { es: "10 de julio de 2026", en: "July 10, 2026" };

type Bloque = { h: string; p: string[] };

function contenido(lang: "es" | "en"): { titulo: string; intro: string; bloques: Bloque[] } {
  const sede = siteConfig.offices[0];
  const email = siteConfig.email;

  if (lang === "en") {
    return {
      titulo: "Privacy notice",
      intro:
        "This notice explains how BG Consulting Group collects, uses, and protects your personal data, in accordance with Mexico's Federal Law on Protection of Personal Data Held by Private Parties (LFPDPPP).",
      bloques: [
        {
          h: "Data controller",
          p: [
            `${siteConfig.name}, with address at ${sede.address}, is responsible for the processing of your personal data.`,
            `For any matter related to this notice you can reach us at ${email} or ${sede.phone}.`,
          ],
        },
        {
          h: "Personal data we collect",
          p: [
            "We collect the data you provide directly through our contact form, chat, or email: name, corporate email, phone number, company, and the content of your message.",
            "We do not collect sensitive personal data through this website.",
          ],
        },
        {
          h: "Purposes",
          p: [
            "Primary purposes: to respond to your inquiry, provide the foreign-trade, customs, legal, fiscal, and compliance services you request, and follow up commercially on your request.",
            "Secondary purposes: to send you relevant information about our services. You may opt out of secondary purposes at any time by writing to us.",
          ],
        },
        {
          h: "Data transfers",
          p: [
            "We do not sell your data. We only share it with service providers that support our operation (for example, email delivery and hosting) under confidentiality obligations, and with authorities when legally required.",
          ],
        },
        {
          h: "Your ARCO rights",
          p: [
            "You have the right to Access, Rectify, Cancel, or Object to the processing of your data (ARCO rights), and to revoke your consent.",
            `To exercise them, send your request to ${email}, indicating your name and the right you wish to exercise.`,
          ],
        },
        {
          h: "Cookies and analytics",
          p: [
            "This website may use cookies and analytics tools to understand how it is used and improve it. You can disable cookies in your browser settings.",
          ],
        },
        {
          h: "Changes to this notice",
          p: [
            "We may update this notice. The current version is always available on this page, with its last-updated date below.",
          ],
        },
      ],
    };
  }

  return {
    titulo: "Aviso de privacidad",
    intro:
      "Este aviso explica cómo BG Consulting Group recaba, usa y protege tus datos personales, conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP).",
    bloques: [
      {
        h: "Responsable",
        p: [
          `${siteConfig.name}, con domicilio en ${sede.address}, es responsable del tratamiento de tus datos personales.`,
          `Para cualquier asunto relacionado con este aviso puedes contactarnos en ${email} o al ${sede.phone}.`,
        ],
      },
      {
        h: "Datos personales que recabamos",
        p: [
          "Recabamos los datos que nos proporcionas directamente a través del formulario de contacto, el chat o el correo: nombre, correo corporativo, teléfono, empresa y el contenido de tu mensaje.",
          "No recabamos datos personales sensibles a través de este sitio web.",
        ],
      },
      {
        h: "Finalidades",
        p: [
          "Finalidades primarias: atender tu solicitud, brindarte los servicios de comercio exterior, aduanas, legal, fiscal y cumplimiento que requieras, y dar seguimiento comercial a tu petición.",
          "Finalidades secundarias: enviarte información relevante sobre nuestros servicios. Puedes oponerte a las finalidades secundarias en cualquier momento escribiéndonos.",
        ],
      },
      {
        h: "Transferencias de datos",
        p: [
          "No vendemos tus datos. Solo los compartimos con proveedores que dan soporte a nuestra operación (por ejemplo, envío de correo y hospedaje) bajo obligaciones de confidencialidad, y con autoridades cuando la ley lo exija.",
        ],
      },
      {
        h: "Tus derechos ARCO",
        p: [
          "Tienes derecho a Acceder, Rectificar, Cancelar u Oponerte al tratamiento de tus datos (derechos ARCO), así como a revocar tu consentimiento.",
          `Para ejercerlos, envía tu solicitud a ${email}, indicando tu nombre y el derecho que deseas ejercer.`,
        ],
      },
      {
        h: "Cookies y analítica",
        p: [
          "Este sitio puede usar cookies y herramientas de analítica para entender cómo se utiliza y mejorarlo. Puedes deshabilitar las cookies en la configuración de tu navegador.",
        ],
      },
      {
        h: "Cambios al aviso",
        p: [
          "Podemos actualizar este aviso. La versión vigente siempre está disponible en esta página, con su fecha de última actualización al pie.",
        ],
      },
    ],
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const c = contenido(lang);

  return (
    <section className="mx-auto max-w-[820px] px-5 pb-28 pt-36 sm:px-8 sm:pt-44">
      <SectionHeading eyebrow={lang === "es" ? "Legal" : "Legal"} title={c.titulo} lead={c.intro} className="mb-14" />
      <div className="flex flex-col gap-10">
        {c.bloques.map((b) => (
          <div key={b.h}>
            <h2 className="font-display text-xl font-medium tracking-[-0.01em] text-chalk">{b.h}</h2>
            <div className="mt-3 flex flex-col gap-3">
              {b.p.map((t, i) => (
                <p key={i} className="text-[16px] leading-relaxed text-bone/85">
                  {t}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-14 border-t border-line pt-6 font-mono text-[12px] uppercase tracking-[0.16em] text-smoke">
        {lang === "es" ? "Última actualización" : "Last updated"}: {ACTUALIZADO[lang]}
      </p>
    </section>
  );
}
