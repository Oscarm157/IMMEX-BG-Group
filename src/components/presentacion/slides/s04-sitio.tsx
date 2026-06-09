import { Fragment } from "react";
import Image from "next/image";
import { Slide } from "../Slide";
import { SlideHead, ShotRow } from "../ui";
import { shots, chatbot } from "../data";

const paginas = [
  {
    index: "a",
    title: "Inicio",
    desc: "Portada a pantalla completa con el corredor MX-US y el mensaje de la firma: comercio exterior en orden.",
    shot: shots.homeHero,
    priority: true,
  },
  {
    index: "b",
    title: "Estado de operación",
    desc: "Una consola que muestra la operación etapa por etapa. El sitio comunica método, no solo discurso.",
    shot: shots.homeTelemetry,
  },
  {
    index: "c",
    title: "Software",
    desc: "La página de BMS Custom System, el ERP aduanero con el que opera la firma.",
    shot: shots.software,
  },
  {
    index: "d",
    title: "Blog",
    desc: "Contenido propio que posiciona a la firma en buscadores y la presenta por sus temas.",
    shot: shots.blog,
  },
  {
    index: "e",
    title: "Contacto",
    desc: "Las dos oficinas, Tijuana y San Diego, con formulario directo.",
    shot: shots.contact,
  },
];

export function S04Sitio() {
  return (
    <Slide centered={false}>
      <SlideHead
        index="03"
        eyebrow="El sitio · recorrido"
        title="Cómo se ve el sitio."
        lead="Recorre las páginas con scroll. Cada una bilingüe y editable desde el panel."
        className="mb-10"
      />

      <div className="flex flex-col gap-12">
        {paginas.map((p, i) => (
          <Fragment key={p.title}>
            <ShotRow
              index={p.index}
              title={p.title}
              desc={p.desc}
              src={p.shot.src}
              url={p.shot.url}
              priority={p.priority}
            />
            {i === 0 && <ChatbotBlock />}
          </Fragment>
        ))}
      </div>
    </Slide>
  );
}

/* Chatbot: primera atención automatizada. Va justo después de "Inicio". */
function ChatbotBlock() {
  return (
    <div className="console-panel grid gap-7 rounded-[16px] bg-surface-1 p-7 lg:grid-cols-[1fr_0.95fr] lg:items-center sm:p-9">
      <div>
        <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
          <span aria-hidden className="material-symbols-outlined" style={{ fontSize: 16 }}>forum</span>
          Asistente con IA
        </span>
        <h3 className="mt-4 font-display text-[26px] font-medium tracking-[-0.015em] text-chalk sm:text-3xl">
          {chatbot.title}
        </h3>
        <p className="mt-3 max-w-md text-[14px] leading-relaxed text-bone/90">{chatbot.body}</p>
        <ul className="mt-6 flex flex-col gap-3 border-t border-line pt-6">
          {chatbot.puntos.map((pt) => (
            <li key={pt} className="flex items-start gap-3 text-[14px] leading-snug text-bone/90">
              <span aria-hidden className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
              {pt}
            </li>
          ))}
        </ul>
      </div>

      <div className="relative mx-auto w-full max-w-[360px] overflow-hidden rounded-[14px] border border-line bg-ink card-elev">
        <div className="relative aspect-[3/4] w-full">
          <Image
            src={shots.chatbot.src}
            alt="Asistente del sitio respondiendo una consulta"
            fill
            className="object-cover object-top"
          />
        </div>
      </div>
    </div>
  );
}
