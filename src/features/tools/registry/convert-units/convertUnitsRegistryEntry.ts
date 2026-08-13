import { IconRuler } from "@tabler/icons-react"
import type { ToolDefinition } from "../../toolDefinition.js"

export const convertUnitsRegistryEntry = {
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
    icon: IconRuler,
    component: () => import("./converUnitsComponent.js"),
} satisfies ToolDefinition
