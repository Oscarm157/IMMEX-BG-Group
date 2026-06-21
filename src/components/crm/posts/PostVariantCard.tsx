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
      whileHover={{ y: -3 }}
      className="crm-card flex flex-col overflow-hidden"
    >
      <header className="flex items-center gap-3 px-5 pb-4 pt-5">
        <span className="crm-num grid h-8 w-8 shrink-0 place-items-center rounded-[var(--crm-r-md)] border border-[var(--crm-line-strong)] bg-[var(--crm-surface)] text-[13px] font-semibold text-[var(--crm-ink-soft)]">{index + 1}</span>
        <div className="min-w-0">
          <p className="crm-eyebrow">Variante</p>
          <h3 className="mt-1 truncate font-semibold text-[16px] leading-tight text-[var(--crm-ink)]">{variant.enfoque}</h3>
        </div>
      </header>

      <div className="flex gap-1 px-4">
        {available.map((n) => {
          const isActive = active === n;
          return (
            <button key={n} type="button" onClick={() => setActive(n)} className="relative rounded-[6px] px-3 py-1.5 text-[12px] font-medium transition-colors">
              {isActive && <motion.span layoutId={`pv-${index}-tab`} transition={{ type: "spring", stiffness: 400, damping: 32 }} className="absolute inset-0 rounded-[6px] border border-[var(--crm-line-strong)] bg-[var(--crm-surface-3)]" />}
              <span className="relative z-10" style={{ color: isActive ? "var(--crm-ink)" : "var(--crm-ink-mute)" }}>{NET_LABEL[n]}</span>
            </button>
          );
        })}
      </div>

      <div aria-hidden className="mx-5 mt-3 h-px bg-[var(--crm-line)]" />

      <div className="flex-1 p-5">
        {active === "linkedin" && variant.linkedin && <TextBlock label="LinkedIn" text={variant.linkedin} />}
        {active === "facebook" && variant.facebook && <TextBlock label="Facebook" text={variant.facebook} />}
        {active === "instagram" && variant.instagram && (
          <div className="space-y-5">
            <TextBlock label="Caption" text={variant.instagram.caption} />
            <div>
              <p className="mb-3 text-[12px] font-medium text-[var(--crm-ink-soft)]">Slides del carrusel</p>
              <CarouselSlides slides={variant.instagram.slides} />
              <CopyButton text={variant.instagram.slides.map((s, i) => `Slide ${i + 1}: ${s.title}\n${s.body}`).join("\n\n")} label="Copiar todos los slides" className="mt-4" />
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
      <div className="mb-2.5 flex items-center justify-between gap-2">
        <span className="flex items-baseline gap-1.5 text-[12px] font-medium text-[var(--crm-ink-soft)]">
          {label}
          <span className="crm-num text-[var(--crm-ink-mute)]">{text.length} caracteres</span>
        </span>
        <CopyButton text={text} label="Copiar" />
      </div>
      <pre className="whitespace-pre-wrap break-words rounded-[var(--crm-r-md)] border border-[var(--crm-line)] bg-[var(--crm-surface)] p-4 font-sans text-[13.5px] leading-relaxed text-[var(--crm-ink-soft)]">{text}</pre>
    </div>
  );
}

function CopyButton({ text, label, className = "" }: { text: string; label: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <motion.button
      type="button" whileTap={{ scale: 0.95 }}
      onClick={async () => { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
      className={`inline-flex items-center gap-1.5 rounded-[6px] border px-2.5 py-1 text-[12px] font-medium transition-colors ${className}`}
      style={copied
        ? { borderColor: "var(--crm-accent-ring)", background: "var(--crm-accent-tint)", color: "var(--crm-accent-strong)" }
        : { borderColor: "var(--crm-line-strong)", background: "var(--crm-surface-2)", color: "var(--crm-ink-soft)" }}
    >
      {copied ? (
        <>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="m5 12 5 5 9-10" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          Copiado
        </>
      ) : (
        <>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><rect x="9" y="9" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.7" /><path d="M5 15V5a2 2 0 0 1 2-2h8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>
          {label}
        </>
      )}
    </motion.button>
  );
}
