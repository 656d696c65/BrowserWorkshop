import { WeightConverter } from "@browserworkshop/tools-conversion"
import { createRoute } from "@tanstack/react-router"
import { Page } from "../../../../../components/layouts/page/page"
import { conversionLayoutRoute } from "../conversionLayoutRoute"

export const weightRoute = createRoute({
    getParentRoute: () => conversionLayoutRoute,
    path: "weight",
    component: () => (
        <Page.Root>
            <Page.Header>
                <Page.Title>Weight Converter</Page.Title>
                <Page.Description>Convert between different units of weight</Page.Description>
            </Page.Header>
            <Page.Body>
                <WeightConverter />
            </Page.Body>
        </Page.Root>
    ),
})
