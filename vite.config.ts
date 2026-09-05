import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    base: env.VITE_BASE || "/",
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
  };
});
