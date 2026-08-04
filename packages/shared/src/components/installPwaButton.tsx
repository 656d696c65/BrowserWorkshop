import { IconDeviceMobile } from "@tabler/icons-react"
import { useEffect, useState } from "react"
import { css, cx } from "../../styled-system/css"
import { Button } from "./button/button"
import { ButtonContent } from "./button/buttonContent"

interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>
    userChoice: Promise<{
        outcome: "accepted" | "dismissed"
    }>
}

export function InstallPwaButton(props: { className?: string }) {
    const [deferredPrompt, setDeferredPrompt] =
        useState<BeforeInstallPromptEvent | null>(null)
    const [isInstalled, setIsInstalled] = useState(false)
    const [showHint, setShowHint] = useState(false)

    useEffect(() => {
        function onBeforeInstallPrompt(event: Event) {
            event.preventDefault()
            const promptEvent = event as BeforeInstallPromptEvent
            setDeferredPrompt(promptEvent)
        }

        function onAppInstalled() {
            setIsInstalled(true)
            setDeferredPrompt(null)
        }

        window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt)
        window.addEventListener("appinstalled", onAppInstalled)

        return () => {
            window.removeEventListener(
                "beforeinstallprompt",
                onBeforeInstallPrompt,
            )
            window.removeEventListener("appinstalled", onAppInstalled)
        }
    }, [])

    async function handleInstall() {
        if (deferredPrompt === null) {
            setShowHint(true)
            return
        }
        await deferredPrompt.prompt()
        const choice = await deferredPrompt.userChoice
        if (choice.outcome === "accepted") {
            setDeferredPrompt(null)
            setIsInstalled(true)
        }
    }

    if (isInstalled) {
        return null
    }
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.25rem",
            }}
        >
            <Button
                onClick={handleInstall}
                className={cx(
                    css({
                        padding: "0.5rem 1rem",
                        borderRadius: "0.375rem",
                        borderWidth: "1px",
                        borderColor: "neutral/20",
                        fontSize: "0.875rem",
                        fontWeight: "600",
                        color: "neutral",
                        backgroundColor: "white",
                        cursor: "pointer",
                        _hover: {
                            backgroundColor: "neutral/5",
                        },
                    }),
                    props.className,
                )}
            >
                <ButtonContent>
                    <IconDeviceMobile size={18} />
                    Install app
                </ButtonContent>
            </Button>
            {showHint && (
                <span
                    className={css({
                        fontSize: "0.75rem",
                        color: "neutral/60",
                        lineHeight: "1.5",
                    })}
                >
                    Use your browser menu to add this page to your home screen.
                </span>
            )}
        </div>
    )
}
