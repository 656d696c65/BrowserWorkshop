import {
    css,
    type Styles,
} from "../../../../website/styled-system/css"
import { FormatNull } from "./formatNull"

export function FormatText(props: {
    wrap?: boolean
    className?: Styles
    children?: string | null
}) {
    if (props.children === undefined) {
        return <FormatNull />
    }
    if (props.children === null) {
        return <FormatNull />
    }
    return (
        <span
            className={css(
                {
                    fontSize: "1rem",
                },
                props.wrap === undefined
                    ? undefined
                    : {
                          whiteSpace:
                              "nowrap",
                      },
                props.className,
            )}
        >
            {props.children}
        </span>
    )
}
