import type { LeadStatus, LeadSource } from "@/lib/schema";
import { STATUS_LABELS, STATUS_ORDER } from "@/lib/crm-status";
import { avatarClass, initials } from "./avatar";

export { STATUS_ORDER };

// Tinte + texto por estado. Las clases crm-badge-* (globals.css) se adaptan a tema
// claro/oscuro; new/lost usan tokens --crm-* que ya se re-tematizan solos.
const STATUS_STYLE: Record<LeadStatus, { badge: string; dot: string }> = {
  new: { badge: "bg-[var(--crm-wine-tint)] text-[var(--crm-accent-strong)] border-[var(--crm-wine-ring)]", dot: "bg-[var(--crm-wine)]" },
  contacted: { badge: "crm-badge-sky", dot: "bg-sky-400" },
  following_up: { badge: "crm-badge-amber", dot: "bg-amber-400" },
  proposal: { badge: "crm-badge-violet", dot: "bg-violet-400" },
  won: { badge: "crm-badge-emerald", dot: "bg-emerald-400" },
  lost: { badge: "bg-[var(--crm-surface-2)] text-[var(--crm-ink-mute)] border-[var(--crm-line-strong)]", dot: "bg-[var(--crm-ink-mute)]" },
};

export const STATUS_META: Record<LeadStatus, { label: string; badge: string; dot: string }> =
  Object.fromEntries(
    STATUS_ORDER.map((s) => [s, { label: STATUS_LABELS[s], ...STATUS_STYLE[s] }])
  ) as Record<LeadStatus, { label: string; badge: string; dot: string }>;

export function StatusBadge({ status }: { status: LeadStatus }) {
  const meta = STATUS_META[status] ?? STATUS_META.new;
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-0.5 text-[12.5px] font-medium shadow-[0_1px_2px_rgba(20,18,14,0.04)] ${meta.badge}`}
    >
      <span className={`size-1.5 rounded-full shadow-[0_0_0_2px_var(--crm-surface)] ${meta.dot}`} />
      {meta.label}
    </span>
  );
}

const SOURCE_META: Record<LeadSource, { label: string; cls: string; dot: string }> = {
  bot: { label: "Chatbot", cls: "crm-badge-violet", dot: "bg-violet-400" },
  form: { label: "Formulario", cls: "crm-badge-teal", dot: "bg-teal-400" },
  manual: { label: "Manual", cls: "bg-[var(--crm-surface-2)] text-[var(--crm-ink-mute)] border-[var(--crm-line-strong)]", dot: "bg-[var(--crm-ink-mute)]" },
};

export function SourceBadge({ source, onDark = false }: { source: LeadSource; onDark?: boolean }) {
  const m = SOURCE_META[source] ?? SOURCE_META.manual;
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2 py-0.5 text-[12px] font-medium ${
        onDark ? "border-white/30 bg-white/15 text-white" : m.cls
      }`}
    >
      <span className={`size-1 rounded-full ${onDark ? "bg-white" : m.dot}`} />
      {m.label}
    </span>
  );
}

export function OwnerChip({ name, id }: { name: string; id: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        className={`inline-flex size-5 items-center justify-center rounded-full text-[9px] font-semibold shadow-[0_0_0_1.5px_var(--crm-surface)] ${avatarClass(id)}`}
      >
        {initials(name)}
      </span>
      <span className="text-[12.5px] text-[var(--crm-ink-soft)]">{name}</span>
    </span>
  );
}
