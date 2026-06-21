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
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          {slides.map((_, i) => {
            const isActive = active === i;
            return (
              <motion.button
                key={i} type="button" whileTap={{ scale: 0.92 }} onClick={() => setActive(i)}
                className="crm-num grid h-7 w-7 place-items-center rounded-[var(--crm-r-sm)] border text-[12px] font-semibold transition-colors"
                style={isActive
                  ? { borderColor: "var(--crm-accent-ring)", background: "var(--crm-accent-tint)", color: "var(--crm-accent-strong)" }
                  : { borderColor: "var(--crm-line)", background: "var(--crm-surface)", color: "var(--crm-ink-mute)" }}
              >
                {i + 1}
              </motion.button>
            );
          })}
        </div>
        <span className="crm-num text-[12px] font-medium text-[var(--crm-ink-mute)]">{active + 1} / {slides.length}</span>
      </div>

      <div className="relative mt-3 aspect-square w-full max-w-sm overflow-hidden rounded-[var(--crm-r-lg)] border border-[var(--crm-line)] bg-[var(--crm-surface)] p-6">
        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.22 }} className="relative flex h-full flex-col justify-between">
            <div>
              <p className="crm-eyebrow">Slide {active + 1}</p>
              <h4 className="mt-3 font-semibold text-[21px] leading-tight text-[var(--crm-ink)]">{slide.title}</h4>
            </div>
            <p className="whitespace-pre-wrap text-[13.5px] leading-relaxed text-[var(--crm-ink-soft)]">{slide.body}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
