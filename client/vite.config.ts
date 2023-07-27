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
});
