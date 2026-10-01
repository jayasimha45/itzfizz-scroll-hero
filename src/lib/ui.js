/**
 * Shared button styling. Kept as plain strings (not a component) so callers can
 * render their own element — anchors here, buttons elsewhere — without wrapping.
 */
const BASE =
  "inline-flex items-center justify-center rounded-full font-semibold transition-[transform,background-color,border-color,color] duration-200 ease-out active:translate-y-0";

const VARIANTS = {
  primary: "bg-ink text-canvas hover:-translate-y-0.5 hover:bg-ink-2",
  secondary:
    "border border-line-2 bg-transparent text-ink hover:-translate-y-0.5 hover:border-ink hover:bg-ink/5",
};

const SIZES = {
  sm: "px-5 py-2.5 text-sm",
  /* Compact until the `sm` breakpoint, where both buttons comfortably fit on one
     line — wrapping them would push the hero copy out of the stage. */
  lg: "px-4 py-2.5 text-[0.8rem] sm:px-7 sm:py-3.5 sm:text-[0.95rem]",
};

export function buttonClass(variant = "primary", size = "sm") {
  const v = VARIANTS[variant] ?? VARIANTS.primary;
  const s = SIZES[size] ?? SIZES.sm;
  return `${BASE} ${v} ${s}`;
}
