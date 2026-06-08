"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface Slide {
  title: string;
  body: string;
}

export function CarouselSlides({ slides }: { slides: Slide[] }) {
  const [active, setActive] = useState(0);
  if (!slides || slides.length === 0) return null;
  const slide = slides[active];

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-1.5">
          {slides.map((_, i) => (
            <motion.button
              key={i} type="button" whileTap={{ scale: 0.92 }} onClick={() => setActive(i)}
              className="grid h-8 w-8 place-items-center rounded-lg text-[11px] font-semibold transition"
              style={active === i
                ? { background: "var(--crm-wine)", color: "var(--crm-on-accent)" }
                : { background: "var(--crm-surface-2)", color: "var(--crm-ink-mute)" }}
            >
              {i + 1}
            </motion.button>
          ))}
        </div>
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--crm-ink-mute)]">{active + 1} / {slides.length}</span>
      </div>

      <div className="relative mt-4 aspect-square w-full max-w-sm overflow-hidden rounded-2xl border border-[var(--crm-line)] bg-[var(--crm-surface-2)] p-6">
        <div aria-hidden className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full" style={{ background: "var(--crm-wine-tint)", filter: "blur(40px)" }} />
        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }} className="relative flex h-full flex-col justify-between">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.18em]" style={{ color: "var(--crm-wine)" }}>Slide {active + 1}</p>
              <h4 className="mt-3 font-serif text-[22px] font-semibold leading-tight text-[var(--crm-ink)]">{slide.title}</h4>
            </div>
            <p className="whitespace-pre-wrap text-[13.5px] leading-relaxed text-[var(--crm-ink-soft)]">{slide.body}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
