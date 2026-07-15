import Link from "next/link";

// Marco visual de las pantallas de acceso del campus. Oscuro, sobrio, con la
// señal mint. El pase visual fino del campus vive en el piloto; esto ya nace
// on-brand para no leer como formulario genérico.
export function AuthShell({
  eyebrow,
  title,
  subtitle,
  children,
  footer,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen items-center justify-center px-5 py-16">
      <div className="grid-field grid-fade pointer-events-none absolute inset-0 opacity-60" />
      <div className="relative w-full max-w-[400px]">
        <div className="mb-8 flex items-center gap-2">
          <span className="signal-glow inline-block h-2.5 w-2.5 rounded-full bg-accent" />
          <span className="font-display text-[15px] font-semibold tracking-[-0.01em] text-chalk">
            Campus <span className="text-accent">BG</span>
          </span>
        </div>

        {eyebrow ? (
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ash">{eyebrow}</p>
        ) : null}
        <h1 className="mt-2 font-display text-[28px] font-semibold leading-[1.1] tracking-[-0.02em] text-chalk">
          {title}
        </h1>
        {subtitle ? <p className="mt-2 text-[14px] leading-relaxed text-smoke">{subtitle}</p> : null}

        <div className="mt-7">{children}</div>

        {footer ? <div className="mt-6 text-[13px] text-smoke">{footer}</div> : null}
      </div>
    </div>
  );
}

export function AuthField({
  label,
  name,
  type = "text",
  placeholder,
  required,
  autoComplete,
  defaultValue,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
  defaultValue?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.1em] text-smoke">
        {label}
      </span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        defaultValue={defaultValue}
        className="w-full rounded-[10px] border border-line bg-surface-1 px-3.5 py-2.5 text-[14px] text-chalk outline-none transition-colors placeholder:text-ash focus:border-accent/60 focus:ring-2 focus:ring-accent/25"
      />
    </label>
  );
}

export function AuthSubmit({
  children,
  formAction,
  variant = "primary",
}: {
  children: React.ReactNode;
  formAction?: (formData: FormData) => void | Promise<void>;
  variant?: "primary" | "ghost";
}) {
  const base =
    "inline-flex w-full items-center justify-center rounded-full px-5 py-2.5 text-[14px] font-semibold transition-colors";
  const styles =
    variant === "primary"
      ? "bg-accent text-on-accent hover:bg-accent-dim"
      : "border border-line text-bone hover:border-accent/50 hover:text-chalk";
  return (
    <button type="submit" formAction={formAction} className={`${base} ${styles}`}>
      {children}
    </button>
  );
}

export function AuthLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-accent underline-offset-4 hover:underline">
      {children}
    </Link>
  );
}
