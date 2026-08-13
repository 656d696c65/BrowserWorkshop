import { IconPhoto } from "@tabler/icons-react"
import type { ToolDefinition } from "../../toolDefinition.js"

export const convertImageFilesRegistryEntry = {
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
    icon: IconPhoto,
    component: () => import("./convertImageFilesComponent.js"),
} satisfies ToolDefinition
