"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { editorialEase } from "@/lib/motion";
import { CustomsStageVisual } from "@/components/site/CustomsStageVisual";

type Stage = { n: string; name: string; desc: string };

const CONTENT = {
  es: {
    eyebrow: "Ciclo del pedimento",
    title: "De la clasificación al cierre del asunto.",
    lead: "Cada operación recorre las mismas etapas. Cuando la autoridad interviene, BG conduce la defensa desde la notificación hasta la resolución.",
    panel: "Flujo aduanal · 5 etapas",
    stages: [
      {
        n: "01",
        name: "Clasificación",
        desc: "Se determina la fracción arancelaria de la mercancía con las Reglas Generales de Interpretación. Un error en la fracción define el arancel, las regulaciones y los permisos que se activan, y es el punto de partida de la mayoría de las controversias.",
      },
      {
        n: "02",
        name: "Valoración",
        desc: "El valor en aduana se fija conforme al Acuerdo de Valoración de la OMC: valor de transacción más los ajustes incrementables que correspondan. Cuando hay vinculación entre partes o el método principal no aplica, se acude a los métodos secundarios en el orden que marca la ley.",
      },
      {
        n: "03",
        name: "Pedimento",
        desc: "El pedimento concentra toda la información de la operación: fracción, valor, origen, contribuciones y regulaciones no arancelarias. El agente aduanal lo transmite ante el mecanismo de selección automatizado, que determina si la mercancía pasa a reconocimiento.",
      },
      {
        n: "04",
        name: "Cumplimiento",
        desc: "Una vez liberada la mercancía, el cumplimiento continúa: Anexo 24 para el control de inventarios IMMEX, validación Anexo 31 y registro de retornos en plazo. Sin estos controles, los impuestos diferidos se causan y el programa queda en riesgo.",
      },
      {
        n: "05",
        name: "Defensa",
        desc: "Si la autoridad observa la operación, los plazos para defenderse arrancan con la notificación. BG revisa el acto, construye los agravios con sustento técnico y conduce el asunto por la vía que corresponda: recurso, juicio ante el TFJA, amparo o acuerdo conclusivo.",
      },
    ] satisfies Stage[],
  },
  en: {
    eyebrow: "Customs cycle",
    title: "From classification to case closure.",
    lead: "Every operation moves through the same stages. When the authority steps in, BG handles the defense from notification through to resolution.",
    panel: "Customs flow · 5 stages",
    stages: [
      {
        n: "01",
        name: "Classification",
        desc: "The tariff code is determined under the General Rules of Interpretation. An error in the classification drives the duty rate, the non-tariff regulations, and the permits that apply, and is where most disputes begin.",
      },
      {
        n: "02",
        name: "Valuation",
        desc: "Customs value is set under the WTO Valuation Agreement: transaction value plus the applicable dutiable additions. When buyer and seller are related or the primary method does not apply, the law moves to secondary methods in a fixed order.",
      },
      {
        n: "03",
        name: "Entry",
        desc: "The customs entry captures everything: tariff code, value, origin, duties, and non-tariff regulations. The customs broker transmits it to the automated selection system, which determines whether the shipment goes to inspection.",
      },
      {
        n: "04",
        name: "Compliance",
        desc: "After release, compliance continues: Annex 24 for IMMEX inventory control, Annex 31 validation, and on-time return records. Without these controls, deferred duties come due and the program is at risk.",
      },
      {
        n: "05",
        name: "Defense",
        desc: "If the authority challenges the operation, defense deadlines run from notification. BG reviews the act, builds the grievances with technical support, and handles the matter by whichever route fits: appeal, TFJA litigation, amparo, or conclusive agreement.",
      },
    ] satisfies Stage[],
  },
} as const;

type Lang = "es" | "en";

export function ForeignTradeFlow({ lang }: { lang: Lang }) {
  const reduce = useReducedMotion();
  const c = CONTENT[lang];
  const stages = c.stages as readonly Stage[];
  const last = stages.length - 1;
  const [active, setActive] = useState(0);

  return (
    <section className="relative border-t border-line">
      <div className="mx-auto max-w-[1280px] px-5 py-20 sm:px-8 sm:py-24">
        {/* Header */}
        <div className="mb-10 max-w-3xl">
          <span className="mb-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
            <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-accent signal-glow" />
            {c.eyebrow}
          </span>
          <h2 className="font-display text-[clamp(1.9rem,4.2vw,3.2rem)] font-medium leading-[1.05] tracking-[-0.02em] text-chalk">
            {c.title}
          </h2>
          <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-bone/90">{c.lead}</p>
        </div>

        <div className="console-panel grid-field overflow-hidden rounded-[14px] bg-surface-1/70">
          {/* Console bar */}
          <div className="flex items-center justify-between border-b border-line px-5 py-3.5 sm:px-7">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ash">
              {c.panel}
            </span>
            <span className="font-mono text-[11px] tabular-nums tracking-[0.14em] text-accent">
              {String(active + 1).padStart(2, "0")} / {String(stages.length).padStart(2, "0")}
            </span>
          </div>

          <div className="px-5 py-8 sm:px-7 sm:py-10">
            {/* Track */}
            <div className="relative mx-6 h-[60px] sm:mx-12">
              <div className="absolute left-0 right-0 top-[10px] h-px bg-white/[0.1]" />
              <motion.div
                className="absolute left-0 top-[10px] h-px bg-accent"
                animate={{ width: `${(active / last) * 100}%` }}
                transition={{ duration: 0.5, ease: editorialEase }}
              />
              {stages.map((s, i) => {
                const reached = i <= active;
                return (
                  <button
                    key={s.n}
                    onClick={() => setActive(i)}
                    aria-label={s.name}
                    aria-pressed={i === active}
                    style={{ left: `${(i / last) * 100}%` }}
                    className="group absolute top-0 flex -translate-x-1/2 flex-col items-center"
                  >
                    <span
                      className={`h-[20px] w-[20px] rounded-full border transition-all duration-500 ${
                        reached
                          ? "border-accent bg-accent signal-glow"
                          : "border-white/25 bg-ink"
                      }`}
                    />
                    <span
                      className={`mt-3 hidden whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.1em] transition-colors duration-300 sm:block ${
                        i === active ? "text-chalk" : "text-ash"
                      }`}
                    >
                      {s.name}
                    </span>
                    <span
                      className={`mt-2 font-mono text-[11px] tabular-nums sm:hidden ${
                        i === active ? "text-chalk" : "text-ash"
                      }`}
                    >
                      {s.n}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Detail */}
            <div className="mt-12 min-h-[160px] sm:mt-14">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.45, ease: editorialEase }}
                  className="grid items-center gap-8 lg:grid-cols-[1fr_minmax(0,360px)] lg:gap-12"
                >
                  <div className="grid gap-5 sm:grid-cols-[auto_1fr] sm:gap-10">
                    <span className="font-display text-[clamp(2.6rem,7vw,4.6rem)] font-medium leading-none tracking-[-0.03em] tabular-nums text-accent signal-text-glow">
                      {stages[active].n}
                    </span>
                    <div className="max-w-xl">
                      <h3 className="font-display text-[clamp(1.5rem,3vw,2.2rem)] font-medium leading-tight tracking-[-0.02em] text-chalk">
                        {stages[active].name}
                      </h3>
                      <p className="mt-4 text-[16px] leading-relaxed text-bone/90">
                        {stages[active].desc}
                      </p>
                    </div>
                  </div>
                  <div className="hidden lg:block">
                    <CustomsStageVisual stage={active} reduce={!!reduce} />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation arrows */}
            <div className="mt-8 flex items-center gap-3 border-t border-line/50 pt-6">
              <button
                onClick={() => setActive(Math.max(0, active - 1))}
                disabled={active === 0}
                aria-label="Previous stage"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-ash transition-all hover:border-accent/40 hover:text-chalk disabled:opacity-30"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path d="M8.5 3L5 7l3.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                onClick={() => setActive(Math.min(last, active + 1))}
                disabled={active === last}
                aria-label="Next stage"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-ash transition-all hover:border-accent/40 hover:text-chalk disabled:opacity-30"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path d="M5.5 3L9 7l-3.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div className="flex gap-1.5 pl-2">
                {stages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    aria-label={`Stage ${i + 1}`}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      i === active ? "w-6 bg-accent" : "w-1.5 bg-white/20"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
