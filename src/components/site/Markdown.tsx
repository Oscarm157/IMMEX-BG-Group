import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";

// Render Markdown con estilos oscuros de BG (sin plugin de typography).
const components: Components = {
  h2: ({ children }) => (
    <h2 className="mt-14 font-display text-[clamp(1.6rem,3vw,2.15rem)] font-medium leading-tight tracking-[-0.02em] text-chalk before:mb-5 before:block before:h-px before:w-12 before:bg-accent before:content-['']">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-9 font-display text-[1.35rem] font-medium tracking-[-0.01em] text-chalk">{children}</h3>
  ),
  p: ({ children }) => <p className="mt-5 text-[17px] leading-[1.75] text-bone/90">{children}</p>,
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
    <blockquote className="my-9 border-l-2 border-accent/60 pl-6 font-display text-[clamp(1.3rem,2.4vw,1.65rem)] font-medium leading-snug tracking-[-0.01em] text-chalk">{children}</blockquote>
  ),
  hr: () => <hr className="my-8 border-line" />,
};

export function Markdown({ children }: { children: string }) {
  return <ReactMarkdown components={components}>{children}</ReactMarkdown>;
}
