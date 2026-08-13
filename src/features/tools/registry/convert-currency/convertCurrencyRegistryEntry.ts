import { IconCashBanknote } from "@tabler/icons-react"
import { getToolManifestEntry } from "@/features/tools/toolManifest.js"
import type { ToolDefinition } from "../../toolDefinition.js"

export const convertCurrencyRegistryEntry = {
    ...getToolManifestEntry("convert-currency"),
    icon: IconCashBanknote,
    component: () => import("./convertCurrencyComponent.js"),
} satisfies ToolDefinition
