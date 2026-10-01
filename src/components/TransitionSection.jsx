import { useRef } from "react";

import { CAPABILITIES, TRANSITION } from "../data/content.js";
import { useRevealOnScroll } from "../hooks/useRevealOnScroll.js";

/**
 * The hand-off out of the hero: the same "what comes next" language, restated as
 * a normal scrolling section. Its work happens once, the first time it enters.
 */
export default function TransitionSection() {
  const root = useRef(null);
  useRevealOnScroll(root);

  return (
    <section id="work" ref={root} className="relative border-t border-line bg-panel">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:px-8 sm:py-32">
        <div className="max-w-2xl">
          <p
            data-reveal
            className="text-[0.6rem] font-semibold tracking-[0.34em] text-muted uppercase sm:text-[0.68rem]"
          >
            {TRANSITION.eyebrow}
          </p>
          <h2
            data-reveal
            className="mt-5 text-[clamp(2rem,min(5.5vw,6svh),3.75rem)] leading-[1.02] tracking-[-0.02em] text-ink"
          >
            {TRANSITION.title}
          </h2>
          <p
            data-reveal
            className="mt-6 max-w-xl text-base leading-relaxed text-ink-2 sm:text-lg"
          >
            {TRANSITION.body}
          </p>
        </div>

        <ul id="services" className="mt-16 grid gap-px overflow-hidden border border-line bg-line sm:mt-20 sm:grid-cols-3">
          {CAPABILITIES.map((capability) => (
            <li
              key={capability.title}
              data-reveal
              className="group bg-panel p-8 transition-colors duration-300 hover:bg-canvas sm:p-10"
            >
              <span className="block h-px w-10 bg-line-2 transition-all duration-300 group-hover:w-16 group-hover:bg-ink" />
              <h3 className="mt-6 font-display text-xl font-bold tracking-tight text-ink sm:text-2xl">
                {capability.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-2 sm:text-[0.95rem]">
                {capability.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
