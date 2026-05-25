import { defineConfig } from "vite";

export default defineConfig({
  base: "./",
  build: {
    outDir: "dist",
    rollupOptions: {
      input: "index.html",
      output: {
        entryFileNames: "app/app.min.js",
        chunkFileNames: "js/[name].js",
        assetFileNames: "src/[name].[ext]",
      },
    },
    minify: "terser",
    sourcemap: false,
  },
});
