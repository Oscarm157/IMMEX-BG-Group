"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { editorialEase } from "@/lib/motion";
import { SERVICE_DETAIL } from "@/content/services-detail";
import { SERVICE_SLUGS } from "@/content/service-slugs";
import { CustomsStageVisual } from "@/components/site/CustomsStageVisual";

type Lang = "es" | "en";
type FormState = "idle" | "sending" | "success" | "error";

function buildQuizSummary(
  lang: Lang,
  questions: readonly { text: string; opts: readonly string[] }[],
  answers: number[],
): string {
  return answers
    .map((ans, qi) => `Q: ${questions[qi].text}\nA: ${questions[qi].opts[ans]}`)
    .join("\n\n");
}

const inputBase =
  "w-full rounded-[8px] border bg-surface-2/40 px-4 py-3 text-[16px] text-chalk placeholder:text-smoke transition-colors focus:outline-none";

export function ServiceDiagnostic({ slug, lang }: { slug: string; lang: Lang }) {
  const reduce = useReducedMotion();
  const idx = SERVICE_SLUGS.indexOf(slug as (typeof SERVICE_SLUGS)[number]);
  const data = idx !== -1 ? SERVICE_DETAIL[lang][idx]?.diagnostic : undefined;

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [formState, setFormState] = useState<FormState>("idle");
  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ name?: string; email?: string }>({});

  if (!data) return null;

  const c = data[lang];
  const done = step === c.questions.length;
  const resultKey = done ? data.getResult(answers) : null;
  const result = resultKey ? c.results[resultKey] : null;
  const isTJ = done && answers[3] === 0;

  function pick(opt: number) {
    setAnswers((prev) => [...prev, opt]);
    setStep((s) => s + 1);
  }

  function reset() {
    setAnswers([]);
    setStep(0);
    setFormState("idle");
    setLeadName("");
    setLeadEmail("");
    setLeadPhone("");
    setFieldErrors({});
  }

  async function submitLead(e: FormEvent) {
    e.preventDefault();
    const errors: { name?: string; email?: string } = {};
    if (!leadName.trim()) errors.name = c.form.nameRequired;
    if (!leadEmail.trim()) errors.email = c.form.emailRequired;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(leadEmail.trim()))
      errors.email = c.form.emailInvalid;
    if (Object.keys(errors).length) {
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({});
    setFormState("sending");
    try {
      const payload: Record<string, unknown> = {
        name: leadName.trim(),
        email: leadEmail.trim(),
        source: "form",
        locale: lang,
        service: resultKey ?? "",
        message: buildQuizSummary(lang, c.questions, answers),
        sourceUrl: typeof window !== "undefined" ? window.location.href : "",
      };
      if (leadPhone.trim()) payload.phone = leadPhone.trim();
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok !== false) {
        setFormState("success");
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  }

  const stageIdx = resultKey != null ? data.stageForResult[resultKey] : undefined;
  const tag = resultKey ? data.resultTag[resultKey]?.[lang] : "";

  return (
    <section className="mx-auto max-w-[1280px] px-5 pb-20 sm:px-8 sm:pb-24">
      <div className="mb-10 max-w-2xl">
        <span className="mb-3 flex items-center gap-2 font-mono text-[13px] uppercase tracking-[0.18em] text-accent">
          <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-accent signal-glow" />
          {c.eyebrow}
        </span>
        <h2 className="font-display text-[clamp(1.9rem,4vw,3rem)] font-medium leading-[1.05] tracking-[-0.02em] text-chalk">
          {c.title}
        </h2>
        <p className="mt-4 text-[18px] leading-relaxed text-bone/90">{c.lead}</p>
      </div>

      <div className="console-panel grid-field overflow-hidden rounded-[16px] bg-surface-1">
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-line px-6 py-3.5 sm:px-8">
          <span className="font-mono text-[13px] uppercase tracking-[0.16em] text-smoke">
            {done ? (isTJ ? c.contactTJ : c.contactEmail) : `${c.progress} ${step + 1} ${c.of} ${c.questions.length}`}
          </span>
          {step > 0 && (
            <button
              onClick={reset}
              className="font-mono text-[13px] uppercase tracking-[0.14em] text-smoke transition-colors hover:text-chalk"
            >
              {c.restart}
            </button>
          )}
        </div>

        {/* Progress bar */}
        {!done && (
          <div className="h-[2px] bg-white/[0.06]">
            <motion.div
              className="h-full bg-accent"
              animate={{ width: `${(step / c.questions.length) * 100}%` }}
              transition={{ duration: 0.5, ease: editorialEase }}
            />
          </div>
        )}

        {/* Content */}
        <div className="min-h-[320px] px-6 py-10 sm:px-8 sm:py-12">
          <AnimatePresence mode="wait">
            {!done ? (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.4, ease: editorialEase }}
              >
                <p className="mb-8 font-display text-[clamp(1.25rem,2.5vw,1.75rem)] font-medium leading-snug tracking-[-0.015em] text-chalk">
                  {c.questions[step].text}
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {c.questions[step].opts.map((opt, i) => (
                    <motion.button
                      key={opt}
                      onClick={() => pick(i)}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: i * 0.06, ease: editorialEase }}
                      className="group flex items-start gap-4 rounded-[10px] border border-line bg-surface-2/40 px-5 py-4 text-left transition-all duration-200 hover:border-accent/40 hover:bg-surface-2"
                    >
                      <span className="mt-0.5 shrink-0 font-mono text-[13px] tabular-nums text-accent">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span className="text-[16px] leading-snug text-bone/90 transition-colors group-hover:text-chalk">
                        {opt}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: editorialEase }}
              >
                <div className="grid gap-8 lg:grid-cols-[1fr_minmax(0,300px)] lg:items-center lg:gap-12">
                  <div className="max-w-2xl">
                    <div className="mb-2 flex items-center gap-3">
                      <span aria-hidden className="inline-block h-2 w-2 rounded-full bg-accent signal-glow" />
                      <span className="font-mono text-[13px] uppercase tracking-[0.16em] text-accent">
                        {tag}
                      </span>
                    </div>
                    <h3 className="font-display text-[clamp(1.5rem,3vw,2.2rem)] font-medium leading-tight tracking-[-0.02em] text-chalk">
                      {result?.title}
                    </h3>
                    <p className="mt-5 text-[18px] leading-relaxed text-bone/90">{result?.body}</p>
                    {isTJ && (
                      <p className="mt-6 font-mono text-[12px] text-smoke">
                        {c.contactTJ} · {c.contactSD}
                      </p>
                    )}
                  </div>
                  {stageIdx != null && (
                    <div className="hidden lg:block">
                      <CustomsStageVisual stage={stageIdx} reduce={!!reduce} />
                    </div>
                  )}
                </div>

                <div className="my-8 h-px max-w-2xl bg-line" />

                <div className="max-w-2xl">
                  <AnimatePresence mode="wait">
                    {formState === "success" ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, ease: editorialEase }}
                        className="flex items-start gap-4"
                      >
                        <span aria-hidden className="mt-1 inline-block h-2 w-2 shrink-0 rounded-full bg-accent signal-glow" />
                        <div>
                          <p className="font-display text-[1.1rem] font-medium text-chalk">
                            {c.form.successTitle}
                          </p>
                          <p className="mt-1 text-[16px] leading-relaxed text-bone/90">
                            {c.form.successBody}
                          </p>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.form
                        key="form"
                        onSubmit={submitLead}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, ease: editorialEase }}
                        noValidate
                      >
                        <p className="mb-5 font-mono text-[13px] uppercase tracking-[0.16em] text-smoke">
                          {c.form.heading}
                        </p>
                        <div className="grid gap-3 sm:grid-cols-2">
                          <div className="flex flex-col gap-1">
                            <input
                              type="text"
                              value={leadName}
                              onChange={(e) => setLeadName(e.target.value)}
                              placeholder={c.form.namePlaceholder}
                              disabled={formState === "sending"}
                              className={`${inputBase} ${fieldErrors.name ? "border-red-500/60 focus:border-red-500/80" : "border-line focus:border-accent/50"}`}
                            />
                            {fieldErrors.name && (
                              <span className="font-mono text-[13px] text-red-400">{fieldErrors.name}</span>
                            )}
                          </div>
                          <div className="flex flex-col gap-1">
                            <input
                              type="email"
                              value={leadEmail}
                              onChange={(e) => setLeadEmail(e.target.value)}
                              placeholder={c.form.emailPlaceholder}
                              disabled={formState === "sending"}
                              className={`${inputBase} ${fieldErrors.email ? "border-red-500/60 focus:border-red-500/80" : "border-line focus:border-accent/50"}`}
                            />
                            {fieldErrors.email && (
                              <span className="font-mono text-[13px] text-red-400">{fieldErrors.email}</span>
                            )}
                          </div>
                          <div className="sm:col-span-2 sm:max-w-xs">
                            <input
                              type="tel"
                              value={leadPhone}
                              onChange={(e) => setLeadPhone(e.target.value)}
                              placeholder={c.form.phonePlaceholder}
                              disabled={formState === "sending"}
                              className={`${inputBase} border-line focus:border-accent/50`}
                            />
                          </div>
                        </div>
                        {formState === "error" && (
                          <p className="mt-3 font-mono text-[13px] text-red-400">{c.form.errorMsg}</p>
                        )}
                        <div className="mt-5 flex flex-wrap items-center gap-4">
                          <button
                            type="submit"
                            disabled={formState === "sending"}
                            className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-2.5 font-mono text-[13px] font-medium uppercase tracking-[0.12em] text-ink transition-opacity hover:opacity-90 disabled:opacity-60"
                          >
                            {formState === "sending" ? c.form.sending : c.form.submit}
                          </button>
                          <button
                            type="button"
                            onClick={reset}
                            className="font-mono text-[13px] uppercase tracking-[0.12em] text-smoke transition-colors hover:text-chalk"
                          >
                            {c.restart}
                          </button>
                        </div>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
