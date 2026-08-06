import type { IconProps } from "@tabler/icons-react"
import { cloneElement, type ReactElement } from "react"
import { css, cx } from "@/styled-system/css"

export function TreeButtonContent(props: {
    label: string
    icon?: ReactElement<IconProps>
    isActive?: boolean
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
                            ...(props.isActive
                                ? {
                                      stroke: "primary",
                                  }
                                : {}),
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
                        _groupHover: {
                            textDecoration: "underline",
                        },
                        ...(props.isActive
                            ? {
                                  color: "primary",
                                  //   fontWeight: "500",
                              }
                            : {}),
                    }),
                    props.className,
                )}
            >
                {props.label}
            </span>
        </div>
    )
}
