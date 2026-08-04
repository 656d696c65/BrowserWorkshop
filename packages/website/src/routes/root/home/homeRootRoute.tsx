import { createRoute } from "@tanstack/react-router"
import { HomePage } from "../../../features/home/homePage"
import { homeLayoutRoute } from "./homeLayoutRoute"

export const homeRootRoute = createRoute({
    getParentRoute: () => homeLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: "BrowserWorkshop — Free Online Convert Tools",
        description:
            "Free browser-based tools that run locally in your browser. Convert length, weight, and currency units, plus image and file conversion — no uploads, no tracking, no sign-up.",
    }),
    component: () => <HomePage />,
})
