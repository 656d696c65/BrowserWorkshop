import type { Icon, IconProps } from "@tabler/icons-react"
import { cloneElement, type ReactElement, type ReactNode } from "react"
import { css, cx, type Styles } from "@/styled-system/css"
import { CircularLoader } from "../circularLoader"
import { useButtonLoading } from "./button"

export type ButtonColor = "neutral" | "danger" | "success"

export type ButtonVariant = "outlined" | "plain"

export type ButtonContentProps = {
    color?: ButtonColor
    variant?: ButtonVariant
    text?: string
    title?: string
    leftIcon?: ReactElement<IconProps & React.RefAttributes<Icon>>
    rightIcon?: ReactElement<IconProps & React.RefAttributes<Icon>>
    isLoading?: boolean
    isDisabled?: boolean
    isCurrent?: boolean
    isFullWidth?: boolean
    css?: Styles
    className?: string
}

const layoutClasses = {
    container: css({
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.5rem",
        borderRadius: "0.25rem",
        boxSizing: "border-box",
        cursor: "pointer",
        transition: "all",
        transitionDuration: "200ms",
        transitionTimingFunction: "ease-in-out",
        border: "1px solid",
        _disabled: {
            opacity: 0.5,
            cursor: "not-allowed",
        },
    }),
    leftIcon: css({
        minWidth: "0.875rem",
        width: "0.875rem",
        minHeight: "0.875rem",
        height: "0.875rem",
        flexShrink: 0,
        opacity: 1,
        strokeOpacity: 1,
        strokeWidth: 2,
    }),
    text: css({
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        fontSize: "0.875rem",
        lineHeight: "1rem",
        fontWeight: "400",
    }),
    rightIcon: css({
        minWidth: "1rem",
        width: "1rem",
        minHeight: "1rem",
        height: "1rem",
    }),
}

const variantClasses: Record<
    ButtonVariant,
    Record<keyof typeof layoutClasses, string>
> = {
    outlined: {
        container: css({
            borderColor: "neutral/20",
            backgroundColor: "transparent",
            _hover: {
                backgroundColor: "neutral/5",
                borderColor: "neutral/30",
            },
            _active: {
                backgroundColor: "neutral/10",
            },
        }),
        leftIcon: css({
            stroke: "neutral",
        }),
        text: css({
            color: "neutral",
        }),
        rightIcon: css({
            stroke: "neutral/50",
        }),
    },
    plain: {
        container: css({
            borderColor: "orange/50",
            backgroundColor: "orange/5",
            _hover: {
                backgroundColor: "orange/10",
                borderColor: "orange/75",
            },
            _active: {
                backgroundColor: "orange/10",
            },
        }),
        leftIcon: css({
            stroke: "orange",
        }),
        text: css({
            color: "orange",
        }),
        rightIcon: css({
            stroke: "orange/50",
        }),
    },
}

export function ButtonContent(
    props: ButtonContentProps & {
        children?: ReactNode
    },
) {
    const contextLoading = useButtonLoading()

    const isLoading = props.isLoading ?? contextLoading
    const isDisabled = props.isDisabled || isLoading

    if (props.children) {
        return (
            <div
                title={props.title}
                aria-disabled={isDisabled || undefined}
                className={cx(
                    css(
                        {
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "0.5rem",
                            width:
                                props.isFullWidth === false
                                    ? "fit-content"
                                    : "100%",
                            _disabled: {
                                opacity: 0.5,
                            },
                        },
                        props.css,
                    ),
                    props.className,
                )}
            >
                {props.children}
            </div>
        )
    }

    const variant = props.variant ?? "outlined"
    const containerClass = cx(
        layoutClasses.container,
        variantClasses[variant].container,
    )
    const leftIconClass = cx(
        layoutClasses.leftIcon,
        variantClasses[variant].leftIcon,
    )
    const textClass = cx(layoutClasses.text, variantClasses[variant].text)
    const rightIconClass = cx(
        layoutClasses.rightIcon,
        variantClasses[variant].rightIcon,
    )

    const fullWidthStyles =
        props.isFullWidth === true
            ? css({
                  width: "100%",
              })
            : ""

    return (
        <div
            title={props.title ?? props.text}
            aria-current={props.isCurrent}
            aria-disabled={isDisabled}
            className={cx(
                containerClass,
                fullWidthStyles,
                css(props.css),
                props.className,
            )}
        >
            {isLoading ? (
                <CircularLoader size={14} className={leftIconClass} />
            ) : (
                props.leftIcon &&
                cloneElement(props.leftIcon, {
                    "aria-disabled": isDisabled,
                    "aria-current": props.isCurrent,
                    size: 14,
                    className: cx(leftIconClass),
                    strokeWidth: 2,
                    color: "CurrentColor",
                })
            )}

            {props.text && (
                <span
                    aria-disabled={isDisabled}
                    aria-current={props.isCurrent}
                    className={cx(textClass)}
                >
                    {props.text}
                </span>
            )}

            {props.rightIcon && (
                <div
                    className={css({
                        marginLeft: "auto",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    })}
                >
                    {isLoading ? (
                        <CircularLoader
                            size={14 - 4}
                            className={rightIconClass}
                        />
                    ) : (
                        cloneElement(props.rightIcon, {
                            "aria-disabled": isDisabled,
                            size: 14 - 4,
                            className: cx(
                                rightIconClass,
                                css({
                                    _disabled: {
                                        color: "neutral/50",
                                    },
                                }),
                            ),
                            strokeWidth: 1,
                        })
                    )}
                </div>
            )}
        </div>
    )
}
