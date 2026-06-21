"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useSearchParams } from "next/navigation";
import { InputTabs, type InputMode } from "@/components/crm/posts/InputTabs";
import { draftArticle } from "@/app/admin/blog-actions";
import { CategoryCombobox } from "./CategoryCombobox";
import { CoverImageInput } from "./CoverImageInput";

interface Props {
  categories: string[];
}

const label = "mb-1.5 block text-[12.5px] font-medium text-[var(--crm-ink-soft)]";

export function ArticleComposer({ categories }: Props) {
  const [mode, setMode] = useState<InputMode>("pdf");
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const params = useSearchParams();
  const serverError = params.get("error");

  const canGenerate = useMemo(() => {
    if (mode === "pdf") return !!file;
    if (mode === "url") return url.trim().length > 5;
    return text.trim().length > 30;
  }, [mode, file, url, text]);

  const extract = async (): Promise<string> => {
    if (mode === "pdf" && file) {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/admin/posts/extract", { method: "POST", body: form });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? "No se pudo extraer el PDF.");
      return data.text as string;
    }
    if (mode === "url") {
      const res = await fetch("/admin/posts/extract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "url", value: url }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? "No se pudo leer la URL.");
      return data.text as string;
    }
    return text;
  };

  const handler = async (fd: FormData) => {
    setError(null);
    setLoading(true);
    let source: string;
    try {
      source = await extract();
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo procesar la fuente.");
      setLoading(false);
      return;
    }
    fd.set("source", source);
    await draftArticle(fd);
  };

  return (
    <form action={handler}>
      <AnimatePresence>
        {(error || serverError) && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mb-5 flex items-start gap-3 rounded-[var(--crm-r-lg)] border border-[var(--crm-line-strong)] bg-[var(--crm-surface-2)] p-4"
          >
            <span aria-hidden className="mt-[7px] inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#ef6f6f]" />
            <p className="text-[13px] leading-relaxed text-[var(--crm-ink-soft)]">
              {error ?? (serverError === "empty"
                ? "La fuente no devolvió texto legible. Revisa el archivo o la URL."
                : "No se pudo generar el borrador. Intenta de nuevo.")}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid gap-4 lg:grid-cols-2">
        <InputTabs
          mode={mode}
          setMode={setMode}
          file={file}
          setFile={setFile}
          url={url}
          setUrl={setUrl}
          text={text}
          setText={setText}
        />

        <section className="crm-card flex flex-col p-5">
          <div className="mb-4 flex items-baseline gap-2.5">
            <span className="crm-eyebrow">Paso 2</span>
            <h2 className="crm-h2">Dirección editorial</h2>
          </div>

          <div className="flex flex-col gap-5">
            <div>
              <span className={label}>Categoría</span>
              <CategoryCombobox categories={categories} />
            </div>

            <div>
              <label htmlFor="guidance" className={label}>Ángulo de la nota</label>
              <textarea
                id="guidance"
                name="guidance"
                rows={4}
                className="crm-textarea resize-y"
                placeholder="¿A quién va dirigida? ¿Qué enfatizar? ¿Qué postura toma BG? Opcional."
              />
              <p className="mt-1.5 text-[12px] leading-relaxed text-[var(--crm-ink-mute)]">
                Si lo dejas vacío, la IA redacta con el criterio editorial estándar de BG.
              </p>
            </div>

            <div>
              <p className="crm-eyebrow mb-2.5">Atribución</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label htmlFor="sourceName" className={label}>Fuente</label>
                  <input id="sourceName" name="sourceName" className="crm-input" placeholder="Mundo Marítimo, El Financiero…" />
                </div>
                <div>
                  <label htmlFor="sourceUrl" className={label}>URL de la fuente</label>
                  <input id="sourceUrl" name="sourceUrl" type="url" className="crm-input" placeholder="https://…" />
                </div>
              </div>
            </div>

            <div>
              <span className={label}>Portada</span>
              <CoverImageInput />
            </div>
          </div>

          <div className="mt-6 pt-1">
            <button type="submit" disabled={!canGenerate || loading} className="crm-btn crm-btn-primary h-11 w-full">
              {loading ? (
                <>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" className="animate-spin"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.2" strokeOpacity="0.3" /><path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" /></svg>
                  <span>Generando borrador…</span>
                </>
              ) : (
                <>
                  <span>Generar borrador</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14m0 0-5-5m5 5-5 5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </>
              )}
            </button>
            <p className="mt-2.5 text-center text-[12px] text-[var(--crm-ink-mute)]">
              Extrae la fuente, redacta en español e inglés y abre el editor.
            </p>
          </div>
        </section>
      </div>
    </form>
  );
}
