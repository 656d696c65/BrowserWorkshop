import { type ReactNode, useState } from "react"
import { css } from "@/styled-system/css"

export function Collapsible(props: {
    header: (state: { isOpen: boolean; toggle: () => void }) => ReactNode
    children: ReactNode
    defaultOpen?: boolean
}) {
    const [isOpen, setIsOpen] = useState(props.defaultOpen ?? false)

    function toggle() {
        setIsOpen((open) => !open)
    }

    return (
        <div
            className={css({
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "stretch",
                gap: "0.5rem",
            })}
        >
            {props.header({
                isOpen,
                toggle,
            })}
            {isOpen && props.children}
        </div>
    )
}
