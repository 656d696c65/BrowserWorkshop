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
    "/tools/convert/units": {
        path: "/tools/convert/units",
        label: "Unit Converter",
        title: "Unit Converter | BrowserWorkshop",
        description:
            "Free unit converter that runs in your browser. Convert between length, weight, and temperature units instantly, locally, with no uploads.",
    },
    "/tools/convert/currency": {
        path: "/tools/convert/currency",
        label: "Currency Converter",
        title: "Currency Converter | BrowserWorkshop",
        description:
            "Free currency converter with live exchange rates. Convert between world currencies in your browser and see current rates — no sign-up required.",
    },
    "/tools/convert/files/images": {
        path: "/tools/convert/files/images",
        label: "Image Converter",
        title: "Image Converter | BrowserWorkshop",
        description:
            "Free image converter that runs entirely in your browser. Convert images between formats locally — nothing is uploaded, your files stay on your device.",
    },
    "/tools/convert/files/text": {
        path: "/tools/convert/files/text",
        label: "Text File Converter",
        title: "Text File Converter | BrowserWorkshop",
        description:
            "Free text file converter that runs in your browser. Convert text files between encodings and line endings locally — nothing is uploaded, your files stay on your device.",
    },
}

export function canonicalUrl(path: string): string {
    const normalized = path === "/" ? "/" : path.replace(/\/$/, "")
    return `${SITE_URL}${normalized}`
}
