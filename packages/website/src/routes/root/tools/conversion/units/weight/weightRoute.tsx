import { Page } from "@browserworkshop/shared"
import { WeightConverter } from "@browserworkshop/tools-conversion-units"
import { createRoute } from "@tanstack/react-router"
import { unitsLayoutRoute } from "../unitsLayoutRoute"

export const weightRoute = createRoute({
    getParentRoute: () =>
        unitsLayoutRoute,
    path: "weight",
    component: () => (
        <Page.Root>
            <Page.Header>
                <Page.Title>
                    Weight Converter
                </Page.Title>
                <Page.Description>
                    Convert between
                    different units of
                    weight
                </Page.Description>
            </Page.Header>
            <Page.Body>
                <WeightConverter />
            </Page.Body>
        </Page.Root>
    ),
})
