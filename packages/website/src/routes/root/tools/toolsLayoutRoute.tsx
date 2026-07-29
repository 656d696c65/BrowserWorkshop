import { createRoute, Outlet } from "@tanstack/react-router"
import { css } from "../../../../styled-system/css"
import { CircularLoader } from "../../../components/circularLoader"
import { ToolsSidebar } from "../../../components/layouts/tools/toolsSidebar"
import { rootLayoutRoute } from "../../rootLayoutRoute"

export const toolsLayoutRoute = createRoute({
    getParentRoute: () => rootLayoutRoute,
    path: "/tools",
    pendingComponent: () => <CircularLoader />,
    beforeLoad: () => {},
    component: () => (
        <div
            className={css({
                display: "flex",
                flexDirection: "row",
                width: "100%",
                minHeight: "100dvh",
            })}
        >
            <ToolsSidebar />
            <div
                className={css({
                    flex: 1,
                    padding: "2rem",
                    overflow: "auto",
                })}
            >
                <Outlet />
            </div>
        </div>
    ),
})
