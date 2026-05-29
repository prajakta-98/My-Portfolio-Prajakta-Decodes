import { build } from "vite";
import viteConfig from "./vite.config.js";

console.log("Preparing production build...");

try {
  await build({
    ...viteConfig,
    configFile: false,
  });
  console.log("Build complete. Deployment output is in dist/.");
} catch (error) {
  console.error("Build failed.");
  console.error(error);
  process.exitCode = 1;
}
