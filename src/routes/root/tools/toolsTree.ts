import type { AnyRoute } from "@tanstack/react-router"
import { toolDetailRoute } from "./toolDetailRoute"
import { toolsLayoutRoute } from "./toolsLayoutRoute"
import { toolsRootRoute } from "./toolsRootRoute"

export const toolsTree: AnyRoute = toolsLayoutRoute.addChildren([
    toolsRootRoute,
    toolDetailRoute,
])
