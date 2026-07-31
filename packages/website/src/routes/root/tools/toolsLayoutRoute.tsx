import { CircularLoader } from "@browserworkshop/shared"
import {
    createRoute,
    Outlet,
} from "@tanstack/react-router"
import { rootLayoutRoute } from "../../rootLayoutRoute"

export const toolsLayoutRoute =
    createRoute({
        getParentRoute: () =>
            rootLayoutRoute,
        path: "/tools",
        pendingComponent: () => (
            <CircularLoader />
        ),
        beforeLoad: () => {},
        component: () => <Outlet />,
    })
