import Link from "next/link";
import { Logo } from "@/components/Logo";
import type { Dictionary, Locale } from "@/content/dictionaries";

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/bgconsultingroup/" },
  { label: "Instagram", href: "https://www.instagram.com/bgconsultingroup/" },
  { label: "Facebook", href: "https://www.facebook.com/bgconsulting/" },
  { label: "X", href: "https://twitter.com/BGC_MX" },
];

export function Footer({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const links = [
    { href: `/${lang}/services`, label: dict.nav.services },
    { href: `/${lang}/software`, label: dict.nav.software },
    { href: `/${lang}/contact`, label: dict.nav.contact },
  ];

  return (
    <footer className="border-t border-white/[0.08] bg-void">
      <div className="mx-auto max-w-[1280px] px-5 py-20 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div className="max-w-sm">
            <Logo variant="bg" tone="light" size="md" />
            <p className="mt-6 text-[15px] leading-relaxed text-bone/70">{dict.footer.tagline}</p>
            <a
              href={`mailto:${dict.contact.email}`}
              className="mt-6 inline-block text-[15px] text-chalk underline decoration-accent decoration-2 underline-offset-4 transition-colors hover:text-accent"
            >
              {dict.contact.email}
            </a>
          </div>

          <div>
            <h3 className="text-[12px] font-medium uppercase tracking-[0.16em] text-smoke">
              {dict.footer.nav}
            </h3>
            <ul className="mt-5 space-y-3">
              {links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[15px] text-bone/80 transition-colors hover:text-chalk">
                    {l.label}
                  </Link>
                </li>
              ))}
              {socials.map((s) => (
                <li key={s.label} className="lg:hidden">
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-[15px] text-bone/80 transition-colors hover:text-chalk">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[12px] font-medium uppercase tracking-[0.16em] text-smoke">
              {dict.footer.offices}
            </h3>
            <ul className="mt-5 space-y-5">
              {dict.contact.offices.map((o) => (
                <li key={o.country} className="text-[14px] leading-relaxed text-bone/70">
                  <span className="block text-chalk">{o.country}</span>
                  {o.address}
                  <br />
                  <a href={`tel:${o.phone.replace(/[^+\d]/g, "")}`} className="transition-colors hover:text-chalk">
                    {o.phone}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-6 hidden gap-4 lg:flex">
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="text-[13px] text-smoke transition-colors hover:text-chalk">
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-white/[0.08] pt-8 sm:flex-row sm:items-center">
          <span className="text-[13px] text-ash">
            &copy; {2026} BG Consulting Group. {dict.footer.rights}
          </span>
          <div className="flex items-center gap-3 text-[13px] text-ash">
            <span>{dict.footer.partner}</span>
            <a href="https://www.bmscustomsystem.com/" target="_blank" rel="noopener noreferrer" className="opacity-70 transition-opacity hover:opacity-100">
              <Logo variant="bms" tone="light" size="sm" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
