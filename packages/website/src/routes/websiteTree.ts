import type { AnyRoute } from "@tanstack/react-router"
import { catchRoute } from "./catchRoute.js"
import { homeLayoutRoute } from "./root/home/homeLayoutRoute.js"
import { homeRootRoute } from "./root/home/homeRootRoute.js"
import { conversionLayoutRoute } from "./root/tools/conversion/conversionLayoutRoute.js"
import { conversionRootRoute } from "./root/tools/conversion/conversionRootRoute.js"
import { filesLayoutRoute } from "./root/tools/conversion/files/filesLayoutRoute.js"
import { filesRootRoute } from "./root/tools/conversion/files/filesRootRoute.js"
import { imagesRoute } from "./root/tools/conversion/files/imagesRoute.js"
import { currencyRoute } from "./root/tools/conversion/units/currency/currencyRoute.js"
import { lengthRoute } from "./root/tools/conversion/units/length/lengthRoute.js"
import { unitsLayoutRoute } from "./root/tools/conversion/units/unitsLayoutRoute.js"
import { unitsRootRoute } from "./root/tools/conversion/units/unitsRootRoute.js"
import { weightRoute } from "./root/tools/conversion/units/weight/weightRoute.js"
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
                    unitsLayoutRoute.addChildren(
                        [
                            unitsRootRoute,
                            currencyRoute,
                            lengthRoute,
                            weightRoute,
                        ],
                    ),
                    filesLayoutRoute.addChildren(
                        [
                            filesRootRoute,
                            imagesRoute,
                        ],
                    ),
                ],
            ),
        ]),
        catchRoute,
    ])
