import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true, // ✅ Ensures changes are detected inside Docker
    },
    host: "0.0.0.0", // ✅ Allows access inside Docker
    port: 5174, // ✅ Matches your Docker port
    strictPort: true,
    hmr: {
      clientPort: 5174, // ✅ Ensures HMR works inside Docker
    },
  },
});