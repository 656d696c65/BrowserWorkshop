import { css } from "@browserworkshop/shared/styled-system/css"
import { cx } from "@browserworkshop/shared/styled-system/css"

export function LinkContent(props: {
    disabled?: boolean
    children?: string
    className?: string
}) {
    return (
        <span
            aria-disabled={props.disabled}
            className={cx(
                css({
                    color: "primary",
                    textDecoration: "underline",
                    cursor: "pointer",
                    _hover: {
                        textDecoration: "none",
                    },
                    _disabled: {
                        opacity: 0.3,
                        cursor: "not-allowed",
                    },
                }),
                props.className,
            )}
        >
            {props.children}
        </span>
    )
}
