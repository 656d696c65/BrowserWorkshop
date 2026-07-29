import { createRoute, redirect } from "@tanstack/react-router"
import { conversionLayoutRoute } from "./conversionLayoutRoute"

export const conversionIndexRoute = createRoute({
    getParentRoute: () => conversionLayoutRoute,
    path: "/",
    beforeLoad: () => {
        throw redirect({ to: "/tools/conversion/length" })
    },
    component: () => null,
})
