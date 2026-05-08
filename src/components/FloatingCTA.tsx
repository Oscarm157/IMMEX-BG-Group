"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export function FloatingCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      const past = window.scrollY > window.innerHeight * 0.9;
      const contact = document.getElementById("contact");
      const nearForm = contact
        ? contact.getBoundingClientRect().top < window.innerHeight * 0.6
        : false;
      setVisible(past && !nearForm);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="#contact"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 inline-flex items-center gap-3 bg-tertiary-fixed text-on-tertiary-fixed px-6 py-4 rounded-sm font-extrabold text-sm md:text-base tracking-tight shadow-[0_20px_60px_-20px_rgba(230,255,0,0.6)] hover:-translate-y-0.5 active:scale-[0.98] transition-transform"
        >
          Diagnóstico sin costo
          <span className="material-symbols-outlined text-xl">arrow_forward</span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
