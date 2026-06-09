"use client";

import { useState } from "react";
import { motion } from "motion/react";
import type { Red, Variante } from "@/lib/posts/types";
import { CarouselSlides } from "./CarouselSlides";

interface Props {
  index: number;
  variant: Variante;
  networks: Red[];
}

const NET_LABEL: Record<Red, string> = { linkedin: "LinkedIn", instagram: "Instagram", facebook: "Facebook" };

export function PostVariantCard({ index, variant, networks }: Props) {
  const available = networks.filter((n) => {
    if (n === "instagram") return !!variant.instagram;
    if (n === "linkedin") return !!variant.linkedin;
    if (n === "facebook") return !!variant.facebook;
    return false;
  });
  const [active, setActive] = useState<Red>(available[0] ?? "linkedin");

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 28, delay: index * 0.08 }}
      whileHover={{ y: -4 }}
      className="crm-card flex flex-col overflow-hidden"
    >
      <header className="flex items-start gap-4 px-6 pb-5 pt-6">
        <span className="font-serif text-4xl font-semibold leading-none" style={{ color: "var(--crm-wine)" }}>0{index + 1}</span>
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--crm-ink-mute)]">Variante</p>
          <h3 className="mt-1.5 font-serif text-[17px] font-semibold leading-tight text-[var(--crm-ink)]">{variant.enfoque}</h3>
        </div>
      </header>

      <div aria-hidden className="mx-6 h-px bg-[var(--crm-line)]" />

      <div className="flex gap-1 px-4 pt-4">
        {available.map((n) => {
          const isActive = active === n;
          return (
            <button key={n} type="button" onClick={() => setActive(n)} className="relative rounded-lg px-3 py-1.5 text-[12px] font-medium transition">
              {isActive && <motion.span layoutId={`pv-${index}-tab`} transition={{ type: "spring", stiffness: 400, damping: 30 }} className="absolute inset-0 rounded-lg" style={{ background: "var(--crm-wine)" }} />}
              <span className="relative z-10" style={{ color: isActive ? "var(--crm-on-accent)" : "var(--crm-ink-soft)" }}>{NET_LABEL[n]}</span>
            </button>
          );
        })}
      </div>

      <div className="flex-1 p-5">
        {active === "linkedin" && variant.linkedin && <TextBlock label="LinkedIn" text={variant.linkedin} />}
        {active === "facebook" && variant.facebook && <TextBlock label="Facebook" text={variant.facebook} />}
        {active === "instagram" && variant.instagram && (
          <div className="space-y-5">
            <TextBlock label="Caption" text={variant.instagram.caption} />
            <div>
              <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--crm-ink-mute)]">Slides del carrusel</p>
              <CarouselSlides slides={variant.instagram.slides} />
              <CopyButton text={variant.instagram.slides.map((s, i) => `Slide ${i + 1} — ${s.title}\n${s.body}`).join("\n\n")} label="Copiar todos los slides" className="mt-4" />
            </div>
          </div>
        )}
      </div>
    </motion.article>
  );
}

function TextBlock({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <div className="mb-2.5 flex items-center justify-between">
        <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--crm-ink-mute)]">
          {label}<span className="mx-2" style={{ color: "var(--crm-wine)" }}>·</span>{text.length} caracteres
        </span>
        <CopyButton text={text} label="Copiar" />
      </div>
      <pre className="whitespace-pre-wrap break-words rounded-xl border border-[var(--crm-line)] bg-[var(--crm-surface-2)] p-4 font-sans text-[13.5px] leading-relaxed text-[var(--crm-ink-soft)]">{text}</pre>
    </div>
  );
}

function CopyButton({ text, label, className = "" }: { text: string; label: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <motion.button
      type="button" whileTap={{ scale: 0.95 }}
      onClick={async () => { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
      className={`rounded-lg px-2.5 py-1 text-[12px] font-medium tracking-wide transition ${className}`}
      style={copied ? { background: "var(--crm-wine)", color: "var(--crm-on-accent)" } : { background: "var(--crm-surface-2)", color: "var(--crm-ink-soft)" }}
    >
      {copied ? "¡Copiado!" : label}
    </motion.button>
  );
}
