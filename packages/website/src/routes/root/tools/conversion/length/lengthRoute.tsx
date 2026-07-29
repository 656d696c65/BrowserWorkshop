import { LengthConverter } from "@browserworkshop/tools-conversion"
import { createRoute } from "@tanstack/react-router"
import { Page } from "../../../../../components/layouts/page/page"
import { conversionLayoutRoute } from "../conversionLayoutRoute"

export const lengthRoute = createRoute({
    getParentRoute: () => conversionLayoutRoute,
    path: "length",
    component: () => (
        <Page.Root>
            <Page.Header>
                <Page.Title>Length Converter</Page.Title>
                <Page.Description>Convert between different units of length</Page.Description>
            </Page.Header>
            <Page.Body>
                <LengthConverter />
            </Page.Body>
        </Page.Root>
    ),
})
