import { eq } from "drizzle-orm";
import { db } from "./db";
import { settings } from "./schema";

const LEAD_NOTIFY_KEY = "lead_notify_emails";

export async function getLeadNotifyEmails(): Promise<string[]> {
  const rows = await db.select().from(settings).where(eq(settings.key, LEAD_NOTIFY_KEY));
  return (rows[0]?.value ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export async function setLeadNotifyEmails(emails: string[]): Promise<void> {
  const value = emails.join(",");
  await db
    .insert(settings)
    .values({ key: LEAD_NOTIFY_KEY, value })
    .onConflictDoUpdate({ target: settings.key, set: { value, updatedAt: new Date() } });
}
