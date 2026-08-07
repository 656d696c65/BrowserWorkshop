import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { routeMeta } from "../../../../../seo/routeMeta.js"
import { convertLayoutRoute } from "../convertLayoutRoute"

const meta = routeMeta["/tools/convert/currency"]

export const currencyRoute = createRoute({
    getParentRoute: () => convertLayoutRoute,
    path: "currency",
    beforeLoad: () => ({
        title: meta.title,
        description: meta.description,
    }),
    component: lazyRouteComponent(
        () => import("../../../../../features/tools/currency/currencyPage.js"),
    ),
})
