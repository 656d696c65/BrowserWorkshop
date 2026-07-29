import type { ReactNode } from "react"
import { css } from "../../../../styled-system/css"

export function SectionRoot(props: { children: ReactNode }) {
    return (
        <div
            className={css({
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "start",
                borderRadius: "0.5rem",
                borderWidth: "1px",
                borderStyle: "dashed",
                borderColor: "neutral/25",
            })}
        >
            {props.children}
        </div>
    )
}
