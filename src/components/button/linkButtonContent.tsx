import type { IconProps } from "@tabler/icons-react"
import { cloneElement, type ReactElement } from "react"
import { css, cx } from "@/styled-system/css"

export function LinkButtonContent(props: {
    text: string
    icon?: ReactElement<IconProps>
    className?: string
}) {
    return (
        <div
            className={cx(
                "group",
                css({
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "start",
                    alignItems: "center",
                    gap: "0.5rem",
                }),
                props.className,
            )}
        >
            {props.icon !== undefined && (
                <div>
                    {cloneElement(props.icon, {
                        size: 16,
                        className: css({
                            stroke: "neutral/75",
                            _groupHover: {
                                stroke: "primary",
                            },
                        }),
                    })}
                </div>
            )}
            <span
                className={cx(
                    css({
                        fontSize: "1rem",
                        lineHeight: 1,
                        color: "neutral",
                        textDecoration: "underline",
                        _groupHover: {
                            color: "primary",
                            textDecoration: "underline",
                        },
                    }),
                    props.className,
                )}
            >
                {props.text}
            </span>
        </div>
    )
}
