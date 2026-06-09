interface SlideProps {
  children: React.ReactNode;
  className?: string;
  centered?: boolean;
}

export function Slide({ children, className = "", centered = true }: SlideProps) {
  return (
    <div className={`h-full w-full touch-pan-y overflow-y-auto scrollbar-hide ${className}`}>
      <div
        className={`mx-auto w-full max-w-6xl px-5 pb-12 pt-16 sm:px-10 sm:pt-14 md:px-14 ${
          centered ? "flex min-h-full flex-col justify-center" : ""
        }`}
      >
        {children}
      </div>
    </div>
  );
}
