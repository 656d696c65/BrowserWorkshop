import {
    css,
    cx,
    type Styles,
    sva,
} from "../../../../website/styled-system/css"

export function Chip(props: {
    text: string | null | undefined
    color?:
        | "default"
        | "error"
        | "warning"
        | "success"
        | "information"
    className?: Styles
}) {
    if (props.text === null) {
        return null
    }
    if (props.text === undefined) {
        return null
    }

    const chipRecipe = sva({
        slots: ["div", "span"],
        base: {
            div: {
                width: "fit-content",
                paddingX: "0.25rem",
                paddingY: "0.125rem",
                borderWidth: "1px",
                borderStyle: "dashed",
                borderRadius: "0.25rem",
                display: "flex",
                justifyContent:
                    "center",
                alignItems: "center",
            },
            span: {
                fontSize: "0.75rem",
                lineHeight: "normal",
                fontWeight: "semibold",
                textWrap: "nowrap",
            },
        },
        variants: {
            color: {
                default: {
                    div: {
                        backgroundColor:
                            "neutral/5",
                        borderColor:
                            "neutral/25",
                    },
                    span: {
                        color: "neutral",
                    },
                },
                information: {
                    div: {
                        backgroundColor:
                            "blue/5",
                        borderColor:
                            "blue/25",
                    },
                    span: {
                        color: "blue",
                    },
                },
                success: {
                    div: {
                        backgroundColor:
                            "green/5",
                        borderColor:
                            "green/25",
                    },
                    span: {
                        color: "green",
                    },
                },
                error: {
                    div: {
                        backgroundColor:
                            "red/5",
                        borderColor:
                            "red/25",
                    },
                    span: {
                        color: "red",
                    },
                },
                warning: {
                    div: {
                        backgroundColor:
                            "orange/5",
                        borderColor:
                            "orange/25",
                    },
                    span: {
                        color: "orange",
                    },
                },
            },
        },
    })

    const chipSlots = chipRecipe({
        color: props.color ?? "default",
    })

    return (
        <div
            className={cx(
                chipSlots.div,
                css(props.className),
            )}
        >
            <span
                className={
                    chipSlots.span
                }
            >
                {props.text}
            </span>
        </div>
    )
}
