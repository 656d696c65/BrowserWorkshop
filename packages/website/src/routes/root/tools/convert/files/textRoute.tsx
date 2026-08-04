import { Page } from "@browserworkshop/shared"
import { TextConverter } from "@browserworkshop/tools-convert-files-text"
import { createRoute } from "@tanstack/react-router"
import { filesLayoutRoute } from "./filesLayoutRoute"

export const textRoute = createRoute({
    getParentRoute: () => filesLayoutRoute,
    path: "text",
    beforeLoad: () => ({
        title: "Text File Converter — BrowserWorkshop",
        description:
            "Free text file converter that runs in your browser. Convert text files between encodings and line endings locally — nothing is uploaded, your files stay on your device.",
    }),
    component: () => (
        <Page.Root>
            <Page.Header>
                <Page.Title>Text File Converter</Page.Title>
                <Page.Description>
                    Convert text files between encodings and line endings —
                    nothing is uploaded
                </Page.Description>
            </Page.Header>
            <Page.Body>
                <TextConverter />
            </Page.Body>
        </Page.Root>
    ),
})
