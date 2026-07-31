import {
    createRoute,
    Outlet,
} from "@tanstack/react-router"
import { conversionLayoutRoute } from "../conversionLayoutRoute"

export const unitsLayoutRoute =
    createRoute({
        getParentRoute: () =>
            conversionLayoutRoute,
        path: "units",
        component: () => <Outlet />,
    })
