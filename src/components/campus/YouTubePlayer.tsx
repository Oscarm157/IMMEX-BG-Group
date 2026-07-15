"use client";

import { useEffect, useRef } from "react";
import { useVideoAssistant } from "./video-assistant-context";

// Reproductor YouTube controlable. Usa enablejsapi=1 + postMessage para saltar a
// un segundo sin recargar (lo dispara el asistente vía el contexto compartido).
export function YouTubePlayer({ videoId }: { videoId: string }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const assistant = useVideoAssistant();

  useEffect(() => {
    if (!assistant) return;
    assistant.registerSeek((seconds) => {
      const win = iframeRef.current?.contentWindow;
      if (!win) return;
      // Comandos de la IFrame API por postMessage: salta y reproduce.
      win.postMessage(
        JSON.stringify({ event: "command", func: "seekTo", args: [seconds, true] }),
        "*",
      );
      win.postMessage(JSON.stringify({ event: "command", func: "playVideo", args: [] }), "*");
      // Scroll al <figure> (tiene scroll-mt) para que el topbar sticky no corte el video.
      iframeRef.current?.closest("figure")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [assistant]);

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
