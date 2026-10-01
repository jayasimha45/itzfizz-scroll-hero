/**
 * Single source of truth for every piece of copy and data on the page.
 * Keeping it here means the components stay purely presentational.
 */

export const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const EYEBROW = "Creative digital experiences";

export const HEADLINE_LINES = ["WELCOME", "ITZFIZZ"];

export const DESCRIPTION =
  "We create high-performance digital experiences that turn ideas into meaningful results.";

export const CTAS = [
  { label: "Explore Our Work", href: "#work", variant: "primary" },
  { label: "Let's Talk", href: "#contact", variant: "secondary" },
];

export const STATS = [
  { value: 95, suffix: "%", label: "Client satisfaction" },
  { value: 80, suffix: "%", label: "Project success" },
  { value: 75, suffix: "%", label: "Repeat business" },
  { value: 90, suffix: "%", label: "Growth impact" },
];

/** Short statements revealed while the car drives across the screen. */
export const CAPTIONS = [
  {
    kicker: "01 — Strategy",
    title: "Clarity first",
    body: "We start with the problem, the audience and the single metric that actually matters.",
  },
  {
    kicker: "02 — Design",
    title: "Crafted detail",
    body: "Every state, breakpoint and interaction is designed on purpose, never left to chance.",
  },
  {
    kicker: "03 — Delivery",
    title: "Engineered to scale",
    body: "Accessible, fast and maintainable — from the first commit through to launch day.",
  },
];

export const TRANSITION = {
  eyebrow: "What comes next",
  title: "Built for digital growth",
  body: "The hero is only the beginning. Every project we ship is measured, iterated and maintained long after launch.",
};

export const ABOUT = {
  eyebrow: "About the studio",
  title: "A small team, obsessed with the details",
  body: "ITZFIZZ is a digital studio building fast, accessible product experiences. We work end to end — strategy, design and frontend engineering — so the idea survives the build intact.",
  points: [
    { title: "Accessible by default", body: "Semantics, focus states and reduced-motion support are part of the definition of done." },
    { title: "Performance budget", body: "Every project ships against a real budget, not a best-effort hope." },
    { title: "Long-term ownership", body: "We measure, iterate and maintain after launch, not just up to it." },
  ],
};

/**
 * The email is intentionally left null so the page ships without a placeholder
 * address. Set `email` here and the contact link appears automatically.
 */
export const CONTACT = {
  eyebrow: "Get in touch",
  title: "Tell us what you are building",
  body: "Share a little about the product, the deadline and the outcome you need. We reply with a plan and a range, not a brochure.",
  email: null,
  secondary: { label: "Explore our work", href: "#work" },
};

export const CAPABILITIES = [
  {
    title: "Product design",
    body: "Research, interface systems and prototypes that de-risk the build before it starts.",
  },
  {
    title: "Frontend engineering",
    body: "Accessible, component-driven interfaces that stay fast as the product grows.",
  },
  {
    title: "Interaction & motion",
    body: "Deliberate animation that explains the product instead of decorating it.",
  },
];
