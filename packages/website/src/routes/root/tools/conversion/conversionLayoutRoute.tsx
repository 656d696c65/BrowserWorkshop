import {
    createRoute,
    Outlet,
} from "@tanstack/react-router"
import { toolsLayoutRoute } from "../toolsLayoutRoute"

export const conversionLayoutRoute =
    createRoute({
        getParentRoute: () =>
            toolsLayoutRoute,
        path: "/conversion",
        component: () => <Outlet />,
    })
