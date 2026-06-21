"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { PageHeader } from "@/components/crm/PageShell";
import { InputTabs, type InputMode } from "./InputTabs";
import { ConfigPanel } from "./ConfigPanel";
import { PostVariantCard } from "./PostVariantCard";
import { ProgressIndicator } from "./ProgressIndicator";
import type { GenerateResponse, Red } from "@/lib/posts/types";

export function PostGenerator() {
  const [mode, setMode] = useState<InputMode>("text");
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");

  const [extractedText, setExtractedText] = useState<string | null>(null);
  const [extracting, setExtracting] = useState(false);

  const [networks, setNetworks] = useState<Red[]>(["linkedin", "instagram", "facebook"]);
  const [approaches, setApproaches] = useState<[string, string, string]>(["Análisis experto", "Advertencia de riesgos", "Oportunidad / acción"]);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GenerateResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const canGenerate = useMemo(() => {
    if (networks.length === 0) return false;
    if (mode === "pdf") return !!file;
    if (mode === "url") return url.trim().length > 5;
    return text.trim().length > 30;
  }, [mode, file, url, text, networks]);

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
    setLoading(true);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 110_000);
    try {
      const sourceText = await extract();
      setExtractedText(sourceText);
      const res = await fetch("/admin/posts/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: sourceText, networks, approaches }),
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
        description="Sube un PDF, pega una URL de portal oficial o pega texto. La IA lo contextualiza para México y devuelve 3 variantes de post por red."
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <InputTabs mode={mode} setMode={setMode} file={file} setFile={setFile} url={url} setUrl={setUrl} text={text} setText={setText} />
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
              <span className="crm-num hidden shrink-0 text-[13px] text-[var(--crm-ink-mute)] sm:block">{result.variants.length} variantes · {networks.length} redes</span>
            </div>
            <div className="grid gap-4 lg:grid-cols-3">
              {result.variants.map((v, i) => <PostVariantCard key={i} index={i} variant={v} networks={networks} />)}
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
