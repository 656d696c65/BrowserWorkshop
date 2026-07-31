import {
    type ButtonHTMLAttributes,
    cloneElement,
    type Dispatch,
    Fragment,
    type ReactElement,
    type ReactNode,
    type RefAttributes,
    type SetStateAction,
    useEffect,
    useRef,
    useState,
} from "react"
import { createPortal } from "react-dom"
import {
    css,
    cx,
    type Styles,
} from "../../../styled-system/css"

let popoverCount = 0

function generatePopoverId() {
    popoverCount =
        (popoverCount + 1) %
        Number.MAX_SAFE_INTEGER
    return popoverCount.toString()
}

export function Popover(props: {
    triggerElement: ReactElement<
        ButtonHTMLAttributes<HTMLButtonElement> &
            RefAttributes<HTMLButtonElement>
    >
    children: (context: {
        isOpen: boolean
        setIsOpen: Dispatch<
            SetStateAction<boolean>
        >
    }) => ReactNode
    position:
        | "top"
        | "bottom"
        | "left"
        | "right"
    className?: Styles
}) {
    const [isOpen, setIsOpen] =
        useState(false)
    const [coords, setCoords] =
        useState({ top: 0, left: 0 })
    const popoverRef =
        useRef<HTMLDivElement>(null)
    const triggerRef =
        useRef<HTMLButtonElement>(null)

    useEffect(() => {
        if (!isOpen) return
        if (
            triggerRef.current ===
                null ||
            popoverRef.current === null
        ) {
            return
        }

        function updateCoords() {
            if (
                triggerRef.current ===
                    null ||
                popoverRef.current ===
                    null
            ) {
                return
            }
            const rect =
                triggerRef.current.getBoundingClientRect()
            switch (props.position) {
                case "bottom":
                    setCoords({
                        top:
                            rect.bottom +
                            window.scrollY,
                        left:
                            rect.left +
                            window.scrollX,
                    })
                    break
                case "top":
                    setCoords({
                        top:
                            rect.top +
                            window.scrollY -
                            popoverRef
                                .current
                                ?.offsetHeight,
                        left:
                            rect.left +
                            window.scrollX,
                    })
                    break
                default:
                    break
            }
        }

        updateCoords()
        window.addEventListener(
            "scroll",
            updateCoords,
            true,
        )
        window.addEventListener(
            "resize",
            updateCoords,
        )

        return () => {
            window.removeEventListener(
                "scroll",
                updateCoords,
                true,
            )
            window.removeEventListener(
                "resize",
                updateCoords,
            )
        }
    }, [isOpen, props.position])

    useEffect(() => {
        function handleClickOutside(
            e: MouseEvent,
        ) {
            if (
                !popoverRef.current?.contains(
                    e.target as Node,
                ) &&
                !triggerRef.current?.contains(
                    e.target as Node,
                ) &&
                !(
                    e.target as HTMLElement
                ).closest(
                    "[data-ignore-clickoutside]",
                )
            ) {
                setIsOpen(false)
            }
        }
        document.addEventListener(
            "mousedown",
            handleClickOutside,
        )
        return () =>
            document.removeEventListener(
                "mousedown",
                handleClickOutside,
            )
    }, [])

    const modalElements = Array.from(
        document.querySelectorAll<HTMLElement>(
            '[id^="modal-"]',
        ),
    )
    const inModal = modalElements.some(
        (element) =>
            element.contains(
                triggerRef.current,
            ),
    )

    return (
        <Fragment>
            {/* Render trigger button */}
            {cloneElement(
                props.triggerElement,
                {
                    ref: triggerRef,
                    type: "button",
                    onClick: (
                        event,
                    ) => {
                        event.preventDefault()
                        setIsOpen(
                            !isOpen,
                        )
                    },
                    "aria-haspopup":
                        "true",
                    "aria-expanded":
                        isOpen,
                },
            )}

            {/* Modal */}
            {isOpen === false
                ? null
                : triggerRef.current ===
                    null
                  ? null
                  : createPortal(
                        <div
                            ref={
                                popoverRef
                            }
                            id={`popover-${generatePopoverId()}`}
                            className={cx(
                                css({
                                    position:
                                        "absolute",
                                    zIndex: inModal
                                        ? 51
                                        : 49,
                                    width: "fit-content",
                                    height: "fit-content",
                                    backgroundColor:
                                        "white",
                                    boxShadow:
                                        "md",
                                    justifyContent:
                                        "start",
                                    alignItems:
                                        "start",
                                    borderWidth:
                                        "1px",
                                    borderColor:
                                        "neutral/20",
                                    borderRadius:
                                        "0.5rem",
                                }),
                                {
                                    top: css(
                                        {
                                            marginTop:
                                                "-0.25rem",
                                        },
                                    ),
                                    bottom: css(
                                        {
                                            marginTop:
                                                "0.25rem",
                                        },
                                    ),
                                    left: css(
                                        {
                                            marginRight:
                                                "0.25rem",
                                        },
                                    ),
                                    right: css(
                                        {
                                            marginLeft:
                                                "0.25rem",
                                        },
                                    ),
                                }[
                                    props
                                        .position
                                ],
                            )}
                            style={{
                                display:
                                    isOpen
                                        ? "flex"
                                        : "none",
                                minWidth:
                                    triggerRef
                                        .current
                                        ?.offsetWidth,
                                top: coords.top,
                                left: coords.left,
                            }}
                        >
                            {props.children(
                                {
                                    isOpen: isOpen,
                                    setIsOpen:
                                        setIsOpen,
                                },
                            )}
                        </div>,
                        document.body,
                    )}
        </Fragment>
    )
}
