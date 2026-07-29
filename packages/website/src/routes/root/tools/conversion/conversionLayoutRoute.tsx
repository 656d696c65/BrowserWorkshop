import { createRoute, Outlet } from "@tanstack/react-router"
import { toolsRootRoute } from "../toolsRootRoute"

export const conversionLayoutRoute = createRoute({
    getParentRoute: () => toolsRootRoute,
    path: "conversion",
    component: () => <Outlet />,
})
