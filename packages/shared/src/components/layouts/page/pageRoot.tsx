import type { ReactNode } from "react"
import { css } from "../../../../../website/styled-system/css"

export function PageRoot(props: {
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
                gap: "4rem",
            })}
        >
            {props.children}
        </div>
    )
}
