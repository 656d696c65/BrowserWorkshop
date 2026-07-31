import {
    IconArrowsLeftRight,
    IconBrandGithub,
    IconCoin,
    IconFileStack,
    IconHeart,
    IconPhoto,
    IconRuler,
    IconScale,
    IconTool,
} from "@tabler/icons-react"
import {
    Link,
    useLocation,
} from "@tanstack/react-router"
import {
    type ReactElement,
    useState,
} from "react"
import { css } from "../../styled-system/css"
import type { ValidRoutes } from "../routes/websiteRouter"
import { LinkButton } from "./linkButton"

interface TreeItem {
    label: string
    icon?: ReactElement
    path?: string
    children?: TreeItem[]
}

const toolTree: TreeItem[] = [
    {
        label: "Conversion",
        icon: <IconArrowsLeftRight />,
        children: [
            {
                label: "Units",
                icon: <IconRuler />,
                children: [
                    {
                        label: "Length",
                        icon: (
                            <IconRuler />
                        ),
                        path: "/tools/conversion/units/length",
                    },
                    {
                        label: "Weight",
                        icon: (
                            <IconScale />
                        ),
                        path: "/tools/conversion/units/weight",
                    },
                    {
                        label: "Currency",
                        icon: (
                            <IconCoin />
                        ),
                        path: "/tools/conversion/units/currency",
                    },
                ],
            },
            {
                label: "Files",
                icon: <IconFileStack />,
                children: [
                    {
                        label: "Images",
                        icon: (
                            <IconPhoto />
                        ),
                        path: "/tools/conversion/files/images",
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

function sectionKey(
    parentKey: string,
    label: string,
): string {
    return parentKey
        ? `${parentKey}/${label}`
        : label
}

export function ToolsSidebar() {
    const location = useLocation()
    const [expanded, setExpanded] =
        useState<string[]>([
            "Conversion",
            "Conversion/Units",
            "Conversion/Files",
        ])

    function toggleSection(
        key: string,
    ) {
        setExpanded((prev) =>
            prev.includes(key)
                ? prev.filter(
                      (k) => k !== key,
                  )
                : [...prev, key],
        )
    }

    const currentPath =
        location.pathname

    function renderItem(
        item: TreeItem,
        parentKey: string,
    ) {
        const key = sectionKey(
            parentKey,
            item.label,
        )

        if (
            item.children &&
            item.children.length > 0
        ) {
            const isExpanded =
                expanded.includes(key)
            return (
                <div
                    key={key}
                    className={css({
                        display: "flex",
                        flexDirection:
                            "column",
                        justifyContent:
                            "start",
                        alignItems:
                            "stretch",
                        gap: "0.125rem",
                    })}
                >
                    <button
                        type="button"
                        onClick={() =>
                            toggleSection(
                                key,
                            )
                        }
                        className={css({
                            width: "100%",
                            display:
                                "flex",
                            flexDirection:
                                "row",
                            justifyContent:
                                "start",
                            alignItems:
                                "center",
                            gap: "0.5rem",
                            padding:
                                "0.5rem",
                            borderRadius:
                                "0.25rem",
                            cursor: "pointer",
                            fontSize:
                                "0.875rem",
                            fontWeight:
                                "500",
                            color: "neutral",
                            _hover: {
                                backgroundColor:
                                    "neutral/5",
                            },
                        })}
                    >
                        {item.icon && (
                            <span
                                className={
                                    iconContainer
                                }
                            >
                                {
                                    item.icon
                                }
                            </span>
                        )}
                        <span>
                            {item.label}
                        </span>
                        <span
                            className={css(
                                {
                                    marginLeft:
                                        "auto",
                                    fontSize:
                                        "0.625rem",
                                    transition:
                                        "transform 0.2s",
                                    transform:
                                        isExpanded
                                            ? "rotate(90deg)"
                                            : "rotate(0deg)",
                                },
                            )}
                        >
                            ▶
                        </span>
                    </button>

                    {isExpanded && (
                        <div
                            className={
                                childrenContainer
                            }
                        >
                            {item.children.map(
                                (
                                    child,
                                ) =>
                                    renderItem(
                                        child,
                                        key,
                                    ),
                            )}
                        </div>
                    )}
                </div>
            )
        }

        const isActive =
            item.path === currentPath
        return (
            <LinkButton
                key={key}
                to={
                    item.path as ValidRoutes
                }
                className={css({
                    width: "100%",
                    display: "flex",
                    flexDirection:
                        "row",
                    justifyContent:
                        "start",
                    alignItems:
                        "center",
                    gap: "0.5rem",
                    padding:
                        "0.375rem 0.5rem",
                    borderRadius:
                        "0.25rem",
                    fontSize:
                        "0.875rem",
                    color: "neutral/60",
                    textDecoration:
                        "none",
                    _hover: {
                        backgroundColor:
                            "neutral/5",
                        color: "neutral",
                    },
                    ...(isActive
                        ? {
                              backgroundColor:
                                  "neutral/5",
                              color: "primary",
                              fontWeight:
                                  "500",
                          }
                        : {}),
                })}
            >
                {item.icon && (
                    <span
                        className={css({
                            width: "1rem",
                            height: "1rem",
                            display:
                                "flex",
                            alignItems:
                                "center",
                            justifyContent:
                                "center",
                            flexShrink: 0,
                        })}
                    >
                        {item.icon}
                    </span>
                )}
                <span>
                    {item.label}
                </span>
            </LinkButton>
        )
    }

    return (
        <nav
            className={css({
                width: "16rem",
                minWidth: "16rem",
                height: "100%",
                minHeight: "100dvh",
                borderRightWidth: "1px",
                borderRightColor:
                    "neutral/10",
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "stretch",
                padding: "1rem",
                gap: "0.25rem",
                overflowY: "auto",
            })}
        >
            <Link
                to="/"
                className={css({
                    display: "flex",
                    flexDirection:
                        "row",
                    justifyContent:
                        "start",
                    alignItems:
                        "center",
                    gap: "0.5rem",
                    padding: "0.5rem",
                    borderRadius:
                        "0.25rem",
                    fontSize: "1rem",
                    fontWeight: "700",
                    color: "primary",
                    textDecoration:
                        "none",
                    marginBottom:
                        "0.5rem",
                    _hover: {
                        backgroundColor:
                            "neutral/5",
                    },
                })}
            >
                <span
                    className={
                        iconContainer
                    }
                >
                    <IconTool />
                </span>
                BrowserWorkshop
            </Link>

            {toolTree.map((item) =>
                renderItem(item, ""),
            )}

            <div
                className={css({
                    marginTop: "auto",
                    display: "flex",
                    flexDirection:
                        "column",
                    gap: "0.125rem",
                    paddingTop: "1rem",
                    borderTopWidth:
                        "1px",
                    borderTopColor:
                        "neutral/10",
                })}
            >
                <a
                    href="https://github.com/barbote/BrowserWorkshop"
                    target="_blank"
                    rel="noreferrer"
                    className={
                        linkClass
                    }
                >
                    <span
                        className={
                            iconContainer
                        }
                    >
                        <IconBrandGithub />
                    </span>
                    GitHub
                </a>
                <a
                    href="https://github.com/sponsors/barbote"
                    target="_blank"
                    rel="noreferrer"
                    className={
                        linkClass
                    }
                >
                    <span
                        className={
                            iconContainer
                        }
                    >
                        <IconHeart />
                    </span>
                    Donate
                </a>
            </div>
        </nav>
    )
}
