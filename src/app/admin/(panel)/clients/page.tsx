import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/crm-session";
import { getClients } from "@/lib/ads-data";
import { createClient, setClientActive } from "@/app/admin/ads-actions";
import { fmtDate } from "@/lib/crm-format";

export const dynamic = "force-dynamic";

export default async function ClientsPage() {
  const me = await getCurrentUser();
  if (!me) redirect("/admin/login");
  if (me.role !== "admin") redirect("/admin");

  const clients = await getClients();

  return (
    <div className="mx-auto max-w-[900px] px-4 py-8 sm:px-7">
      <h1 className="font-serif text-[26px] leading-tight tracking-tight text-[var(--crm-ink)]">Clientes</h1>
      <p className="mt-1 text-[13px] text-[var(--crm-ink-mute)]">Cuentas para asociar anuncios y dar acceso de solo lectura.</p>

      <form action={createClient} className="crm-card mt-6 flex items-end gap-3 p-5">
        <div className="flex-1">
          <label htmlFor="name" className="mb-1.5 block text-[12px] font-medium uppercase tracking-[0.08em] text-[var(--crm-ink-mute)]">Nuevo cliente</label>
          <input id="name" name="name" required className="crm-input" placeholder="Nombre del cliente" />
        </div>
        <button className="crm-btn crm-btn-primary">Agregar</button>
      </form>

      {clients.length > 0 && (
        <div className="crm-card mt-5 overflow-hidden">
          <table className="crm-table">
            <thead className="crm-thead"><tr><th className="crm-th">Cliente</th><th className="crm-th">Slug</th><th className="crm-th">Alta</th><th className="crm-th">Estado</th></tr></thead>
            <tbody>
              {clients.map((c) => (
                <tr key={c.id} className="crm-row border-t border-[var(--crm-line)]">
                  <td className="crm-td font-medium text-[var(--crm-ink)]">{c.name}</td>
                  <td className="crm-td font-mono text-[12px] text-[var(--crm-ink-soft)]">{c.slug}</td>
                  <td className="crm-td text-[13px] text-[var(--crm-ink-mute)]">{c.createdAt ? fmtDate(c.createdAt) : "—"}</td>
                  <td className="crm-td">
                    <form action={setClientActive.bind(null, c.id, !c.active)}>
                      <button className={`crm-badge ${c.active ? "crm-badge-wine" : ""}`}>{c.active ? "Activo" : "Inactivo"}</button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
