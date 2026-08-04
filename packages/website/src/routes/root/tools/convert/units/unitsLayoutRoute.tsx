import { createRoute, Outlet } from "@tanstack/react-router"
import { convertLayoutRoute } from "../convertLayoutRoute"

export const unitsLayoutRoute = createRoute({
    getParentRoute: () => convertLayoutRoute,
    path: "units",
    component: () => <Outlet />,
})
