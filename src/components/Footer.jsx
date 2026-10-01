import { useRef } from "react";

import brandMark from "../assets/brand-mark.svg";
import { ABOUT, CONTACT } from "../data/content.js";
import { useRevealOnScroll } from "../hooks/useRevealOnScroll.js";
import { buttonClass } from "../lib/ui.js";

export default function Footer() {
  const about = useRef(null);
  const contact = useRef(null);
  useRevealOnScroll(about);
  useRevealOnScroll(contact);

  return (
    <footer className="relative border-t border-line bg-panel">
      {/* ------------------------------------------------------------ about */}
      <section id="about" ref={about} className="mx-auto max-w-6xl px-6 py-24 sm:px-8 sm:py-32">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-20">
          <div>
            <p
              data-reveal
              className="text-[0.6rem] font-semibold tracking-[0.34em] text-muted uppercase sm:text-[0.68rem]"
            >
              {ABOUT.eyebrow}
            </p>
            <h2
              data-reveal
              className="mt-5 text-[clamp(1.9rem,min(4.6vw,5svh),3.25rem)] leading-[1.05] tracking-[-0.02em] text-ink"
            >
              {ABOUT.title}
            </h2>
            <p data-reveal className="mt-6 max-w-md text-base leading-relaxed text-ink-2">
              {ABOUT.body}
            </p>
          </div>

          <ul className="flex flex-col gap-px overflow-hidden border border-line bg-line">
            {ABOUT.points.map((point) => (
              <li key={point.title} data-reveal className="bg-panel p-7 sm:p-8">
                <h3 className="font-display text-lg font-bold tracking-tight text-ink">{point.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">{point.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------------------------------------------------- contact */}
      <section
        id="contact"
        ref={contact}
        className="border-t border-line bg-canvas"
      >
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 px-6 py-20 sm:px-8 sm:py-24 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p
              data-reveal
              className="text-[0.6rem] font-semibold tracking-[0.34em] text-muted uppercase sm:text-[0.68rem]"
            >
              {CONTACT.eyebrow}
            </p>
            <h2
              data-reveal
              className="mt-5 text-[clamp(2rem,min(5.2vw,5.6svh),3.5rem)] leading-[1.02] tracking-[-0.02em] text-ink"
            >
              {CONTACT.title}
            </h2>
            <p data-reveal className="mt-5 max-w-lg text-base leading-relaxed text-ink-2">
              {CONTACT.body}
            </p>
          </div>

          <div data-reveal className="flex flex-wrap items-center gap-3">
            {CONTACT.email ? (
              <a href={`mailto:${CONTACT.email}`} className={buttonClass("primary", "lg")}>
                {CONTACT.email}
              </a>
            ) : null}
            <a href={CONTACT.secondary.href} className={buttonClass("secondary", "lg")}>
              {CONTACT.secondary.label}
            </a>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- base */}
      <div className="border-t border-line bg-panel">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-7 sm:flex-row sm:px-8">
          <a href="#hero" className="flex items-center gap-2.5 text-ink transition-opacity hover:opacity-70">
            <img src={brandMark} alt="" width="26" height="26" className="h-6 w-6" />
            <span className="font-display text-sm font-extrabold tracking-tight">ITZFIZZ</span>
          </a>

          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} ITZFIZZ. Built with React, Tailwind CSS and GSAP.
          </p>

          <a href="#hero" className="text-xs font-medium text-ink-2 transition-colors hover:text-ink">
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
