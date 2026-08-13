import { IconCashBanknote } from "@tabler/icons-react"
import type { ToolDefinition } from "../../toolDefinition.js"

export const convertCurrencyRegistryEntry = {
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
    icon: IconCashBanknote,
    component: () => import("./convertCurrencyComponent.js"),
} satisfies ToolDefinition
