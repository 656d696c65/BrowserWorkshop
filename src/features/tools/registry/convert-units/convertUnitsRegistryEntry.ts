import { IconRuler } from "@tabler/icons-react"
import { getToolManifestEntry } from "@/features/tools/toolManifest.js"
import type { ToolDefinition } from "../../toolDefinition.js"

export const convertUnitsRegistryEntry = {
    ...getToolManifestEntry("convert-units"),
    icon: IconRuler,
    component: () => import("./converUnitsComponent.js"),
} satisfies ToolDefinition
