import { useLayoutEffect, useRef } from "react";

import BatteryGauge from "./BatteryGauge.jsx";
import CarVisual from "./CarVisual.jsx";
import ChargeStation from "./ChargeStation.jsx";
import ScrollIndicator from "./ScrollIndicator.jsx";
import Stats from "./Stats.jsx";
import { CAPTIONS, CTAS, DESCRIPTION, EYEBROW, HEADLINE_LINES } from "../data/content.js";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion.js";
import { gsap } from "../lib/gsap.js";
import { buttonClass } from "../lib/ui.js";

/** Extra scroll length, in viewport widths, that the drive is scrubbed across. */
const DRIVE_VIEWS = 3;

/** Point in the scrub where the car reaches the charger. */
const ARRIVE = 0.78;
/** Point in the scrub where the car is plugged in and starts charging. */
const CHARGE = 0.84;
/** State of charge once parked, before charging begins. */
const EMPTY = 15;

/**
 * The hero. Two timelines:
 *
 *  1. an intro that plays once on mount (headline letters, copy, stats, car);
 *  2. a scrubbed, pinned timeline that drives the car from the left edge to the
 *     right edge over `DRIVE_VIEWS` screens of scrolling.
 *
 * Both live inside one `gsap.context`, so `ctx.revert()` removes every inline
 * style and ScrollTrigger on unmount — no leakage across React's double-invoke.
 */
export default function Hero() {
  const root = useRef(null);
  const stage = useRef(null);
  const reduced = usePrefersReducedMotion();

  useLayoutEffect(() => {
    const section = root.current;
    if (!section || reduced) return undefined;

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(section);
      const heroCar = q(".car")[0];
      if (!heroCar) return;

      /* ------------------------------------------------------------ intro */
      const intro = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.1,
      });

      intro
        .from(q(".hero-eyebrow"), { y: 20, autoAlpha: 0, duration: 0.6 })
        .from(
          q(".headline-letter"),
          { y: 60, autoAlpha: 0, duration: 0.9, stagger: 0.03 },
          "-=0.35",
        )
        .from(q(".hero-desc"), { y: 25, autoAlpha: 0, duration: 0.7 }, "-=0.55")
        .from(q(".hero-cta"), { y: 18, autoAlpha: 0, duration: 0.6, stagger: 0.08 }, "-=0.5")
        .from(q(".car-inner"), { yPercent: 14, autoAlpha: 0, duration: 1 }, "-=0.7")
        .from(q(".stat-item"), { y: 40, scale: 0.96, autoAlpha: 0, duration: 0.7, stagger: 0.12 }, "-=0.8")
        .from(q(".scroll-indicator"), { autoAlpha: 0, duration: 0.5 }, "-=0.3");

      /* ------------------------------------------------------------ drive */
      // Measured in pixels rather than a fixed percentage, so the nose always
      // finishes flush with the right edge — at any viewport width or zoom.
      // Function values are re-evaluated by `invalidateOnRefresh`, which is what
      // keeps both ends correct after a resize or orientation change.
      //
      // Scaling to 103% and tilting 2° makes the car's bounding box about 4.5%
      // wider than its layout width, so the travel is inset by that much (and by
      // the same amount at the start) to keep every frame inside the stage.
      const OVERHANG = 1.045;
      const carWidth = () => heroCar.offsetWidth || 1;
      const travel = () => Math.max(0, stage.current.clientWidth - carWidth() * OVERHANG);

      const gauge = q(".charge-gauge")[0];
      const gaugeFill = q(".charge-gauge-fill")[0];
      const gaugeValue = q(".charge-gauge-value")[0];
      const station = q(".charge-station")[0];

      const setCharging = (on) => section.classList.toggle("is-charging", on);

      const drive = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${DRIVE_VIEWS * 100}%`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Driving: the car crosses the screen, then settles onto the charger.
      drive
        .fromTo(
          heroCar,
          { x: () => carWidth() * 0.02 },
          { x: travel, duration: ARRIVE },
          0,
        )
        .fromTo(
          heroCar,
          { y: 20, rotation: -2, scale: 0.95 },
          { y: 0, rotation: 0, scale: 1, duration: ARRIVE / 2, ease: "power1.inOut" },
          0,
        )
        .to(
          heroCar,
          { y: -10, rotation: 2, scale: 1.03, duration: ARRIVE / 2, ease: "power1.inOut" },
          ARRIVE / 2,
        )
        .to(heroCar, { y: 0, rotation: 0, duration: 1 - ARRIVE, ease: "power1.inOut" }, ARRIVE)
        .fromTo(q(".wheel"), { rotation: 0 }, { rotation: 900, duration: ARRIVE }, 0)
        .fromTo(
          q(".road-dashes > span"),
          { xPercent: 0 },
          { xPercent: -16, duration: ARRIVE },
          0,
        )
        // Copy lifts away early so the captions own the second half of the drive.
        .to(
          q(".hero-copy, .hero-stats, .scroll-indicator"),
          { y: -30, autoAlpha: 0, duration: 0.16, ease: "power1.in" },
          0.08,
        )
        // The charger rises out of the road just before the car pulls up.
        .fromTo(
          station,
          { autoAlpha: 0, scaleY: 0.55 },
          { autoAlpha: 1, scaleY: 1, duration: 0.05, ease: "power2.out", transformOrigin: "50% 100%" },
          ARRIVE - 0.05,
        );

      /* --------------------------------------------------------- battery */
      // A plain object is tweened instead of the DOM so the bar and the
      // percentage can never drift apart.
      const soc = { v: 100 };
      const writeSoc = () => {
        if (gaugeValue) gaugeValue.textContent = `${Math.round(soc.v)}%`;
      };

      drive
        .fromTo(
          gaugeFill,
          { scaleX: 1 },
          { scaleX: EMPTY / 100, duration: ARRIVE - 0.02, ease: "none" },
          0.02,
        )
        .fromTo(
          soc,
          { v: 100 },
          { v: EMPTY, duration: ARRIVE - 0.02, ease: "none", onUpdate: writeSoc },
          0.02,
        )
        .to(
          gaugeFill,
          { scaleX: 1, duration: 1 - CHARGE, ease: "none" },
          CHARGE,
        )
        .to(
          soc,
          {
            v: 100,
            duration: 1 - CHARGE,
            ease: "none",
            onUpdate: writeSoc,
            onStart: () => setCharging(true),
            onReverseComplete: () => setCharging(false),
          },
          CHARGE,
        );

      // Captions share one grid cell and cross-fade in place. They all finish
      // before the car plugs in, so the charging beat reads on its own.
      q(".drive-caption").forEach((caption, i) => {
        const at = 0.18 + i * 0.21;
        drive
          .fromTo(
            caption,
            { y: 26, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.09, ease: "power2.out" },
            at,
          )
          .to(caption, { y: -26, autoAlpha: 0, duration: 0.09, ease: "power2.in" }, at + 0.15);
      });
    }, section);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="hero" ref={root} className="hero relative isolate">
      <div ref={stage} className="stage">
        {/* faint background shapes */}
        <div className="bg-grid" aria-hidden="true" />
        <div
          className="bg-circle -top-40 -left-40 h-[420px] w-[420px]"
          aria-hidden="true"
        />
        <div
          className="bg-circle top-1/3 -right-32 h-[520px] w-[520px]"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto flex h-full w-full max-w-6xl flex-col px-6 sm:px-8">
          <div className="h-16 shrink-0 sm:h-20" aria-hidden="true" />

          <div className="hero-copy flex flex-1 flex-col items-center justify-center py-2 text-center sm:py-4">
            <p className="hero-eyebrow text-[0.6rem] font-semibold tracking-[0.34em] text-muted uppercase sm:text-[0.68rem]">
              {EYEBROW}
            </p>

            <h1 className="mt-3 text-[clamp(2.25rem,min(11vw,11.5svh),7rem)] leading-[0.9] font-extrabold tracking-[-0.02em] text-ink sm:mt-5">
              {HEADLINE_LINES.map((line) => (
                <span key={line} className="headline-line">
                  {[...line].map((char, i) => (
                    <span className="headline-letter" key={`${char}-${i}`}>
                      {char}
                    </span>
                  ))}
                </span>
              ))}
            </h1>

            <p className="hero-desc mt-3 max-w-[34rem] text-[clamp(0.85rem,min(1.05vw,1.95svh),1.125rem)] leading-relaxed text-ink-2 sm:mt-5">
              {DESCRIPTION}
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-2 sm:mt-7 sm:gap-3">
              {CTAS.map((cta) => (
                <a
                  key={cta.label}
                  href={cta.href}
                  className={`${buttonClass(cta.variant, "lg")} hero-cta`}
                >
                  {cta.label}
                </a>
              ))}
            </div>
          </div>

          <div className="hero-stats mx-auto w-full max-w-4xl pb-4 sm:pb-8">
            <Stats />
          </div>

          {/* reserves the car's real height + its bottom offset */}
          <div className="car-zone shrink-0" aria-hidden="true" />
        </div>

        <div className="road" aria-hidden="true">
          <div className="road-dashes">
            <span />
          </div>
        </div>

        <CarVisual />

        <ChargeStation />

        <div className="drive-captions" aria-hidden="true">
          {CAPTIONS.map((caption) => (
            <p key={caption.title} className="drive-caption">
              <span className="block text-[0.58rem] font-semibold tracking-[0.3em] text-muted uppercase sm:text-[0.64rem]">
                {caption.kicker}
              </span>
              <span className="mt-3 block font-display text-[clamp(1.5rem,min(3.4vw,4.2svh),2.6rem)] leading-tight font-extrabold tracking-tight text-ink">
                {caption.title}
              </span>
              <span className="mx-auto mt-2.5 block max-w-[30rem] text-sm leading-relaxed text-ink-2">
                {caption.body}
              </span>
            </p>
          ))}
        </div>

        <ScrollIndicator />

        <BatteryGauge />
      </div>
    </section>
  );
}
