"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Logo } from "@/components/Logo";
import { PillButton } from "./PillButton";
import type { Locale } from "@/content/dictionaries";

type NavDict = {
  services: string;
  about: string;
  software: string;
  contact: string;
  cta: string;
  megaTitle: string;
  megaLead: string;
  groups: readonly string[];
  softwareBlurb: string;
};

type ServiceItem = { name: string; summary: string };
type SoftwareNav = { items: readonly string[]; cta: string; external: string };

const GROUPS: number[][] = [
  [0, 1, 5], // Legal y cumplimiento
  [2, 3, 7], // Operación aduanera
  [6, 4], // Origen y logística
];

type MenuKey = "servicios" | "software" | null;

function Chevron({ open }: { open: boolean }) {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
      <path d="M3 4.5 L6 7.5 L9 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Nav({
  lang,
  dict,
  langSwitch,
  services,
  slugs,
  servicesCta,
  software,
}: {
  lang: Locale;
  dict: NavDict;
  langSwitch: { to: string; aria: string };
  services: readonly ServiceItem[];
  slugs: readonly string[];
  servicesCta: string;
  software: SoftwareNav;
}) {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false); // mobile
  const [menu, setMenu] = useState<MenuKey>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMenu(null);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenu(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const openMenu = (k: MenuKey) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMenu(k);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMenu(null), 120);
  };

  const otherLang = lang === "es" ? "en" : "es";
  const rest = pathname.replace(/^\/(es|en)/, "");
  const switchHref = `/${otherLang}${rest || ""}`;

  const servicesActive = pathname.startsWith(`/${lang}/services`);
  const softwareActive = pathname.startsWith(`/${lang}/software`);
  const aboutActive = pathname.startsWith(`/${lang}/about`);

  const triggerCls = (active: boolean) =>
    `flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[15px] tracking-[-0.01em] transition-colors ${
      active ? "bg-surface-2 text-chalk" : "text-bone/90 hover:text-chalk"
    }`;

  return (
    <header
      onMouseLeave={scheduleClose}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        menu ? "border-b border-line bg-ink" : scrolled ? "border-b border-white/[0.06] bg-ink/85 backdrop-blur-xl" : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-20 max-w-[1280px] items-center justify-between px-5 sm:h-[100px] sm:px-8">
        <Link href={`/${lang}`} aria-label="BG Consulting Group" className="shrink-0">
          <Logo variant="bg" tone="light" size="sm" className="h-12 w-auto sm:h-[72px]" />
        </Link>

        <div className="hidden items-center gap-5 md:flex">
          <Link
            href={`/${lang}/services`}
            onMouseEnter={() => openMenu("servicios")}
            onFocus={() => openMenu("servicios")}
            aria-expanded={menu === "servicios"}
            className={triggerCls(menu === "servicios" || servicesActive)}
          >
            {dict.services}
            <Chevron open={menu === "servicios"} />
          </Link>

          <Link
            href={`/${lang}/about`}
            onMouseEnter={scheduleClose}
            className={`px-3 py-1.5 text-[15px] tracking-[-0.01em] transition-colors ${aboutActive ? "text-chalk" : "text-bone/90 hover:text-chalk"}`}
          >
            {dict.about}
          </Link>

          <Link
            href={`/${lang}/software`}
            onMouseEnter={() => openMenu("software")}
            onFocus={() => openMenu("software")}
            aria-expanded={menu === "software"}
            className={triggerCls(menu === "software" || softwareActive)}
          >
            {dict.software}
            <Chevron open={menu === "software"} />
          </Link>

          <Link
            href={`/${lang}/contact`}
            onMouseEnter={scheduleClose}
            className={`px-3 py-1.5 text-[15px] tracking-[-0.01em] transition-colors ${pathname === `/${lang}/contact` ? "text-chalk" : "text-bone/90 hover:text-chalk"}`}
          >
            {dict.contact}
          </Link>

          <Link href={switchHref} aria-label={langSwitch.aria} className="text-[13px] font-medium tracking-[0.08em] text-smoke transition-colors hover:text-chalk">
            {langSwitch.to}
          </Link>
          <PillButton href={`/${lang}/contact`} variant="accent" className="px-5 py-2.5 text-sm">
            {dict.cta}
          </PillButton>
        </div>

        <button onClick={() => setOpen((v) => !v)} className="flex flex-col gap-[5px] p-2 md:hidden" aria-label="Menu" aria-expanded={open}>
          <span className={`h-px w-6 bg-chalk transition-transform duration-300 ${open ? "translate-y-[6px] rotate-45" : ""}`} />
          <span className={`h-px w-6 bg-chalk transition-opacity duration-300 ${open ? "opacity-0" : ""}`} />
          <span className={`h-px w-6 bg-chalk transition-transform duration-300 ${open ? "-translate-y-[6px] -rotate-45" : ""}`} />
        </button>
      </nav>

      {/* Mega-menú Servicios (full-width) */}
      <AnimatePresence>
        {menu === "servicios" && (
          <motion.div
            key="mega-serv"
            initial={{ opacity: 0, y: reduce ? 0 : -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduce ? 0 : -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => openMenu("servicios")}
            className="absolute inset-x-0 top-full hidden border-t border-line bg-ink md:block"
          >
            <div className="mx-auto grid max-w-[1280px] gap-10 px-5 py-10 sm:px-8 lg:grid-cols-[0.8fr_2fr] lg:gap-16">
              <div className="flex flex-col items-start">
                <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                  <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-accent signal-glow" />
                  {dict.services}
                </span>
                <h3 className="mt-4 max-w-xs font-display text-2xl font-medium leading-tight tracking-[-0.02em] text-chalk">{dict.megaTitle}</h3>
                <p className="mt-3 max-w-xs text-[14px] leading-relaxed text-bone/90">{dict.megaLead}</p>
                <PillButton href={`/${lang}/services`} variant="ghost" arrow className="mt-6 text-sm">
                  {servicesCta}
                </PillButton>
              </div>
              <div className="grid gap-x-10 gap-y-9 sm:grid-cols-3 lg:border-l lg:border-line lg:pl-16">
                {GROUPS.map((group, gi) => (
                  <div key={gi}>
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ash">{dict.groups[gi]}</span>
                    <ul className="mt-4 flex flex-col gap-4">
                      {group.map((idx) => (
                        <li key={slugs[idx]}>
                          <Link href={`/${lang}/services/${slugs[idx]}`} className="group block">
                            <span className="flex items-baseline gap-2">
                              <span className="font-mono text-[11px] tabular-nums text-accent">{String(idx + 1).padStart(2, "0")}</span>
                              <span className="font-display text-[15px] font-medium text-chalk transition-colors group-hover:text-accent">{services[idx].name}</span>
                            </span>
                            <span className="mt-1 block pl-6 text-[12.5px] leading-snug text-bone/70">{services[idx].summary}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dropdown Software (compacto) */}
      <AnimatePresence>
        {menu === "software" && (
          <motion.div
            key="mega-soft"
            initial={{ opacity: 0, y: reduce ? 0 : -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduce ? 0 : -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => openMenu("software")}
            className="absolute right-5 top-full hidden w-[min(92vw,520px)] sm:right-8 md:block"
          >
            <div className="console-panel mt-2 rounded-[14px] border border-line bg-ink p-6">
              <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-accent signal-glow" />
                {dict.software}
              </span>
              <p className="mt-3 text-[13.5px] leading-relaxed text-bone/90">{dict.softwareBlurb}</p>
              <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-line pt-5">
                {software.items.map((it) => (
                  <li key={it}>
                    <Link href={`/${lang}/software`} className="group flex items-center gap-2 text-[14px] text-chalk transition-colors hover:text-accent">
                      <span aria-hidden className="h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {it}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex items-center gap-5 border-t border-line pt-5">
                <PillButton href={`/${lang}/software`} variant="ghost" arrow className="text-sm">
                  {dict.software}
                </PillButton>
                <a href={software.external} target="_blank" rel="noopener noreferrer" className="font-mono text-[12px] uppercase tracking-[0.1em] text-smoke transition-colors hover:text-accent">
                  BMS ↗
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Menú móvil */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-line bg-ink md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-6">
              {[
                { href: `/${lang}/services`, label: dict.services },
                { href: `/${lang}/about`, label: dict.about },
                { href: `/${lang}/software`, label: dict.software },
                { href: `/${lang}/contact`, label: dict.contact },
              ].map((l) => (
                <Link key={l.href} href={l.href} className="py-3 text-2xl font-display tracking-tight text-chalk">
                  {l.label}
                </Link>
              ))}
              <div className="mt-4 flex items-center gap-4">
                <PillButton href={`/${lang}/contact`} variant="accent" arrow>
                  {dict.cta}
                </PillButton>
                <Link href={switchHref} className="text-[13px] font-medium tracking-[0.08em] text-smoke">
                  {langSwitch.to}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
