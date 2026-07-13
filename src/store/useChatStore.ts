'use client';

import { create } from 'zustand';

export type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
};

export type LeadInfo = {
  name?: string;
  email?: string;
  phone?: string;
};

// Subset of LeadQualification (schema.ts) que el chatbot captura.
export type Qualification = {
  service?: string;
  industry?: string;
  monthlyVolume?: string;
  paymentTerms?: string;
  timeInBusiness?: string;
  urgency?: string;
};

const FALLBACK_PHONE = '+52 (664) 607 9642';
const MAX_NUDGES = 2;

type ChatState = {
  isOpen: boolean;
  messages: Message[];
  isStreaming: boolean;
  isTyping: boolean;
  leadInfo: LeadInfo;
  leadSaved: boolean;
  qualification: Qualification;
  nudgeCount: number;
  showProactiveBubble: boolean;
  locale: 'en' | 'es';
  suggestedReplies: string[];

  openChat: () => void;
  closeChat: () => void;
  dismissBubble: () => void;
  setShowProactiveBubble: (v: boolean) => void;
  setLocale: (locale: 'en' | 'es') => void;
  sendMessage: (text: string, sourceUrl: string) => Promise<void>;
  sendNudge: (sourceUrl: string) => Promise<void>;
};

const uid = () => crypto.randomUUID();

export const useChatStore = create<ChatState>((set, get) => {
  const streamTurn = async (
    apiMessages: { role: string; content: string }[],
    sourceUrl: string,
    nudge = false
  ) => {
    const { locale, leadInfo } = get();
    const assistantId = uid();

    const runStream = async (currentLead: LeadInfo): Promise<string> => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 25000);

      let res: Response;
      try {
        res = await fetch('/api/chat', {
          method: 'POST',
          signal: controller.signal,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: apiMessages, locale, sourceUrl, currentLead, qualification: get().qualification, nudge }),
        });
      } finally {
        clearTimeout(timeoutId);
      }

      if (!res.ok) throw new Error(`Chat API ${res.status}`);

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let accumulated = '';
      let buf = '';

      // Render typewriter: el SSE llega a borbotones, así que en vez de pintar
      // cada chunk de golpe acumulamos el texto objetivo y lo drenamos a cadencia
      // pareja (~30ms/tick) hacia el mensaje. Se ve fluido a costa de ~1s extra.
      let rendered = 0;
      // Cuando el lead se completa en este turno (nombre + un contacto), el cierre
      // se garantiza aquí: si el modelo se queda en un acuse seco, lo anexamos.
      let leadJustCompleted = false;
      const setContent = (text: string) =>
        set((s) => ({
          messages: s.messages.map((m) =>
            m.id === assistantId ? { ...m, content: text } : m
          ),
        }));
      const tick = () => {
        if (rendered >= accumulated.length) return;
        const remaining = accumulated.length - rendered;
        const step = Math.max(2, Math.ceil(remaining * 0.12));
        rendered = Math.min(accumulated.length, rendered + step);
        setContent(accumulated.slice(0, rendered));
      };
      const timer = setInterval(tick, 30);
      const finishRender = () =>
        new Promise<void>((resolve) => {
          clearInterval(timer);
          const drain = setInterval(() => {
            if (rendered >= accumulated.length) {
              clearInterval(drain);
              setContent(accumulated);
              resolve();
              return;
            }
            const remaining = accumulated.length - rendered;
            const step = Math.max(4, Math.ceil(remaining * 0.2));
            rendered = Math.min(accumulated.length, rendered + step);
            setContent(accumulated.slice(0, rendered));
          }, 30);
        });

      const processLine = (line: string): boolean => {
        if (!line.startsWith('data: ')) return false;
        const raw = line.slice(6).trim();
        if (raw === '[DONE]') return true;
        try {
          const evt = JSON.parse(raw);
          if (evt.type === 'text') {
            accumulated += evt.text;
          }
          if (evt.type === 'tool_call' && evt.tool === 'suggest_replies') {
            set({ suggestedReplies: evt.input.options ?? [] });
          }
          if (evt.type === 'tool_call' && evt.tool === 'update_qualification') {
            const keys: (keyof Qualification)[] = ['service', 'industry', 'monthlyVolume', 'paymentTerms', 'timeInBusiness', 'urgency'];
            const next = { ...get().qualification };
            for (const k of keys) {
              if (evt.input?.[k]) next[k] = evt.input[k];
            }
            set({ qualification: next });
          }
          if (evt.type === 'tool_call' && evt.tool === 'update_lead_info') {
            const updatedLead = { ...get().leadInfo, ...evt.input };
            set({ leadInfo: updatedLead });
            const alreadySaved = get().leadSaved;
            if (!alreadySaved && updatedLead.name && (updatedLead.email || updatedLead.phone)) {
              set({ leadSaved: true });
              leadJustCompleted = true;
              const utm = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams();
              fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  ...updatedLead, source: 'bot', qualification: get().qualification, locale: get().locale, sourceUrl, messages: apiMessages,
                  utmSource: utm.get('utm_source') || '', utmCampaign: utm.get('utm_campaign') || '', utmMedium: utm.get('utm_medium') || '',
                }),
              }).catch(console.error);
            }
          }
        } catch { /* ignore malformed lines */ }
        return false;
      };

      try {
        let done = false;
        while (!done) {
          const { done: streamDone, value } = await reader.read();
          if (streamDone) break;
          buf += decoder.decode(value, { stream: true });
          const lines = buf.split('\n');
          buf = lines.pop() ?? '';
          for (const line of lines) {
            if (processLine(line)) { reader.cancel(); done = true; break; }
          }
        }
        if (!done && buf.trim()) processLine(buf);

        // Cierre garantizado al completarse el lead: si el modelo no cerró
        // (no menciona la línea ni el correo), anexamos el cierre y el
        // typewriter lo escribe junto con el resto.
        if (leadJustCompleted && !/607\s*9642|contacto@bgc\.mx|contactar/i.test(accumulated)) {
          const close =
            locale === 'en'
              ? `Your details are saved. A BG Consulting Group advisor will contact you shortly. For immediate help, call ${FALLBACK_PHONE} or write to contacto@bgc.mx.`
              : `Sus datos quedaron registrados. Un asesor de BG Consulting Group lo contactará a la brevedad. Si necesita atención inmediata, puede llamar al ${FALLBACK_PHONE} o escribir a contacto@bgc.mx.`;
          accumulated += (accumulated.trim() ? '\n\n' : '') + close;
        }
      } finally {
        await finishRender();
      }
      return accumulated;
    };

    try {
      set((s) => ({
        isTyping: false,
        isStreaming: true,
        suggestedReplies: [],
        messages: [
          ...s.messages,
          { id: assistantId, role: 'assistant', content: '', timestamp: new Date() },
        ],
      }));

      let result = '';
      try {
        result = await runStream(leadInfo);
      } catch {
        result = await runStream(get().leadInfo);
      }
      if (result === '') {
        result = await runStream(get().leadInfo);
      }

      set((s) => ({
        isStreaming: false,
        messages: s.messages.filter((m) => !(m.id === assistantId && m.content === '')),
      }));
    } catch {
      set((s) => ({
        isTyping: false,
        isStreaming: false,
        messages: s.messages.filter((m) => m.id !== assistantId),
      }));
      if (!nudge) {
        const errorMsg =
          get().locale === 'es'
            ? `Hubo un problema al conectar. Intente de nuevo o llame al ${FALLBACK_PHONE}.`
            : `There was a problem connecting. Please try again or call ${FALLBACK_PHONE}.`;
        set((s) => ({
          messages: [...s.messages, { id: uid(), role: 'assistant', content: errorMsg, timestamp: new Date() }],
        }));
      }
    }
  };

  return {
    isOpen: false,
    messages: [],
    isStreaming: false,
    isTyping: false,
    leadInfo: {},
    leadSaved: false,
    qualification: {},
    nudgeCount: 0,
    showProactiveBubble: false,
    locale: 'es',
    suggestedReplies: [],

    openChat: () => set({ isOpen: true, showProactiveBubble: false }),
    closeChat: () => set({ isOpen: false }),
    dismissBubble: () => set({ showProactiveBubble: false }),
    setShowProactiveBubble: (v) => set({ showProactiveBubble: v }),
    setLocale: (locale) => set({ locale }),

    sendMessage: async (text, sourceUrl) => {
      const userMsg: Message = { id: uid(), role: 'user', content: text, timestamp: new Date() };
      set((s) => ({
        messages: [...s.messages, userMsg],
        isTyping: true,
        suggestedReplies: [],
        nudgeCount: 0,
      }));
      const apiMessages = get().messages.map((m) => ({ role: m.role, content: m.content }));
      await streamTurn(apiMessages, sourceUrl);
    },

    sendNudge: async (sourceUrl) => {
      const { messages, isStreaming, isTyping, leadSaved, nudgeCount } = get();
      if (isStreaming || isTyping || leadSaved) return;
      if (nudgeCount >= MAX_NUDGES) return;
      const last = messages[messages.length - 1];
      if (!last || last.role !== 'assistant') return;

      set({ nudgeCount: nudgeCount + 1, isTyping: true });
      const apiMessages = messages.map((m) => ({ role: m.role, content: m.content }));
      await streamTurn(apiMessages, sourceUrl, true);
    },
  };
});
