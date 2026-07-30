import { unlock } from "./actions";

export const metadata = { title: "Acceso", robots: { index: false, follow: false } };

export default async function AccesoSitio({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const { next, error } = await searchParams;

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-ink px-5 py-10">
      <div className="w-full max-w-[360px]">
        <h1 className="text-center text-[22px] font-medium tracking-tight text-chalk">
          Contenido restringido
        </h1>
        <p className="mt-1.5 text-center text-[13px] text-bone">
          Esta página necesita contraseña para verse.
        </p>

        <form action={unlock} className="mt-6 rounded-xl border border-line bg-surface-2 p-6">
          <input type="hidden" name="next" value={next ?? "/"} />
          <label htmlFor="password" className="mb-1.5 block text-[13px] font-medium text-chalk">
            Contraseña
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoFocus
            autoComplete="current-password"
            className="w-full rounded-lg border border-line bg-surface-1 px-3 py-2 text-[14px] text-chalk outline-none focus:border-accent"
            placeholder="••••••••"
          />

          {error && (
            <p className="mt-3 rounded-lg border border-red-500/25 bg-red-500/10 px-3 py-2 text-[12.5px] text-red-300">
              Contraseña incorrecta.
            </p>
          )}

          <button
            type="submit"
            className="mt-5 h-10 w-full rounded-lg bg-accent text-[14px] font-medium text-on-accent transition hover:bg-accent-dim"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
