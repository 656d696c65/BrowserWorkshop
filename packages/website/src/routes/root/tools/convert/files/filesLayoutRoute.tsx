import { CircularLoader } from "@browserworkshop/shared"
import { createRoute, Outlet } from "@tanstack/react-router"
import { convertLayoutRoute } from "../convertLayoutRoute"

export const filesLayoutRoute = createRoute({
    getParentRoute: () => convertLayoutRoute,
    path: "files",
    pendingComponent: () => <CircularLoader />,
    component: () => <Outlet />,
})
