import { Page } from "@/components/layouts/page/page"
import { Section } from "@/components/layouts/section"
import { css } from "@/styled-system/css"
import { ToolDiscovery } from "../tools/toolDiscovery.js"

export default function SearchPage() {
    return (
        <Page.Root>
            {/* <Page.Header>
                <Page.Title>Search tools</Page.Title>
                <Page.Description>
                    Find a browser-based tool by name, category, or tag — no
                    account needed, everything runs locally.
                </Page.Description>
            </Page.Header> */}
            <Page.Body>
                <Section
                    className={css({
                        padding: 0,
                        gap: 0,
                    })}
                >
                    <ToolDiscovery />
                </Section>
            </Page.Body>
        </Page.Root>
    )
}
