import type { ReactNode } from "react"
import { css } from "../../../../../website/styled-system/css"

export function DataViewerValue(props: {
    children: ReactNode
}) {
    return (
        <div
            className={css({
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "start",
            })}
        >
            {props.children}
        </div>
    )
}
