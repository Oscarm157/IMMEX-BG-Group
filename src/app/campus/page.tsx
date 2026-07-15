import Link from "next/link";
import { requireLearner } from "@/lib/campus-session";
import { getCatalog } from "@/lib/campus-data";
import { Logo } from "@/components/Logo";
import { logout } from "./auth-actions";

export default async function CampusHome() {
  const me = await requireLearner();
  const catalog = await getCatalog(me);
  const firstName = me.name.split(" ")[0];
  const audienceLabel = me.audience === "cliente" ? "Cliente" : "Colaborador";

  return (
    <div className="relative min-h-screen">
      <div className="grid-field grid-fade pointer-events-none absolute inset-0 opacity-40" />

      {/* Barra superior */}
      <header className="relative mx-auto flex w-full max-w-[1120px] items-center justify-between px-5 py-6 sm:px-8">
        <Logo variant="bg" tone="light" size="lg" />
        <div className="flex items-center gap-4">
          <span className="hidden font-mono text-[11px] uppercase tracking-[0.1em] text-ash sm:inline">
            {audienceLabel}
            {me.role !== "learner" ? ` · ${me.role}` : ""}
          </span>
          <form action={logout}>
            <button
              type="submit"
              className="rounded-full border border-line px-4 py-1.5 text-[13px] text-bone transition-colors hover:border-accent/50 hover:text-chalk"
            >
              Cerrar sesión
            </button>
          </form>
        </div>
      </header>

      <main className="relative mx-auto w-full max-w-[1120px] px-5 pb-20 sm:px-8">
        {/* Encabezado */}
        <div className="pb-10 pt-8 sm:pt-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">Campus BG</p>
          <h1 className="mt-3 font-display text-[clamp(2rem,5vw,3rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-chalk">
            Hola, {firstName}.
          </h1>
          <p className="mt-3 max-w-[520px] text-[16px] leading-[1.7] text-smoke">
            Capacitación de BG Consulting Group. Elige una categoría para empezar; tu avance se guarda solo.
          </p>
        </div>

        {catalog.length === 0 ? (
          <div className="rounded-2xl border border-line bg-surface-1 px-6 py-14 text-center">
            <p className="text-[15px] text-smoke">
              Aún no tienes categorías asignadas. En cuanto se publiquen, aparecerán aquí.
            </p>
          </div>
        ) : (
          <>
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.12em] text-ash">
              Tus categorías
            </p>
            <div className="grid gap-5 sm:grid-cols-2">
              {catalog.map(({ category, progress }) => {
                const cover = category.coverUrl ?? "/campus/comercio-exterior-cover.jpg";
                return (
                  <Link
                    key={category.id}
                    href={`/campus/${category.slug}`}
                    className="group relative isolate flex min-h-[300px] flex-col justify-end overflow-hidden rounded-2xl border border-line"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={cover}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/10" />

                    <div className="relative p-6">
                      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent">Categoría</p>
                      <h2 className="mt-1.5 font-display text-[24px] font-semibold leading-tight tracking-[-0.01em] text-chalk">
                        {category.title}
                      </h2>
                      {category.description ? (
                        <p className="mt-2 line-clamp-2 max-w-[440px] text-[14px] leading-relaxed text-bone/85">
                          {category.description}
                        </p>
                      ) : null}
                      <div className="mt-4 flex items-center gap-3">
                        <div className="h-1.5 w-full max-w-[200px] overflow-hidden rounded-full bg-chalk/15">
                          <div
                            className="h-full rounded-full bg-accent transition-[width] duration-500"
                            style={{ width: `${progress.pct}%` }}
                          />
                        </div>
                        <span className="whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.08em] text-bone">
                          {progress.pct}% · {progress.completed}/{progress.total}
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
