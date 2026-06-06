import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  className = "",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: string;
  align?: "left" | "center";
  className?: string;
}) {
  const alignment = align === "center" ? "items-center text-center mx-auto" : "items-start text-left";
  return (
    <Reveal className={`flex max-w-3xl flex-col ${alignment} ${className}`}>
      {eyebrow && (
        <span className="mb-5 text-[12px] font-medium uppercase tracking-[0.18em] text-accent">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-[clamp(2rem,5vw,3.6rem)] font-medium leading-[1.05] tracking-[-0.02em] text-chalk">
        {title}
      </h2>
      {lead && (
        <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-bone/80">{lead}</p>
      )}
    </Reveal>
  );
}
