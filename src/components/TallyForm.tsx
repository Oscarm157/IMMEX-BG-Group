"use client";

import Script from "next/script";
import { useEffect } from "react";

declare global {
  interface Window {
    Tally?: { loadEmbeds: () => void };
  }
}

export function TallyForm() {
  useEffect(() => {
    if (window.Tally) window.Tally.loadEmbeds();
  }, []);

  return (
    <>
      <Script
        src="https://tally.so/widgets/embed.js"
        strategy="afterInteractive"
        onLoad={() => window.Tally?.loadEmbeds()}
      />
      <iframe
        data-tally-src="https://tally.so/embed/Y5pXZW?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
        loading="lazy"
        width="100%"
        height="600"
        frameBorder={0}
        marginHeight={0}
        marginWidth={0}
        title="Diagnóstico sin costo"
      />
    </>
  );
}
