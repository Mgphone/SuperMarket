import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    proxy: {
      "/api": {
        target: "https://super-market-be.vercel.app",
        changeOrigin: true,
        // rewrite: (path) => path.replace("/api", ""),
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
