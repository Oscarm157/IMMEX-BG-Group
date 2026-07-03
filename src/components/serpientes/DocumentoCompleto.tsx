import { PLAN_SECTIONS } from "@/content/serpientes-plan";

type Section = (typeof PLAN_SECTIONS)[number];

/* Primitivas de lectura. No llevan copy: solo estructuran el texto de los datos. */

function Paras({ items }: { items: readonly string[] }) {
  return (
    <div className="grid gap-4">
      {items.map((p, i) => (
        <p key={i} className="text-[16px] leading-[1.72] text-[var(--st-bone)]">
          {p}
        </p>
      ))}
    </div>
  );
}

function Bullets({ items }: { items: readonly string[] }) {
  return (
    <ul className="grid gap-2">
      {items.map((it, i) => (
        <li
          key={i}
          className="grid grid-cols-[auto_1fr] gap-3 text-[15px] leading-[1.55] text-[var(--st-chalk)]"
        >
          <span className="mt-[8px] h-1 w-1 bg-[var(--st-gold)]" aria-hidden />
          {it}
        </li>
      ))}
    </ul>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="st-eyebrow mb-3 text-[11px] tracking-[0.18em] text-[var(--st-ash)]">
      {children}
    </p>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-3 border-t border-[var(--st-line)] pt-6">
      <h3 className="st-display text-[20px] text-[var(--st-chalk)]">{title}</h3>
      {children}
    </div>
  );
}

function Body({ section }: { section: Section }) {
  switch (section.id) {
    case "contexto":
      return <Paras items={section.data.parrafos} />;

    case "comparativa":
      return (
        <div className="grid gap-8">
          {section.data.equipos.map((e) => (
            <div key={e.nombre} className="grid gap-4">
              <h3 className="st-display text-[20px] text-[var(--st-gold)]">{e.nombre}</h3>
              <Paras items={[e.resumen]} />
              <div>
                <Label>Fortalezas</Label>
                <Bullets items={e.fortalezas} />
              </div>
            </div>
          ))}
        </div>
      );

    case "diagnostico":
      return (
        <div className="grid gap-6">
          <Paras items={section.data.parrafos} />
          <blockquote className="st-display border-l-2 border-[var(--st-gold)] pl-5 text-[22px] leading-[1.2] text-[var(--st-chalk)]">
            {section.data.posicionamiento}
          </blockquote>
        </div>
      );

    case "objetivos":
      return (
        <div className="grid gap-8">
          <Paras items={[section.data.general]} />
          {section.data.especificos.map((g) => (
            <Block key={g.categoria} title={g.categoria}>
              <Bullets items={g.items} />
            </Block>
          ))}
        </div>
      );

    case "estrategia":
      return (
        <div className="grid gap-8">
          <div className="grid gap-4">
            <p className="st-eyebrow text-[13px] text-[var(--st-gold)]">
              {section.data.subtitulo}
            </p>
            <Paras items={[section.data.intro]} />
          </div>
          {section.data.pilares.map((p) => (
            <Block key={p.numero} title={`${p.numero}. ${p.titulo}`}>
              <Paras items={[p.descripcion]} />
              {"conceptos" in p && p.conceptos ? (
                <div>
                  <Label>Conceptos</Label>
                  <Bullets items={p.conceptos} />
                </div>
              ) : null}
            </Block>
          ))}
        </div>
      );

    case "plan-contenido":
      return (
        <div className="grid gap-8">
          {section.data.fases.map((f) => (
            <Block key={f.nombre} title={f.nombre}>
              <Paras items={[f.objetivo]} />
              <div>
                <Label>Contenido</Label>
                <Bullets items={f.contenido} />
              </div>
              {"ideasPost" in f && f.ideasPost ? (
                <div>
                  <Label>Ideas de post</Label>
                  <Bullets items={f.ideasPost} />
                </div>
              ) : null}
            </Block>
          ))}
          <Block title="Calendario semanal">
            <Paras items={[section.data.calendarioSemanal.objetivo]} />
            <dl className="grid gap-0 divide-y divide-[var(--st-line)] border-y border-[var(--st-line)]">
              {section.data.calendarioSemanal.dias.map((d) => (
                <div key={d.dia} className="grid gap-1 py-3 sm:grid-cols-[140px_1fr] sm:gap-4">
                  <dt className="st-eyebrow text-[12px] text-[var(--st-gold)]">{d.dia}</dt>
                  <dd className="text-[15px] leading-[1.55] text-[var(--st-bone)]">
                    {d.contenido}
                  </dd>
                </div>
              ))}
            </dl>
          </Block>
        </div>
      );

    case "tipos-contenido": {
      const { reels, historias, jugadores, aficion } = section.data;
      const bloques: {
        titulo: string;
        intro: string;
        ideas: readonly string[];
        formato?: readonly string[];
        frases?: readonly string[];
      }[] = [reels, historias, jugadores, aficion];
      return (
        <div className="grid gap-8">
          {bloques.map((b) => (
            <Block key={b.titulo} title={b.titulo}>
              <Paras items={[b.intro]} />
              <Bullets items={b.ideas} />
              {b.formato ? (
                <div>
                  <Label>Formato</Label>
                  <Bullets items={b.formato} />
                </div>
              ) : null}
              {b.frases ? (
                <div>
                  <Label>Frases de marca</Label>
                  <Bullets items={b.frases} />
                </div>
              ) : null}
            </Block>
          ))}
        </div>
      );
    }

    case "campanas":
      return (
        <div className="grid gap-6">
          {section.data.lista.map((c) => (
            <Block key={c.numero} title={`${c.numero}. ${c.nombre}`}>
              <div>
                <Label>Objetivo</Label>
                <p className="text-[15px] leading-[1.6] text-[var(--st-bone)]">{c.objetivo}</p>
              </div>
              <div>
                <Label>Mensajes</Label>
                <Bullets items={c.mensajes} />
              </div>
            </Block>
          ))}
        </div>
      );

    case "pauta-digital":
      return (
        <div className="grid gap-8">
          <Paras items={[section.data.intro]} />
          {section.data.objetivos.map((o) => (
            <Block key={o.numero} title={`${o.numero}. ${o.titulo}`}>
              <Paras items={[o.descripcion]} />
              <Bullets items={o.contenido} />
            </Block>
          ))}
          <Block title="Segmentación">
            <Bullets items={section.data.segmentacion} />
          </Block>
        </div>
      );

    case "alianzas":
      return (
        <div className="grid gap-8">
          <Paras items={[section.data.intro]} />
          <Block title="Aliados">
            <Bullets items={section.data.aliados} />
          </Block>
          <Block title="Ideas de colaboración">
            <Bullets items={section.data.ideas} />
          </Block>
        </div>
      );

    case "indicadores":
      return (
        <div className="grid gap-8">
          <Paras items={[section.data.intro]} />
          {section.data.grupos.map((g) => (
            <Block key={g.categoria} title={g.categoria}>
              <Bullets items={g.items} />
            </Block>
          ))}
        </div>
      );

    case "conclusion":
      return (
        <div className="grid gap-6">
          <Paras items={section.data.parrafos} />
          <Bullets items={section.data.puntos} />
          <p className="st-display border-t border-[var(--st-line)] pt-6 text-[20px] leading-[1.3] text-[var(--st-chalk)]">
            {section.data.cierre}
          </p>
        </div>
      );
  }
}

export function DocumentoCompleto() {
  return (
    <div className="grid gap-20 md:gap-28">
      {PLAN_SECTIONS.map((section) => (
        <article key={section.id} id={section.id} className="st-anchor">
          <header className="mb-8 flex items-baseline gap-4 border-b border-[var(--st-line)] pb-5">
            <span className="st-display text-[clamp(30px,6vw,52px)] leading-none text-[var(--st-gold)]">
              {section.numero}
            </span>
            <h2 className="st-display text-[clamp(22px,4vw,38px)] text-[var(--st-chalk)]">
              {section.titulo}
            </h2>
          </header>
          <Body section={section} />
        </article>
      ))}
    </div>
  );
}
