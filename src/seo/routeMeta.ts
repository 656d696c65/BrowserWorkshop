export const SITE_NAME = "BrowserWorkshop"
export const SITE_URL = "https://browserworkshop.com"
export const OG_IMAGE = `${SITE_URL}/og-image.png`
export const OG_IMAGE_ALT = "BrowserWorkshop logo"

export interface RouteMeta {
    /** Canonical path, e.g. "/tools/convert/units". */
    path: string
    title: string
    description: string
    /** Short label used for breadcrumbs / nav structure. */
    label: string
}

export const routeMeta: Record<string, RouteMeta> = {
    "/": {
        path: "/",
        label: "Home",
        title: "BrowserWorkshop",
        description:
            "Free browser-based tools that run locally in your browser. Convert length, weight, and currency units, plus image and file conversion — no uploads, no tracking, no sign-up.",
    },
    "/search": {
        path: "/search",
        label: "Search",
        title: "Search tools | BrowserWorkshop",
        description:
            "Find a browser-based tool by name, category, or tag. No account, no uploads — everything runs locally in your browser.",
    },
}

export function canonicalUrl(path: string): string {
    const normalized = path === "/" ? "/" : path.replace(/\/$/, "")
    return `${SITE_URL}${normalized}`
}
