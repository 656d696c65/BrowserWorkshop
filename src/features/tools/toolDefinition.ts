import type { Icon } from "@tabler/icons-react"
import type { ComponentType } from "react"

export type ToolIcon = Icon

export type ToolDefinition = {
    /** Unique URL slug, e.g. "convert-units". */
    id: string
    /** Display name shown in search and page title. */
    name: string
    /** Short description used for SEO and search results. */
    description: string
    /** File-system folder relative to `src/features/tools`, e.g. "convert/units". */
    folder: string
    /** Logical group used to cluster tools in search results, e.g. "Convert". */
    group: string
    /** Searchable keywords. */
    tags: readonly string[]
    /** Icon displayed in search results and navigation. */
    icon: ToolIcon
    /** Lazy component import for internal tools. */
    component?: () => Promise<{
        default: ComponentType
    }>
    /** External URL for tools not hosted in this app. */
    externalUrl?: string
}

export function isExternalTool(tool: ToolDefinition): boolean {
    return tool.externalUrl !== undefined
}
