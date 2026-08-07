import { Page } from "../../../components/layouts/page/page"
import { CurrencyConverter } from "./currencyConverter"

export default function CurrencyPage() {
    return (
        <Page.Root>
            <Page.Header>
                <Page.Title>Currency Converter</Page.Title>
                <Page.Description>
                    Convert between world currencies using live exchange rates
                </Page.Description>
            </Page.Header>
            <Page.Body>
                <CurrencyConverter />
            </Page.Body>
        </Page.Root>
    )
}
