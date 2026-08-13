import type { AnyRoute } from "@tanstack/react-router"
import { catchRoute } from "./catchRoute.js"
import { homeLayoutRoute } from "./root/home/homeLayoutRoute.js"
import { homeRootRoute } from "./root/home/homeRootRoute.js"
import { searchLayoutRoute } from "./root/search/searchLayoutRoute.js"
import { searchRootRoute } from "./root/search/searchRootRoute.js"
import { toolsTree } from "./root/tools/toolsTree.js"
import { rootLayoutRoute } from "./rootLayoutRoute.js"

export const websiteTree: AnyRoute = rootLayoutRoute.addChildren([
    homeLayoutRoute.addChildren([
        homeRootRoute,
    ]),
    searchLayoutRoute.addChildren([
        searchRootRoute,
    ]),
    toolsTree,
    catchRoute,
])
