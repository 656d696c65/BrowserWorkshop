import { defineConfig } from "@pandacss/dev";
import { websitePandaPreset } from "../website/panda.preset";

export default defineConfig({
    preflight: true,
    include: ["./src/**/*.{js,jsx,ts,tsx}"],
    exclude: [],
    presets: [websitePandaPreset],
    outdir: "styled-system",
})
