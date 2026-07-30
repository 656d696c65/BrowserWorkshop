import { Outlet } from "@tanstack/react-router"
import { css } from "../../styled-system/css/css"
import { ToolsSidebar } from "../components/toolsSidebar"

export function RootLayout() {
    return (
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
    )
}
