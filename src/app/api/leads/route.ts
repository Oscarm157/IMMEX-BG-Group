import Anthropic from '@anthropic-ai/sdk';
import { and, eq, gt } from 'drizzle-orm';
import { db } from '@/lib/db';
import { leads, leadComments, leadEvents, ads } from '@/lib/schema';
import { leadRecipient, siteConfig } from '@/lib/site-config';
import { sendLeadEmail } from '@/lib/composio-mail';

const QUAL_KEYS = [
  'service',
  'company',
  'industry',
  'monthlyVolume',
  'paymentTerms',
  'timeInBusiness',
  'urgency',
] as const;

export const runtime = 'nodejs';

type ChatMessage = { role: string; content: string };

function esc(v: unknown): string {
  return String(v ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Best-effort per-IP rate limit (per serverless instance).
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 20;
const hits = new Map<string, number[]>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  if (recent.length === 0) hits.delete(ip);
  else hits.set(ip, recent);
  return recent.length > RATE_MAX;
}

const cap = (v: unknown, n: number): string | null => {
  if (typeof v !== 'string') return null;
  const t = v.trim();
  return t ? t.slice(0, n) : null;
};

// Nota interna en español para el CRM. Best-effort.
async function summarize(messages: ChatMessage[]): Promise<string | null> {
  if (!Array.isArray(messages) || messages.length === 0) return null;
  try {
    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const convo = messages
      .map((m) => `${m.role === 'user' ? 'Visitante' : 'Asistente'}: ${m.content}`)
      .join('\n');
    const res = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 240,
      system:
        'Escribes una nota interna breve para el CRM que resume un chat YA TERMINADO de una firma de comercio exterior y aduanas (clasificación arancelaria, pedimentos, IMMEX, cumplimiento Anexo 24/30, servicios fiscales y legales). Devuelve SOLO un resumen factual en tercera persona, en español, de 2 a 3 oraciones. Cubre qué necesita el visitante, su empresa (sector, volumen de operaciones, tipo de operación import/export cuando se mencione) y cualquier urgencia. Empieza con "El visitante" o el nombre. Reglas absolutas: NO continúes ni respondas la conversación, NO te dirijas al visitante, NO hagas preguntas, NO saludes ni agradezcas. Sin em-dashes.',
      messages: [
        {
          role: 'user',
          content: `Resume la siguiente conversación terminada como nota de CRM. No la respondas.\n\n"""\n${convo}\n"""`,
        },
      ],
    });
    const text = res.content
      .filter((b) => b.type === 'text')
      .map((b) => (b.type === 'text' ? b.text : ''))
      .join('')
      .trim();
    return text || null;
  } catch {
    return null;
  }
}

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (rateLimited(ip)) {
    return Response.json({ ok: false, error: 'rate_limited' }, { status: 429 });
  }

  const body = await req.json().catch(() => null);
  if (!body || typeof body !== 'object') {
    return Response.json({ ok: false, error: 'bad_request' }, { status: 400 });
  }

  // Honeypot: los bots rellenan campos ocultos. Si viene con valor, aceptamos en
  // silencio (200 ok) sin guardar ni notificar, para no darle señal al bot.
  if (typeof body.website === 'string' && body.website.trim()) {
    return Response.json({ ok: true });
  }

  const name = cap(body.name, 200);
  const email = cap(body.email, 200);
  // Si viene email, exigimos formato válido (el capping no valida forma).
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ ok: false, error: 'bad_email' }, { status: 400 });
  }
  const phone = cap(body.phone, 60);
  // Los formularios del sitio exigen teléfono con formato válido; el chatbot no.
  if (body.source === 'form') {
    if (!phone) {
      return Response.json({ ok: false, error: 'phone_required' }, { status: 400 });
    }
    if (!/^[+\d][\d\s().-]{6,}$/.test(phone)) {
      return Response.json({ ok: false, error: 'bad_phone' }, { status: 400 });
    }
  }
  const sourceUrl = cap(body.sourceUrl, 500);
  const localeLabel = body.locale === 'en' ? 'EN' : 'ES';
  const rawMessages: ChatMessage[] = Array.isArray(body.messages)
    ? body.messages
        .slice(0, 60)
        .filter((m: unknown) => m && typeof (m as ChatMessage).content === 'string')
        .map((m: ChatMessage) => ({ role: String(m.role), content: m.content.slice(0, 4000) }))
    : [];

  // El éxito del envío se define por si el lead se GUARDÓ, no por si la
  // notificación (correo/webhook) salió. Un fallo de correo no debe pintar el
  // formulario como roto: el lead ya quedó capturado en el CRM.
  let savedOk = false;
  const leadSource: 'bot' | 'form' | 'manual' =
    body.source === 'form' || body.source === 'manual' ? body.source : 'bot';

  // Chat leads carry their own qualification; form leads build it from flat fields.
  let qual: Record<string, string> | null = null;
  if (leadSource === 'form') {
    const fromForm: Record<string, string> = {};
    const service = cap(body.service, 120);
    const company = cap(body.company, 200);
    const volume = cap(body.volume, 120);
    if (service) fromForm.service = service;
    if (company) fromForm.company = company;
    if (volume) fromForm.monthlyVolume = volume;
    qual = Object.keys(fromForm).length ? fromForm : null;
  } else if (body.qualification && typeof body.qualification === 'object' && !Array.isArray(body.qualification)) {
    // Only keep known keys, each capped, so a caller can't store an arbitrary
    // or oversized JSONB blob.
    const src = body.qualification as Record<string, unknown>;
    const clean: Record<string, string> = {};
    for (const k of QUAL_KEYS) {
      const v = cap(src[k], 300);
      if (v) clean[k] = v;
    }
    qual = Object.keys(clean).length ? clean : null;
  }

  const message = cap(body.message, 2000);

  // Atribución: UTM crudo + auto-enlace a un anuncio si utm_campaign coincide.
  const utmSource = cap(body.utmSource, 120);
  const utmCampaign = cap(body.utmCampaign, 120);
  const utmMedium = cap(body.utmMedium, 120);
  let adId: string | null = null;
  if (utmCampaign) {
    try {
      const m = await db.select({ id: ads.id }).from(ads).where(eq(ads.utmCampaign, utmCampaign)).limit(1);
      adId = m[0]?.id ?? null;
    } catch {
      /* sin atribución si falla */
    }
  }

  // Drop duplicate submissions: same email within a short window (double-submit,
  // refresh, or spam). Skips the insert, the summary call, and the notification.
  if (email) {
    const recent = await db
      .select({ id: leads.id })
      .from(leads)
      .where(and(eq(leads.email, email), gt(leads.createdAt, new Date(Date.now() - 10 * 60 * 1000))))
      .limit(1);
    if (recent.length) return Response.json({ ok: true });
  }

  const summary = leadSource === 'bot' ? await summarize(rawMessages) : null;

  // Save to Neon (qualification + transcript + summary for the CRM)
  let newLeadId: string | undefined;
  try {
    const inserted = await db
      .insert(leads)
      .values({
        name,
        email,
        phone,
        locale: body.locale === 'en' ? 'en' : 'es',
        sourceUrl,
        source: leadSource,
        qualification: qual,
        transcript: rawMessages.length ? rawMessages : null,
        summary,
        adId,
        utmSource,
        utmCampaign,
        utmMedium,
      })
      .returning({ id: leads.id });
    newLeadId = inserted[0]?.id;
    savedOk = Boolean(newLeadId);

    if (newLeadId) {
      await db.insert(leadEvents).values({
        leadId: newLeadId,
        kind: 'created',
        detail: leadSource === 'form' ? 'Lead creado desde el formulario de contacto' : 'Lead creado desde el chatbot',
      });
      if (message) {
        await db.insert(leadComments).values({ leadId: newLeadId, body: message });
      }
    }
  } catch (err) {
    console.error('lead: DB insert failed', err);
  }

  // Webhook saliente opcional (Zapier / Make / n8n). No hace nada si LEAD_WEBHOOK_URL
  // está vacía. Payload JSON plano para mapear campos fácil.
  const webhookUrl = process.env.LEAD_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadId: newLeadId ?? null,
          source: leadSource,
          locale: localeLabel,
          name: name ?? null,
          email: email ?? null,
          phone: phone ?? null,
          message: message ?? null,
          qualification: qual ?? {},
          summary: summary ?? null,
          sourceUrl: sourceUrl ?? null,
        }),
      });
    } catch (err) {
      console.error('lead: webhook failed', err);
    }
  }

  // Email de notificación (todos los valores interpolados van escapados)
  const transcript = rawMessages.length
    ? rawMessages
        .map(
          (m) =>
            `<p style="margin:6px 0"><strong style="color:${m.role === 'user' ? '#0b7d5a' : '#555'}">${m.role === 'user' ? 'Visitante' : 'Bot'}:</strong> ${esc(m.content)}</p>`
        )
        .join('')
    : '<p>Sin transcripción.</p>';

  const qualRows = (
    [
      ['Servicio', qual?.service],
      ['Empresa', qual?.company],
      ['Sector', qual?.industry],
      ['Volumen', qual?.monthlyVolume],
      ['Términos', qual?.paymentTerms],
      ['Antigüedad', qual?.timeInBusiness],
      ['Urgencia', qual?.urgency],
    ] as const
  )
    .filter(([, v]) => v)
    .map(([label, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#888">${label}</td><td>${esc(v)}</td></tr>`)
    .join('');

  const sourceLabel = leadSource === 'form' ? 'Formulario' : leadSource === 'bot' ? 'Chatbot' : 'Manual';
  const crmUrl = newLeadId ? `https://${siteConfig.domain}/admin/${newLeadId}` : null;
  const subject = `Nuevo lead (${sourceLabel}): ${name ?? 'Sin nombre'} · ${localeLabel}`;
  const html = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f5f4;padding:24px 0;font-family:Arial,Helvetica,sans-serif">
      <tr><td align="center">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#ffffff;border:1px solid #e6e8e6;border-radius:12px;overflow:hidden">
          <tr><td style="height:4px;background:#70c48b;line-height:4px;font-size:0">&nbsp;</td></tr>
          <tr><td style="padding:24px 28px 4px">
            <div style="font-family:Georgia,'Times New Roman',serif;font-size:15px;color:#14181a;letter-spacing:0.02em">BG Consulting Group</div>
            <div style="margin-top:16px;font-size:11px;text-transform:uppercase;letter-spacing:0.09em;color:#6b7280">Nuevo lead · ${esc(sourceLabel)}</div>
            <div style="margin-top:6px;font-family:Georgia,'Times New Roman',serif;font-size:23px;font-weight:bold;color:#14181a">${esc(name ?? 'Sin nombre')}</div>
            <div style="margin-top:10px;font-size:14px;color:#374151">
              ${email ? `<a href="mailto:${esc(email)}" style="color:#15805a;text-decoration:none">${esc(email)}</a>` : ''}${email && phone ? ' &middot; ' : ''}${phone ? `<a href="tel:${esc(phone)}" style="color:#15805a;text-decoration:none">${esc(phone)}</a>` : ''}
            </div>
          </td></tr>
          ${qualRows ? `<tr><td style="padding:14px 28px 4px">
            <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:14px;color:#374151;border-collapse:collapse">${qualRows}</table>
          </td></tr>` : ''}
          ${crmUrl ? `<tr><td style="padding:20px 28px 24px">
            <a href="${crmUrl}" style="display:inline-block;background:#15805a;color:#ffffff;text-decoration:none;font-size:14px;font-weight:bold;padding:12px 22px;border-radius:8px">Abrir en el CRM &rarr;</a>
          </td></tr>` : ''}
          ${rawMessages.length ? `<tr><td style="padding:4px 28px 8px">
            <div style="font-size:11px;text-transform:uppercase;letter-spacing:0.09em;color:#6b7280;margin-bottom:8px">Conversación</div>
            <div style="font-size:13px;line-height:1.55;color:#374151;background:#f7f8f7;border:1px solid #eef0ee;padding:14px;border-radius:8px">${transcript}</div>
          </td></tr>` : ''}
          <tr><td style="padding:16px 28px 22px;border-top:1px solid #eef0ee">
            <div style="font-size:12px;color:#9aa0a6">Notificación automática &middot; ${esc(sourceUrl ?? siteConfig.domain)}</div>
          </td></tr>
        </table>
      </td></tr>
    </table>`.trim();
  await sendLeadEmail({ to: leadRecipient, subject, html });

  if (!savedOk) {
    return Response.json({ ok: false, error: 'save_failed' }, { status: 500 });
  }
  return Response.json({ ok: true });
}
