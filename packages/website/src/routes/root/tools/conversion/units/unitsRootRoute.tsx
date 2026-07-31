import {
    createRoute,
    redirect,
} from "@tanstack/react-router"
import { unitsLayoutRoute } from "./unitsLayoutRoute"

export const unitsRootRoute =
    createRoute({
        getParentRoute: () =>
            unitsLayoutRoute,
        path: "/",
        beforeLoad: () => {
            throw redirect({
                to: "/tools/conversion/units/length",
            })
        },
        component: () => null,
    })
