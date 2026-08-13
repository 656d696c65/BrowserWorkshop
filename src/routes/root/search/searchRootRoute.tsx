import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { routeMeta } from "../../../seo/routeMeta.js"
import { searchLayoutRoute } from "./searchLayoutRoute"

const meta = routeMeta["/search"]

export const searchRootRoute = createRoute({
    getParentRoute: () => searchLayoutRoute,
    path: "/search",
    beforeLoad: () => ({
        title: meta.title,
        description: meta.description,
    }),
    component: lazyRouteComponent(
        () => import("../../../features/search/searchPage.js"),
    ),
})
