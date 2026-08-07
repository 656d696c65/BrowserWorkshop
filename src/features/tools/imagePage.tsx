import { Page } from "../../components/layouts/page/page"
import { ImageConverter } from "./imageConverter"

export default function ImagePage() {
    return (
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
    )
}
