# BrowserWorkshop

Free, browser-based tools that run **100% locally on your device**. No accounts, no
tracking, no uploads — your data never leaves your browser.

## Tools

| Tool | What it does |
| --- | --- |
| [Unit Converter](/tools/convert/units) | Convert between length units (meters, miles, inches, rack units) and weight units (grams, pounds, tonnes) |
| [Currency Converter](/tools/convert/currency) | Convert between world currencies using live exchange rates |
| [Image Converter](/tools/convert/files/images) | Convert images between formats right in your browser |
| [Text File Converter](/tools/convert/files/text) | Convert text files between encodings and line endings in your browser |

## Why BrowserWorkshop

- **Private by design** — everything is processed locally, nothing is uploaded
- **Free forever** — no accounts, no paywalls, no limits
- **Instant** — no waiting on servers, tools respond immediately
- **Works everywhere** — a modern browser is all you need

## Support

BrowserWorkshop is free for everyone. If you find it useful, consider making a
donation to help keep it that way:

[💙 Donate](https://payment-links.mollie.com/payment/v7bX8uwdg4tsSLe5in8zJ)

## License

MIT License — see [LICENSE](./LICENSE). Copyright (c) 2026 Barbote.

---

## For developers

### Structure

A monorepo for browser-based local tools built with React, TypeScript, and Panda CSS.

```
packages/
  ui/          — Reusable UI primitives (buttons, inputs, layouts, conversion components)
  tools-convert/  — Unit conversion tools (length, weight)
  website/     — Vite + React application with TanStack Router
```

### Creating a new tool

1. Create a new package under `packages/<tool>/`
2. Follow the pattern from `packages/tools-convert/`:
   - `package.json` with `"exports": { ".": { "source": "./src/index.ts", "default": "./src/index.ts" } }`
   - `tsconfig.json` with `"noEmit": true` — never build in dev mode, TS files imported directly
   - Source files under `src/`
3. Add the package as a workspace dependency to `packages/website/package.json`
4. Create a route in `packages/website/src/routes/` for the tool
5. Add the tool to the sidebar tree in `packages/website/src/components/layouts/tools/toolsSidebar.tsx`

### Development

In dev mode, all packages import raw `.ts`/`.tsx` files directly via Vite's
`resolve.conditions: ['source']` export condition. No compilation step needed.

```bash
pnpm dev          # Start all packages in parallel
pnpm build        # Production build
pnpm format       # Format code with Biome
pnpm lint         # Check code with Biome
pnpm lint:fix     # Fix lint issues and organize imports
```
