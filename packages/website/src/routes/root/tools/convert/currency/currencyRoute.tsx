import { Page } from "@browserworkshop/shared"
import { createRoute } from "@tanstack/react-router"
import { CurrencyConverter } from "../../../../../features/tools/currencyConverter"
import { convertLayoutRoute } from "../convertLayoutRoute"

export const currencyRoute = createRoute({
    getParentRoute: () => convertLayoutRoute,
    path: "currency",
    beforeLoad: () => ({
        title: "Currency Converter — BrowserWorkshop",
        description:
            "Free currency converter with live exchange rates. Convert between world currencies in your browser and see current rates — no sign-up required.",
    }),
    component: () => (
        <Page.Root>
            <Page.Header>
                <Page.Title>Currency Converter</Page.Title>
                <Page.Description>
                    Convert between world currencies using live exchange rates
                </Page.Description>
            </Page.Header>
            <Page.Body>
                <CurrencyConverter />
            </Page.Body>
        </Page.Root>
    ),
})
