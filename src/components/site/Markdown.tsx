import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";

// Render Markdown con estilos oscuros de BG (sin plugin de typography).
const components: Components = {
  h2: ({ children }) => (
    <h2 className="mt-10 font-display text-[clamp(1.4rem,2.6vw,1.9rem)] font-medium tracking-[-0.02em] text-chalk">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-8 font-display text-xl font-medium tracking-[-0.01em] text-chalk">{children}</h3>
  ),
  p: ({ children }) => <p className="mt-5 text-[16.5px] leading-relaxed text-bone/90">{children}</p>,
  ul: ({ children }) => <ul className="mt-5 flex flex-col gap-2.5">{children}</ul>,
  ol: ({ children }) => <ol className="mt-5 flex list-decimal flex-col gap-2.5 pl-5 text-bone/90">{children}</ol>,
  li: ({ children }) => (
    <li className="flex gap-3 text-[16px] leading-relaxed text-bone/90">
      <span aria-hidden className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
      <span>{children}</span>
    </li>
  ),
  a: ({ children, href }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-2 hover:text-accent-dim">
      {children}
    </a>
  ),
  strong: ({ children }) => <strong className="font-medium text-chalk">{children}</strong>,
  blockquote: ({ children }) => (
    <blockquote className="mt-6 border-l-2 border-accent/50 pl-5 text-bone/80 italic">{children}</blockquote>
  ),
  hr: () => <hr className="my-8 border-line" />,
};

export function Markdown({ children }: { children: string }) {
  return <ReactMarkdown components={components}>{children}</ReactMarkdown>;
}
