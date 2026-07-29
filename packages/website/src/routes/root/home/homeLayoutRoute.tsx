import { createRoute, Outlet } from "@tanstack/react-router"
import { CircularLoader } from "../../../components/circularLoader"
import { rootLayoutRoute } from "../../rootLayoutRoute"

export const homeLayoutRoute = createRoute({
    getParentRoute: () => rootLayoutRoute,
    id: "homeLayout",
    pendingComponent: () => <CircularLoader />,
    beforeLoad: () => {},
    component: () => <Outlet />,
})
