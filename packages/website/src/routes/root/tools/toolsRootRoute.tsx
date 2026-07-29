import { createRoute, Outlet } from "@tanstack/react-router"
import { toolsLayoutRoute } from "./toolsLayoutRoute"

export const toolsRootRoute = createRoute({
    getParentRoute: () => toolsLayoutRoute,
    path: "/",
    beforeLoad: () => ({}),
    component: () => <Outlet />,
})
