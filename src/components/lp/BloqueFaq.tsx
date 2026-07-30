import { SectionHeading } from "@/components/site/SectionHeading";
import { Faq } from "@/components/site/Faq";
import { Seccion } from "./Seccion";
import type { QA } from "./tipos";

// 6 · Preguntas frecuentes: acordeón. pegadoArriba: cuando un bloque propio
// (sin fondo) va justo antes, no duplica el aire de arriba.
export function BloqueFaq({
  index,
  title = "Preguntas frecuentes",
  items,
  pegadoArriba = false,
}: {
  index: string;
  title?: string;
  items: readonly QA[];
  pegadoArriba?: boolean;
}) {
  return (
    <Seccion variant="plano" className={pegadoArriba ? "pb-20" : "pb-20 pt-24"}>
      <SectionHeading eyebrow="Preguntas" index={index} title={title} className="mb-12" />
      <Faq items={items} />
    </Seccion>
  );
}
