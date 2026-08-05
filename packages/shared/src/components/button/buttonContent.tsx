import type { Icon, IconProps } from "@tabler/icons-react"
import { cloneElement, type ReactElement, type ReactNode } from "react"
import { css } from "@browserworkshop/shared/styled-system/css"
import { cx } from "@browserworkshop/shared/styled-system/css"
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

    // const activeContainerStyles = props.isActive ? css({ backgroundColor: "neutral/5" }) : ""
    // const activeLeftIconStyles = props.isActive ? css({ color: "primary" }) : ""
    // const activeTextStyles = props.isActive ? css({ color: "primary" }) : ""

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
                    size: 16,
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
                            size: 16 - 4,
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

export function ButtonContent(props: {
    children: ReactNode
    isDisabled?: boolean
    title?: string
    className?: string
}) {
    const contextLoading = useButtonLoading()
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
