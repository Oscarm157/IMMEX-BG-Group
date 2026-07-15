import { requireLearner } from "@/lib/campus-session";
import { logout } from "./auth-actions";

// Home temporal del campus (placeholder). Fase 3 lo reemplaza por el catálogo de
// categorías. Aquí solo confirma que el guard funciona: sin sesión, requireLearner
// redirige a /campus/login.
export default async function CampusHome() {
  const me = await requireLearner();
  const audienceLabel = me.audience === "cliente" ? "Cliente" : "Colaborador";

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-5 text-center">
      <div className="grid-field grid-fade pointer-events-none absolute inset-0 opacity-50" />
      <div className="relative">
        <div className="mb-6 flex items-center justify-center gap-2">
          <span className="signal-glow inline-block h-2.5 w-2.5 rounded-full bg-accent" />
          <span className="font-display text-[15px] font-semibold tracking-[-0.01em]">
            Campus <span className="text-accent">BG</span>
          </span>
        </div>
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ash">
          {audienceLabel}
          {me.role !== "learner" ? ` · ${me.role}` : ""}
        </p>
        <h1 className="mt-3 font-display text-[34px] font-semibold leading-[1.08] tracking-[-0.02em]">
          Hola, {me.name.split(" ")[0]}.
        </h1>
        <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-smoke">
          El catálogo de capacitación está en construcción. Pronto verás aquí tus categorías y videos.
        </p>
        <form action={logout} className="mt-8">
          <button
            type="submit"
            className="rounded-full border border-line px-5 py-2 text-[13px] text-bone transition-colors hover:border-accent/50 hover:text-chalk"
          >
            Cerrar sesión
          </button>
        </form>
      </div>
    </div>
  );
}
