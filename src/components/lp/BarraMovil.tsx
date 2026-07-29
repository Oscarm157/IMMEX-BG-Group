import { telefonos } from "@/lib/site-config";

// Barra inferior en móvil: el formulario queda arriba en el flujo, así que el
// CTA que lleva a él vive fijo abajo.
export function BarraMovil() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-ink/95 backdrop-blur lg:hidden">
      <div className="flex items-center gap-3 px-4 py-3">
        <a
          href={telefonos.tijuana.href}
          className="shrink-0 rounded-full border border-chalk/25 px-4 py-3 font-mono text-[13px] tabular-nums text-chalk"
        >
          Llamar
        </a>
        <a
          href="#form"
          className="flex-1 rounded-full bg-accent px-5 py-3 text-center text-[15px] font-medium text-on-accent"
        >
          Dejar mis datos
        </a>
      </div>
    </div>
  );
}
