export interface ToolManifestEntry {
    id: string
    name: string
    description: string
    folder: string
    group: string
    tags: readonly string[]
}

/**
 * Single source of truth for tool metadata that needs to be readable without
 * loading a tool's icon/component (e.g. by the build-time sitemap plugin):
 * only primitive string data, no `@/`, icon or component imports.
 */
export const toolManifest: readonly ToolManifestEntry[] = [
    {
        id: "convert-units",
        name: "Convert units",
        description: "Convert between length, weight, and temperature units.",
        folder: "convert/units",
        group: "Convert",
        tags: [
            "units",
            "length",
            "weight",
            "temperature",
            "measurement",
            "metric",
        ],
    },
    {
        id: "convert-currency",
        name: "Convert currency",
        description:
            "Currency converter with live exchange rates. Convert between world currencies in your browser and see current rates.",
        folder: "convert/currency",
        group: "Convert",
        tags: [
            "currency",
            "money",
            "exchange",
            "rates",
            "finance",
        ],
    },
    {
        id: "convert-image-files",
        name: "Convert image files",
        description:
            "Image converter that runs entirely in your browser. Convert images between formats locally — nothing is uploaded.",
        folder: "convert/files/images",
        group: "Convert",
        tags: [
            "image",
            "images",
            "files",
            "format",
            "png",
            "jpeg",
            "webp",
            "convert",
        ],
    },
    {
        id: "convert-text-files",
        name: "Convert text files",
        description:
            "Text file converter that runs in your browser. Convert text files between encodings and line endings.",
        folder: "convert/files/text",
        group: "Convert",
        tags: [
            "text",
            "file",
            "encoding",
            "utf-8",
            "line endings",
            "convert",
        ],
    },
]

export function getToolManifestEntry(id: string): ToolManifestEntry {
    const entry = toolManifest.find((tool) => tool.id === id)
    if (!entry) {
        throw new Error(`Unknown tool id in manifest: ${id}`)
    }
    return entry
}
