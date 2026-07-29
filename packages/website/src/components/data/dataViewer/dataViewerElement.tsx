import type { ReactNode } from "react"
import { css } from "../../../../styled-system/css"

export function DataViewerElement(props: { children: ReactNode }) {
    return (
        <div
            className={css({
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "start",
                gap: "0.5rem",
            })}
        >
            {props.children}
        </div>
    )
}
