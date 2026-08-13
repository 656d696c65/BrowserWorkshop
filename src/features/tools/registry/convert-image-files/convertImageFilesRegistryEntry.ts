import { IconPhoto } from "@tabler/icons-react"
import { getToolManifestEntry } from "@/features/tools/toolManifest.js"
import type { ToolDefinition } from "../../toolDefinition.js"

export const convertImageFilesRegistryEntry = {
    ...getToolManifestEntry("convert-image-files"),
    icon: IconPhoto,
    component: () => import("./convertImageFilesComponent.js"),
} satisfies ToolDefinition
