import { createRoute, Outlet } from "@tanstack/react-router"
import { CircularLoader } from "@/components/circularLoader"
import { rootLayoutRoute } from "../../rootLayoutRoute"

export const toolsLayoutRoute = createRoute({
    getParentRoute: () => rootLayoutRoute,
    path: "/tools",
    pendingComponent: () => <CircularLoader />,
    beforeLoad: () => {},
    component: () => <Outlet />,
})
