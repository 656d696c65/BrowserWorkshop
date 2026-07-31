import type { ReactNode } from "react"
import { css } from "../../../../../website/styled-system/css"

export function SectionHeader(props: {
    children: ReactNode
}) {
    return (
        <div
            className={css({
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent:
                    "space-between",
                alignItems: "center",
                gap: "1rem",
                padding: "1rem",
                paddingBottom: "1rem",
                borderBottomColor:
                    "neutral/25",
                borderBottomWidth:
                    "1px",
                borderBottomStyle:
                    "dashed",
                backgroundColor:
                    "neutral/1",
            })}
        >
            {props.children}
        </div>
    )
}
