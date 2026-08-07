import { readFileSync } from "node:fs"
import { resolve } from "node:path"
import { fileURLToPath } from "node:url"
import react from "@vitejs/plugin-react"
import { defineConfig, type Plugin } from "vite"
import { seoPrerender } from "./seo/prerender"

/**
 * Reads the version from the root VERSION file (the single source of truth)
 * and injects it as the __APP_VERSION__ global, available via define().
 */
function appVersion(): Plugin {
    const __dirname = fileURLToPath(new URL(".", import.meta.url))
    let version = "0.0.0"
    try {
        version = readFileSync(resolve(__dirname, "./VERSION"), "utf8").trim()
    } catch {
        // fall back to 0.0.0 if the VERSION file is unavailable
    }
    return {
        name: "app-version",
        config() {
            return {
                define: {
                    __APP_VERSION__: JSON.stringify(version),
                },
            }
        },
    }
}

const srcDir = fileURLToPath(new URL("./src", import.meta.url))

// https://vite.development/config/
export default defineConfig({
    plugins: [
        react(),
        appVersion(),
        seoPrerender(),
    ],
    resolve: {
        alias: {
            "@": srcDir,
        },
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
                    if (id.includes("src/tools/currency")) {
                        return "tools-currency"
                    }
                    if (id.includes("src/tools/units")) {
                        return "tools-units"
                    }
                    if (id.includes("src/tools/image")) {
                        return "tools-image"
                    }
                    if (id.includes("src/tools/text")) {
                        return "tools-text"
                    }
                    if (id.includes("src/tools/homePage")) {
                        return "route-home"
                    }
                },
            },
        },
    },
})
