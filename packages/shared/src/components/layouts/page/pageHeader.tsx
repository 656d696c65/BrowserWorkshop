import type { ReactNode } from "react"
import { css } from "../../../../../website/styled-system/css"

export function PageHeader(props: { children: ReactNode }) {
    return (
        <div
            className={css({
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "start",
                gap: "1rem",
            })}
        >
            {props.children}
        </div>
    )
}
