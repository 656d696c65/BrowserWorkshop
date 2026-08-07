import { Page } from "../../components/layouts/page/page"
import { TextConverter } from "./textConverter"

export default function TextPage() {
    return (
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
    )
}
