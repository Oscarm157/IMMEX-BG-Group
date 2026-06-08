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
  software: string;
  contact: string;
  cta: string;
  megaTitle: string;
  megaLead: string;
  groups: readonly string[];
};

type ServiceItem = { name: string; summary: string };

// Agrupación de servicios por índice (orden de SERVICE_SLUGS / services.items)
const GROUPS: number[][] = [
  [0, 1, 5], // Legal y cumplimiento
  [2, 3, 7], // Operación aduanera
  [6, 4], // Origen y logística
];

export function Nav({
  lang,
  dict,
  langSwitch,
  services,
  slugs,
  servicesCta,
}: {
  lang: Locale;
  dict: NavDict;
  langSwitch: { to: string; aria: string };
  services: readonly ServiceItem[];
  slugs: readonly string[];
  servicesCta: string;
}) {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false); // mobile menu
  const [mega, setMega] = useState(false); // desktop mega-menu
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMega(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMega(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const openMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMega(true);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMega(false), 120);
  };

  const links = [
    { href: `/${lang}/software`, label: dict.software },
    { href: `/${lang}/contact`, label: dict.contact },
  ];

  const otherLang = lang === "es" ? "en" : "es";
  const rest = pathname.replace(/^\/(es|en)/, "");
  const switchHref = `/${otherLang}${rest || ""}`;

  const servicesActive = pathname.startsWith(`/${lang}/services`);

  return (
    <header
      onMouseLeave={scheduleClose}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled || mega
          ? "border-b border-white/[0.06] bg-ink/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-20 max-w-[1280px] items-center justify-between px-5 sm:h-[100px] sm:px-8">
        <Link href={`/${lang}`} aria-label="BG Consulting Group" className="shrink-0">
          <Logo variant="bg" tone="light" size="sm" className="h-12 w-auto sm:h-[72px]" />
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {/* Servicios: trigger del mega-menú */}
          <Link
            href={`/${lang}/services`}
            onMouseEnter={openMega}
            onFocus={openMega}
            aria-expanded={mega}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[15px] tracking-[-0.01em] transition-colors ${
              mega || servicesActive ? "bg-surface-2 text-chalk" : "text-bone/90 hover:text-chalk"
            }`}
          >
            {dict.services}
            <svg
              width="11"
              height="11"
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden
              className={`transition-transform duration-300 ${mega ? "rotate-180" : ""}`}
            >
              <path d="M3 4.5 L6 7.5 L9 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>

          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onMouseEnter={scheduleClose}
              className={`text-[15px] tracking-[-0.01em] transition-colors ${
                pathname === l.href ? "text-chalk" : "text-bone/90 hover:text-chalk"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href={switchHref}
            aria-label={langSwitch.aria}
            className="text-[13px] font-medium tracking-[0.08em] text-smoke transition-colors hover:text-chalk"
          >
            {langSwitch.to}
          </Link>
          <PillButton href={`/${lang}/contact`} variant="accent" className="px-5 py-2.5 text-sm">
            {dict.cta}
          </PillButton>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="flex flex-col gap-[5px] p-2 md:hidden"
          aria-label="Menu"
          aria-expanded={open}
        >
          <span className={`h-px w-6 bg-chalk transition-transform duration-300 ${open ? "translate-y-[6px] rotate-45" : ""}`} />
          <span className={`h-px w-6 bg-chalk transition-opacity duration-300 ${open ? "opacity-0" : ""}`} />
          <span className={`h-px w-6 bg-chalk transition-transform duration-300 ${open ? "-translate-y-[6px] -rotate-45" : ""}`} />
        </button>
      </nav>

      {/* Mega-menú Servicios (desktop, full-width) */}
      <AnimatePresence>
        {mega && (
          <motion.div
            key="mega"
            initial={{ opacity: 0, y: reduce ? 0 : -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduce ? 0 : -8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={openMega}
            className="absolute inset-x-0 top-full hidden border-t border-line bg-ink/95 backdrop-blur-xl md:block"
          >
            <div className="mx-auto grid max-w-[1280px] gap-10 px-5 py-10 sm:px-8 lg:grid-cols-[0.8fr_2fr] lg:gap-16">
              {/* Lead */}
              <div className="flex flex-col items-start">
                <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                  <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-accent signal-glow" />
                  {dict.services}
                </span>
                <h3 className="mt-4 max-w-xs font-display text-2xl font-medium leading-tight tracking-[-0.02em] text-chalk">
                  {dict.megaTitle}
                </h3>
                <p className="mt-3 max-w-xs text-[14px] leading-relaxed text-bone/90">{dict.megaLead}</p>
                <PillButton href={`/${lang}/services`} variant="ghost" arrow className="mt-6 text-sm">
                  {servicesCta}
                </PillButton>
              </div>

              {/* Grilla de servicios por grupo */}
              <div className="grid gap-x-10 gap-y-9 sm:grid-cols-3 lg:border-l lg:border-line lg:pl-16">
                {GROUPS.map((group, gi) => (
                  <div key={gi}>
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ash">
                      {dict.groups[gi]}
                    </span>
                    <ul className="mt-4 flex flex-col gap-4">
                      {group.map((idx) => (
                        <li key={slugs[idx]}>
                          <Link href={`/${lang}/services/${slugs[idx]}`} className="group block">
                            <span className="flex items-baseline gap-2">
                              <span className="font-mono text-[11px] tabular-nums text-accent">
                                {String(idx + 1).padStart(2, "0")}
                              </span>
                              <span className="font-display text-[15px] font-medium text-chalk transition-colors group-hover:text-accent">
                                {services[idx].name}
                              </span>
                            </span>
                            <span className="mt-1 block pl-6 text-[12.5px] leading-snug text-bone/70">
                              {services[idx].summary}
                            </span>
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

      {/* Menú móvil */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-white/[0.06] bg-ink/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-6">
              <Link href={`/${lang}/services`} className="py-3 text-2xl font-display tracking-tight text-chalk">
                {dict.services}
              </Link>
              {links.map((l) => (
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
