import { ButtonGhostContent } from "@browserworkshop/shared"
import { IconX } from "@tabler/icons-react"
import { useEffect } from "react"
import { createPortal } from "react-dom"
import { css } from "../../../../website/styled-system/css"
import { Button } from "../button/button"
import { ButtonContent } from "../button/buttonContent"

export function Modal(props: {
    isOpen: boolean
    onClose: () => void
    title?: string
    children: React.ReactNode
}) {
    useEffect(() => {
        function handleKey(e: KeyboardEvent) {
            if (e.key === "Escape") props.onClose()
        }
        if (props.isOpen) document.addEventListener("keydown", handleKey)
        return () => document.removeEventListener("keydown", handleKey)
    }, [
        props.isOpen,
        props.onClose,
    ])

    if (props.isOpen === false) {
        return null
    }

    return createPortal(
        // biome-ignore lint/a11y/noStaticElementInteractions: modal backdrop overlay
        <div
            id="modal"
            role="presentation"
            onClick={props.onClose}
            onKeyDown={(e) => {
                if (e.key === "Escape") props.onClose()
            }}
            className={css({
                position: "fixed",
                zIndex: 50,
                inset: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "neutral/25",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "1rem",
                md: {
                    padding: "4rem",
                },
            })}
        >
            <div
                className={css({
                    borderWidth: "1px",
                    borderColor: "neutral/20",
                    borderRadius: "0.5rem",
                    boxShadow: "lg",
                    width: "100%",
                    maxWidth: "lg",
                    maxHeight: "100%",
                    backgroundColor: "white",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "start",
                    alignItems: "start",
                })}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => {
                    if (e.key === "Escape") props.onClose()
                }}
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
            >
                <div
                    className={css({
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "start",
                        padding: "1rem",
                        borderBottomWidth: "1px",
                        borderBottomColor: "neutral/25",
                    })}
                >
                    <span>{props.title}</span>
                    <Button
                        onClick={props.onClose}
                        className={css({
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        })}
                    >
                        <ButtonContent>
                            <ButtonGhostContent leftIcon={<IconX />} />
                        </ButtonContent>
                    </Button>
                </div>
                <div
                    className={css({
                        width: "100%",
                        display: "flex",
                        justifyContent: "start",
                        alignItems: "start",
                        padding: "1rem",
                    })}
                >
                    {props.children}
                </div>
            </div>
        </div>,
        document.body,
    )
}
