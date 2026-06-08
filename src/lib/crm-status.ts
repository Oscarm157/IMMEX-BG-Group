import type { LeadStatus } from "./schema";

// Single source of truth for lead statuses, shared by the UI (status.tsx) and
// the server actions. Server-safe (no JSX/client imports).
export const STATUS_ORDER: LeadStatus[] = [
  "new",
  "contacted",
  "following_up",
  "proposal",
  "won",
  "lost",
];

export const STATUS_LABELS: Record<LeadStatus, string> = {
  new: "New",
  contacted: "Contacted",
  following_up: "Following up",
  proposal: "Proposal sent",
  won: "Won",
  lost: "Lost",
};
