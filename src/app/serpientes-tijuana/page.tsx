import { StickyBar } from "@/components/serpientes/StickyBar";
import { Hero } from "@/components/serpientes/Hero";
import { Contexto } from "@/components/serpientes/Contexto";
import { Comparativa } from "@/components/serpientes/Comparativa";
import { PullQuote } from "@/components/serpientes/PullQuote";

export default function SerpientesTijuanaPage() {
  return (
    <>
      <StickyBar />
      <main>
        <Hero />
        <Contexto />
        <Comparativa />
        <PullQuote />
      </main>
    </>
  );
}
