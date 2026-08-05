import { Outlet } from "@tanstack/react-router"
import { css } from "@browserworkshop/shared/styled-system/css"
import { ToolsSidebar } from "../components/toolsSidebar"

export function RootLayout() {
    return (
        <div
            className={css({
                display: "flex",
                flexDirection: "row",
                width: "100%",
                height: "100dvh",
                overflow: "hidden",
            })}
        >
            <ToolsSidebar />
            <div
                className={css({
                    flex: 1,
                    padding: "2rem",
                    overflowY: "auto",
                })}
            >
                <Outlet />
            </div>
        </div>
    )
}
