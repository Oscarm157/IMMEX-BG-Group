"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

type QA = { q: string; a: string };

export function Faq({ items }: { items: readonly QA[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();

  const withIdx = items.map((it, idx) => ({ it, idx }));
  const mid = Math.ceil(withIdx.length / 2);
  const columns = [withIdx.slice(0, mid), withIdx.slice(mid)];

  return (
    <div className="grid gap-4 md:grid-cols-2 md:items-start">
      {columns.map((col, ci) => (
        <div key={ci} className="console-panel overflow-hidden rounded-[14px] bg-surface-1">
          {col.map(({ it, idx }) => {
            const isOpen = open === idx;
            return (
              <div key={it.q} className="border-b border-line last:border-b-0">
                <button
                  onClick={() => setOpen(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left transition-colors hover:bg-surface-2/40 sm:px-7"
                >
                  <span className="font-display text-[16px] font-medium text-chalk sm:text-[17px]">{it.q}</span>
                  <span
                    aria-hidden
                    className={`shrink-0 font-mono text-lg leading-none text-accent transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                  >
                    +
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: reduce ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-[15px] leading-relaxed text-bone/90 sm:px-7">{it.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
