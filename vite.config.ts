import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
  server: {
    host: "0.0.0.0",
    port: 3000,
    open: true,
    // proxy: {
    //   "/ai": {
    //     target: "http://192.168.50.213:11434",
    //     rewrite: (path) => path.replace(/^\/ai/, ""),
    //   },
    // },
  },
});
