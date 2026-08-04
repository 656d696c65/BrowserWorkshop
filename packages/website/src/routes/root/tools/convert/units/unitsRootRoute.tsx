import { Page } from "@browserworkshop/shared"
import { UnitConverter } from "@browserworkshop/tools-convert-units"
import { createRoute } from "@tanstack/react-router"
import { unitsLayoutRoute } from "./unitsLayoutRoute"

export const unitsRootRoute = createRoute({
    getParentRoute: () => unitsLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: "Unit Converter — BrowserWorkshop",
        description:
            "Free unit converter that runs in your browser. Convert between length, weight, and temperature units instantly, locally, with no uploads.",
    }),
    component: () => (
        <Page.Root>
            <Page.Header>
                <Page.Title>Unit Converter</Page.Title>
                <Page.Description>
                    Convert between length, weight, and temperature units
                </Page.Description>
            </Page.Header>
            <Page.Body>
                <UnitConverter />
            </Page.Body>
        </Page.Root>
    ),
})
