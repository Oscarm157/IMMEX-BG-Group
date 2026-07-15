import { login, requestMagicLink } from "../auth-actions";
import { AuthShell, AuthField, AuthSubmit } from "@/components/campus/AuthShell";

const ERRORS: Record<string, string> = {
  "1": "Correo o contraseña incorrectos.",
  rate: "Demasiados intentos. Espera un minuto e intenta de nuevo.",
  link: "El enlace no es válido o ya expiró. Solicita uno nuevo.",
};

export default async function CampusLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; sent?: string }>;
}) {
  const sp = await searchParams;
  const error = sp.error ? ERRORS[sp.error] ?? "No se pudo iniciar sesión." : null;

  return (
    <AuthShell
      eyebrow="Acceso"
      title="Entra al Campus"
      subtitle="Capacitación de BG Consulting Group. Acceso solo para clientes y colaboradores invitados."
    >
      <form className="space-y-4">
        <AuthField label="Correo" name="email" type="email" required autoComplete="email" />
        <AuthField
          label="Contraseña"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="Tu contraseña"
        />

        {sp.sent ? (
          <p className="rounded-lg border border-accent/30 bg-accent/10 px-3 py-2 text-[13px] text-accent">
            Si el correo está registrado, te enviamos un enlace de acceso. Revisa tu bandeja.
          </p>
        ) : null}
        {error ? (
          <p className="rounded-lg border border-[#f0503f]/30 bg-[#f0503f]/10 px-3 py-2 text-[13px] text-[#f0876f]">
            {error}
          </p>
        ) : null}

        <div className="space-y-2.5 pt-1">
          <AuthSubmit formAction={login}>Entrar</AuthSubmit>
          <AuthSubmit formAction={requestMagicLink} variant="ghost">
            Enviarme un enlace de acceso
          </AuthSubmit>
        </div>
      </form>
    </AuthShell>
  );
}
