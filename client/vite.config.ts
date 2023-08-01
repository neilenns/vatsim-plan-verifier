import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 4000,
  },
  // To fix errors about "styled_default" not being a function. See
  // https://github.com/mui/material-ui/issues/32727#issuecomment-1653121350
  optimizeDeps: {
    include: ["@emotion/react", "@emotion/styled"],
  },
  // To fix chunk size warnings. From https://stackoverflow.com/questions/75719664/some-chunks-are-larger-than-500-kib-after-minification
  build: {
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id.toString().split("node_modules/")[1].split("/")[0].toString();
          }
        },
      },
    },
  },
});
