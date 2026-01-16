import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
  server: {
    port: 5173,
    strictPort: true,
    proxy: {
      "/api": {
        target: "https://eduzone-jscm.onrender.com",
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
