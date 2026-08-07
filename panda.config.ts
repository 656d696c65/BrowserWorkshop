import { defineConfig } from "@pandacss/dev"

export default defineConfig({
    preflight: true,
    include: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    exclude: [],
    importMap: "@/styled-system",
    outdir: "./src/styled-system",
    theme: {
        extend: {
            tokens: {
                colors: {
                    primary: {
                        value: "#FF9800",
                    },
                    neutral: {
                        value: "#0C1821",
                    },
                    red: {
                        value: "#F44336",
                    },
                    green: {
                        value: "#4CAF50",
                    },
                    blue: {
                        value: "#2196F3",
                    },
                    orange: {
                        value: "#FF9800",
                    },
                    purple: {
                        value: "#9C27B0",
                    },
                    background: {
                        value: "#FAF9F6",
                    },
                },
                fonts: {
                    body: {
                        value: "system-ui, sans-serif",
                    },
                },
            },
        },
    },
    globalFontface: {
        Monaspace: {
            src: 'url(/src/assets/fonts/Monaspace Neon Var.woff2) format("woff2")',
            fontWeight: "unset",
            fontStyle: "normal",
            fontDisplay: "swap",
            fontVariant: "contextual",
            lineGapOverride: "normal",
            fontFeatureSettings: "calt",
        },
    },
    globalCss: {
        "*": {
            color: "neutral",
            margin: 0,
            padding: 0,
            fontFamily: "Monaspace, monospace",
            fontWeight: "300",
        },
    },
})
