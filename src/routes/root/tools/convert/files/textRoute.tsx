import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { routeMeta } from "../../../../../seo/routeMeta.js"
import { filesLayoutRoute } from "./filesLayoutRoute"

const meta = routeMeta["/tools/convert/files/text"]

export const textRoute = createRoute({
    getParentRoute: () => filesLayoutRoute,
    path: "text",
    beforeLoad: () => ({
        title: meta.title,
        description: meta.description,
    }),
    component: lazyRouteComponent(
        () => import("../../../../../features/tools/textPage.js"),
    ),
})
