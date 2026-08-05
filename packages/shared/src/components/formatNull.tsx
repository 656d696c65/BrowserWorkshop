import { css, type Styles } from "@browserworkshop/shared/styled-system/css"

export function FormatNull(props: { text?: string; className?: Styles }) {
    return (
        <span
            className={css(
                {
                    fontSize: "0.875rem",
                    fontWeight: "normal",
                    color: "neutral/25",
                    fontStyle: "italic",
                },
                props.className,
            )}
        >
            {props.text ?? "/"}
        </span>
    )
}
