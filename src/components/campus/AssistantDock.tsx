"use client";

import { useEffect, useRef, useState } from "react";
import { askVideoAssistant, type AssistantMessage } from "@/app/campus/assistant-actions";
import { useVideoAssistant } from "./video-assistant-context";

const SUGGESTIONS = [
  "¿En qué minuto explican la diferencia entre COVE y eDocument?",
  "¿Qué es la Manifestación de Valor y quién debe presentarla?",
  "¿En qué parte hablan de VUCEM y para qué sirve?",
  "El OCR y el IDP, ¿en qué se diferencian?",
];

function fmt(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

// Renderiza el texto del bot convirtiendo los marcadores ⟦SEG⟧ en chips que
// hacen saltar el reproductor a ese segundo.
function AssistantText({ text, onSeek }: { text: string; onSeek: (s: number) => void }) {
  const parts = text.split(/⟦(\d+)⟧/g);
  return (
    <span className="text-[13.5px] leading-relaxed text-bone">
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <button
            key={i}
            type="button"
            onClick={() => onSeek(Number(part))}
            className="mx-0.5 inline-flex items-center gap-1 rounded-md bg-accent/15 px-1.5 py-0.5 align-baseline font-mono text-[11px] font-medium text-accent transition-colors hover:bg-accent/25"
          >
            ▶ {fmt(Number(part))}
          </button>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </span>
  );
}

function ChatBody({ topicId }: { topicId: string }) {
  const assistant = useVideoAssistant();
  const [messages, setMessages] = useState<AssistantMessage[]>([]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, pending]);

  async function send(question: string) {
    const q = question.trim();
    if (!q || pending) return;
    setError(null);
    setInput("");
    const history = messages;
    setMessages([...history, { role: "user", content: q }]);
    setPending(true);
    const res = await askVideoAssistant(topicId, q, history);
    setPending(false);
    if (res.ok) {
      setMessages((m) => [...m, { role: "assistant", content: res.answer }]);
    } else {
      setError(res.error);
    }
  }

  const seek = (s: number) => assistant?.seekTo(s);

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div ref={scrollRef} className="crm-scroll min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-4">
        {messages.length === 0 ? (
          <div className="space-y-3">
            <p className="text-[13px] leading-relaxed text-smoke">
              Pregúntame lo que quieras del video. Puedo ubicarte en qué minuto se habla de cada
              tema y explicártelo con el contenido de la sesión.
            </p>
            <div className="flex flex-col gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => send(s)}
                  className="rounded-xl border border-line bg-surface-2 px-3 py-2 text-left text-[12.5px] leading-snug text-bone transition-colors hover:border-accent/40 hover:text-chalk"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((m, i) =>
            m.role === "user" ? (
              <div key={i} className="flex justify-end">
                <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-accent/12 px-3.5 py-2 text-[13.5px] leading-relaxed text-chalk">
                  {m.content}
                </div>
              </div>
            ) : (
              <div key={i} className="flex justify-start">
                <div className="max-w-[92%] rounded-2xl rounded-bl-sm border border-line bg-surface-2 px-3.5 py-2.5">
                  <AssistantText text={m.content} onSeek={seek} />
                </div>
              </div>
            ),
          )
        )}
        {pending ? (
          <div className="flex items-center gap-2 px-1 text-[12px] text-smoke">
            <span className="signal-glow inline-block h-1.5 w-1.5 rounded-full bg-accent" />
            Pensando...
          </div>
        ) : null}
        {error ? (
          <div className="rounded-lg border border-red-500/30 bg-red-500/5 px-3 py-2 text-[12.5px] text-red-300">
            {error}
          </div>
        ) : null}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="border-t border-line p-3"
      >
        <div className="flex items-end gap-2 rounded-xl border border-line bg-surface-2 px-3 py-2 focus-within:border-accent/50">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send(input);
              }
            }}
            rows={1}
            placeholder="Pregunta sobre el video..."
            className="max-h-28 min-h-[20px] flex-1 resize-none bg-transparent text-[13.5px] text-chalk placeholder:text-ash focus:outline-none"
          />
          <button
            type="submit"
            disabled={pending || !input.trim()}
            aria-label="Enviar"
            className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent text-on-accent transition-opacity disabled:opacity-40"
          >
            ↑
          </button>
        </div>
      </form>
    </div>
  );
}

function DockHeader({ onClose, closeLabel }: { onClose: () => void; closeLabel: string }) {
  return (
    <div className="flex items-center justify-between border-b border-line px-4 py-3.5">
      <div className="flex items-center gap-2">
        <span className="signal-glow inline-block h-2 w-2 rounded-full bg-accent" />
        <div>
          <p className="font-display text-[14px] font-semibold text-chalk">Asistente del video</p>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-ash">
            Responde con el contenido del video
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={onClose}
        aria-label={closeLabel}
        className="grid h-7 w-7 shrink-0 place-items-center rounded-md border border-line text-smoke hover:text-chalk"
      >
        {closeLabel === "Cerrar" ? "✕" : "»"}
      </button>
    </div>
  );
}

// Un solo componente: inline en pantallas anchas (xl), overlay flotante abajo.
export function AssistantDock({ topicId }: { topicId: string }) {
  const [railOpen, setRailOpen] = useState(true);
  const [overlayOpen, setOverlayOpen] = useState(false);

  return (
    <>
      {/* Inline (xl+) */}
      {railOpen ? (
        <aside className="hidden w-[360px] shrink-0 border-l border-line bg-surface-1 xl:block">
          <div className="sticky top-0 flex h-screen flex-col">
            <DockHeader onClose={() => setRailOpen(false)} closeLabel="Ocultar asistente" />
            <ChatBody topicId={topicId} />
          </div>
        </aside>
      ) : (
        <button
          type="button"
          onClick={() => setRailOpen(true)}
          aria-label="Mostrar asistente del video"
          className="group hidden shrink-0 flex-col items-center gap-3 border-l border-line bg-surface-1 px-3 py-5 transition-colors hover:bg-surface-2 xl:flex"
        >
          <span className="grid h-8 w-8 place-items-center rounded-full border border-line text-accent transition-colors group-hover:border-accent/50">
            ‹
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ash [writing-mode:vertical-rl]">
            Asistente
          </span>
        </button>
      )}

      {/* Botón flotante (< xl) */}
      <button
        type="button"
        onClick={() => setOverlayOpen(true)}
        className="signal-glow fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-3 text-[13px] font-semibold text-on-accent shadow-[0_12px_40px_-8px_rgba(0,230,160,0.5)] xl:hidden"
      >
        <span className="inline-block h-2 w-2 rounded-full bg-on-accent/80" />
        Asistente
      </button>

      {/* Overlay (< xl) */}
      {overlayOpen ? (
        <div className="fixed inset-0 z-50 xl:hidden">
          <div className="absolute inset-0 bg-ink/70" onClick={() => setOverlayOpen(false)} />
          <div className="absolute inset-y-0 right-0 flex w-[92%] max-w-[420px] flex-col border-l border-line bg-surface-1">
            <DockHeader onClose={() => setOverlayOpen(false)} closeLabel="Cerrar" />
            <ChatBody topicId={topicId} />
          </div>
        </div>
      ) : null}
    </>
  );
}
