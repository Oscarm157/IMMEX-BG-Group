import Image from "next/image";

type LogoVariant = "bg" | "bms";
type LogoTone = "light" | "dark";
type LogoSize = "sm" | "md" | "lg";

const heights: Record<LogoSize, number> = {
  sm: 24,
  md: 38,
  lg: 54,
};

const ratios: Record<LogoVariant, number> = {
  bg: 1024 / 325,
  bms: 2803 / 836,
};

const sources: Record<LogoVariant, { light: string; dark: string; alt: string }> = {
  bg: {
    light: "/BG_Logo_Color.png",
    dark: "/BG_Logotipo.png",
    alt: "BG Consulting Group",
  },
  bms: {
    light: "/bms_Logotipo_blanco.png",
    dark: "/Bms_Logotipo.png",
    alt: "BMS Software",
  },
};

export function Logo({
  variant,
  tone = "light",
  size = "md",
  swapOnHover = false,
  className = "",
}: {
  variant: LogoVariant;
  tone?: LogoTone;
  size?: LogoSize;
  swapOnHover?: boolean;
  className?: string;
}) {
  const { light, dark, alt } = sources[variant];
  const h = heights[size];
  const w = Math.round(h * ratios[variant]);
  const primary = tone === "light" ? light : dark;
  const secondary = tone === "light" ? dark : light;

  if (swapOnHover) {
    return (
      <div
        className={`relative inline-block ${className}`}
        style={{ width: w, height: h }}
      >
        <Image
          src={primary}
          alt={alt}
          width={w}
          height={h}
          className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-0"
          priority
        />
        <Image
          src={secondary}
          alt=""
          aria-hidden
          width={w}
          height={h}
          className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
      </div>
    );
  }

  return (
    <Image
      src={primary}
      alt={alt}
      width={w}
      height={h}
      className={className}
      priority
    />
  );
}
