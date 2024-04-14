import { defineConfig } from "vite";
import eslintPlugin from "vite-plugin-eslint";
import react from "@vitejs/plugin-react";


// https://vitejs.dev/config/
export default defineConfig((mode) => ({
  plugins: [
    react(),
    eslintPlugin({
      lintOnStart: true,
      // overrideConfigFile: "../frontend/.eslintrc.cjs",
      failOnError: mode === "production",
    }),
  ],
  // build: {
  //   rollupOptions: {
  //     external: ['react-select']
  //   }
  // },
  // optimizeDeps: {
  //   include: ['react-select'],
  // },
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
        secure: true
      }
    }
  },
}));
