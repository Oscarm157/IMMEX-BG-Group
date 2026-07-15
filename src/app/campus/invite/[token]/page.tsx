import { activateAccount } from "../../auth-actions";
import { AuthShell, AuthField, AuthSubmit } from "@/components/campus/AuthShell";

export default async function CampusInvitePage({
  params,
  searchParams,
}: {
  params: Promise<{ token: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { token } = await params;
  const sp = await searchParams;
  const action = activateAccount.bind(null, token);

  return (
    <AuthShell
      eyebrow="Bienvenido"
      title="Activa tu cuenta"
      subtitle="Elige una contraseña para entrar al Campus. Mínimo 8 caracteres."
    >
      <form action={action} className="space-y-4">
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
        <AuthSubmit>Activar y entrar</AuthSubmit>
      </form>
    </AuthShell>
  );
}
