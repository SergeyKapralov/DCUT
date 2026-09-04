import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("/node_modules/")) return undefined;
          if (id.includes("/node_modules/lucide-react/")) return "icons";
          if (
            /\/node_modules\/(react|react-dom|scheduler|react-router[^/]*)\//.test(
              id,
            )
          ) {
            return "react-vendor";
          }
          return undefined;
        },
      },
    },
  },
});
