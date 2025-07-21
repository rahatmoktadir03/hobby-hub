import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: "forum.html", // Your React forum app
        landing: "index.html", // Your landing page
      },
    },
  },
  server: {
    historyApiFallback: {
      rewrites: [{ from: /^\/forum\.html/, to: "/forum.html" }],
    },
  },
});
