import { IconFileText } from "@tabler/icons-react"
import type { ToolDefinition } from "../../toolDefinition.js"

export const convertTextFilesRegistryEntry = {
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
    icon: IconFileText,
    component: () => import("./convertTextFilesComponent.js"),
} satisfies ToolDefinition
