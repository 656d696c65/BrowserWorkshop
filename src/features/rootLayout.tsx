import { IconMenu2 } from "@tabler/icons-react"
import { Outlet } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import { css } from "@/styled-system/css"
import { Button } from "../components/button/button"
import { ButtonContent } from "../components/button/buttonContent"
import { ToolsSidebar } from "./toolsSidebar"

const MOBILE_QUERY = "(max-width: 767px)"

export function RootLayout() {
    const [isMobile, setIsMobile] = useState(() =>
        typeof window === "undefined"
            ? false
            : window.matchMedia(MOBILE_QUERY).matches,
    )
    const [isSidebarOpen, setIsSidebarOpen] = useState(() =>
        typeof window === "undefined"
            ? true
            : !window.matchMedia(MOBILE_QUERY).matches,
    )

    useEffect(() => {
        const mediaQuery = window.matchMedia(MOBILE_QUERY)
        function handleChange(event: MediaQueryListEvent) {
            setIsMobile(event.matches)
            if (event.matches) {
                setIsSidebarOpen(false)
            }
        }
        mediaQuery.addEventListener("change", handleChange)
        return () => mediaQuery.removeEventListener("change", handleChange)
    }, [])

    function toggleSidebar() {
        setIsSidebarOpen((open) => !open)
    }

    function closeSidebar() {
        setIsSidebarOpen(false)
    }

    const showToggle = !isSidebarOpen

    return (
        <div
            className={css({
                position: "relative",
                display: "flex",
                flexDirection: "row",
                width: "100%",
                height: "100dvh",
                overflow: "hidden",
            })}
        >
            {isMobile && isSidebarOpen && (
                // biome-ignore lint/a11y: backdrop overlay for the mobile sidebar
                <div
                    onClick={closeSidebar}
                    className={css({
                        position: "fixed",
                        inset: 0,
                        zIndex: 20,
                        backgroundColor: "neutral/25",
                    })}
                />
            )}
            <ToolsSidebar
                isOpen={isSidebarOpen}
                isMobile={isMobile}
                onClose={closeSidebar}
            />
            <div
                className={css({
                    position: "relative",
                    flex: 1,
                    minWidth: 0,
                    height: "100%",
                })}
            >
                {showToggle && (
                    <div
                        className={css({
                            position: "absolute",
                            top: "0.75rem",
                            left: "0.75rem",
                            zIndex: 10,
                        })}
                    >
                        <Button
                            onClick={toggleSidebar}
                            title="Toggle sidebar"
                            aria-label="Toggle sidebar"
                            aria-expanded={isSidebarOpen}
                            className={css({
                                padding: "0.375rem",
                                borderRadius: "0.375rem",
                                _hover: {
                                    backgroundColor: "neutral/5",
                                },
                            })}
                        >
                            <ButtonContent leftIcon={<IconMenu2 />} />
                        </Button>
                    </div>
                )}
                <div
                    className={css({
                        height: "100%",
                        padding: isSidebarOpen ? "2rem" : "4rem 2rem 2rem",
                        overflowY: "auto",
                    })}
                >
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
