import { createRoute, redirect } from "@tanstack/react-router"
import { toolsRootRoute } from "./toolsRootRoute"

export const toolsIndexRoute = createRoute({
    getParentRoute: () => toolsRootRoute,
    path: "/",
    beforeLoad: () => {
        throw redirect({ to: "/tools/conversion/length" })
    },
    component: () => null,
})
