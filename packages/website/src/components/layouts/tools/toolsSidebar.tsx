import { IconArrowsLeftRight, IconRuler, IconScale } from "@tabler/icons-react"
import { useLocation } from "@tanstack/react-router"
import { type ReactElement, useState } from "react"
import { css, cx } from "../../../../styled-system/css"
import { LinkButton } from "../../../components/button/linkButton"

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
            { label: "Length", icon: <IconRuler />, path: "/tools/conversion/length" },
            { label: "Weight", icon: <IconScale />, path: "/tools/conversion/weight" },
        ],
    },
]

export function ToolsSidebar() {
    const location = useLocation()
    const [expanded, setExpanded] = useState<string[]>(["Conversion"])

    function toggleSection(label: string) {
        setExpanded((prev) => (prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]))
    }

    const currentPath = location.pathname

    return (
        <nav
            className={css({
                width: "16rem",
                minWidth: "16rem",
                height: "100%",
                minHeight: "100dvh",
                borderRightWidth: "1px",
                borderRightColor: "neutral/10",
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "stretch",
                padding: "1rem",
                gap: "0.25rem",
                overflowY: "auto",
            })}
        >
            {toolTree.map((item) => (
                <div key={item.label}>
                    <button
                        type="button"
                        onClick={() => toggleSection(item.label)}
                        className={css({
                            width: "100%",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "start",
                            alignItems: "center",
                            gap: "0.5rem",
                            padding: "0.5rem",
                            borderRadius: "0.25rem",
                            cursor: "pointer",
                            fontSize: "0.875rem",
                            fontWeight: "500",
                            color: "neutral",
                            _hover: { backgroundColor: "neutral/5" },
                        })}
                    >
                        {item.icon && (
                            <span
                                className={css({
                                    width: "1.25rem",
                                    height: "1.25rem",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                })}
                            >
                                {item.icon}
                            </span>
                        )}
                        <span>{item.label}</span>
                        <span
                            className={css({
                                marginLeft: "auto",
                                fontSize: "0.625rem",
                                transition: "transform 0.2s",
                                transform: expanded.includes(item.label) ? "rotate(90deg)" : "rotate(0deg)",
                            })}
                        >
                            ▶
                        </span>
                    </button>

                    {expanded.includes(item.label) && item.children && (
                        <div
                            className={css({
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "start",
                                alignItems: "stretch",
                                paddingLeft: "1.5rem",
                                marginTop: "0.125rem",
                                gap: "0.125rem",
                            })}
                        >
                            {item.children.map((child) => {
                                const isActive = child.path === currentPath
                                return (
                                    <LinkButton
                                        key={child.label}
                                        to={child.path as import("../../../routes/websiteRouter").ValidRoutes}
                                        className={cx(
                                            css({
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
                                            }),
                                            isActive
                                                ? css({
                                                      backgroundColor: "neutral/5",
                                                      color: "primary",
                                                      fontWeight: "500",
                                                  })
                                                : undefined,
                                        )}
                                    >
                                        {child.icon && (
                                            <span
                                                className={css({
                                                    width: "1rem",
                                                    height: "1rem",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                })}
                                            >
                                                {child.icon}
                                            </span>
                                        )}
                                        <span>{child.label}</span>
                                    </LinkButton>
                                )
                            })}
                        </div>
                    )}
                </div>
            ))}
        </nav>
    )
}
