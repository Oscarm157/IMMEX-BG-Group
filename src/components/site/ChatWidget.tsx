'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'motion/react';
import { X, ArrowUp, ArrowRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useChatStore, type Message, type Qualification } from '@/store/useChatStore';
import { editorialEase } from '@/lib/motion';

// Etiquetas de las piezas de perfil que el bot va capturando. El indicador ya no
// es un stepper de puntos: muestra el valor real cuando existe (contexto que la
// firma va reuniendo), y omite lo que aún no sabe.
const QUAL_STEPS: { key: keyof Qualification; en: string; es: string }[] = [
  { key: 'industry', en: 'Sector', es: 'Sector' },
  { key: 'paymentTerms', en: 'Operation', es: 'Operación' },
  { key: 'monthlyVolume', en: 'Volume', es: 'Volumen' },
  { key: 'urgency', en: 'Urgency', es: 'Urgencia' },
];

const EN_SUGGESTIONS = [
  'I need to classify my goods',
  'I want to import under IMMEX',
  'I have a customs problem',
  'I need an advisor for my operation',
];
const ES_SUGGESTIONS = [
  'Necesito clasificar mi mercancía',
  'Quiero importar bajo IMMEX',
  'Tengo un problema en la aduana',
  'Necesito un asesor para mi operación',
];

// Monograma de la firma. Cuadro mint con las iniciales reales de BG; da identidad
// al launcher, al header y a la bienvenida sin un asset de logo cuadrado.
function Monogram({ className = 'size-9 text-[13px]' }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`grid shrink-0 place-items-center rounded-lg bg-accent font-semibold tracking-tight text-on-accent ${className}`}
    >
      BG
    </span>
  );
}

function LivePulse() {
  return (
    <span className="relative flex size-1.5">
      <motion.span
        className="absolute inline-flex size-full rounded-full bg-accent"
        animate={{ opacity: [0.6, 0, 0.6], scale: [1, 2.4, 1] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
      />
      <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
    </span>
  );
}

// Contexto del lead: en vez de un stepper punteado genérico, enseña lo que BG ya
// sabe del visitante como tokens con su valor real. Se llena conforme califica.
function LeadContext({ qualification, locale }: { qualification: Qualification; locale: 'en' | 'es' }) {
  const captured = QUAL_STEPS.filter((s) => qualification[s.key]);
  if (captured.length === 0) return null;
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3, ease: editorialEase }}
      className="shrink-0 overflow-hidden border-b border-line bg-surface-1"
    >
      <div className="flex items-center gap-2 overflow-x-auto px-4 py-2.5 scrollbar-hide">
        <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.16em] text-ash">
          {locale === 'es' ? 'Su perfil' : 'Profile'}
        </span>
        {captured.map((s) => (
          <span
            key={s.key}
            className="shrink-0 whitespace-nowrap rounded-md border border-line bg-surface-2 px-2 py-0.5 text-[11px] text-bone"
          >
            {qualification[s.key]}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-[5px] py-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="size-1.5 rounded-full bg-ash"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ repeat: Infinity, duration: 1, ease: 'easeInOut', delay: i * 0.18 }}
        />
      ))}
    </div>
  );
}

// El usuario conserva burbuja (mint, a la derecha). El asistente va flush a la
// izquierda como prosa editorial, sin burbuja ni borde: eso mata el look de "dos
// columnas de burbujas" y da voz institucional a la firma.
function MessageBubble({ role, content, streaming = false }: Pick<Message, 'role' | 'content'> & { streaming?: boolean }) {
  if (role === 'user') {
    return (
      <div className="flex justify-end">
        <div className="max-w-[82%] rounded-2xl rounded-tr-sm bg-accent px-3.5 py-2.5 text-sm leading-relaxed text-on-accent">
          {content}
        </div>
      </div>
    );
  }
  return (
    <div className="max-w-[92%] text-[15px] leading-relaxed text-bone">
      <ReactMarkdown
        components={{
          p: ({ children }) => <p className="mb-2.5 last:mb-0">{children}</p>,
          strong: ({ children }) => <strong className="font-medium text-chalk">{children}</strong>,
          ul: ({ children }) => <ul className="mb-2.5 mt-1 space-y-1.5">{children}</ul>,
          ol: ({ children }) => <ol className="mb-2.5 mt-1 list-decimal space-y-1.5 pl-4">{children}</ol>,
          li: ({ children }) => (
            <li className="flex gap-2.5 text-[15px] leading-snug">
              <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
              <span>{children}</span>
            </li>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
      {streaming && (
        <motion.span
          animate={{ opacity: [1, 0.2, 1] }}
          transition={{ repeat: Infinity, duration: 0.9, ease: 'easeInOut' }}
          className="ml-0.5 inline-block h-[0.95em] w-[2px] align-middle bg-accent/70"
        />
      )}
    </div>
  );
}

export function ChatWidget() {
  const {
    isOpen, openChat, closeChat, messages, isTyping, isStreaming, leadSaved,
    qualification, suggestedReplies, locale,
    setLocale, sendMessage, sendNudge,
  } = useChatStore();

  const pathname = usePathname();
  const [input, setInput] = useState('');
  const [panelStyle, setPanelStyle] = useState<React.CSSProperties>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setLocale(window.location.pathname.startsWith('/en') ? 'en' : 'es');
  }, [setLocale]);

  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;
    const update = () => {
      if (window.innerWidth >= 768) return;
      const keyboardHeight = window.innerHeight - vv.height - vv.offsetTop;
      setPanelStyle(keyboardHeight > 50 ? { bottom: `${keyboardHeight}px` } : {});
    };
    vv.addEventListener('resize', update);
    vv.addEventListener('scroll', update);
    return () => { vv.removeEventListener('resize', update); vv.removeEventListener('scroll', update); };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => inputRef.current?.focus(), 360);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  const sourceUrl = typeof window !== 'undefined' ? window.location.href : '';

  useEffect(() => {
    if (!isOpen || isStreaming || isTyping || leadSaved) return;
    const last = messages[messages.length - 1];
    if (!last || last.role !== 'assistant') return;
    const t = setTimeout(() => sendNudge(sourceUrl), 30000);
    return () => clearTimeout(t);
  }, [messages, isOpen, isStreaming, isTyping, leadSaved, sendNudge, sourceUrl]);

  const handleSend = (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || isStreaming) return;
    setInput('');
    sendMessage(content, sourceUrl);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const launcherLabel = locale === 'es' ? 'Consulte con un asesor' : 'Talk to an advisor';
  const suggestions = locale === 'es' ? ES_SUGGESTIONS : EN_SUGGESTIONS;
  const canSend = Boolean(input.trim()) && !isStreaming;

  if (pathname?.startsWith('/admin')) return null;

  return (
    <>
      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.97 }}
            transition={{ duration: 0.35, ease: editorialEase }}
            style={panelStyle}
            className={[
              'console-panel fixed z-50 flex flex-col overflow-hidden',
              'inset-x-0 bottom-0 top-0',
              'md:inset-auto md:bottom-[92px] md:right-8',
              'md:h-[min(660px,calc(100dvh-120px))] md:w-[416px]',
              'md:rounded-2xl md:border md:border-line md:shadow-[0_28px_70px_rgba(0,0,0,0.55)]',
              'bg-ink',
            ].join(' ')}
          >
            {/* Header con identidad de la firma */}
            <div className="flex shrink-0 items-center justify-between gap-3 border-b border-line bg-surface-2 px-4 py-3.5">
              <div className="flex items-center gap-3">
                <Monogram className="size-9 text-[13px]" />
                <div className="leading-tight">
                  <p className="text-sm font-medium tracking-tight text-chalk">BG Consulting Group</p>
                  <p className="mt-1 flex items-center gap-1.5 text-[12px] text-smoke">
                    <LivePulse />
                    {locale === 'es' ? 'En línea · Tijuana y San Diego' : 'Online · Tijuana and San Diego'}
                  </p>
                </div>
              </div>
              <button
                onClick={closeChat}
                className="flex size-8 shrink-0 items-center justify-center rounded-full text-bone transition-colors hover:bg-white/10"
                aria-label={locale === 'es' ? 'Cerrar chat' : 'Close chat'}
              >
                <X className="size-4" />
              </button>
            </div>

            <AnimatePresence>
              {Object.values(qualification).some(Boolean) && (
                <LeadContext qualification={qualification} locale={locale} />
              )}
            </AnimatePresence>

            {/* Conversación */}
            <div className="scrollbar-hide flex-1 space-y-5 overflow-y-auto px-4 py-5">
              {messages.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: editorialEase, delay: 0.1 }}
                  className="space-y-5"
                >
                  <div className="space-y-3">
                    <Monogram className="size-10 text-sm" />
                    <p className="text-[17px] font-medium leading-snug tracking-tight text-chalk">
                      {locale === 'es' ? '¿Qué necesita resolver en su operación?' : 'What do you need to resolve in your operation?'}
                    </p>
                    <p className="text-[13.5px] leading-relaxed text-bone">
                      {locale === 'es'
                        ? 'Clasificación, pedimentos, IMMEX, cumplimiento y qué servicio conviene a su caso. Pregunte, o empiece por una de estas:'
                        : 'Classification, customs entries, IMMEX, compliance and which service fits your case. Ask, or start with one of these:'}
                    </p>
                  </div>
                  <div className="border-t border-line">
                    {suggestions.map((s) => (
                      <button
                        key={s}
                        onClick={() => handleSend(s)}
                        className="group flex w-full items-center justify-between gap-3 border-b border-line py-3 text-left text-[13.5px] text-bone transition-colors hover:text-chalk"
                      >
                        <span>{s}</span>
                        <ArrowRight className="size-4 shrink-0 text-ash transition-all group-hover:translate-x-0.5 group-hover:text-accent" />
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {messages.map((msg, i) => (
                <motion.div key={msg.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.22, ease: editorialEase }}>
                  <MessageBubble role={msg.role} content={msg.content} streaming={isStreaming && i === messages.length - 1 && msg.role === 'assistant'} />
                </motion.div>
              ))}

              {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
                  <TypingIndicator />
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Composer: respuestas sugeridas + entrada, agrupadas */}
            <div className="shrink-0 border-t border-line bg-surface-1 px-3 pb-3 pt-2.5">
              <AnimatePresence>
                {suggestedReplies.length > 0 && !isStreaming && !isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.2, ease: editorialEase }}
                    className="mb-2.5 flex gap-1.5 overflow-x-auto scrollbar-hide"
                  >
                    {suggestedReplies.map((option) => (
                      <button
                        key={option}
                        onClick={() => handleSend(option)}
                        className="shrink-0 whitespace-nowrap rounded-full border border-accent/30 px-3 py-1.5 text-[12px] text-accent transition-colors hover:bg-accent/10"
                      >
                        {option}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex items-center gap-2 rounded-xl border border-line bg-surface-2 py-1.5 pl-3.5 pr-1.5 transition-colors focus-within:border-accent/50">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isStreaming}
                  placeholder={locale === 'es' ? 'Escriba su pregunta…' : 'Ask a question…'}
                  className="min-w-0 flex-1 bg-transparent text-[16px] text-chalk outline-none placeholder:text-ash disabled:opacity-50"
                />
                <motion.button
                  onClick={() => handleSend()}
                  disabled={!canSend}
                  whileHover={canSend ? { scale: 1.06 } : undefined}
                  whileTap={canSend ? { scale: 0.9 } : undefined}
                  className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent text-on-accent transition-opacity disabled:cursor-not-allowed disabled:opacity-30"
                  aria-label={locale === 'es' ? 'Enviar' : 'Send'}
                >
                  <ArrowUp className="size-4" strokeWidth={2.25} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Launcher: pill fijo con el isotipo de BG. Un solo elemento, sin burbuja. */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12, scale: 0.92 }}
            transition={{ delay: 0.8, duration: 0.5, ease: editorialEase }}
            onClick={() => openChat()}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="signal-glow fixed bottom-[88px] right-5 z-50 flex items-center gap-2.5 rounded-full border border-line bg-surface-2 py-2 pl-3 pr-4 md:bottom-6 md:right-8"
            aria-label={locale === 'es' ? 'Abrir chat' : 'Open chat'}
          >
            <Image src="/bgg-mark.png" alt="" width={54} height={38} className="h-7 w-auto shrink-0" />
            <span className="hidden pr-0.5 text-[13px] font-medium tracking-tight text-chalk md:block">{launcherLabel}</span>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
