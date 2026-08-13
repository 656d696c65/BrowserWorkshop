import { createRoute, redirect } from "@tanstack/react-router"
import { toolsLayoutRoute } from "./toolsLayoutRoute"

export const toolsRootRoute = createRoute({
    getParentRoute: () => toolsLayoutRoute,
    path: "/",
    beforeLoad: () => {
        throw redirect({
            to: "/",
        })
    },
})
