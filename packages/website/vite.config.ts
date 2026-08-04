import react from "@vitejs/plugin-react"
import { defineConfig, type Plugin } from "vite"

/**
 * Panda CSS generates `.mjs` files in styled-system/, but TypeScript's
 * NodeNext resolution emits imports with `.js` extensions. This plugin
 * rewrites those `.js` imports to `.mjs` so Vite can find them.
 */
function styledSystemMjsResolve(): Plugin {
    return {
        name: "styled-system-mjs-resolve",
        enforce: "pre",
        resolveId(source, importer) {
            if (
                importer &&
                source.includes("styled-system") &&
                source.endsWith(".js")
            ) {
                return this.resolve(source.replace(/\.js$/, ".mjs"), importer, {
                    skipSelf: true,
                })
            }
        },
    }
}

// https://vite.development/config/
export default defineConfig({
    plugins: [
        react(),
        styledSystemMjsResolve(),
    ],
    resolve: {
        conditions: [
            "source",
        ],
    },
    assetsInclude: [
        "**/*.md",
        "**/*.woff2",
    ],
    server: {
        host: true,
        port: 5174,
        watch: {
            usePolling: true,
        },
        hmr: true,
    },
    build: {
        outDir: "./build",
        rollupOptions: {
            output: {
                entryFileNames: "[name].[hash].js",
                chunkFileNames: "[name].[hash].js",
                assetFileNames: "[name].[hash].[ext]",
                manualChunks(id: string) {
                    if (id.includes("react-dom")) {
                        return "react-dom"
                    }
                },
            },
        },
    },
})
