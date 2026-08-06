import { createRoute, Outlet } from "@tanstack/react-router"
import { toolsLayoutRoute } from "../toolsLayoutRoute"

export const convertLayoutRoute = createRoute({
    getParentRoute: () => toolsLayoutRoute,
    path: "/convert",
    component: () => <Outlet />,
})
