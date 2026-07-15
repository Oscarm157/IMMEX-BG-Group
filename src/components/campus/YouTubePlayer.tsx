"use client";

import { useEffect, useRef } from "react";
import { useVideoAssistant } from "./video-assistant-context";

// Reproductor YouTube controlable. Usa enablejsapi=1 + postMessage para saltar a
// un segundo sin recargar (lo dispara el asistente vía el contexto compartido).
export function YouTubePlayer({ videoId }: { videoId: string }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const assistant = useVideoAssistant();
  const readyRef = useRef(false);
  const pendingSeekRef = useRef<number | null>(null);

  useEffect(() => {
    // Manda seekTo + playVideo por postMessage (IFrame API).
    function apply(seconds: number) {
      const win = iframeRef.current?.contentWindow;
      if (!win) return;
      win.postMessage(
        JSON.stringify({ event: "command", func: "seekTo", args: [seconds, true] }),
        "*",
      );
      win.postMessage(JSON.stringify({ event: "command", func: "playVideo", args: [] }), "*");
    }

    // El reproductor emite mensajes cuando ya está listo; hasta entonces el seek
    // se guarda y se aplica al recibir el primer mensaje (evita saltos fallidos).
    function onMessage(e: MessageEvent) {
      if (!iframeRef.current || e.source !== iframeRef.current.contentWindow) return;
      if (typeof e.data !== "string" || !e.data.includes("youtube")) return;
      readyRef.current = true;
      if (pendingSeekRef.current != null) {
        apply(pendingSeekRef.current);
        pendingSeekRef.current = null;
      }
    }
    window.addEventListener("message", onMessage);

    // Handshake para que el iframe empiece a emitir eventos.
    const iv = setInterval(() => {
      const win = iframeRef.current?.contentWindow;
      if (!win) return;
      win.postMessage(JSON.stringify({ event: "listening", id: videoId }), "*");
      if (readyRef.current) clearInterval(iv);
    }, 400);

    if (assistant) {
      assistant.registerSeek((seconds) => {
        if (readyRef.current) apply(seconds);
        else pendingSeekRef.current = seconds;
        // Scroll al <figure> (tiene scroll-mt) para que el topbar sticky no corte el video.
        iframeRef.current?.closest("figure")?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
    return () => {
      window.removeEventListener("message", onMessage);
      clearInterval(iv);
    };
  }, [assistant, videoId]);

  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const src =
    `https://www.youtube-nocookie.com/embed/${videoId}` +
    `?rel=0&enablejsapi=1${origin ? `&origin=${encodeURIComponent(origin)}` : ""}`;

  return (
    <figure className="my-8 scroll-mt-[112px] overflow-hidden rounded-2xl border border-line bg-surface-1 shadow-[0_24px_70px_-32px_rgba(0,0,0,0.85)] ring-1 ring-white/5">
      <div className="relative aspect-video">
        <iframe
          ref={iframeRef}
          className="absolute inset-0 h-full w-full"
          src={src}
          title="Video"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </figure>
  );
}
