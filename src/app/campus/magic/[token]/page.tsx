import { consumeMagicLink } from "../../auth-actions";
import { AuthShell, AuthSubmit } from "@/components/campus/AuthShell";

export default async function CampusMagicPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  // El consumo va por acción (POST), no por GET, para que un prefetch o escáner
  // de correo no queme el token de un solo uso al pre-cargar el enlace.
  const action = consumeMagicLink.bind(null, token);

  return (
    <AuthShell
      eyebrow="Acceso"
      title="Confirma tu ingreso"
      subtitle="Da un clic para entrar al Campus con este enlace."
    >
      <form action={action}>
        <AuthSubmit>Entrar al Campus</AuthSubmit>
      </form>
    </AuthShell>
  );
}
