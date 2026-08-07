import type { Icon, IconProps } from "@tabler/icons-react"
import { cloneElement, type ReactElement, type ReactNode } from "react"
import { css, cx } from "@/styled-system/css"
import { CircularLoader } from "../circularLoader"
import { useButtonLoading } from "./button"

export type ButtonColor = "neutral" | "danger" | "success"

export type ButtonContentProps = {
    color?: ButtonColor
    text?: string
    title?: string
    leftIcon?: ReactElement<IconProps & React.RefAttributes<Icon>>
    rightIcon?: ReactElement<IconProps & React.RefAttributes<Icon>>
    isLoading?: boolean
    isDisabled?: boolean
    isCurrent?: boolean
    className?: string
}

const defaultClasses = {
    container: css({
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.5rem",
        borderRadius: "0.25rem",
        boxSizing: "content-box",
        cursor: "pointer",
        transition: "all",
        transitionDuration: "200ms",
        transitionTimingFunction: "ease-in-out",
        border: "1px solid",
        borderColor: "neutral/20",
        backgroundColor: "transparent",
        _hover: {
            backgroundColor: "neutral/5",
            borderColor: "neutral/30",
        },
        _active: {
            backgroundColor: "neutral/10",
        },
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
        stroke: "neutral",
    }),
    text: css({
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        fontSize: "0.875rem",
        lineHeight: "1rem",
        fontWeight: "400",
        color: "neutral",
    }),
    rightIcon: css({
        minWidth: "1rem",
        width: "1rem",
        minHeight: "1rem",
        height: "1rem",
        stroke: "neutral/50",
    }),
}

export function renderButtonContent(
    props: ButtonContentProps,
    classes: Partial<
        Record<"container" | "leftIcon" | "text" | "rightIcon", string>
    >,
) {
    const isLoading = props.isLoading ?? false
    const isDisabled = props.isDisabled || isLoading

    const iconOnlyStyles =
        props.text === undefined
            ? css({
                  width: "auto",
                  justifyContent: "center",
              })
            : ""

    return (
        <div
            title={props.title ?? props.text}
            aria-current={props.isCurrent}
            aria-disabled={isDisabled}
            className={cx(classes.container, iconOnlyStyles, props.className)}
        >
            {isLoading ? (
                <CircularLoader size={16} className={classes.leftIcon} />
            ) : (
                props.leftIcon &&
                cloneElement(props.leftIcon, {
                    "aria-disabled": isDisabled,
                    "aria-current": props.isCurrent,
                    size: 14,
                    className: cx(classes.leftIcon),
                    strokeWidth: 1.75,
                })
            )}

            {props.text && (
                <span
                    aria-disabled={isDisabled}
                    aria-current={props.isCurrent}
                    className={cx(classes.text)}
                >
                    {props.text}
                </span>
            )}

            {props.rightIcon && (
                <div
                    className={css({
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    })}
                >
                    {isLoading ? (
                        <CircularLoader
                            size={16 - 4}
                            className={classes.rightIcon}
                        />
                    ) : (
                        cloneElement(props.rightIcon, {
                            "aria-disabled": isDisabled,
                            size: 14 - 4,
                            className: cx(
                                classes.rightIcon,
                                css({
                                    _disabled: {
                                        color: "neutral/50",
                                    },
                                }),
                            ),
                            strokeWidth: 1.75,
                        })
                    )}
                </div>
            )}
        </div>
    )
}

export function ButtonContent(
    props: ButtonContentProps & {
        children?: ReactNode
    },
) {
    const contextLoading = useButtonLoading()

    if (props.children) {
        const isDisabled = props.isDisabled || contextLoading
        return (
            <div
                title={props.title}
                aria-disabled={isDisabled || undefined}
                className={cx(
                    css({
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "0.5rem",
                        width: "100%",
                        _disabled: {
                            opacity: 0.5,
                        },
                    }),
                    props.className,
                )}
            >
                {props.children}
            </div>
        )
    }

    return renderButtonContent(
        {
            ...props,
            isLoading: props.isLoading ?? contextLoading,
        },
        defaultClasses,
    )
}
