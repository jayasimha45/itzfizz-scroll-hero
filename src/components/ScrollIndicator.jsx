export default function ScrollIndicator() {
  return (
    <div className="scroll-indicator pointer-events-none absolute inset-x-0 bottom-4 z-20 flex flex-col items-center gap-1.5 sm:bottom-5">
      <span className="text-[0.58rem] font-medium tracking-[0.3em] text-muted uppercase sm:text-[0.62rem]">
        Scroll to explore
      </span>
      <svg
        className="scroll-indicator-arrow h-4 w-4 text-ink-2"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M6 9l6 6 6-6" />
      </svg>
    </div>
  );
}
