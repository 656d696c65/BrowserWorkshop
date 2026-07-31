import {
    createRoute,
    redirect,
} from "@tanstack/react-router"
import { conversionLayoutRoute } from "./conversionLayoutRoute"

export const conversionRootRoute =
    createRoute({
        getParentRoute: () =>
            conversionLayoutRoute,
        path: "/",
        beforeLoad: () => {
            throw redirect({
                to: "/tools/conversion/units/length",
            })
        },
        component: () => null,
    })
