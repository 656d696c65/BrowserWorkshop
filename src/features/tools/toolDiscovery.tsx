import {
    IconChevronDown,
    IconExternalLink,
    IconSearch,
} from "@tabler/icons-react"
import { useNavigate } from "@tanstack/react-router"
import { useMemo, useState } from "react"
import { Button } from "@/components/button/button"
import { ButtonContent } from "@/components/button/buttonContent"
import { Collapsible } from "@/components/layouts/collapsible"
import { css } from "@/styled-system/css"
import type { ToolDefinition } from "./toolDefinition.js"
import { isExternalTool } from "./toolDefinition.js"
import { searchTools, toolsRegistry } from "./toolsRegistry.js"

function FilterChip(props: {
    label: string
    isActive: boolean
    onClick: () => void
}) {
    return (
        <Button
            type="button"
            onClick={props.onClick}
            title={props.label}
            className={css({
                paddingX: "0.75rem",
                paddingY: "0.375rem",
                borderRadius: "9999px",
                borderWidth: "1px",
                borderStyle: "solid",
                fontSize: "0.8125rem",
                fontWeight: "500",
                cursor: "pointer",
                transition: "all",
                transitionDuration: "150ms",
                ...(props.isActive
                    ? {
                          backgroundColor: "orange",
                          borderColor: "orange",
                          color: "white",
                          _hover: {
                              backgroundColor: "orange",
                          },
                      }
                    : {
                          backgroundColor: "transparent",
                          borderColor: "neutral/20",
                          color: "neutral",
                          _hover: {
                              backgroundColor: "neutral/5",
                              borderColor: "neutral/30",
                          },
                      }),
            })}
        >
            <ButtonContent>{props.label}</ButtonContent>
        </Button>
    )
}

function ToolListItem(props: { tool: ToolDefinition; onActivate: () => void }) {
    const { tool } = props
    const Icon = tool.icon
    return (
        <Button
            onClick={props.onActivate}
            title={tool.name}
            css={css.raw({
                flex: 1,
                width: "100%",
            })}
            className="group"
        >
            <ButtonContent
                className={css({
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "start",
                    alignItems: "start",
                    padding: "1rem",
                    borderRadius: "0.25rem",
                    borderWidth: "1px",
                    borderStyle: "solid",
                    borderColor: "neutral/10",
                    backgroundColor: "transparent",
                    cursor: "pointer",
                    textAlign: "start",
                    transition: "all",
                    transitionDuration: "150ms",
                    _hover: {
                        backgroundColor: "neutral/5",
                        borderColor: "neutral/20",
                    },
                })}
            >
                <div
                    className={css({
                        display: "flex",
                        justifyContent: "start",
                        alignItems: "center",
                        gap: "0.5rem",
                    })}
                >
                    <Icon
                        size={20}
                        className={css({
                            stroke: "neutral/75",
                        })}
                    />
                    <span
                        className={css({
                            fontSize: "1rem",
                            fontWeight: "500",
                            color: "neutral",
                        })}
                    >
                        {tool.name}
                    </span>
                    {isExternalTool(tool) && (
                        <IconExternalLink
                            size={14}
                            className={css({
                                stroke: "neutral/50",
                                flexShrink: 0,
                            })}
                        />
                    )}
                </div>
                <div
                    className={css({
                        flex: 1,
                        minWidth: 0,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "start",
                        alignItems: "start",
                        gap: "0.375rem",
                    })}
                >
                    <span
                        className={css({
                            fontSize: "0.875rem",
                            color: "neutral/60",
                            lineHeight: 1.4,
                        })}
                    >
                        {tool.description}
                    </span>
                    {/* <div
                        className={css({
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: "0.5rem",
                            flexWrap: "wrap",
                        })}
                    >
                        <span
                            className={css({
                                fontSize: "0.6875rem",
                                fontWeight: "600",
                                textTransform: "uppercase",
                                letterSpacing: "0.05em",
                                paddingX: "0.5rem",
                                paddingY: "0.125rem",
                                borderRadius: "0.25rem",
                                backgroundColor: "primary/10",
                                color: "primary",
                            })}
                        >
                            {tool.group}
                        </span>
                    </div> */}
                    <div
                        className={css({
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: "0.375rem",
                            flexWrap: "wrap",
                        })}
                    >
                        {tool.tags.map((tag) => (
                            <span
                                key={tag}
                                className={css({
                                    fontSize: "0.75rem",
                                    color: "neutral/50",
                                    paddingX: "0.375rem",
                                    paddingY: "0.125rem",
                                    borderRadius: "0.25rem",
                                    backgroundColor: "neutral/5",
                                })}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </ButtonContent>
        </Button>
    )
}

function useToggleSet(initial: string[] = []) {
    const [values, setValues] = useState<Set<string>>(new Set(initial))

    function toggle(value: string) {
        setValues((prev) => {
            const next = new Set(prev)
            if (next.has(value)) {
                next.delete(value)
            } else {
                next.add(value)
            }
            return next
        })
    }

    function clear() {
        setValues(new Set())
    }

    return {
        values,
        toggle,
        clear,
    }
}

export function ToolDiscovery() {
    const navigate = useNavigate()
    const [query, setQuery] = useState("")
    const groups = useToggleSet()
    const tags = useToggleSet()

    const allGroups = useMemo(
        () =>
            Array.from(
                new Set(
                    Array.from(toolsRegistry.values()).map(
                        (tool) => tool.group,
                    ),
                ),
            ).sort((a, b) => a.localeCompare(b)),
        [],
    )

    const allTags = useMemo(
        () =>
            Array.from(
                new Set(
                    Array.from(toolsRegistry.values()).flatMap(
                        (tool) => tool.tags,
                    ),
                ),
            ).sort((a, b) => a.localeCompare(b)),
        [],
    )

    const filteredTools = useMemo(() => {
        let tools = searchTools(query)
        if (groups.values.size > 0) {
            tools = tools.filter((tool) => groups.values.has(tool.group))
        }
        if (tags.values.size > 0) {
            tools = tools.filter((tool) =>
                tool.tags.some((tag) => tags.values.has(tag)),
            )
        }
        return tools
    }, [
        query,
        groups.values,
        tags.values,
    ])

    function activateTool(tool: ToolDefinition) {
        if (isExternalTool(tool)) {
            window.open(tool.externalUrl, "_blank", "noopener,noreferrer")
        } else {
            navigate({
                to: "/tools/$toolId",
                params: {
                    toolId: tool.id,
                },
            })
        }
    }

    const hasActiveFilters = groups.values.size > 0 || tags.values.size > 0

    const PAGE_SIZE = 20
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

    const visibleTools = filteredTools.slice(0, visibleCount)
    const remaining = filteredTools.length - visibleTools.length

    function resetVisibleCount() {
        setVisibleCount(PAGE_SIZE)
    }

    return (
        <div
            className={css({
                width: "100%",
                display: "flex",
                flexDirection: "column",
            })}
        >
            <Collapsible
                header={({ isOpen, toggle }) => (
                    <div
                        className={css({
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: "0.5rem",
                        })}
                    >
                        <div
                            className={css({
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                gap: "0.75rem",
                                flex: 1,
                                minWidth: 0,
                                padding: "0.75rem 1rem",
                                borderRadius: "0.75rem",
                                borderWidth: "1px",
                                borderStyle: "solid",
                                borderColor: "neutral/25",
                                backgroundColor: "white",
                                boxShadow: "sm",
                            })}
                        >
                            <IconSearch
                                size={22}
                                className={css({
                                    stroke: "neutral/50",
                                    flexShrink: 0,
                                })}
                            />
                            <input
                                type="search"
                                value={query}
                                onChange={(event) => {
                                    setQuery(event.currentTarget.value)
                                    resetVisibleCount()
                                }}
                                placeholder="Search tools by name, tag, or category..."
                                aria-label="Search tools"
                                className={css({
                                    flex: 1,
                                    minWidth: 0,
                                    fontSize: "1rem",
                                    backgroundColor: "transparent",
                                    borderWidth: "0",
                                    outline: "none",
                                    _placeholder: {
                                        color: "neutral/40",
                                    },
                                })}
                            />
                        </div>
                        <Button
                            type="button"
                            onClick={toggle}
                            aria-expanded={isOpen}
                            aria-label="Toggle filters"
                            title="Toggle filters"
                            className={css({
                                alignItems: "center",
                                gap: "0.375rem",
                                padding: "0.75rem 1rem",
                                borderRadius: "0.75rem",
                                borderWidth: "1px",
                                borderStyle: "solid",
                                borderColor: "neutral/25",
                                backgroundColor: "white",
                                boxShadow: "sm",
                                fontSize: "0.8125rem",
                                fontWeight: "500",
                                color: "neutral",
                                cursor: "pointer",
                                flexShrink: 0,
                                transition: "all",
                                transitionDuration: "150ms",
                                _hover: {
                                    backgroundColor: "neutral/5",
                                    borderColor: "neutral/30",
                                },
                            })}
                        >
                            <ButtonContent
                                rightIcon={
                                    <IconChevronDown
                                        size={16}
                                        className={css({
                                            stroke: "neutral/60",
                                            transition: "transform 150ms",
                                            transform: isOpen
                                                ? "rotate(180deg)"
                                                : "rotate(0deg)",
                                        })}
                                    />
                                }
                                text="Filters"
                            />
                        </Button>
                    </div>
                )}
            >
                <div
                    className={css({
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "start",
                        alignItems: "stretch",
                        gap: "0.5rem",
                        padding: "1rem",
                        borderRadius: "0.5rem",
                        borderWidth: "1px",
                        borderStyle: "solid",
                        borderColor: "neutral/10",
                        backgroundColor: "white",
                    })}
                >
                    <div
                        className={css({
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.5rem",
                        })}
                    >
                        <div
                            className={css({
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                gap: "0.5rem",
                            })}
                        >
                            <span
                                className={css({
                                    fontSize: "0.75rem",
                                    fontWeight: "600",
                                    color: "neutral/40",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.05em",
                                })}
                            >
                                Groups
                            </span>
                            {hasActiveFilters && (
                                <Button
                                    type="button"
                                    onClick={() => {
                                        groups.clear()
                                        tags.clear()
                                        resetVisibleCount()
                                    }}
                                    title="Clear filters"
                                    className={css({
                                        fontSize: "0.75rem",
                                        color: "primary",
                                        _hover: {
                                            textDecoration: "underline",
                                        },
                                    })}
                                >
                                    <ButtonContent>Clear filters</ButtonContent>
                                </Button>
                            )}
                        </div>
                        <div
                            className={css({
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                gap: "0.5rem",
                                flexWrap: "wrap",
                            })}
                        >
                            {allGroups.map((group) => (
                                <FilterChip
                                    key={group}
                                    label={group}
                                    isActive={groups.values.has(group)}
                                    onClick={() => {
                                        groups.toggle(group)
                                        resetVisibleCount()
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    <div
                        className={css({
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.5rem",
                        })}
                    >
                        <span
                            className={css({
                                fontSize: "0.75rem",
                                fontWeight: "600",
                                color: "neutral/40",
                                textTransform: "uppercase",
                                letterSpacing: "0.05em",
                            })}
                        >
                            Tags
                        </span>
                        <div
                            className={css({
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                gap: "0.5rem",
                                flexWrap: "wrap",
                            })}
                        >
                            {allTags.map((tag) => (
                                <FilterChip
                                    key={tag}
                                    label={tag}
                                    isActive={tags.values.has(tag)}
                                    onClick={() => {
                                        tags.toggle(tag)
                                        resetVisibleCount()
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </Collapsible>

            <div
                className={css({
                    display: "flex",
                    flexDirection: "column",
                    padding: "1rem",
                    gap: "0.5rem",
                    borderTop: "1px solid",
                    borderTopColor: "neutral/5",
                })}
            >
                <div
                    className={css({
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                    })}
                >
                    <span
                        className={css({
                            fontSize: "0.875rem",
                            fontWeight: "600",
                            color: "neutral",
                        })}
                    >
                        {filteredTools.length} tool
                        {filteredTools.length === 1 ? "" : "s"}
                    </span>
                </div>

                {filteredTools.length === 0 ? (
                    <div
                        className={css({
                            padding: "2rem",
                            textAlign: "center",
                            fontSize: "0.9375rem",
                            color: "neutral/50",
                            borderWidth: "1px",
                            borderStyle: "dashed",
                            borderColor: "neutral/20",
                            borderRadius: "0.5rem",
                        })}
                    >
                        No tools match your search.
                    </div>
                ) : (
                    <>
                        <div
                            className={css({
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "start",
                                alignItems: "stretch",
                                gap: "0.5rem",
                            })}
                        >
                            {visibleTools.map((tool) => (
                                <ToolListItem
                                    key={tool.id}
                                    tool={tool}
                                    onActivate={() => activateTool(tool)}
                                />
                            ))}
                        </div>

                        {remaining > 0 && (
                            <div
                                className={css({
                                    display: "flex",
                                    justifyContent: "center",
                                })}
                            >
                                <Button
                                    type="button"
                                    onClick={() =>
                                        setVisibleCount(
                                            visibleCount + PAGE_SIZE,
                                        )
                                    }
                                    className={css({
                                        paddingX: "1rem",
                                        paddingY: "0.5rem",
                                        borderRadius: "0.5rem",
                                        borderWidth: "1px",
                                        borderStyle: "solid",
                                        borderColor: "neutral/20",
                                        color: "neutral",
                                        backgroundColor: "transparent",
                                        cursor: "pointer",
                                        _hover: {
                                            backgroundColor: "neutral/5",
                                            borderColor: "neutral/30",
                                        },
                                    })}
                                >
                                    <ButtonContent>
                                        Load more ({remaining})
                                    </ButtonContent>
                                </Button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}
