"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { PageHeader } from "@/components/crm/PageShell";
import { InputTabs, type InputMode } from "./InputTabs";
import { ConfigPanel } from "./ConfigPanel";
import { PostVariantCard } from "./PostVariantCard";
import { ProgressIndicator } from "./ProgressIndicator";
import type { GenerateResponse, Red, SourceMode } from "@/lib/posts/types";

type DirectorOption = { id: string; name: string; title: string | null };

const SOURCE_MODES: { id: SourceMode; label: string }[] = [
  { id: "source", label: "Desde fuente" },
  { id: "idea", label: "Desde idea" },
];

export function PostGenerator({ profiles }: { profiles: DirectorOption[] }) {
  const [profileId, setProfileId] = useState("");
  const [sourceMode, setSourceMode] = useState<SourceMode>("source");

  const [mode, setMode] = useState<InputMode>("text");
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");
  const [idea, setIdea] = useState("");

  const [extractedText, setExtractedText] = useState<string | null>(null);
  const [extracting, setExtracting] = useState(false);

  const [networks, setNetworks] = useState<Red[]>(["linkedin", "instagram", "facebook"]);
  const [approaches, setApproaches] = useState<[string, string, string]>(["Análisis experto", "Advertencia de riesgos", "Oportunidad / acción"]);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GenerateResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeVariant, setActiveVariant] = useState(0);

  const canGenerate = useMemo(() => {
    if (!profileId) return false;
    if (networks.length === 0) return false;
    if (sourceMode === "idea") return idea.trim().length > 12;
    if (mode === "pdf") return !!file;
    if (mode === "url") return url.trim().length > 5;
    return text.trim().length > 30;
  }, [profileId, sourceMode, idea, mode, file, url, text, networks]);

  const toggleNetwork = (n: Red) => setNetworks((p) => (p.includes(n) ? p.filter((x) => x !== n) : [...p, n]));
  const setApproach = (index: 0 | 1 | 2, value: string) =>
    setApproaches((prev) => { const next = [...prev] as [string, string, string]; next[index] = value; return next; });

  const extract = async (): Promise<string> => {
    setExtracting(true);
    try {
      if (mode === "pdf" && file) {
        const form = new FormData();
        form.append("file", file);
        const res = await fetch("/admin/posts/extract", { method: "POST", body: form });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "Error extrayendo PDF.");
        return data.text as string;
      }
      const payload = mode === "url" ? { type: "url", value: url } : { type: "text", value: text };
      const res = await fetch("/admin/posts/extract", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Error procesando la fuente.");
      return data.text as string;
    } finally {
      setExtracting(false);
    }
  };

  const onGenerate = async () => {
    setError(null);
    setResult(null);
    setActiveVariant(0);
    setLoading(true);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 110_000);
    try {
      let sourceText: string;
      if (sourceMode === "idea") {
        sourceText = idea.trim();
        setExtractedText(null);
      } else {
        sourceText = await extract();
        setExtractedText(sourceText);
      }
      const res = await fetch("/admin/posts/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: sourceText, networks, approaches, profileId, mode: sourceMode }),
        signal: controller.signal,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? `Error ${res.status}.`);
      setResult(data as GenerateResponse);
    } catch (err) {
      if ((err as Error)?.name === "AbortError") setError("La generación tardó demasiado y se canceló. Intenta con menos redes o texto más corto.");
      else setError(err instanceof Error ? err.message : "Error desconocido.");
    } finally {
      clearTimeout(timeout);
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-[1100px] px-4 py-7 sm:px-7 sm:py-9">
      <PageHeader
        eyebrow="Contenido"
        title="Generador de posts"
        description="Genera contenido para la marca personal de los directores, en su voz, para revisar y publicar."
      />

      <section className="crm-card mb-4 p-5">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
          <div className="min-w-0 flex-1">
            <div className="mb-2.5 flex items-baseline gap-2.5">
              <span className="crm-eyebrow">Paso 0</span>
              <h2 className="crm-h2">¿Quién publica?</h2>
            </div>
            {profiles.length === 0 ? (
              <div className="flex flex-wrap items-center gap-3 rounded-[var(--crm-r-md)] border border-[var(--crm-wine-ring)] bg-[var(--crm-wine-tint)] px-3.5 py-3">
                <p className="text-[13px] text-[var(--crm-ink-soft)]">No hay directores activos. Configura un director primero para poder generar.</p>
                <Link href="/admin/posts/directores" className="crm-btn crm-btn-secondary crm-btn-sm shrink-0">Configurar director</Link>
              </div>
            ) : (
              <select
                value={profileId}
                onChange={(e) => setProfileId(e.target.value)}
                className="crm-select !h-10 max-w-sm text-[13px]"
                aria-label="Director que publica"
              >
                <option value="">Selecciona un director</option>
                {profiles.map((p) => (
                  <option key={p.id} value={p.id}>{p.title ? `${p.name} · ${p.title}` : p.name}</option>
                ))}
              </select>
            )}
          </div>
          <Link href="/admin/posts/directores" className="shrink-0 text-[12.5px] font-medium text-[var(--crm-ink-mute)] transition-colors hover:text-[var(--crm-accent-strong)]">
            Gestionar directores
          </Link>
        </div>
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="flex flex-col gap-3">
          <div className="flex gap-1 rounded-[var(--crm-r-md)] border border-[var(--crm-line)] bg-[var(--crm-surface)] p-1">
            {SOURCE_MODES.map((m) => {
              const active = sourceMode === m.id;
              return (
                <button key={m.id} type="button" onClick={() => setSourceMode(m.id)} className="relative flex-1 rounded-[6px] px-4 py-2 text-[13px] font-medium transition-colors">
                  {active && (
                    <motion.span layoutId="post-source-mode" transition={{ type: "spring", stiffness: 400, damping: 32 }} className="absolute inset-0 rounded-[6px] border border-[var(--crm-line-strong)] bg-[var(--crm-surface-3)]" />
                  )}
                  <span className="relative z-10" style={{ color: active ? "var(--crm-ink)" : "var(--crm-ink-mute)" }}>{m.label}</span>
                </button>
              );
            })}
          </div>

          {sourceMode === "source" ? (
            <InputTabs mode={mode} setMode={setMode} file={file} setFile={setFile} url={url} setUrl={setUrl} text={text} setText={setText} />
          ) : (
            <section className="crm-card flex flex-1 flex-col p-5">
              <div className="mb-4 flex items-baseline gap-2.5">
                <span className="crm-eyebrow">Paso 1</span>
                <h2 className="crm-h2">Idea</h2>
              </div>
              <label className="mb-2 flex items-center justify-between text-[13px] font-medium text-[var(--crm-ink-soft)]">
                <span>¿De qué quieres hablar? Tu ángulo u opinión</span>
                <span className="crm-num text-[12px] text-[var(--crm-ink-mute)]">{idea.length.toLocaleString()} caracteres</span>
              </label>
              <textarea value={idea} onChange={(e) => setIdea(e.target.value)} placeholder="Ej. Mi postura sobre el nuevo esquema de validación en aduanas y qué deberían revisar los importadores este trimestre." rows={10} className="crm-textarea min-h-[220px] flex-1 resize-y" />
              <p className="mt-3 text-[13px] leading-relaxed text-[var(--crm-ink-mute)]">Se desarrolla en tu voz, sin inventar cifras, leyes ni fechas. No se procesa ninguna fuente externa.</p>
            </section>
          )}
        </div>

        <ConfigPanel networks={networks} toggleNetwork={toggleNetwork} approaches={approaches} setApproach={setApproach} onGenerate={onGenerate} loading={loading || extracting} canGenerate={canGenerate} />
      </div>

      <AnimatePresence>
        {error && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            className="mt-4 flex items-start gap-3 rounded-[var(--crm-r-lg)] border border-[var(--crm-line-strong)] bg-[var(--crm-surface-2)] p-4">
            <span aria-hidden className="mt-[7px] inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#ef6f6f]" />
            <p className="text-[13px] leading-relaxed text-[var(--crm-ink-soft)]">{error}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {extractedText && !loading && (
        <details className="crm-card mt-4 p-5">
          <summary className="flex cursor-pointer items-center gap-2 text-[13px] font-medium text-[var(--crm-ink)] [&::-webkit-details-marker]:hidden">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="text-[var(--crm-ink-mute)] transition-transform"><path d="m9 6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            Texto fuente extraído
            <span className="crm-num ml-1 text-[var(--crm-ink-mute)]">{extractedText.length.toLocaleString()} caracteres</span>
          </summary>
          <pre className="mt-4 max-h-64 overflow-auto whitespace-pre-wrap break-words rounded-[var(--crm-r-md)] border border-[var(--crm-line)] bg-[var(--crm-surface)] p-4 text-[13px] leading-relaxed text-[var(--crm-ink-soft)]">{extractedText}</pre>
        </details>
      )}

      <AnimatePresence>
        {(loading || extracting) && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <ProgressIndicator phase={extracting ? "extracting" : "generating"} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {result && (
          <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 200, damping: 26 }} className="mt-10">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <p className="crm-eyebrow mb-2">Resultado</p>
                <h2 className="crm-h1">Variantes generadas</h2>
              </div>
              <span className="crm-num hidden shrink-0 text-[13px] text-[var(--crm-ink-mute)] sm:block">
                Variante {activeVariant + 1} de {result.variants.length} · {networks.length} {networks.length === 1 ? "red" : "redes"}
              </span>
            </div>

            {/* Navegación de variantes: una a la vez, tipo slide */}
            <div className="mb-4 flex flex-wrap items-center gap-2">
              {result.variants.map((v, i) => {
                const active = i === activeVariant;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveVariant(i)}
                    className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[12.5px] font-medium transition-colors"
                    style={
                      active
                        ? { borderColor: "var(--crm-accent-ring)", background: "var(--crm-accent-tint)", color: "var(--crm-accent-strong)" }
                        : { borderColor: "var(--crm-line)", background: "var(--crm-surface-2)", color: "var(--crm-ink-mute)" }
                    }
                  >
                    <span className="crm-num">{i + 1}</span>
                    {v.enfoque}
                  </button>
                );
              })}
              <div className="ml-auto flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setActiveVariant((i) => Math.max(0, i - 1))}
                  disabled={activeVariant === 0}
                  aria-label="Variante anterior"
                  className="grid size-8 place-items-center rounded-full border border-[var(--crm-line-strong)] bg-[var(--crm-surface-2)] text-[var(--crm-ink-soft)] transition-colors hover:bg-[var(--crm-surface-3)] disabled:opacity-40"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="m15 6-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveVariant((i) => Math.min(result.variants.length - 1, i + 1))}
                  disabled={activeVariant >= result.variants.length - 1}
                  aria-label="Variante siguiente"
                  className="grid size-8 place-items-center rounded-full border border-[var(--crm-line-strong)] bg-[var(--crm-surface-2)] text-[var(--crm-ink-soft)] transition-colors hover:bg-[var(--crm-surface-3)] disabled:opacity-40"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="m9 6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
              </div>
            </div>

            <div className="mx-auto max-w-[720px]">
              <PostVariantCard key={activeVariant} index={activeVariant} variant={result.variants[activeVariant]} networks={networks} />
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
