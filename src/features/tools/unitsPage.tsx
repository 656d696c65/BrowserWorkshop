import { Page } from "../../components/layouts/page/page"
import { UnitConverter } from "./unitConverter"

export default function UnitsPage() {
    return (
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
    )
}
