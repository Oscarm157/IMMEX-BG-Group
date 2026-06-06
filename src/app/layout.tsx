import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bgconsultingroup.com"),
  title: {
    default: "BG Consulting Group",
    template: "%s · BG Consulting Group",
  },
  description:
    "Firma de comercio exterior, aduanas y cumplimiento entre Tijuana y San Diego. Más de 20 años en operación.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${newsreader.variable} antialiased`}
    >
      <head>
        {/* Solo para /foro (landing de evento archivada) */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
      </head>
      <body className="min-h-screen bg-void text-chalk">{children}</body>
    </html>
  );
}
