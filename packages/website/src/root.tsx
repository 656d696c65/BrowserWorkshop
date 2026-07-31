import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./assets/css/index.css"
import { RootProvider } from "./contexts/rootProvider.js"

const rootElement =
    document.getElementById("root")
if (
    rootElement &&
    !rootElement.innerHTML
) {
    const root = createRoot(rootElement)
    root.render(
        <StrictMode>
            <RootProvider />
        </StrictMode>,
    )
}
