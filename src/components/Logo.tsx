type LogoVariant = "bg" | "bms";
type LogoTone = "light" | "dark";
type LogoSize = "sm" | "md" | "lg";

const sizes: Record<LogoSize, string> = {
  sm: "text-xs",
  md: "text-sm md:text-base",
  lg: "text-base md:text-lg",
};

export function Logo({
  variant,
  tone = "light",
  size = "md",
  className = "",
}: {
  variant: LogoVariant;
  tone?: LogoTone;
  size?: LogoSize;
  className?: string;
}) {
  const color = tone === "light" ? "text-white" : "text-primary";
  const sub =
    tone === "light" ? "text-on-primary-container" : "text-on-surface-variant";

  if (variant === "bg") {
    return (
      <div className={`flex items-baseline gap-3 ${className}`}>
        <span className={`font-black tracking-tighter leading-none ${color} text-2xl md:text-3xl`}>
          BG
        </span>
        <span className={`${sizes[size]} font-bold uppercase tracking-[0.25em] ${sub}`}>
          Consulting Group
        </span>
      </div>
    );
  }

  return (
    <div className={`flex items-baseline gap-3 ${className}`}>
      <span className={`font-black tracking-tighter leading-none ${color} text-2xl md:text-3xl`}>
        BMS
      </span>
      <span className={`${sizes[size]} font-bold uppercase tracking-[0.25em] ${sub}`}>
        Software
      </span>
    </div>
  );
}
