import type { AnyRoute } from "@tanstack/react-router"
import { convertLayoutRoute } from "./convert/convertLayoutRoute"
import { convertRootRoute } from "./convert/convertRootRoute"
import { currencyRoute } from "./convert/currency/currencyRoute"
import { filesLayoutRoute } from "./convert/files/filesLayoutRoute"
import { filesRootRoute } from "./convert/files/filesRootRoute"
import { imagesRoute } from "./convert/files/imagesRoute"
import { textRoute } from "./convert/files/textRoute"
import { unitsLayoutRoute } from "./convert/units/unitsLayoutRoute"
import { unitsRootRoute } from "./convert/units/unitsRootRoute"
import { toolsLayoutRoute } from "./toolsLayoutRoute"
import { toolsRootRoute } from "./toolsRootRoute"

export const toolsTree: AnyRoute = toolsLayoutRoute.addChildren([
    toolsRootRoute,
    convertLayoutRoute.addChildren([
        convertRootRoute,
        unitsLayoutRoute.addChildren([
            unitsRootRoute,
        ]),
        currencyRoute,
        filesLayoutRoute.addChildren([
            filesRootRoute,
            imagesRoute,
            textRoute,
        ]),
    ]),
])
