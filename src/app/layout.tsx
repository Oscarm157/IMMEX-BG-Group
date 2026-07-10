import type { Metadata } from "next";
import { Inter, Space_Grotesk, IBM_Plex_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Analytics } from "@/components/site/Analytics";
import { OrganizationSchema } from "@/components/site/OrganizationSchema";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
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
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable} ${plexMono.variable} ${instrumentSerif.variable} antialiased`}
    >
      <head>
        {/* Solo para /foro (landing de evento archivada) */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
      </head>
      <body className="min-h-screen bg-ink text-chalk">
        {children}
        <OrganizationSchema />
        <Analytics />
      </body>
    </html>
  );
}
