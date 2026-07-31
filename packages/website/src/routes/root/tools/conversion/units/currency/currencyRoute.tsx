import { Page } from "@browserworkshop/shared"
import { createRoute } from "@tanstack/react-router"
import { CurrencyConverter } from "../../../../../../features/tools/currencyConverter"
import { unitsLayoutRoute } from "../unitsLayoutRoute"

export const currencyRoute =
    createRoute({
        getParentRoute: () =>
            unitsLayoutRoute,
        path: "currency",
        component: () => (
            <Page.Root>
                <Page.Header>
                    <Page.Title>
                        Currency
                        Converter
                    </Page.Title>
                    <Page.Description>
                        Convert between
                        world currencies
                        using live
                        exchange rates
                    </Page.Description>
                </Page.Header>
                <Page.Body>
                    <CurrencyConverter />
                </Page.Body>
            </Page.Root>
        ),
    })
