import { Page } from "@browserworkshop/shared"
import { ImageConverter } from "@browserworkshop/tools-convert-files-image"
import { createRoute } from "@tanstack/react-router"
import { filesLayoutRoute } from "./filesLayoutRoute"

export const imagesRoute = createRoute({
    getParentRoute: () => filesLayoutRoute,
    path: "images",
    beforeLoad: () => ({
        title: "Image Converter — BrowserWorkshop",
        description:
            "Free image converter that runs entirely in your browser. Convert images between formats locally — nothing is uploaded, your files stay on your device.",
    }),
    component: () => (
        <Page.Root>
            <Page.Header>
                <Page.Title>Image Converter</Page.Title>
                <Page.Description>
                    Convert images between formats in your browser — nothing is
                    uploaded
                </Page.Description>
            </Page.Header>
            <Page.Body>
                <ImageConverter />
            </Page.Body>
        </Page.Root>
    ),
})
