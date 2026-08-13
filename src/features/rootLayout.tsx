import { Outlet } from "@tanstack/react-router"
import { css } from "@/styled-system/css"
import { ToolsTopbar } from "./toolsTopbar"

export function RootLayout() {
    return (
        <div
            className={css({
                display: "flex",
                flexDirection: "column",
                width: "100%",
                height: "100dvh",
                overflow: "hidden",
            })}
        >
            <ToolsTopbar />
            <div
                className={css({
                    flex: 1,
                    minHeight: 0,
                    width: "100%",
                    overflowY: "auto",
                })}
            >
                <div
                    className={css({
                        width: "100%",
                        maxWidth: "80rem",
                        marginX: "auto",
                        padding: "2rem",
                    })}
                >
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
