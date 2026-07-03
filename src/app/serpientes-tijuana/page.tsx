import { StickyBar } from "@/components/serpientes/StickyBar";
import { Hero } from "@/components/serpientes/Hero";
import { Contexto } from "@/components/serpientes/Contexto";
import { Comparativa } from "@/components/serpientes/Comparativa";
import { PullQuote } from "@/components/serpientes/PullQuote";
import { Objetivos } from "@/components/serpientes/Objetivos";
import { EstrategiaPilares } from "@/components/serpientes/EstrategiaPilares";
import { ContenidoCalendario } from "@/components/serpientes/ContenidoCalendario";
import { TiposDeContenido } from "@/components/serpientes/TiposDeContenido";
import { ReferenciasReels } from "@/components/serpientes/ReferenciasReels";
import { Activaciones } from "@/components/serpientes/Activaciones";
import { Campanas } from "@/components/serpientes/Campanas";
import { HashtagMarquee } from "@/components/serpientes/HashtagMarquee";
import { PautaDigital } from "@/components/serpientes/PautaDigital";
import { Alianzas } from "@/components/serpientes/Alianzas";
import { KpiYMetas } from "@/components/serpientes/KpiYMetas";
import { Cierre } from "@/components/serpientes/Cierre";

export default function SerpientesTijuanaPage() {
  return (
    <>
      <StickyBar />
      <main>
        <Hero />
        <Contexto />
        <Comparativa />
        <PullQuote />
        <Objetivos />
        <EstrategiaPilares />
        <ContenidoCalendario />
        <TiposDeContenido />
        <ReferenciasReels />
        <Activaciones />
        <Campanas />
        <HashtagMarquee />
        <PautaDigital />
        <Alianzas />
        <KpiYMetas />
        <Cierre />
      </main>
    </>
  );
}
