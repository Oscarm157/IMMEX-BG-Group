import { Composio } from "@composio/core";

/**
 * Envío de la notificación de lead vía Composio (Gmail), reemplaza a Resend.
 * Manda desde la cuenta de Gmail conectada en el dashboard de Composio bajo
 * COMPOSIO_USER_ID. Es determinista (tools.execute directo, sin LLM en el loop).
 * Nunca lanza: si falta env o el envío falla, deja log estructurado y retorna,
 * para no tumbar el request ni el guardado del lead.
 */

type LeadEmail = { to: string; subject: string; html: string };

let client: Composio | null = null;

function getClient(): Composio | null {
  const apiKey = process.env.COMPOSIO_API_KEY;
  if (!apiKey) return null;
  if (!client) client = new Composio({ apiKey });
  return client;
}

export async function sendLeadEmail({ to, subject, html }: LeadEmail): Promise<void> {
  const userId = process.env.COMPOSIO_USER_ID;
  const composio = getClient();
  if (!composio || !userId) {
    console.warn("[composio] mail skipped: falta COMPOSIO_API_KEY o COMPOSIO_USER_ID");
    return;
  }
  try {
    const result = await composio.tools.execute("GMAIL_SEND_EMAIL", {
      userId,
      arguments: { recipient_email: to, subject, body: html, is_html: true },
      // La cuenta de notificaciones usa la versión vigente del tool; para fijar
      // versión en prod, setear toolkitVersions al inicializar Composio.
      dangerouslySkipVersionCheck: true,
    });
    if (result?.error) {
      console.error("[composio] lead email error:", result.error);
    }
  } catch (err) {
    console.error("[composio] lead email failed", err);
  }
}
