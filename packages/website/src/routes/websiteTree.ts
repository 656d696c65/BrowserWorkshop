import type { AnyRoute } from "@tanstack/react-router"
import { catchRoute } from "./catchRoute.js"
import { homeLayoutRoute } from "./root/home/homeLayoutRoute.js"
import { homeRootRoute } from "./root/home/homeRootRoute.js"
import { conversionIndexRoute } from "./root/tools/conversion/conversionIndexRoute.js"
import { conversionLayoutRoute } from "./root/tools/conversion/conversionLayoutRoute.js"
import { lengthRoute } from "./root/tools/conversion/length/lengthRoute.js"
import { weightRoute } from "./root/tools/conversion/weight/weightRoute.js"
import { toolsIndexRoute } from "./root/tools/toolsIndexRoute.js"
import { toolsLayoutRoute } from "./root/tools/toolsLayoutRoute.js"
import { toolsRootRoute } from "./root/tools/toolsRootRoute.js"
import { rootLayoutRoute } from "./rootLayoutRoute.js"

export const websiteTree: AnyRoute = rootLayoutRoute.addChildren([
    homeLayoutRoute.addChildren([homeRootRoute]),
    toolsLayoutRoute.addChildren([
        toolsRootRoute.addChildren([
            toolsIndexRoute,
            conversionLayoutRoute.addChildren([conversionIndexRoute, lengthRoute, weightRoute]),
        ]),
    ]),
    catchRoute,
])
