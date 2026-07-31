import {
    css,
    type Styles,
} from "../../../../website/styled-system/css"

export function HorizontalDivider(props: {
    text?: string
    className?: Styles
}) {
    return (
        <div
            className={css(
                {
                    position:
                        "relative",
                    width: "100%",
                    // height: "1rem",
                    // backgroundColor: "neutral/10",
                    textAlign: "center",
                    borderTopColor:
                        "neutral/50",
                    borderTopStyle:
                        "dashed",
                    borderTopWidth:
                        "1px",
                },
                props.className,
            )}
        >
            {props.text ===
            undefined ? null : (
                <span
                    className={css({
                        position:
                            "absolute",
                        top: "50%",
                        left: "50%",
                        transform:
                            "translate(-50%, -60%)",
                        backgroundColor:
                            "white",
                        paddingX:
                            "1rem",
                        fontSize:
                            "1rem",
                        color: "neutral/50",
                    })}
                >
                    {props.text}
                </span>
            )}
        </div>
    )
}
