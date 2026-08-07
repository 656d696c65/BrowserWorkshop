import { createRoute, Outlet } from "@tanstack/react-router"
import { CircularLoader } from "@/components/circularLoader"
import { convertLayoutRoute } from "../convertLayoutRoute"

export const filesLayoutRoute = createRoute({
    getParentRoute: () => convertLayoutRoute,
    path: "files",
    pendingComponent: () => <CircularLoader />,
    component: () => <Outlet />,
})
