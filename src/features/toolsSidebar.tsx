import {
    IconArrowsLeftRight,
    IconBrandGithub,
    IconBrandX,
    IconCashBanknote,
    IconChevronRight,
    IconFileStack,
    IconFileText,
    IconHeartHandshake,
    IconHome,
    IconPhoto,
    type IconProps,
    IconRuler,
    IconSearch,
    IconTools,
    IconX,
} from "@tabler/icons-react"
import { useLocation } from "@tanstack/react-router"
import {
    type ReactElement,
    type KeyboardEvent as ReactKeyboardEvent,
    type PointerEvent as ReactPointerEvent,
    useRef,
    useState,
} from "react"
import { LinkButtonContent } from "@/components/button/linkButtonContent"
import { TreeButtonContent } from "@/components/button/treeButtonContent"
import { css, cx } from "@/styled-system/css"
import { Button } from "../components/button/button"
import { ButtonContent } from "../components/button/buttonContent"
import { InstallPwaButton } from "../components/button/installPwaButton"
import { LinkButton } from "../components/button/linkButton"
import { Logo } from "../components/layouts/logo"
import type { ValidRoutes } from "../routes/websiteRouter"

const SIDEBAR_MIN_WIDTH = 14
const SIDEBAR_MAX_WIDTH = 32
const SIDEBAR_DEFAULT_WIDTH = 17.5

interface TreeItem {
    label: string
    icon?: ReactElement<IconProps>
    path?: ValidRoutes
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
                icon: <IconCashBanknote />,
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

const rootTree: TreeItem[] = [
    {
        label: "Home",
        icon: <IconHome />,
        path: "/",
    },
    {
        label: "Tools",
        icon: <IconTools />,
        children: toolTree,
    },
]

function sectionKey(parentKey: string, label: string): string {
    return parentKey ? `${parentKey}/${label}` : label
}

function ancestorSectionKeys(
    items: TreeItem[],
    parentKey: string,
    path: string,
): string[] | null {
    for (const item of items) {
        if (item.children) {
            const key = sectionKey(parentKey, item.label)
            const childKeys = ancestorSectionKeys(item.children, key, path)
            if (childKeys !== null) {
                return [
                    key,
                    ...childKeys,
                ]
            }
        } else if (item.path === path) {
            return []
        }
    }
    return null
}

export function ToolsSidebar(props: {
    isOpen: boolean
    isMobile: boolean
    onClose: () => void
}) {
    const location = useLocation()
    const [search, setSearch] = useState("")
    const [expanded, setExpanded] = useState<string[]>(
        () => ancestorSectionKeys(rootTree, "", location.pathname) ?? [],
    )
    const [sidebarWidth, setSidebarWidth] = useState(SIDEBAR_DEFAULT_WIDTH)
    const [isResizing, setIsResizing] = useState(false)
    const sidebarRef = useRef<HTMLElement | null>(null)
    const dragState = useRef<{
        startX: number
        startWidth: number
    } | null>(null)

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
        setIsResizing(true)
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
        setIsResizing(false)
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
                        gap: "0.75rem",
                    })}
                >
                    <Button
                        onClick={() => toggleSection(key)}
                        title={item.label}
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
                        )}
                    >
                        <IconChevronRight
                            size={16}
                            className={css({
                                stroke: "neutral/75",
                                transition: "transform 0.2s",
                                transform: isExpanded
                                    ? "rotate(90deg)"
                                    : "rotate(0deg)",
                            })}
                        />
                        <TreeButtonContent
                            label={item.label}
                            // icon={item.icon}
                        />
                    </Button>

                    {isExpanded && (
                        <div
                            className={css({
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "start",
                                alignItems: "stretch",
                                gap: "0.75rem",
                                marginLeft: "0.5rem",
                                paddingLeft: "0.5rem",
                                borderLeft: "1px solid",
                                borderLeftColor: "neutral/10",
                            })}
                        >
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
                to={item.path}
                title={item.label}
                onClick={props.isMobile ? props.onClose : undefined}
            >
                <TreeButtonContent
                    label={item.label}
                    icon={item.icon}
                    isActive={isActive}
                />
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
            style={
                props.isMobile
                    ? undefined
                    : {
                          width: `${props.isOpen ? sidebarWidth : 0}rem`,
                          transition: isResizing
                              ? "none"
                              : "width 200ms ease-in-out",
                      }
            }
            className={css({
                display: "flex",
                flexDirection: "row",
                height: "100%",
                position: "relative",
                flexShrink: 0,
                ...(props.isMobile
                    ? {}
                    : {
                          overflow: "hidden",
                      }),
            })}
        >
            <nav
                ref={sidebarRef}
                style={
                    props.isMobile
                        ? undefined
                        : {
                              width: `${sidebarWidth}rem`,
                              minWidth: `${sidebarWidth}rem`,
                              transform: props.isOpen
                                  ? "translateX(0)"
                                  : "translateX(-100%)",
                              visibility: props.isOpen ? "visible" : "hidden",
                              transition: isResizing
                                  ? "none"
                                  : props.isOpen
                                    ? "transform 200ms ease-in-out"
                                    : "transform 200ms ease-in-out, visibility 0s linear 200ms",
                          }
                }
                className={css({
                    height: "100%",
                    borderRightWidth: "1px",
                    borderRightColor: "neutral/10",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    padding: "1rem",
                    backgroundColor: "background",
                    ...(props.isMobile
                        ? {
                              position: "absolute",
                              top: 0,
                              left: 0,
                              bottom: 0,
                              zIndex: 30,
                              width: "min(18rem, 80vw)",
                              transform: props.isOpen
                                  ? "translateX(0)"
                                  : "translateX(-100%)",
                              visibility: props.isOpen ? "visible" : "hidden",
                              transition:
                                  "transform 200ms ease-in-out, visibility 200ms ease-in-out",
                              boxShadow: props.isOpen ? "lg" : "none",
                          }
                        : {
                              position: "relative",
                          }),
                })}
            >
                <Button
                    onClick={props.onClose}
                    title="Close sidebar"
                    aria-label="Close sidebar"
                    className={css({
                        position: "absolute",
                        top: "0.5rem",
                        right: "0.75rem",
                        zIndex: 2,
                        padding: "0.375rem",
                        borderRadius: "0.375rem",
                        _hover: {
                            backgroundColor: "neutral/5",
                        },
                    })}
                >
                    <ButtonContent leftIcon={<IconX />} />
                </Button>
                <div
                    className={css({
                        flex: 1,
                        overflowY: "auto",
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                    })}
                >
                    <div
                        className={css({
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "start",
                            alignItems: "start",
                            gap: "0.5rem",
                        })}
                    >
                        <div
                            className={css({
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "start",
                                alignItems: "end",
                                gap: "0.5rem",
                            })}
                        >
                            <Logo
                                className={css({
                                    height: "1.5rem",
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
                                    fontSize: "0.75rem",
                                    fontWeight: "400",
                                    color: "neutral/40",
                                    whiteSpace: "nowrap",
                                    top: "0ex",
                                })}
                            >
                                v{__APP_VERSION__}
                            </span>
                        </div>
                        <span
                            className={css({
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "0.375rem",
                                flexShrink: 0,
                                height: "2rem",
                                fontSize: "1.25rem",
                                fontWeight: "700",
                                color: "neutral",
                                textDecoration: "none",
                            })}
                        >
                            BrowserWorkshop
                        </span>
                    </div>

                    <div
                        className={css({
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: "0.25rem",
                            padding: "0.25rem",
                            borderRadius: "0.25rem",
                            borderWidth: "1px",
                            borderStyle: "solid",
                            borderColor: "neutral/25",
                            boxSizing: "content-box",
                        })}
                    >
                        <div
                            className={css({
                                height: "1.25rem",
                                aspectRatio: 1,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                flex: "0 0 auto",
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
                        </div>
                        <input
                            type="search"
                            onChange={(event) =>
                                setSearch(event.currentTarget.value)
                            }
                            placeholder="Search..."
                            aria-label="Search"
                            className={css({
                                width: "100%",
                                height: "1.25rem",
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

                    {filterTree(rootTree, search.trim().toLowerCase()).map(
                        (item) => renderItem(item, "", search.trim() !== ""),
                    )}
                </div>

                <div
                    className={css({
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                    })}
                >
                    <div
                        className={css({
                            display: {
                                base: "flex",
                                md: "none",
                            },
                            justifyContent: "start",
                            paddingBottom: "0.5rem",
                        })}
                    >
                        <InstallPwaButton
                            className={css({
                                width: "100%",
                            })}
                        />
                    </div>
                    <div
                        className={css({
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.5rem",
                        })}
                    >
                        <a
                            href="https://x.com/BrowserWorkshop"
                            target="_blank"
                            rel="noreferrer"
                            title="Follow us on X"
                            aria-label="Follow us on X"
                        >
                            <LinkButtonContent
                                icon={<IconBrandX />}
                                text="Follow us on X"
                            />
                        </a>
                        <a
                            href="https://github.com/656d696c65/BrowserWorkshop"
                            target="_blank"
                            rel="noreferrer"
                            title="Contribute on Github"
                            aria-label="Contribute on Github"
                        >
                            <LinkButtonContent
                                icon={<IconBrandGithub />}
                                text="Contribute on Github"
                            />
                        </a>
                        <a
                            href="https://payment-links.mollie.com/payment/v7bX8uwdg4tsSLe5in8zJ"
                            target="_blank"
                            rel="noreferrer"
                            title="Support the project"
                            aria-label="Support the project"
                        >
                            <LinkButtonContent
                                icon={<IconHeartHandshake />}
                                text="Support the project"
                            />
                        </a>
                    </div>
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
                    display: props.isMobile
                        ? "none"
                        : props.isOpen
                          ? "flex"
                          : "none",
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
