import { convertCurrencyRegistryEntry } from "./registry/convert-currency/convertCurrencyRegistryEntry.js"
import { convertImageFilesRegistryEntry } from "./registry/convert-image-files/convertImageFilesRegistryEntry.js"
import { convertTextFilesRegistryEntry } from "./registry/convert-text-files/convertTextFilesRegistryEntry.js"
import { convertUnitsRegistryEntry } from "./registry/convert-units/convertUnitsRegistryEntry.js"
import type { ToolDefinition } from "./toolDefinition.js"

const toolDefinitions = [
    convertUnitsRegistryEntry,
    convertCurrencyRegistryEntry,
    convertImageFilesRegistryEntry,
    convertTextFilesRegistryEntry,
] as const satisfies readonly ToolDefinition[]

export type ToolId = (typeof toolDefinitions)[number]["id"]

export const toolsRegistry = new Map<ToolId, ToolDefinition>(
    toolDefinitions.map((tool) => [
        tool.id,
        tool,
    ]),
)

export type InternalTool = ToolDefinition & {
    component: NonNullable<ToolDefinition["component"]>
}

export type ExternalTool = ToolDefinition & {
    externalUrl: NonNullable<ToolDefinition["externalUrl"]>
}

export const internalTools = Array.from(toolsRegistry.values()).filter(
    (tool): tool is typeof tool & InternalTool =>
        "component" in tool && tool.component !== undefined,
)

export const externalTools = Array.from(toolsRegistry.values()).filter(
    (tool): tool is typeof tool & ExternalTool =>
        "externalUrl" in tool && tool.externalUrl !== undefined,
)

export function getToolById(id: string): ToolDefinition | undefined {
    return toolsRegistry.get(id as ToolId)
}

export function searchTools(query: string): ToolDefinition[] {
    const normalizedQuery = query.trim().toLowerCase()
    const tools = Array.from(toolsRegistry.values())
    if (normalizedQuery === "") {
        return tools
    }

    return tools.filter((tool) => {
        const searchable = [
            tool.name,
            tool.description,
            tool.folder,
            tool.group,
            ...tool.tags,
        ]
            .join(" ")
            .toLowerCase()
        return searchable.includes(normalizedQuery)
    })
}
