import { defineConfig } from "vite";

export default defineConfig({
  base: "./",
  server: {
    host: true,
    port: 5173,
    allowedHosts: [".faelf.uk", "gameslibrary"],
  },
  preview: {
    host: true,
    port: 4173,
    allowedHosts: [".faelf.uk", "gameslibrary"],
  },
  build: {
    outDir: "dist",
    rollupOptions: {
      input: "index.html",
      output: {
        entryFileNames: "assets/[name]-[hash].js",
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash].[ext]",
      },
    },
    minify: "terser",
    sourcemap: false,
  },
});
