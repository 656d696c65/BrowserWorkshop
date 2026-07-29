import { createRoute, redirect } from "@tanstack/react-router"
import { rootLayoutRoute } from "./rootLayoutRoute.js"

export const catchRoute = createRoute({
    getParentRoute: () => rootLayoutRoute,
    path: "$",
    beforeLoad: () => {
        throw redirect({
            to: "/",
        })
    },
})
