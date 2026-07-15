"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { submitQuiz, type QuizResult } from "@/app/campus/actions";

type Quiz = {
  id: string;
  title: string;
  passed: boolean;
  questions: { id: string; prompt: string; options: string[] }[];
};

export function QuizRunner({
  quiz,
  categorySlug,
  topicSlug,
}: {
  quiz: Quiz;
  categorySlug: string;
  topicSlug: string;
}) {
  const router = useRouter();
  const [answers, setAnswers] = useState<number[]>(() => quiz.questions.map(() => -1));
  const [result, setResult] = useState<QuizResult | null>(null);
  const [pending, start] = useTransition();

  const allAnswered = answers.every((a) => a >= 0);

  function choose(qi: number, oi: number) {
    if (result) return; // bloqueado tras enviar
    setAnswers((prev) => prev.map((v, i) => (i === qi ? oi : v)));
  }

  function onSubmit() {
    start(async () => {
      const r = await submitQuiz(quiz.id, answers, categorySlug, topicSlug);
      if (r.ok) {
        setResult(r);
        if (r.passed) router.refresh();
      }
    });
  }

  function retry() {
    setResult(null);
    setAnswers(quiz.questions.map(() => -1));
  }

  return (
    <section className="mt-12 rounded-2xl border border-line bg-surface-1 p-6 sm:p-7">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ash">Evaluación</span>
          <h2 className="font-display text-[19px] font-semibold tracking-[-0.01em] text-chalk">{quiz.title}</h2>
        </div>
        {quiz.passed && !result ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/12 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.1em] text-accent">
            Aprobado
          </span>
        ) : null}
      </div>

      <div className="mt-6 flex flex-col gap-6">
        {quiz.questions.map((q, qi) => (
          <fieldset key={q.id}>
            <legend className="text-[15px] font-medium leading-snug text-chalk">
              <span className="mr-2 font-mono text-[12px] text-ash">{String(qi + 1).padStart(2, "0")}</span>
              {q.prompt}
            </legend>
            <div className="mt-3 flex flex-col gap-2">
              {q.options.map((opt, oi) => {
                const selected = answers[qi] === oi;
                const isCorrect = result && result.correct[qi] === oi;
                const isWrongPick = result && selected && result.correct[qi] !== oi;
                return (
                  <button
                    key={oi}
                    type="button"
                    onClick={() => choose(qi, oi)}
                    disabled={Boolean(result) || pending}
                    className={[
                      "flex items-center gap-3 rounded-lg border px-3.5 py-2.5 text-left text-[14px] transition-colors",
                      isCorrect
                        ? "border-accent/60 bg-accent/10 text-chalk"
                        : isWrongPick
                          ? "border-[#f0503f]/50 bg-[#f0503f]/10 text-chalk"
                          : selected
                            ? "border-accent/60 bg-surface-3 text-chalk"
                            : "border-line bg-surface-2 text-bone hover:border-ash/40 hover:bg-surface-3",
                    ].join(" ")}
                  >
                    <span
                      className={[
                        "grid h-4 w-4 shrink-0 place-items-center rounded-full border",
                        selected || isCorrect ? "border-accent" : "border-ash",
                      ].join(" ")}
                    >
                      {selected || isCorrect ? <span className="h-2 w-2 rounded-full bg-accent" /> : null}
                    </span>
                    {opt}
                  </button>
                );
              })}
            </div>
          </fieldset>
        ))}
      </div>

      <div className="mt-7 flex items-center gap-4">
        {!result ? (
          <button
            type="button"
            onClick={onSubmit}
            disabled={!allAnswered || pending}
            className="inline-flex items-center rounded-full bg-accent px-5 py-2.5 text-[14px] font-semibold text-on-accent transition-colors hover:bg-accent-dim disabled:opacity-40"
          >
            {pending ? "Calificando…" : "Enviar respuestas"}
          </button>
        ) : (
          <>
            <span
              className={[
                "inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 font-mono text-[12px] uppercase tracking-[0.08em]",
                result.passed ? "bg-accent/12 text-accent" : "bg-[#f0503f]/12 text-[#f0876f]",
              ].join(" ")}
            >
              {result.passed ? "Aprobado" : "No aprobado"} · {result.score}/{result.total}
            </span>
            {!result.passed ? (
              <button
                type="button"
                onClick={retry}
                className="rounded-full border border-line px-4 py-1.5 text-[13px] text-bone transition-colors hover:border-accent/50 hover:text-chalk"
              >
                Volver a intentar
              </button>
            ) : null}
          </>
        )}
      </div>
    </section>
  );
}
