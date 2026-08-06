import { createRoute, redirect } from "@tanstack/react-router"
import { convertLayoutRoute } from "./convertLayoutRoute"

export const convertRootRoute = createRoute({
    getParentRoute: () => convertLayoutRoute,
    path: "/",
    beforeLoad: () => {
        throw redirect({
            to: "/tools/convert/units",
        })
    },
    component: () => null,
})
