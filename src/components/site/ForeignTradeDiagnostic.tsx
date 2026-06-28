"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { editorialEase } from "@/lib/motion";

const CONTENT = {
  es: {
    eyebrow: "Diagnóstico rápido",
    title: "¿Por dónde empieza tu caso?",
    lead: "Cuatro preguntas para orientarte hacia el área correcta.",
    restart: "Volver a empezar",
    questions: [
      {
        text: "¿Cuál es tu situación hoy?",
        opts: [
          "Me llegó una notificación: auditoría, PAMA, multa o crédito fiscal",
          "Tengo una revisión en curso y necesito responder con sustento técnico",
          "Quiero revisar mi cumplimiento antes de que llegue una auditoría",
          "Tengo una decisión de negocio con impacto aduanero que evaluar",
        ],
      },
      {
        text: "¿Tu empresa opera bajo programa IMMEX?",
        opts: [
          "Sí, y tenemos dudas sobre si cumplimos todos los requisitos",
          "Sí, pero queremos una revisión periódica para mantenerlo en orden",
          "No, pero estamos evaluando obtenerlo",
          "No, nuestra operación no requiere IMMEX",
        ],
      },
      {
        text: "¿Hay plazos que ya están corriendo?",
        opts: [
          "Sí, tengo días o pocas semanas para actuar",
          "Sí, pero tengo uno a tres meses de margen",
          "No hay plazos inmediatos, es planeación",
          "No lo sé con certeza",
        ],
      },
      {
        text: "¿Cuál es el corredor principal de tu operación?",
        opts: [
          "Tijuana - San Diego",
          "Otro cruce fronterizo en la zona norte",
          "Operación marítima, aérea o interior",
          "Aún no tenemos operaciones activas",
        ],
      },
    ],
    results: {
      HIGH_DEFENSE: {
        title: "Defensa con plazos corriendo",
        body: "Los medios de defensa tienen fechas límite que arrancan con la notificación del acto. Revisamos el alcance, construimos los agravios y presentamos el recurso o la demanda dentro de los plazos del procedimiento.",
        cta: "Hablar con el equipo",
      },
      DEFENSE: {
        title: "Defensa técnica ante la autoridad",
        body: "Revisamos el acto, el soporte documental de las operaciones y construimos la postura técnica. La defensa se conduce desde la notificación hasta su conclusión por la vía que conviene al caso.",
        cta: "Hablar con el equipo",
      },
      COMPLIANCE_IMMEX: {
        title: "Auditoría preventiva IMMEX",
        body: "Identificamos las contingencias antes de que las encuentre la autoridad: clasificación, valoración, Anexo 24, soporte documental y control de inventarios. El diagnóstico precede a cualquier revisión.",
        cta: "Programar revisión",
      },
      ADVISORY: {
        title: "Asesoría antes de actuar",
        body: "Cada decisión con efecto aduanero o fiscal conviene evaluarla antes de ejecutarla. Analizamos el caso, fijamos la contingencia y orientamos la decisión con criterio técnico.",
        cta: "Consultar",
      },
      GENERAL: {
        title: "Diagnóstico de la operación",
        body: "Revisamos el punto de partida y orientamos el trabajo hacia lo que la operación necesita, sin presuposiciones sobre el área ni la urgencia.",
        cta: "Hablar con el equipo",
      },
    } as const,
    contactTJ: "Tijuana +52 (664) 607 9642",
    contactSD: "San Diego (619) 638-2168",
    contactEmail: "contacto@bgc.mx",
    of: "de",
    progress: "Pregunta",
    form: {
      heading: "Recibe orientación del equipo",
      namePlaceholder: "Nombre completo",
      emailPlaceholder: "Correo electrónico",
      phonePlaceholder: "Teléfono (opcional)",
      submit: "Enviar",
      sending: "Enviando...",
      successTitle: "Recibido",
      successBody: "El equipo revisará tu caso y se pondrá en contacto contigo en breve.",
      errorMsg: "Ocurrió un error al enviar. Intenta de nuevo o escribe a contacto@bgc.mx.",
      nameRequired: "El nombre es obligatorio",
      emailRequired: "El correo electrónico es obligatorio",
      emailInvalid: "Correo electrónico no válido",
    },
  },
  en: {
    eyebrow: "Quick diagnostic",
    title: "Where does your case start?",
    lead: "Four questions to point you toward the right area.",
    restart: "Start over",
    questions: [
      {
        text: "What is your situation today?",
        opts: [
          "I received a notice: audit, PAMA, fine, or tax assessment",
          "A review is underway and I need to respond with technical support",
          "I want to check my compliance before an audit arrives",
          "I have a business decision with customs or tax impact to evaluate",
        ],
      },
      {
        text: "Does your company operate under an IMMEX program?",
        opts: [
          "Yes, and we have doubts about whether we meet all the requirements",
          "Yes, we run it but want a periodic review to keep it in order",
          "No, but we are evaluating whether to obtain it",
          "No, our operation does not require IMMEX",
        ],
      },
      {
        text: "Are deadlines already running?",
        opts: [
          "Yes, I have days or a few weeks to act",
          "Yes, but I have one to three months of room",
          "No immediate deadlines, this is planning",
          "I am not sure",
        ],
      },
      {
        text: "What is the main corridor for your operation?",
        opts: [
          "Tijuana - San Diego",
          "Another border crossing in the northern zone",
          "Maritime, air, or inland operation",
          "No active cross-border operations yet",
        ],
      },
    ],
    results: {
      HIGH_DEFENSE: {
        title: "Defense with deadlines running",
        body: "Defense remedies carry deadlines that start at notification. We review the act, build the grievances, and file the appeal or lawsuit within the procedural deadlines.",
        cta: "Talk to the team",
      },
      DEFENSE: {
        title: "Technical defense before the authority",
        body: "We review the act, the supporting documentation, and build the technical position. The defense is handled from notification through to conclusion by the route that fits the case.",
        cta: "Talk to the team",
      },
      COMPLIANCE_IMMEX: {
        title: "Preventive IMMEX audit",
        body: "We identify contingencies before the authority does: classification, valuation, Annex 24, documentary support, and inventory control. The diagnosis comes before any review.",
        cta: "Schedule a review",
      },
      ADVISORY: {
        title: "Advisory before acting",
        body: "Every decision with customs or tax effect is worth evaluating before execution. We analyze the case, fix the exposure, and orient the decision with technical criteria.",
        cta: "Consult",
      },
      GENERAL: {
        title: "Operation diagnostic",
        body: "We review the starting point and direct the work to what the operation needs, without assumptions about the area or the urgency.",
        cta: "Talk to the team",
      },
    } as const,
    contactTJ: "Tijuana +52 (664) 607 9642",
    contactSD: "San Diego (619) 638-2168",
    contactEmail: "contacto@bgc.mx",
    of: "of",
    progress: "Question",
    form: {
      heading: "Get guidance from the team",
      namePlaceholder: "Full name",
      emailPlaceholder: "Email address",
      phonePlaceholder: "Phone (optional)",
      submit: "Send",
      sending: "Sending...",
      successTitle: "Received",
      successBody: "The team will review your case and be in touch shortly.",
      errorMsg: "An error occurred. Try again or write to contacto@bgc.mx.",
      nameRequired: "Name is required",
      emailRequired: "Email address is required",
      emailInvalid: "Invalid email address",
    },
  },
} as const;

type Lang = "es" | "en";
type ResultKey = "HIGH_DEFENSE" | "DEFENSE" | "COMPLIANCE_IMMEX" | "ADVISORY" | "GENERAL";
type FormState = "idle" | "sending" | "success" | "error";

function getResult(answers: number[]): ResultKey {
  const [q1, q2, q3] = answers;
  if ((q1 === 0 || q1 === 1) && q3 === 0) return "HIGH_DEFENSE";
  if (q1 === 0 || q1 === 1) return "DEFENSE";
  if (q1 === 2 && (q2 === 0 || q2 === 1)) return "COMPLIANCE_IMMEX";
  if (q2 === 0 || q2 === 2) return "COMPLIANCE_IMMEX";
  if (q1 === 3) return "ADVISORY";
  return "GENERAL";
}

function buildQuizSummary(lang: Lang, answers: number[]): string {
  const c = CONTENT[lang];
  return answers
    .map((ans, qi) => `Q: ${c.questions[qi].text}\nA: ${c.questions[qi].opts[ans]}`)
    .join("\n\n");
}

const inputBase =
  "w-full rounded-[8px] border bg-surface-2/40 px-4 py-3 text-[14px] text-chalk placeholder:text-ash/50 transition-colors focus:outline-none";

export function ForeignTradeDiagnostic({ lang }: { lang: Lang }) {
  const c = CONTENT[lang];
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const done = step === c.questions.length;

  const [formState, setFormState] = useState<FormState>("idle");
  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ name?: string; email?: string }>({});

  function pick(opt: number) {
    const next = [...answers, opt];
    setAnswers(next);
    setStep(step + 1);
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
        message: buildQuizSummary(lang, answers),
        sourceUrl: typeof window !== "undefined" ? window.location.href : "",
      };
      if (leadPhone.trim()) payload.phone = leadPhone.trim();
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok !== false) {
        setFormState("success");
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  }

  const resultKey = done ? getResult(answers) : null;
  const result = resultKey ? c.results[resultKey] : null;
  const isTJ = done && answers[3] === 0;

  return (
    <section className="mx-auto max-w-[1280px] px-5 pb-20 sm:px-8 sm:pb-24">
      {/* Header */}
      <div className="mb-10 max-w-2xl">
        <span className="mb-3 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
          <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-accent signal-glow" />
          {c.eyebrow}
        </span>
        <h2 className="font-display text-[clamp(1.9rem,4vw,3rem)] font-medium leading-[1.05] tracking-[-0.02em] text-chalk">
          {c.title}
        </h2>
        <p className="mt-4 text-[16px] leading-relaxed text-bone/80">{c.lead}</p>
      </div>

      <div className="console-panel grid-field overflow-hidden rounded-[16px] bg-surface-1">
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-line px-6 py-3.5 sm:px-8">
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ash">
            {done ? (isTJ ? c.contactTJ : c.contactEmail) : `${c.progress} ${step + 1} ${c.of} ${c.questions.length}`}
          </span>
          {step > 0 && (
            <button
              onClick={reset}
              className="font-mono text-[11px] uppercase tracking-[0.14em] text-ash transition-colors hover:text-chalk"
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
                      <span className="mt-0.5 shrink-0 font-mono text-[11px] tabular-nums text-accent">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span className="text-[14px] leading-snug text-bone/90 transition-colors group-hover:text-chalk">
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
                className="max-w-2xl"
              >
                {/* Result */}
                <div className="mb-2 flex items-center gap-3">
                  <span aria-hidden className="inline-block h-2 w-2 rounded-full bg-accent signal-glow" />
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                    {resultKey}
                  </span>
                </div>
                <h3 className="font-display text-[clamp(1.5rem,3vw,2.2rem)] font-medium leading-tight tracking-[-0.02em] text-chalk">
                  {result?.title}
                </h3>
                <p className="mt-5 text-[16px] leading-relaxed text-bone/90">{result?.body}</p>

                {isTJ && (
                  <p className="mt-6 font-mono text-[12px] text-ash">
                    {c.contactTJ} · {c.contactSD}
                  </p>
                )}

                {/* Divider */}
                <div className="my-8 h-px bg-line" />

                {/* Lead form */}
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
                        <p className="mt-1 text-[14px] leading-relaxed text-bone/80">
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
                      <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.16em] text-ash">
                        {c.form.heading}
                      </p>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {/* Name */}
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
                            <span className="font-mono text-[11px] text-red-400">
                              {fieldErrors.name}
                            </span>
                          )}
                        </div>
                        {/* Email */}
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
                            <span className="font-mono text-[11px] text-red-400">
                              {fieldErrors.email}
                            </span>
                          )}
                        </div>
                        {/* Phone */}
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
                        <p className="mt-3 font-mono text-[11px] text-red-400">
                          {c.form.errorMsg}
                        </p>
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
                          className="font-mono text-[13px] uppercase tracking-[0.12em] text-ash transition-colors hover:text-chalk"
                        >
                          {c.restart}
                        </button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
