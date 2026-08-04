import { CircularLoader } from "@browserworkshop/shared"
import { createRoute, Outlet } from "@tanstack/react-router"
import { rootLayoutRoute } from "../../rootLayoutRoute"

export const homeLayoutRoute = createRoute({
    getParentRoute: () => rootLayoutRoute,
    id: "homeLayout",
    pendingComponent: () => <CircularLoader />,
    beforeLoad: () => {},
    component: () => <Outlet />,
})
