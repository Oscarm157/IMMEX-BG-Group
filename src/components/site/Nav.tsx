"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Logo } from "@/components/Logo";
import { PillButton } from "./PillButton";
import type { Locale } from "@/content/dictionaries";

type NavDict = {
  services: string;
  software: string;
  contact: string;
  cta: string;
};

export function Nav({
  lang,
  dict,
  langSwitch,
}: {
  lang: Locale;
  dict: NavDict;
  langSwitch: { to: string; aria: string };
}) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const links = [
    { href: `/${lang}/services`, label: dict.services },
    { href: `/${lang}/software`, label: dict.software },
    { href: `/${lang}/contact`, label: dict.contact },
  ];

  const otherLang = lang === "es" ? "en" : "es";
  const rest = pathname.replace(/^\/(es|en)/, "");
  const switchHref = `/${otherLang}${rest || ""}`;

  const isActive = (href: string) => pathname === href;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled
          ? "border-b border-white/[0.06] bg-void/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-[68px] max-w-[1280px] items-center justify-between px-5 sm:px-8">
        <Link href={`/${lang}`} aria-label="BG Consulting Group" className="shrink-0">
          <Logo variant="bg" tone="light" size="sm" />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-[15px] tracking-[-0.01em] transition-colors ${
                isActive(l.href) ? "text-chalk" : "text-bone/70 hover:text-chalk"
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
          <PillButton href={`/${lang}/contact`} variant="primary" className="px-5 py-2.5 text-sm">
            {dict.cta}
          </PillButton>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="flex flex-col gap-[5px] p-2 md:hidden"
          aria-label="Menu"
          aria-expanded={open}
        >
          <span
            className={`h-px w-6 bg-chalk transition-transform duration-300 ${open ? "translate-y-[6px] rotate-45" : ""}`}
          />
          <span className={`h-px w-6 bg-chalk transition-opacity duration-300 ${open ? "opacity-0" : ""}`} />
          <span
            className={`h-px w-6 bg-chalk transition-transform duration-300 ${open ? "-translate-y-[6px] -rotate-45" : ""}`}
          />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-white/[0.06] bg-void/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-6">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="py-3 text-2xl font-display tracking-tight text-chalk"
                >
                  {l.label}
                </Link>
              ))}
              <div className="mt-4 flex items-center gap-4">
                <PillButton href={`/${lang}/contact`} variant="accent" arrow>
                  {dict.cta}
                </PillButton>
                <Link
                  href={switchHref}
                  className="text-[13px] font-medium tracking-[0.08em] text-smoke"
                >
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
