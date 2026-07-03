/* Embed oficial de Instagram, inline. Muestra el primer frame nativo del reel y
   reproduce con su propio botón (sin descargar, sin re-hospedar). Dependen de red
   en vivo: conviene probar en la red del pitch antes de presentar. */
export function ReelCard({
  url,
  label,
  vistas,
  fuente,
}: {
  url: string;
  label: string;
  vistas: string;
  fuente?: string;
}) {
  const embedUrl = `${url}embed/`;

  return (
    <div className="flex flex-col overflow-hidden border border-[var(--st-line)] bg-[var(--st-void)]">
      <div className="flex items-center justify-between gap-2 px-4 py-3">
        {fuente && (
          <span className="st-eyebrow text-[11px] text-[var(--st-bone)]">
            {fuente}
          </span>
        )}
        <span className="[font-family:var(--font-plex-mono)] text-[13px] leading-none text-[var(--st-gold)]">
          {vistas}
        </span>
      </div>
      <iframe
        src={embedUrl}
        className="h-[560px] w-full border-y border-[var(--st-line)] bg-[var(--st-void)]"
        loading="lazy"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        allowFullScreen
        title={label}
      />
      <span className="st-eyebrow px-4 py-3 text-[11px] text-[var(--st-chalk)]">
        {label}
      </span>
    </div>
  );
}
