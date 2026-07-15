import { redirect } from "next/navigation";
import { getCurrentLearner } from "@/lib/campus-session";
import { setPassword } from "../auth-actions";
import { AuthShell, AuthField, AuthSubmit } from "@/components/campus/AuthShell";

export default async function CampusSetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const me = await getCurrentLearner();
  if (!me) redirect("/campus/login");
  const sp = await searchParams;

  return (
    <AuthShell
      eyebrow="Seguridad"
      title="Fija tu contraseña"
      subtitle="Elige una contraseña para tu cuenta. Mínimo 8 caracteres."
    >
      <form action={setPassword} className="space-y-4">
        <AuthField
          label="Nueva contraseña"
          name="password"
          type="password"
          required
          autoComplete="new-password"
          placeholder="Mínimo 8 caracteres"
        />
        {sp.error === "short" ? (
          <p className="rounded-lg border border-[#f0503f]/30 bg-[#f0503f]/10 px-3 py-2 text-[13px] text-[#f0876f]">
            La contraseña debe tener al menos 8 caracteres.
          </p>
        ) : null}
        <AuthSubmit>Guardar y continuar</AuthSubmit>
      </form>
    </AuthShell>
  );
}
