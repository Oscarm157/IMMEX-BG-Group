import Link from "next/link";

export function VerEnDocumento({
  count,
  sectionId,
}: {
  count: number;
  sectionId: string;
}) {
  return (
    <Link
      href={`/serpientes-tijuana/documento#${sectionId}`}
      className="st-eyebrow mt-4 inline-block text-[11px] text-[var(--st-bone)] transition hover:text-[var(--st-red)]"
    >
      Ver los {count} restantes en el documento
    </Link>
  );
}
