import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, relative, resolve } from "node:path"
import type { Plugin, ResolvedConfig } from "vite"
import {
    type ToolManifestEntry,
    toolManifest,
} from "../src/features/tools/toolManifest.js"
import {
    canonicalUrl,
    OG_IMAGE,
    OG_IMAGE_ALT,
    type RouteMeta,
    routeMeta,
    SITE_NAME,
    SITE_URL,
} from "../src/seo/routeMeta"

/**
 * The built app is a client-side rendered SPA: every route serves the same
 * index.html, so non-JS crawlers and social scrapers would see the homepage's
 * meta on every URL. This plugin emits one static index.html per route with
 * the correct title, description, canonical, Open Graph / Twitter tags and
 * structured data, so each URL is crawlable and shareable on its own.
 */
export function seoPrerender(): Plugin {
    let outDir = ""

    return {
        name: "seo-prerender",
        apply: "build",
        configResolved(config: ResolvedConfig) {
            outDir = config.build.outDir
        },
        writeBundle() {
            const buildDir = resolve(outDir)
            const indexPath = resolve(buildDir, "index.html")
            const html = readFileSync(indexPath, "utf8")

            const headMatch = html.match(/<head>([\s\S]*?)<\/head>/)
            if (!headMatch) {
                console.warn("[seo-prerender] no <head> found; skipping")
                return
            }
            const baseHead = headMatch[1]
            const template = html.replace(
                /<head>[\s\S]*?<\/head>/,
                "<head>__SEO_HEAD__</head>",
            )

            const routes = collectRoutes(toolManifest)

            for (const route of routes) {
                const head = buildHead(baseHead, route)
                const output = template.replace("__SEO_HEAD__", head)
                const filePath =
                    route.path === "/"
                        ? indexPath
                        : resolve(buildDir, route.path.slice(1), "index.html")
                mkdirSync(dirname(filePath), {
                    recursive: true,
                })
                writeFileSync(filePath, output)
                console.log(
                    `[seo-prerender] wrote ${relative(process.cwd(), filePath)}`,
                )
            }

            writeSitemap(buildDir, routes)
        },
    }
}

/**
 * Combines the hand-maintained static routes (`/` and `/search`) with every
 * registered tool (sourced from the lightweight tool manifest, which carries
 * only string metadata so the build plugin never has to load a tool's
 * icon/component code) so the sitemap and prerendered pages stay in sync with
 * the registry automatically on every build.
 */
function collectRoutes(manifest: readonly ToolManifestEntry[]): RouteMeta[] {
    const staticRoutes = Object.values(routeMeta)
    const toolRoutes = manifest.map<RouteMeta>((tool) => ({
        path: `/tools/${tool.id}`,
        label: tool.name,
        title: `${tool.name} | ${SITE_NAME}`,
        description: tool.description,
    }))
    return [
        ...staticRoutes,
        ...toolRoutes,
    ]
}

function sitemapProps(path: string): {
    changefreq: string
    priority: number
} {
    if (path === "/") {
        return {
            changefreq: "daily",
            priority: 1.0,
        }
    }
    if (path === "/search") {
        return {
            changefreq: "weekly",
            priority: 0.8,
        }
    }
    return {
        changefreq: "monthly",
        priority: 0.8,
    }
}

function writeSitemap(buildDir: string, routes: RouteMeta[]): void {
    const lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ]
    for (const route of routes) {
        const { changefreq, priority } = sitemapProps(route.path)
        lines.push("    <url>")
        lines.push(`        <loc>${canonicalUrl(route.path)}</loc>`)
        lines.push(`        <changefreq>${changefreq}</changefreq>`)
        lines.push(`        <priority>${priority}</priority>`)
        lines.push("    </url>")
    }
    lines.push("</urlset>")
    const output = `${lines.join("\n")}\n`
    const sitemapPath = resolve(buildDir, "sitemap.xml")
    writeFileSync(sitemapPath, output)
    console.log(`[seo-prerender] wrote ${relative(process.cwd(), sitemapPath)}`)
}

const HEAD_STRIPPERS: RegExp[] = [
    /<title[^>]*>[\s\S]*?<\/title>/g,
    /<meta[^>]+name="description"[^>]*>/gi,
    /<meta[^>]+(?:name|property)="og:[^"]*"[^>]*>/gi,
    /<meta[^>]+name="twitter:[^"]*"[^>]*>/gi,
    /<link[^>]+rel="canonical"[^>]*>/gi,
    /<script[^>]+type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/gi,
]

function buildHead(baseHead: string, route: RouteMeta): string {
    let head = baseHead
    for (const strip of HEAD_STRIPPERS) {
        head = head.replace(strip, "")
    }

    const url = canonicalUrl(route.path)
    const tags = [
        `<title>${escapeHtml(route.title)}</title>`,
        `<meta name="description" content="${escapeAttr(route.description)}" />`,
        `<link rel="canonical" href="${url}" />`,
        `<meta property="og:type" content="website" />`,
        `<meta property="og:site_name" content="${SITE_NAME}" />`,
        `<meta property="og:title" content="${escapeAttr(route.title)}" />`,
        `<meta property="og:description" content="${escapeAttr(route.description)}" />`,
        `<meta property="og:url" content="${url}" />`,
        `<meta property="og:image" content="${OG_IMAGE}" />`,
        `<meta property="og:image:alt" content="${OG_IMAGE_ALT}" />`,
        `<meta property="og:locale" content="en_US" />`,
        `<meta name="twitter:card" content="summary_large_image" />`,
        `<meta name="twitter:title" content="${escapeAttr(route.title)}" />`,
        `<meta name="twitter:description" content="${escapeAttr(route.description)}" />`,
        `<meta name="twitter:image" content="${OG_IMAGE}" />`,
        `<meta name="twitter:image:alt" content="${OG_IMAGE_ALT}" />`,
        buildJsonLd(route),
    ]

    return `${head.trim()}\n    ${tags.join("\n    ")}\n`
}

function buildJsonLd(route: RouteMeta): string {
    const url = canonicalUrl(route.path)

    if (route.path === "/") {
        return `<script type="application/ld+json">${JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: SITE_NAME,
            url,
            description: route.description,
            potentialAction: {
                "@type": "SearchAction",
                target: `${SITE_URL}/tools/{search_term_string}`,
                "query-input": "required name=search_term_string",
            },
        })}</script>`
    }

    const graph = [
        {
            "@type": "BreadcrumbList",
            itemListElement: [
                {
                    "@type": "ListItem",
                    position: 1,
                    name: "Home",
                    item: `${SITE_URL}/`,
                },
                {
                    "@type": "ListItem",
                    position: 2,
                    name: route.label,
                    item: url,
                },
            ],
        },
        {
            "@type": "WebApplication",
            name: route.label,
            url,
            description: route.description,
            operatingSystem: "Any",
            applicationCategory: "UtilitiesApplication",
            browserRequirements: "Requires a modern web browser",
            isAccessibleForFree: true,
            offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
            },
        },
    ]

    return `<script type="application/ld+json">${JSON.stringify({
        "@context": "https://schema.org",
        "@graph": graph,
    })}</script>`
}

function escapeHtml(value: string): string {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
}

function escapeAttr(value: string): string {
    return escapeHtml(value).replace(/"/g, "&quot;")
}
