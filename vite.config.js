import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, "index.html"),
        portfolio: resolve(__dirname, "prajakta_beyond.html"),
        project1: resolve(__dirname, "project1.html"),
        project2: resolve(__dirname, "project2.html"),
        project3: resolve(__dirname, "project3.html"),
        personalPortfolioCms: resolve(__dirname, "projects/personal-portfolio-cms/index.html"),
        tyreJunction: resolve(__dirname, "projects/tyre-junction/index.html"),
        docupitchAi: resolve(__dirname, "projects/docupitch-ai/index.html"),
        vedicMathGame: resolve(__dirname, "projects/vedic-math-game/index.html"),
        fluxPayments: resolve(__dirname, "projects/flux-payments/index.html"),
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
