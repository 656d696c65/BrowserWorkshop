import {
    createRoute,
    redirect,
} from "@tanstack/react-router"
import { filesLayoutRoute } from "./filesLayoutRoute"

export const filesRootRoute =
    createRoute({
        getParentRoute: () =>
            filesLayoutRoute,
        path: "/",
        beforeLoad: () => {
            throw redirect({
                to: "/tools/conversion/files/images",
            })
        },
        component: () => null,
    })
