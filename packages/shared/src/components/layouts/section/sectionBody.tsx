import type { ReactNode } from "react"
import { css, type Styles } from "@browserworkshop/shared/styled-system/css"

export function SectionBody(props: {
    children: ReactNode
    className?: Styles
}) {
    return (
        <div
            className={css(
                {
                    width: "100%",
                    maxWidth: "100%",
                    minHeight: "fit-content",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "start",
                    alignItems: "start",
                    gap: "1rem",
                    padding: "1rem",
                },
                props.className,
            )}
        >
            {props.children}
        </div>
    )
}
