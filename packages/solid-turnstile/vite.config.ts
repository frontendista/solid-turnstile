import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import dts from "vite-plugin-dts";
import { resolve } from "path";

export default defineConfig({
    plugins: [solidPlugin(), dts()],
    build: {
        target: "esnext",
        lib: {
            entry: resolve(__dirname, "src/index.tsx"),
            fileName: "index",
            formats: ["es", "cjs"],
        },
        rollupOptions: {
            external: ["solid-js", "solid-js/web", "solid-js/store"],
        },
    },
});