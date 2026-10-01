import { useLayoutEffect, useRef } from "react";

import { gsap } from "../lib/gsap.js";

/**
 * Thin vertical progress bar pinned to the right edge. Its fill is driven by
 * the document's own scroll range, so it only ever reaches 100% at the bottom.
 */
export default function ScrollProgress() {
  const fill = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        fill.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
          },
        },
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="scroll-progress" aria-hidden="true">
      <div ref={fill} className="scroll-progress-fill" />
    </div>
  );
}
