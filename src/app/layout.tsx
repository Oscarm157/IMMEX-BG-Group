import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800", "900"],
});

const siteTitle = "BG Consulting x BMS | Foro IMMEX Cumplimiento 360°";
const siteDescription =
  "Diagnóstico sin costo para asistentes al Foro IMMEX. Cumplimiento normativo y automatización de operación aduanera.";

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "es_MX",
    title: siteTitle,
    description: siteDescription,
    siteName: "BG Consulting x BMS",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
};

export const viewport: Viewport = {
  themeColor: "#000616",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${inter.variable} antialiased`}>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
      </head>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
