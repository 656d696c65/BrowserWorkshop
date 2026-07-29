# browserworkshop

A monorepo for browser-based local tools built with React, TypeScript, and Panda CSS.

## Structure

```
packages/
  ui/          — Reusable UI primitives (buttons, inputs, layouts, conversion components)
  tools-conversion/  — Unit conversion tools (length, weight)
  website/     — Vite + React application with TanStack Router
```

## Creating a new tool

1. Create a new package under `packages/<tool>/`
2. Follow the pattern from `packages/tools-conversion/`:
   - `package.json` with `"exports": { ".": { "source": "./src/index.ts", "default": "./src/index.ts" } }`
   - `tsconfig.json` with `"noEmit": true` — never build in dev mode, TS files imported directly
   - Source files under `src/`
3. Add the package as a workspace dependency to `packages/website/package.json`
4. Create a route in `packages/website/src/routes/` for the tool
5. Add the tool to the sidebar tree in `packages/website/src/components/layouts/tools/toolsSidebar.tsx`

## Development

In dev mode, all packages import raw `.ts`/`.tsx` files directly via Vite's `resolve.conditions: ['source']` export condition. No compilation step needed.

```bash
pnpm dev          # Start all packages in parallel
pnpm build        # Production build
pnpm format       # Format code with Biome
pnpm lint         # Check code with Biome
pnpm lint:fix     # Fix lint issues and organize imports
```

## License

MIT License — see [LICENSE](./LICENSE). Copyright (c) 2026 Barbote.
```
