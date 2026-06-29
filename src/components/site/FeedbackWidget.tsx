"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { MessageSquarePlus, X, Send, Check } from "lucide-react";

type Pin = {
  id: string;
  note: string;
  xPct: number | null;
  yPct: number | null;
  status: "open" | "resolved";
};

type Draft = {
  screen: { left: number; top: number };
  doc: { xPct: number; yPct: number };
  selector: string | null;
  elementText: string | null;
};

const TOKEN_KEY = "bg_fb_token";

// CSS path corto y best-effort del elemento clicado (id si lo hay, si no tag + nth-of-type).
function cssPath(el: Element): string {
  const parts: string[] = [];
  let node: Element | null = el;
  let depth = 0;
  while (node && node.nodeType === 1 && depth < 4) {
    if (node.id) {
      parts.unshift(`#${node.id}`);
      break;
    }
    let part = node.tagName.toLowerCase();
    const parent: Element | null = node.parentElement;
    if (parent) {
      const sibs = Array.from(parent.children).filter((c) => c.tagName === node!.tagName);
      if (sibs.length > 1) part += `:nth-of-type(${sibs.indexOf(node) + 1})`;
    }
    parts.unshift(part);
    node = node.parentElement;
    depth++;
  }
  return parts.join(" > ").slice(0, 500);
}

// Nombre legible del archivo de imagen (decodifica el wrapper /_next/image de Next).
function imageName(src: string): string {
  let s = src;
  try {
    if (s.includes("/_next/image")) {
      const u = new URL(s, window.location.origin);
      s = u.searchParams.get("url") || s;
    }
  } catch {}
  return decodeURIComponent(s).split("?")[0].split("/").pop() || s;
}

// Describe el elemento clicado para que el comentario diga sobre QUÉ es.
// Las imágenes se identifican por archivo + alt (no tienen texto).
function describeElement(el: Element): string | null {
  const img = (el.tagName === "IMG" ? el : el.querySelector("img")) as HTMLImageElement | null;
  if (img) {
    const name = imageName(img.currentSrc || img.src || "");
    const alt = (img.alt || "").trim();
    return `imagen: ${name}${alt ? ` (${alt})` : ""}`.slice(0, 200);
  }
  // Imagen de fondo (CSS) en el elemento o un par de ancestros.
  let node: Element | null = el;
  for (let i = 0; node && i < 3; i++, node = node.parentElement) {
    const bg = getComputedStyle(node).backgroundImage;
    const m = bg && bg !== "none" ? bg.match(/url\(["']?([^"')]+)["']?\)/) : null;
    if (m) return `imagen de fondo: ${imageName(m[1])}`.slice(0, 200);
  }
  const text = (el.textContent || "").trim().replace(/\s+/g, " ");
  return text ? text.slice(0, 120) : null;
}

export function FeedbackWidget() {
  const pathname = usePathname();
  const [token, setToken] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [pinMode, setPinMode] = useState(false);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [noteText, setNoteText] = useState("");
  const [sending, setSending] = useState(false);
  const [pins, setPins] = useState<Pin[]>([]);
  const [total, setTotal] = useState(0);
  const [openPin, setOpenPin] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [docSize, setDocSize] = useState({ w: 0, h: 0 });
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2400);
  }, []);

  // Lee el token de la URL (?fb=) o de sessionStorage; limpia el query para que no se comparta por error.
  useEffect(() => {
    let tok: string | null = null;
    try {
      const sp = new URLSearchParams(window.location.search);
      const fromUrl = sp.get("fb");
      if (fromUrl) {
        tok = fromUrl;
        sessionStorage.setItem(TOKEN_KEY, fromUrl);
        sp.delete("fb");
        const qs = sp.toString();
        window.history.replaceState(null, "", window.location.pathname + (qs ? `?${qs}` : "") + window.location.hash);
      } else {
        tok = sessionStorage.getItem(TOKEN_KEY);
      }
    } catch {
      tok = null;
    }
    setToken(tok);
  }, []);

  const measure = useCallback(() => {
    const el = document.documentElement;
    setDocSize({ w: el.scrollWidth, h: el.scrollHeight });
  }, []);

  // Valida el token y trae los pines de la página actual.
  useEffect(() => {
    if (!token) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/feedback?token=${encodeURIComponent(token)}&path=${encodeURIComponent(pathname)}`);
        if (!res.ok) {
          if (res.status === 401) {
            try {
              sessionStorage.removeItem(TOKEN_KEY);
            } catch {}
            if (!cancelled) {
              setToken(null);
              setReady(false);
            }
          }
          return;
        }
        const data = await res.json();
        if (cancelled) return;
        setReady(true);
        setPins(Array.isArray(data.notes) ? data.notes : []);
        setTotal(typeof data.total === "number" ? data.total : 0);
        measure();
      } catch {
        /* sin red: el widget simplemente no aparece */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [token, pathname, measure]);

  useEffect(() => {
    if (!ready) return;
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [ready, measure]);

  // Captura el click en modo pin (fase de captura, bloquea la navegación del sitio).
  useEffect(() => {
    if (!pinMode) return;

    function onClick(e: MouseEvent) {
      const target = e.target as Element | null;
      if (target && target.closest("[data-fb-ui]")) return; // deja pasar la UI propia
      e.preventDefault();
      e.stopPropagation();
      const el = target && target.nodeType === 1 ? target : null;
      const pageX = e.clientX + window.scrollX;
      const pageY = e.clientY + window.scrollY;
      const root = document.documentElement;
      const xPct = root.scrollWidth ? (pageX / root.scrollWidth) * 100 : 0;
      const yPct = root.scrollHeight ? (pageY / root.scrollHeight) * 100 : 0;
      setDraft({
        screen: { left: e.clientX, top: e.clientY },
        doc: { xPct, yPct },
        selector: el ? cssPath(el) : null,
        elementText: el ? describeElement(el) : null,
      });
      setNoteText("");
      setPinMode(false);
    }

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setPinMode(false);
    }

    document.addEventListener("click", onClick, true);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("keydown", onKey);
    };
  }, [pinMode]);

  async function submit() {
    if (!draft || !token || !noteText.trim() || sending) return;
    setSending(true);
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          path: pathname,
          note: noteText.trim(),
          selector: draft.selector,
          elementText: draft.elementText,
          xPct: draft.doc.xPct,
          yPct: draft.doc.yPct,
          viewportW: window.innerWidth,
          pageTitle: document.title,
        }),
      });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.id) {
        setPins((prev) => [
          { id: data.id, note: noteText.trim(), xPct: Math.round(draft.doc.xPct), yPct: Math.round(draft.doc.yPct), status: "open" },
          ...prev,
        ]);
        setTotal((t) => t + 1);
        setDraft(null);
        setNoteText("");
        showToast("Comentario enviado");
      } else {
        showToast("No se pudo enviar, intenta de nuevo");
      }
    } catch {
      showToast("No se pudo enviar, intenta de nuevo");
    } finally {
      setSending(false);
    }
  }

  if (!ready) return null;

  const editorLeft = Math.min(draft?.screen.left ?? 0, window.innerWidth - 320);
  const editorTop = Math.min(draft?.screen.top ?? 0, window.innerHeight - 220);

  return (
    <div data-fb-ui>
      {/* Pines existentes, posicionados sobre el documento */}
      {docSize.h > 0 && (
        <div className="pointer-events-none absolute left-0 top-0 z-[9990]" style={{ width: 0, height: 0 }}>
          {pins.map((p, i) =>
            p.xPct == null || p.yPct == null ? null : (
              <button
                key={p.id}
                type="button"
                data-fb-ui
                onClick={() => setOpenPin(openPin === p.id ? null : p.id)}
                className={`pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 flex size-6 items-center justify-center rounded-full text-[11px] font-semibold shadow-lg ring-2 ring-black/40 transition ${
                  p.status === "resolved" ? "bg-emerald-600 text-white" : "bg-accent text-accent-foreground"
                }`}
                style={{ left: (p.xPct / 100) * docSize.w, top: (p.yPct / 100) * docSize.h }}
                aria-label={`Comentario ${i + 1}`}
              >
                {p.status === "resolved" ? <Check className="size-3.5" /> : i + 1}
                {openPin === p.id && (
                  <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 w-56 -translate-x-1/2 rounded-lg border border-line bg-surface-1 px-3 py-2 text-left text-[12px] font-normal leading-snug text-bone shadow-xl">
                    {p.note}
                  </span>
                )}
              </button>
            )
          )}
        </div>
      )}

      {/* Banner del modo pin */}
      {pinMode && (
        <div
          data-fb-ui
          className="fixed inset-x-0 top-0 z-[9995] flex items-center justify-center gap-3 bg-accent px-4 py-2 text-[13px] font-medium text-accent-foreground"
        >
          Haz click en el punto que quieres comentar
          <button type="button" data-fb-ui onClick={() => setPinMode(false)} className="rounded-md bg-black/15 px-2 py-0.5 text-[12px] hover:bg-black/25">
            Cancelar (Esc)
          </button>
        </div>
      )}

      {/* Editor de nota */}
      {draft && (
        <div
          data-fb-ui
          className="fixed z-[9996] w-[300px] rounded-xl border border-line bg-surface-1 p-3 shadow-2xl"
          style={{ left: Math.max(12, editorLeft), top: Math.max(12, editorTop) }}
        >
          <div className="mb-2 flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ash">Nuevo comentario</span>
            <button type="button" data-fb-ui onClick={() => setDraft(null)} className="text-ash hover:text-bone" aria-label="Cerrar">
              <X className="size-4" />
            </button>
          </div>
          {draft.elementText && (
            <p className="mb-2 line-clamp-2 rounded-md bg-black/20 px-2 py-1 text-[11px] text-ash">“{draft.elementText}”</p>
          )}
          <textarea
            data-fb-ui
            autoFocus
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            onKeyDown={(e) => {
              if ((e.metaKey || e.ctrlKey) && e.key === "Enter") submit();
            }}
            placeholder="¿Qué quieres comentar de esta parte?"
            rows={3}
            className="w-full resize-none rounded-lg border border-line bg-ink px-2.5 py-2 text-[13px] text-paper placeholder:text-ash focus:border-accent focus:outline-none"
          />
          <div className="mt-2 flex justify-end">
            <button
              type="button"
              data-fb-ui
              onClick={submit}
              disabled={!noteText.trim() || sending}
              className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-3 py-1.5 text-[13px] font-medium text-accent-foreground transition hover:opacity-90 disabled:opacity-40"
            >
              <Send className="size-3.5" />
              {sending ? "Enviando…" : "Enviar"}
            </button>
          </div>
        </div>
      )}

      {/* Lanzador */}
      {!pinMode && !draft && (
        <button
          type="button"
          data-fb-ui
          onClick={() => {
            setOpenPin(null);
            setPinMode(true);
          }}
          className="fixed bottom-5 left-5 z-[9994] inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2.5 text-[13px] font-medium text-accent-foreground shadow-xl transition hover:opacity-90"
        >
          <MessageSquarePlus className="size-4" />
          Comentar
          {total > 0 && (
            <span className="ml-0.5 inline-flex min-w-5 items-center justify-center rounded-full bg-accent-foreground/15 px-1.5 text-[11px] font-semibold tabular-nums">
              {total}
            </span>
          )}
        </button>
      )}

      {/* Toast */}
      {toast && (
        <div data-fb-ui className="fixed bottom-5 left-1/2 z-[9997] -translate-x-1/2 rounded-full bg-bone px-4 py-2 text-[13px] font-medium text-ink shadow-xl">
          {toast}
        </div>
      )}
    </div>
  );
}
