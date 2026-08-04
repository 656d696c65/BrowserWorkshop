import {
    Button,
    ButtonContent,
    InstallPwaButton,
    Logo,
} from "@browserworkshop/shared"
import {
    IconArrowsLeftRight,
    IconBrandGithub,
    IconCoin,
    IconFileStack,
    IconFileText,
    IconHeart,
    IconPhoto,
    IconRuler,
    IconSearch,
} from "@tabler/icons-react"
import { Link, useLocation } from "@tanstack/react-router"
import {
    type ReactElement,
    type KeyboardEvent as ReactKeyboardEvent,
    type PointerEvent as ReactPointerEvent,
    useRef,
    useState,
} from "react"
import { css, cx } from "../../styled-system/css"
import type { ValidRoutes } from "../routes/websiteRouter"
import { LinkButton } from "./linkButton"

const SIDEBAR_MIN_WIDTH = 14
const SIDEBAR_MAX_WIDTH = 32
const SIDEBAR_DEFAULT_WIDTH = 16

interface TreeItem {
    label: string
    icon?: ReactElement
    path?: string
    children?: TreeItem[]
}

const toolTree: TreeItem[] = [
    {
        label: "Convert",
        icon: <IconArrowsLeftRight />,
        children: [
            {
                label: "Units",
                icon: <IconRuler />,
                path: "/tools/convert/units",
            },
            {
                label: "Currency",
                icon: <IconCoin />,
                path: "/tools/convert/currency",
            },
            {
                label: "Files",
                icon: <IconFileStack />,
                children: [
                    {
                        label: "Images",
                        icon: <IconPhoto />,
                        path: "/tools/convert/files/images",
                    },
                    {
                        label: "Text",
                        icon: <IconFileText />,
                        path: "/tools/convert/files/text",
                    },
                ],
            },
        ],
    },
]

const linkClass = css({
    display: "flex",
    flexDirection: "row",
    justifyContent: "start",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.5rem",
    borderRadius: "0.25rem",
    fontSize: "0.875rem",
    color: "neutral",
    textDecoration: "none",
    _hover: {
        backgroundColor: "neutral/5",
    },
})

const iconContainer = css({
    width: "1.25rem",
    height: "1.25rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
})

const childrenContainer = css({
    display: "flex",
    flexDirection: "column",
    justifyContent: "start",
    alignItems: "stretch",
    gap: "0.125rem",
    paddingLeft: "1.25rem",
})

function sectionKey(parentKey: string, label: string): string {
    return parentKey ? `${parentKey}/${label}` : label
}

export function ToolsSidebar() {
    const location = useLocation()
    const [search, setSearch] = useState("")
    const [expanded, setExpanded] = useState<string[]>([
        "Convert",
        "Convert/Files",
    ])
    const [sidebarWidth, setSidebarWidth] = useState(SIDEBAR_DEFAULT_WIDTH)
    const sidebarRef = useRef<HTMLElement | null>(null)
    const dragState = useRef<{
        startX: number
        startWidth: number
    } | null>(null)

    const sidebarWidthPx = `${sidebarWidth}rem`

    const MIN_WIDTH_PX = SIDEBAR_MIN_WIDTH * 16
    const MAX_WIDTH_PX = SIDEBAR_MAX_WIDTH * 16

    function onResizeStart(event: ReactPointerEvent) {
        event.preventDefault()
        const startX = event.clientX
        const startWidth =
            sidebarRef.current?.offsetWidth ?? SIDEBAR_DEFAULT_WIDTH * 16
        dragState.current = {
            startX,
            startWidth,
        }
        event.currentTarget.setPointerCapture(event.pointerId)
        document.body.style.cursor = "col-resize"
        document.body.style.userSelect = "none"
    }

    function onResizeMove(event: ReactPointerEvent) {
        const drag = dragState.current
        if (!drag) return
        const delta = event.clientX - drag.startX
        const width = Math.min(
            Math.max(drag.startWidth + delta, MIN_WIDTH_PX),
            MAX_WIDTH_PX,
        )
        setSidebarWidth(width / 16)
    }

    function onResizeEnd(event: ReactPointerEvent) {
        const drag = dragState.current
        if (drag) {
            event.currentTarget.releasePointerCapture(event.pointerId)
        }
        dragState.current = null
        document.body.style.cursor = ""
        document.body.style.userSelect = ""
    }

    function onResizeKeyDown(event: ReactKeyboardEvent) {
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") {
            return
        }
        event.preventDefault()
        const delta = event.key === "ArrowRight" ? 1 : -1
        setSidebarWidth((prev) => {
            const step = event.shiftKey ? delta * 4 : delta
            return Math.min(
                Math.max(prev + step, SIDEBAR_MIN_WIDTH),
                SIDEBAR_MAX_WIDTH,
            )
        })
    }

    function toggleSection(key: string) {
        setExpanded((prev) =>
            prev.includes(key)
                ? prev.filter((k) => k !== key)
                : [
                      ...prev,
                      key,
                  ],
        )
    }

    const currentPath = location.pathname

    function renderItem(
        item: TreeItem,
        parentKey: string,
        forceExpanded = false,
    ) {
        const key = sectionKey(parentKey, item.label)

        if (item.children && item.children.length > 0) {
            const isExpanded = forceExpanded || expanded.includes(key)
            return (
                <div
                    key={key}
                    className={css({
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "start",
                        alignItems: "stretch",
                        gap: "0.125rem",
                    })}
                >
                    <Button
                        onClick={() => toggleSection(key)}
                        className={css({
                            width: "100%",
                        })}
                    >
                        <ButtonContent
                            className={css({
                                justifyContent: "start",
                                gap: "0.5rem",
                                padding: "0.5rem",
                                borderRadius: "0.25rem",
                                fontSize: "0.875rem",
                                fontWeight: "500",
                                color: "neutral",
                                _hover: {
                                    backgroundColor: "neutral/5",
                                },
                            })}
                        >
                            {item.icon && (
                                <span className={iconContainer}>
                                    {item.icon}
                                </span>
                            )}
                            <span>{item.label}</span>
                            <span
                                className={css({
                                    marginLeft: "auto",
                                    fontSize: "0.625rem",
                                    transition: "transform 0.2s",
                                    transform: isExpanded
                                        ? "rotate(90deg)"
                                        : "rotate(0deg)",
                                })}
                            >
                                ▶
                            </span>
                        </ButtonContent>
                    </Button>

                    {isExpanded && (
                        <div className={childrenContainer}>
                            {item.children.map((child) =>
                                renderItem(child, key, forceExpanded),
                            )}
                        </div>
                    )}
                </div>
            )
        }

        const isActive = item.path === currentPath
        return (
            <LinkButton
                key={key}
                to={item.path as ValidRoutes}
                className={css({
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "start",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.375rem 0.5rem",
                    borderRadius: "0.25rem",
                    fontSize: "0.875rem",
                    color: "neutral/60",
                    textDecoration: "none",
                    _hover: {
                        backgroundColor: "neutral/5",
                        color: "neutral",
                    },
                    ...(isActive
                        ? {
                              backgroundColor: "neutral/5",
                              color: "primary",
                              fontWeight: "500",
                          }
                        : {}),
                })}
            >
                {item.icon && (
                    <span
                        className={css({
                            width: "1rem",
                            height: "1rem",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                        })}
                    >
                        {item.icon}
                    </span>
                )}
                <span>{item.label}</span>
            </LinkButton>
        )
    }

    function matchesSearch(item: TreeItem, query: string): boolean {
        const labelMatches = item.label.toLowerCase().includes(query)
        const childMatches = item.children?.some((child) =>
            matchesSearch(child, query),
        )
        return labelMatches || childMatches === true
    }

    function filterTree(items: TreeItem[], query: string): TreeItem[] {
        if (query === "") {
            return items
        }
        return items.flatMap((item) => {
            if (!matchesSearch(item, query)) {
                return []
            }
            const children = item.children
                ? filterTree(item.children, query)
                : undefined
            return [
                {
                    ...item,
                    children,
                },
            ]
        })
    }

    return (
        <div
            className={css({
                display: "flex",
                flexDirection: "row",
                height: "100%",
                position: "relative",
                flexShrink: 0,
            })}
        >
            <nav
                ref={sidebarRef}
                style={{
                    width: sidebarWidthPx,
                    minWidth: sidebarWidthPx,
                }}
                className={css({
                    height: "100%",
                    borderRightWidth: "1px",
                    borderRightColor: "neutral/10",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "start",
                    alignItems: "stretch",
                    padding: "1rem",
                    gap: "0.5rem",
                    overflowY: "auto",
                })}
            >
                <Link
                    to="/"
                    className={cx(
                        css({
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "start",
                            alignItems: "center",
                            gap: "0.5rem",
                        }),
                        "group",
                    )}
                >
                    <Logo
                        className={css({
                            height: "2rem",
                            width: "auto",
                            fill: "neutral",
                            flexShrink: 0,
                            // _groupHover:
                            //     {
                            //         fill: "primary",
                            //         textDecoration:
                            //             "underline",
                            //     },
                        })}
                    />
                    <span
                        className={css({
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                            height: "2rem",
                            fontSize: "1rem",
                            fontWeight: "700",
                            color: "neutral",
                            textDecoration: "none",
                            _groupHover: {
                                color: "primary",
                                textDecoration: "underline",
                            },
                        })}
                    >
                        BrowserWorkshop
                    </span>
                </Link>

                <div
                    className={css({
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: "0.5rem",
                        padding: "0.5rem",
                        borderRadius: "0.375rem",
                        borderWidth: "1px",
                        borderStyle: "solid",
                        borderColor: "neutral/10",
                        marginBottom: "0.25rem",
                    })}
                >
                    <IconSearch
                        className={css({
                            width: "0.875rem",
                            height: "0.875rem",
                            minWidth: "0.875rem",
                            strokeWidth: "1.5px",
                            color: "neutral/60",
                            flexShrink: 0,
                        })}
                    />
                    <input
                        type="search"
                        onChange={(event) =>
                            setSearch(event.currentTarget.value)
                        }
                        placeholder="Search tools..."
                        aria-label="Search tools"
                        className={css({
                            width: "100%",
                            height: "1.5rem",
                            fontSize: "0.875rem",
                            backgroundColor: "transparent",
                            borderWidth: "0",
                            outline: "none",
                            _placeholder: {
                                color: "neutral/40",
                            },
                        })}
                    />
                </div>

                {filterTree(toolTree, search.trim().toLowerCase()).map((item) =>
                    renderItem(item, "", search.trim() !== ""),
                )}

                <div
                    className={css({
                        marginTop: "auto",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.125rem",
                    })}
                >
                    <div
                        className={css({
                            display: {
                                base: "flex",
                                md: "none",
                            },
                            justifyContent: "center",
                            paddingBottom: "0.5rem",
                        })}
                    >
                        <InstallPwaButton
                            className={css({
                                width: "100%",
                            })}
                        />
                    </div>
                    <a
                        href="https://github.com/barbote/BrowserWorkshop"
                        target="_blank"
                        rel="noreferrer"
                        className={linkClass}
                    >
                        <span className={iconContainer}>
                            <IconBrandGithub />
                        </span>
                        GitHub
                    </a>
                    <a
                        href="https://payment-links.mollie.com/payment/v7bX8uwdg4tsSLe5in8zJ"
                        target="_blank"
                        rel="noreferrer"
                        className={linkClass}
                    >
                        <span className={iconContainer}>
                            <IconHeart />
                        </span>
                        Donate
                    </a>
                </div>
            </nav>
            <hr
                onPointerDown={onResizeStart}
                onPointerMove={onResizeMove}
                onPointerUp={onResizeEnd}
                onPointerCancel={onResizeEnd}
                onKeyDown={onResizeKeyDown}
                aria-orientation="vertical"
                aria-label="Resize sidebar"
                aria-valuenow={sidebarWidth}
                aria-valuemin={SIDEBAR_MIN_WIDTH}
                aria-valuemax={SIDEBAR_MAX_WIDTH}
                tabIndex={0}
                className={css({
                    position: "absolute",
                    top: 0,
                    right: 0,
                    bottom: 0,
                    height: "100%",
                    width: "0.75rem",
                    margin: 0,
                    borderWidth: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "col-resize",
                    userSelect: "none",
                    touchAction: "none",
                    outline: "none",
                    zIndex: 1,
                    "&::after": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        bottom: 0,
                        right: 0,
                        width: "1px",
                        backgroundColor: "neutral/10",
                    },
                    _hover: {
                        backgroundColor: "neutral/5",
                        "&::after": {
                            width: "2px",
                            backgroundColor: "neutral/30",
                        },
                    },
                    _active: {
                        backgroundColor: "primary/10",
                        "&::after": {
                            backgroundColor: "primary",
                        },
                    },
                    _focus: {
                        backgroundColor: "neutral/5",
                    },
                })}
            />
        </div>
    )
}
