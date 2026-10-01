import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

/**
 * GitHub Pages serves project sites from a sub-path
 * (https://<user>.github.io/<repo>/). Set VITE_BASE at build time, e.g.
 *   VITE_BASE=/itzfizz-scroll-hero/ npm run build
 * and leave it unset (defaults to "/") for a user/organisation page or for
 * local development.
 */
const base = process.env.VITE_BASE ?? "/";

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false,
    target: "es2020",
  },
});
