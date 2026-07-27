import Link from "next/link";
import { redirect } from "next/navigation";
import { PageHeader } from "@/components/crm/PageShell";
import { getCurrentUser } from "@/lib/crm-session";
import { canViewAds } from "@/lib/crm-permissions";
import { getGrupos, getItemsPorGrupo } from "@/lib/keywords-data";
import { FilasGrupos } from "./FilasGrupos";

export const dynamic = "force-dynamic";
export const metadata = { title: "Grupos de keywords", robots: { index: false } };

const num = (n: number, d = 0) =>
  n.toLocaleString("es-MX", { minimumFractionDigits: d, maximumFractionDigits: d });

const COLUMNAS = ["volumen", "cpc", "disputa", "techoClics", "costoMes"] as const;
type Columna = (typeof COLUMNAS)[number];

export default async function GruposPage({
  searchParams,
}: {
  searchParams: Promise<{ orden?: string; dir?: string }>;
}) {
  const me = await getCurrentUser();
  if (!me) redirect("/admin/login");
  if (!canViewAds(me.role)) redirect("/admin");

  const sp = await searchParams;
  const orden = (COLUMNAS as readonly string[]).includes(sp.orden ?? "")
    ? (sp.orden as Columna)
    : "volumen";
  const asc = sp.dir === "asc";

  const [todos, items] = await Promise.all([getGrupos(), getItemsPorGrupo()]);
  const grupos = todos.sort((a, b) => (asc ? a[orden] - b[orden] : b[orden] - a[orden]));

  if (!grupos.length) {
    return (
      <div className="mx-auto max-w-[1200px]">
        <PageHeader eyebrow="Pauta" title="Grupos" />
        <div className="crm-card p-10 text-center">
          <p className="text-[14px] text-[var(--crm-ink-soft)]">Todavía no hay grupos.</p>
          <p className="mt-1 text-[13px] text-[var(--crm-ink-faint)]">
            Selecciona keywords en la tabla y usa &ldquo;Agregar a grupo&rdquo;.
          </p>
          <Link href="/admin/keywords" className="crm-btn crm-btn-sm crm-btn-primary mt-4">
            Ir a keywords
          </Link>
        </div>
      </div>
    );
  }

  const volumenTotal = grupos.reduce((a, g) => a + g.volumen, 0);
  const escala = Math.max(...grupos.map((g) => g.volumen), 1);

  return (
    <div className="mx-auto max-w-[1200px]">
      <PageHeader
        eyebrow="Pauta"
        title="Grupos"
        description={`${num(grupos.length)} ${grupos.length === 1 ? "grupo armado" : "grupos armados"}, ${num(volumenTotal)} búsquedas al mes en total. Ordena por cualquier columna: por costo estimado sale cuál es más barato de atacar.`}
        actions={
          <Link href="/admin/keywords" className="crm-btn crm-btn-sm crm-btn-secondary">
            Agregar keywords
          </Link>
        }
      />

      <div className="crm-card overflow-x-auto">
        <table className="crm-table min-w-[860px]">
          <thead className="crm-thead">
            <tr>
              <th className="crm-th">Grupo</th>
              <th className="crm-th">Demanda</th>
              <Th col="volumen" orden={orden} asc={asc}>Vol/mes</Th>
              <Th col="cpc" orden={orden} asc={asc}>CPC</Th>
              <Th col="disputa" orden={orden} asc={asc}>Disputa</Th>
              <Th col="techoClics" orden={orden} asc={asc}>Clics techo</Th>
              <Th col="costoMes" orden={orden} asc={asc}>Costo/mes</Th>
              <th className="crm-th text-right">Estado</th>
            </tr>
          </thead>
          <tbody>
            <FilasGrupos
              grupos={grupos.map((g) => ({
                ...g,
                actualizado: g.actualizado ? g.actualizado.toISOString() : null,
              }))}
              items={Object.fromEntries(items)}
              escala={escala}
            />
          </tbody>
        </table>
      </div>

      <p className="mt-3 max-w-prose text-[12.5px] leading-relaxed text-[var(--crm-ink-faint)]">
        Clics techo es lo máximo que da la demanda del grupo con supuestos de arranque (aparecer en
        el 65% de las búsquedas y 8% de clic por impresión). No es lo que alcanza a pagar un
        presupuesto: en la calculadora puedes ajustar esos dos supuestos. Costo/mes es ese techo
        por el CPC, en dólares.
      </p>
    </div>
  );
}

/** Encabezado ordenable. Sin JS: el orden viaja en la URL. */
function Th({
  col,
  orden,
  asc,
  children,
}: {
  col: Columna;
  orden: Columna;
  asc: boolean;
  children: React.ReactNode;
}) {
  const activa = orden === col;
  // Click en la activa invierte; en otra, arranca de mayor a menor.
  const dir = activa && !asc ? "asc" : "desc";
  return (
    <th className="crm-th crm-th-sort text-right">
      <Link
        href={`/admin/keywords/grupos?orden=${col}&dir=${dir}`}
        className={activa ? "text-[var(--crm-ink)]" : ""}
      >
        {children}
        {activa && <span className="ml-1">{asc ? "↑" : "↓"}</span>}
      </Link>
    </th>
  );
}
