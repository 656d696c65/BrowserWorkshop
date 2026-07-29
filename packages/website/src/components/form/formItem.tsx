import type { HTMLAttributes } from "react"
import { css, type Styles } from "../../../styled-system/css"

export function FormItem(
    props: HTMLAttributes<HTMLDivElement> & {
        className?: Styles
    },
) {
    return (
        <div
            {...props}
            className={css(
                {
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "start",
                    alignItems: "start",
                    gap: "0.5rem",
                },
                props.className,
            )}
        />
    )
}
