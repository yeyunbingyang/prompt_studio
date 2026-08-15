import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const currentDir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@prompt-studio/core": path.resolve(
        currentDir,
        "../../packages/core/src/index.ts"
      )
    }
  },
  server: {
    host: "127.0.0.1",
    port: 5173
  }
});
