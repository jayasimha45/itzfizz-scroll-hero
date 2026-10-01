import { useEffect, useRef, useState } from "react";

import brandMark from "../assets/brand-mark.svg";
import { NAV_LINKS } from "../data/content.js";
import { buttonClass } from "../lib/ui.js";

const MENU_ID = "primary-menu";

/**
 * Fixed header. On small screens the links collapse into a disclosure panel that
 * closes on Escape, on navigation and when the viewport grows past `md`.
 */
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef(null);

  // Escape closes the panel and returns focus to the button that opened it.
  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const mq = window.matchMedia("(min-width: 768px)");
    const onResize = () => {
      if (mq.matches) setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    mq.addEventListener("change", onResize);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      mq.removeEventListener("change", onResize);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-canvas">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6 sm:h-20 sm:px-8">
        <a
          href="#hero"
          className="flex items-center gap-2.5 text-ink transition-opacity hover:opacity-70"
        >
          <img src={brandMark} alt="" width="30" height="30" className="h-7 w-7 sm:h-8 sm:w-8" />
          <span className="font-display text-lg font-extrabold tracking-tight sm:text-xl">
            ITZFIZZ
          </span>
        </a>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="nav-link text-sm font-medium">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a href="#contact" className={`${buttonClass("primary", "sm")} hidden sm:inline-flex`}>
            Let&rsquo;s Talk
          </a>

          <button
            ref={toggleRef}
            type="button"
            aria-expanded={open}
            aria-controls={MENU_ID}
            onClick={() => setOpen((value) => !value)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line-2 text-ink transition-colors hover:border-ink md:hidden"
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              aria-hidden="true"
            >
              {open ? (
                <>
                  <path d="M6 6l12 12" />
                  <path d="M18 6L6 18" />
                </>
              ) : (
                <>
                  <path d="M4 7h16" />
                  <path d="M4 12h16" />
                  <path d="M4 17h16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      <div
        id={MENU_ID}
        hidden={!open}
        className="border-t border-line bg-canvas md:hidden"
      >
        <nav aria-label="Primary mobile" className="mx-auto max-w-6xl px-6 py-4">
          <ul className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <li key={link.href} className="border-b border-line last:border-0">
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-3.5 text-base font-medium text-ink transition-opacity hover:opacity-60"
                >
                  {link.label}
                  <svg
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14" />
                    <path d="M13 6l6 6-6 6" />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className={`${buttonClass("primary", "sm")} mt-5 w-full`}
          >
            Let&rsquo;s Talk
          </a>
        </nav>
      </div>
    </header>
  );
}
