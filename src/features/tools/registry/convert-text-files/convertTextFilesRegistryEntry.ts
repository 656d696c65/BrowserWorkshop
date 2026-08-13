import { IconFileText } from "@tabler/icons-react"
import { getToolManifestEntry } from "@/features/tools/toolManifest.js"
import type { ToolDefinition } from "../../toolDefinition.js"

export const convertTextFilesRegistryEntry = {
    ...getToolManifestEntry("convert-text-files"),
    icon: IconFileText,
    component: () => import("./convertTextFilesComponent.js"),
} satisfies ToolDefinition
