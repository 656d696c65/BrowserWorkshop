import {
    css,
    type Styles,
} from "../../../../website/styled-system/css"

export function FormatError(props: {
    text: string
    className?: Styles
}) {
    return (
        <span
            className={css(
                {
                    fontSize:
                        "0.875rem",
                    fontWeight:
                        "semibold",
                    color: "red",
                },
                props.className,
            )}
        >
            {props.text}
        </span>
    )
}
