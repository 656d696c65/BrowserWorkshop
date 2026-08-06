import type { ReactNode } from "react"
import { css, cx } from "@/styled-system/css"

export function Section(props: { className?: string; children: ReactNode }) {
    return (
        <div
            className={cx(
                css({
                    width: "100%",
                    maxWidth: "100%",
                    minHeight: "fit-content",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "start",
                    alignItems: "start",
                    gap: "1rem",
                    border: "1px solid",
                    borderColor: "neutral/25",
                    padding: "1rem",
                    borderRadius: "0.25rem",
                }),
                props.className,
            )}
        >
            {props.children}
        </div>
    )
}
