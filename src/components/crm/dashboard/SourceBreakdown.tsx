"use client";

import type { DashboardMetrics } from "@/lib/crm-metrics";
import { Breakdown } from "./Breakdown";

const SOURCE_LABELS: Record<string, string> = {
  bot: "Chatbot",
  form: "Form",
  manual: "Manual",
};

export function SourceBreakdown({ bySource }: { bySource: DashboardMetrics["bySource"] }) {
  const rows = bySource.map((r) => ({
    label: SOURCE_LABELS[r.source] ?? r.source,
    count: r.count,
  }));

  return (
    <Breakdown
      title="By source"
      subtitle="Where the period's leads come from"
      rows={rows}
      emptyCopy="No data in this period."
    />
  );
}
