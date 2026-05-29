import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const projectRoot = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        index: resolve(projectRoot, "index.html"),
        portfolio: resolve(projectRoot, "prajakta_beyond.html"),
        project1: resolve(projectRoot, "project1.html"),
        project2: resolve(projectRoot, "project2.html"),
        project3: resolve(projectRoot, "project3.html"),
        personalPortfolioCms: resolve(projectRoot, "projects/personal-portfolio-cms/index.html"),
        tyreJunction: resolve(projectRoot, "projects/tyre-junction/index.html"),
        docupitchAi: resolve(projectRoot, "projects/docupitch-ai/index.html"),
        vedicMathGame: resolve(projectRoot, "projects/vedic-math-game/index.html"),
        fluxPayments: resolve(projectRoot, "projects/flux-payments/index.html"),
      },
      output: {
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom"],
          animation: ["framer-motion", "gsap", "matter-js", "lenis"],
        },
      },
    },
  },
});
