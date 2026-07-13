import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/crm-session";
import { canManageUsers } from "@/lib/crm-permissions";
import { getLeadNotifyEmails } from "@/lib/settings";
import { getLeadRotationConfig } from "@/lib/lead-rotation";
import { getEligibleAgents } from "@/lib/crm-data";
import { NotifyEmailsForm } from "@/components/crm/NotifyEmailsForm";
import { LeadRotationForm } from "@/components/crm/LeadRotationForm";
import { Breadcrumb } from "@/components/crm/Breadcrumb";
import { PageHeader } from "@/components/crm/PageShell";

export const dynamic = "force-dynamic";
export const metadata = { title: "Configuración", robots: { index: false } };

export default async function SettingsPage() {
  const me = await getCurrentUser();
  if (!me) redirect("/admin/login");
  if (!canManageUsers(me.role)) redirect("/admin");

  const [emails, { config }, agents] = await Promise.all([
    getLeadNotifyEmails(),
    getLeadRotationConfig(),
    getEligibleAgents(),
  ]);

  return (
    <div className="crm-fade">
      <Breadcrumb items={[{ label: "Leads", href: "/admin" }, { label: "Configuración" }]} />

      <div className="mt-4">
        <PageHeader
          eyebrow="Cuenta"
          title="Configuración"
          description="Define quién recibe los leads y cómo se reparten en el equipo."
        />
      </div>

      <div className="max-w-[560px] space-y-5">
        <section className="crm-card p-6">
          <h2 className="crm-h2 mb-4">Notificaciones</h2>
          <NotifyEmailsForm emails={emails} />
        </section>
        <section className="crm-card p-6">
          <h2 className="crm-h2 mb-4">Reparto de leads</h2>
          <LeadRotationForm config={config} agents={agents} />
        </section>
      </div>
    </div>
  );
}
