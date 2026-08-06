import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { routeMeta } from "../../../../../seo/routeMeta.js"
import { unitsLayoutRoute } from "./unitsLayoutRoute"

const meta = routeMeta["/tools/convert/units"]

export const unitsRootRoute = createRoute({
    getParentRoute: () => unitsLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: meta.title,
        description: meta.description,
    }),
    component: lazyRouteComponent(
        () => import("../../../../../features/tools/unitsPage.js"),
    ),
})
