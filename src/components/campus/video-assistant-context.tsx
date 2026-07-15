"use client";

import { createContext, useCallback, useContext, useRef } from "react";

// Puente entre el reproductor del video y el asistente: el reproductor registra
// su seekTo; el asistente lo invoca al hacer clic en una cita de minuto.
type SeekFn = (seconds: number) => void;
type Ctx = { registerSeek: (fn: SeekFn) => void; seekTo: SeekFn };

const VideoAssistantContext = createContext<Ctx | null>(null);

export function VideoAssistantProvider({ children }: { children: React.ReactNode }) {
  const seekRef = useRef<SeekFn | null>(null);
  const registerSeek = useCallback((fn: SeekFn) => {
    seekRef.current = fn;
  }, []);
  const seekTo = useCallback((s: number) => {
    seekRef.current?.(s);
  }, []);
  return (
    <VideoAssistantContext.Provider value={{ registerSeek, seekTo }}>
      {children}
    </VideoAssistantContext.Provider>
  );
}

// Devuelve null si no hay provider (el reproductor funciona igual, sin seek externo).
export function useVideoAssistant() {
  return useContext(VideoAssistantContext);
}
