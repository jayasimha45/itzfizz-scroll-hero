import { useEffect } from "react";

import { usePrefersReducedMotion } from "./usePrefersReducedMotion.js";
import { gsap } from "../lib/gsap.js";

/**
 * Animates every `[data-reveal]` element inside the section once, the first time
 * it scrolls into view. No-ops under `prefers-reduced-motion`, which leaves the
 * markup visible and static.
 */
export function useRevealOnScroll(rootRef) {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const section = rootRef.current;
    if (!section || reduced) return undefined;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray("[data-reveal]", section);
      if (!items.length) return;

      gsap.from(items, {
        y: 26,
        autoAlpha: 0,
        duration: 0.7,
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: { trigger: section, start: "top 82%", once: true },
      });
    }, section);

    return () => ctx.revert();
  }, [rootRef, reduced]);
}
