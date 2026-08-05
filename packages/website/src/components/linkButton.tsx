import { Link } from "@tanstack/react-router"
import type { ComponentProps, MouseEventHandler, ReactNode } from "react"
import { css, cx } from "@browserworkshop/shared/styled-system/css"
import type { ValidParams, ValidRoutes } from "../routes/websiteRouter"

export function LinkButton(props: {
    to: ValidRoutes
    params?: ValidParams
    target?: ComponentProps<typeof Link>["target"]
    rel?: ComponentProps<typeof Link>["rel"]
    title?: string
    disabled?: boolean
    className?: string
    onClick?: MouseEventHandler<HTMLAnchorElement> | undefined
    children: ReactNode
}) {
    return (
        <Link
            to={props.to}
            params={props.params}
            target={props.target}
            rel={props.rel}
            className={cx(
                css({
                    width: "fit-content",
                    maxWidth: "100%",
                    _disabled: {
                        cursor: "not-allowed",
                        pointerEvents: "none",
                    },
                }),
                props.className,
            )}
            aria-disabled={props.disabled}
            title={props.title}
            onClick={props.onClick}
        >
            {props.children}
        </Link>
    )
}
