import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/crm-session";
import { canManagePosts } from "@/lib/crm-permissions";
import { getAllDirectorProfiles } from "@/lib/posts/profiles";
import { Breadcrumb } from "@/components/crm/Breadcrumb";
import { PageHeader } from "@/components/crm/PageShell";
import { KeyFacts } from "@/components/crm/KeyFacts";
import { initials, avatarClass } from "@/components/crm/avatar";
import { AddDirectorModal } from "@/components/crm/posts/AddDirectorModal";
import { DirectorRowActions } from "@/components/crm/posts/DirectorRowActions";

export const dynamic = "force-dynamic";
export const metadata = { title: "Directores", robots: { index: false } };

export default async function DirectoresPage() {
  const me = await getCurrentUser();
  if (!me) redirect("/admin/login");
  if (!canManagePosts(me.role)) redirect("/admin");

  const directors = await getAllDirectorProfiles();
  const incomplete = (d: { expertise: string | null; voice: string | null }) => !d.expertise || !d.voice;
  const active = directors.filter((d) => d.active);
  const incompleteCount = active.filter(incomplete).length;

  const num = (n: number) => <span className="crm-num">{n}</span>;

  return (
    <div className="crm-fade mx-auto max-w-[1280px]">
      <Breadcrumb items={[{ label: "Generador", href: "/admin/posts" }, { label: "Directores" }]} />

      <div className="mt-4">
        <PageHeader
          eyebrow="Contenido"
          title="Directores"
          description="Cada director publica con su propia voz. La especialización y la voz que cargues aquí alimentan al generador: definen de qué escribe y cómo suena."
          actions={<AddDirectorModal />}
        />
      </div>

      <div className="mb-5">
        <KeyFacts
          items={[
            { label: "Directores activos", value: num(active.length) },
            { label: "Por completar", value: num(incompleteCount) },
            { label: "Listos para generar", value: num(active.length - incompleteCount) },
          ]}
        />
      </div>

      {directors.length === 0 ? (
        <div className="rounded-[var(--crm-r-lg)] border border-dashed border-[var(--crm-line-strong)] bg-[var(--crm-surface-2)] p-10 text-center">
          <p className="text-[14px] font-medium text-[var(--crm-ink)]">Aún no hay directores</p>
          <p className="mt-1.5 text-[13px] text-[var(--crm-ink-mute)]">Da de alta el primero para usarlo en el generador de posts.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-[var(--crm-r-lg)] border border-[var(--crm-line)]">
          <div className="overflow-x-auto">
            <table className="crm-table min-w-[720px]">
              <thead className="crm-thead">
                <tr>
                  <th className="crm-th">Director</th>
                  <th className="crm-th">Cargo</th>
                  <th className="crm-th">Perfil para la IA</th>
                  <th className="crm-th w-10" aria-hidden />
                </tr>
              </thead>
              <tbody>
                {directors.map((d, i) => {
                  const falta = incomplete(d);
                  return (
                    <tr
                      key={d.id}
                      className={`crm-row crm-fade group ${d.active ? "" : "opacity-55"}`}
                      style={{ animationDelay: `${Math.min(i, 14) * 22}ms` }}
                    >
                      <td className="crm-td">
                        <div className="flex items-center gap-2.5">
                          <span className={`grid size-8 shrink-0 place-items-center rounded-full text-[11px] font-semibold shadow-[0_0_0_1.5px_var(--crm-surface)] ${avatarClass(d.id)}`}>
                            {initials(d.name)}
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <span className="text-[13.5px] font-semibold text-[var(--crm-ink)]">{d.name}</span>
                            {!d.active && (
                              <span className="rounded border border-[var(--crm-line-strong)] px-1 py-px text-[10px] font-medium text-[var(--crm-ink-mute)]">
                                inactivo
                              </span>
                            )}
                          </span>
                        </div>
                      </td>
                      <td className="crm-td text-[13px] text-[var(--crm-ink-soft)]">
                        {d.title || <span className="text-[var(--crm-ink-mute)]">Sin cargo</span>}
                      </td>
                      <td className="crm-td">
                        {falta ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--crm-wine-ring)] bg-[var(--crm-wine-tint)] px-2 py-0.5 text-[12px] font-medium text-[var(--crm-wine)]">
                            <span className="size-1.5 rounded-full bg-[var(--crm-wine)]" />
                            {!d.expertise && !d.voice ? "Falta especialización y voz" : !d.expertise ? "Falta especialización" : "Falta voz"}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-transparent bg-[var(--crm-accent-tint)] px-2 py-0.5 text-[12px] font-medium text-[var(--crm-accent-strong)]">
                            <span className="size-1.5 rounded-full bg-[var(--crm-accent)]" />
                            Listo para generar
                          </span>
                        )}
                      </td>
                      <td className="crm-td w-10 pr-4">
                        <DirectorRowActions
                          director={{ id: d.id, name: d.name, title: d.title, expertise: d.expertise, voice: d.voice, avoid: d.avoid, active: d.active }}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
