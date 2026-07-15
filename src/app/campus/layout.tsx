import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Campus BG",
  description: "Capacitación de BG Consulting Group.",
  robots: { index: false, follow: false },
};

export default function CampusLayout({ children }: { children: React.ReactNode }) {
  // Scope de estilo del campus. Los tokens (mint, ink, fuentes) son globales;
  // .campus-root reserva el namespace para CSS específico del campus.
  return <div className="campus-root min-h-screen bg-ink text-chalk">{children}</div>;
}
