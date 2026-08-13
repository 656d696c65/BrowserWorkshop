import { createRoute, Outlet } from "@tanstack/react-router"
import { CircularLoader } from "@/components/circularLoader"
import { rootLayoutRoute } from "../../rootLayoutRoute"

export const searchLayoutRoute = createRoute({
    getParentRoute: () => rootLayoutRoute,
    id: "searchLayout",
    pendingComponent: () => <CircularLoader />,
    beforeLoad: () => {},
    component: () => <Outlet />,
})
