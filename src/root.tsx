import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./assets/css/index.css"
import { RootProvider } from "./contexts/rootProvider.js"

if ("serviceWorker" in navigator && import.meta.env.PROD) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw.js").catch((error) => {
            console.error("Service worker registration failed:", error)
        })
    })
}

const rootElement = document.getElementById("root")
if (rootElement && !rootElement.innerHTML) {
    const root = createRoot(rootElement)
    root.render(
        <StrictMode>
            <RootProvider />
        </StrictMode>,
    )
}
