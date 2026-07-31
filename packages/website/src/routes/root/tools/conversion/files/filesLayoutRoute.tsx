import { CircularLoader } from "@browserworkshop/shared"
import {
    createRoute,
    Outlet,
} from "@tanstack/react-router"
import { conversionLayoutRoute } from "../conversionLayoutRoute"

export const filesLayoutRoute =
    createRoute({
        getParentRoute: () =>
            conversionLayoutRoute,
        path: "files",
        pendingComponent: () => (
            <CircularLoader />
        ),
        component: () => <Outlet />,
    })
