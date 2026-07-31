import {
    css,
    type Styles,
} from "../../../../website/styled-system/css"

export function Separator(props: {
    direction?:
        | "horizontal"
        | "vertical"
    className?: Styles
}) {
    return (
        <div
            className={css(
                {
                    backgroundColor:
                        "neutral/5",
                },
                props.direction ===
                    "vertical"
                    ? {
                          height: "100%",
                          width: "1px",
                      }
                    : {
                          width: "100%",
                          height: "1px",
                      },
                props.className,
            )}
        />
    )
}
