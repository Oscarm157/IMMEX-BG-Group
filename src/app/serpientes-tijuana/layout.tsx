import type { Metadata } from "next";
import { Anton, Oswald } from "next/font/google";
import "./serpientes.css";

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Plan de Crecimiento Digital · Serpientes Tijuana CIBAPAC",
  description:
    "Comparativa y plan de crecimiento digital para Serpientes Tijuana, franquicia de CIBAPAC.",
  robots: { index: false, follow: false },
};

export default function SerpientesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${anton.variable} ${oswald.variable} st-root`}>
      <div className="grain" aria-hidden />
      {children}
    </div>
  );
}
