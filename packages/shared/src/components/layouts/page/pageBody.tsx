import type { ReactNode } from "react"
import { css } from "../../../../../website/styled-system/css"

export function PageBody(props: {
    children: ReactNode
}) {
    return (
        <div
            className={css({
                width: "100%",
                maxWidth: "100%",
                minHeight:
                    "fit-content",
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "start",
                gap: "3rem",
            })}
        >
            {props.children}
        </div>
    )
}
