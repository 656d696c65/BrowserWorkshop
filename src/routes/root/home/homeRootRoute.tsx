import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { routeMeta } from "../../../seo/routeMeta.js"
import { homeLayoutRoute } from "./homeLayoutRoute"

const meta = routeMeta["/"]

export const homeRootRoute = createRoute({
    getParentRoute: () => homeLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: meta.title,
        description: meta.description,
    }),
    component: lazyRouteComponent(
        () => import("../../../features/home/homePage.js"),
    ),
})
