import { Slide } from "../Slide";
import { SlideHead } from "../ui";

export function S06Panel() {
  return (
    <Slide centered>
      <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <SlideHead
          index="05"
          eyebrow="Detrás del sitio"
          title="No es solo un sitio. Es un panel."
          lead="Además de la cara pública, la renovación entrega un back-office para operar marketing y comercial: capturar prospectos, moverlos por el embudo, medir campañas y publicar contenido. Todo en un mismo lugar, con accesos por rol."
        />

        <div className="console-panel rounded-[16px] bg-surface-1 p-7">
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
            Tres áreas
          </span>
          <ul className="mt-5 flex flex-col divide-y divide-line">
            <li className="flex items-center justify-between py-4">
              <span className="font-display text-lg text-chalk">Comercial</span>
              <span className="font-mono text-[12px] text-smoke">Resumen · Leads · Pipeline · Campañas</span>
            </li>
            <li className="flex items-center justify-between py-4">
              <span className="font-display text-lg text-chalk">Contenido</span>
              <span className="font-mono text-[12px] text-smoke">Blog · Generador de posts</span>
            </li>
            <li className="flex items-center justify-between py-4">
              <span className="font-display text-lg text-chalk">Cuenta</span>
              <span className="font-mono text-[12px] text-smoke">Usuarios</span>
            </li>
          </ul>
        </div>
      </div>
    </Slide>
  );
}
