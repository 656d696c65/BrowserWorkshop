import { createRoute } from "@tanstack/react-router"
import { HomePage } from "../../../features/home/homePage"
import { homeLayoutRoute } from "./homeLayoutRoute"

export const homeRootRoute = createRoute({
    getParentRoute: () => homeLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: "BrowserWorkshop",
    }),
    component: () => <HomePage />,
})
