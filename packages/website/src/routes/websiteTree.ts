import type { AnyRoute } from "@tanstack/react-router"
import { catchRoute } from "./catchRoute.js"
import { homeLayoutRoute } from "./root/home/homeLayoutRoute.js"
import { homeRootRoute } from "./root/home/homeRootRoute.js"
import { conversionLayoutRoute } from "./root/tools/conversion/conversionLayoutRoute.js"
import { conversionRootRoute } from "./root/tools/conversion/conversionRootRoute.js"
import { currencyRoute } from "./root/tools/conversion/currency/currencyRoute.js"
import { lengthRoute } from "./root/tools/conversion/length/lengthRoute.js"
import { weightRoute } from "./root/tools/conversion/weight/weightRoute.js"
import { toolsLayoutRoute } from "./root/tools/toolsLayoutRoute.js"
import { toolsRootRoute } from "./root/tools/toolsRootRoute.js"
import { rootLayoutRoute } from "./rootLayoutRoute.js"

export const websiteTree: AnyRoute =
    rootLayoutRoute.addChildren([
        homeLayoutRoute.addChildren([
            homeRootRoute,
        ]),
        toolsLayoutRoute.addChildren([
            toolsRootRoute,
            conversionLayoutRoute.addChildren(
                [
                    conversionRootRoute,
                    currencyRoute,
                    lengthRoute,
                    weightRoute,
                ],
            ),
        ]),
        catchRoute,
    ])
