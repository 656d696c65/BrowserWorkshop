import { InstallPwaButton, Logo } from "@browserworkshop/shared"
import {
    IconBolt,
    IconBrandGithub,
    IconGift,
    IconHeart,
    IconShieldCheck,
    IconSparkles,
    IconUserOff,
    IconWifiOff,
} from "@tabler/icons-react"
import { css, cx } from "../../../styled-system/css"

interface ProsItem {
    icon: typeof IconShieldCheck
    title: string
    description: string
}

const prosItems: ProsItem[] = [
    {
        icon: IconShieldCheck,
        title: "100% Private",
        description:
            "Everything runs in your browser — nothing is uploaded to a server.",
    },
    {
        icon: IconGift,
        title: "Free forever",
        description: "Open source, no accounts, no subscriptions, no paywalls.",
    },
    {
        icon: IconUserOff,
        title: "No account",
        description: "No sign-up, no ads, no tracking. Just open and use.",
    },
    {
        icon: IconBolt,
        title: "Instant",
        description:
            "Results appear as you type — no waiting, no page reloads.",
    },
    {
        icon: IconWifiOff,
        title: "Works offline",
        description:
            "Installable as a PWA, so tools keep working without a connection.",
    },
    {
        icon: IconSparkles,
        title: "Always growing",
        description: "New tools are added regularly to cover everyday tasks.",
    },
]

const prosCard = css({
    display: "flex",
    flexDirection: "column",
    justifyContent: "start",
    alignItems: "start",
    gap: "0.5rem",
    padding: "1rem",
    borderRadius: "0.5rem",
    borderWidth: "1px",
    borderColor: "neutral/10",
})

const helpSection = css({
    display: "flex",
    flexDirection: "column",
    justifyContent: "start",
    alignItems: "start",
    gap: "0.75rem",
    padding: "1rem",
    borderRadius: "0.5rem",
    borderWidth: "1px",
    borderColor: "neutral/10",
})

const helpButton = css({
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.5rem 1rem",
    borderRadius: "0.375rem",
    borderWidth: "1px",
    borderColor: "neutral/20",
    fontSize: "0.875rem",
    fontWeight: "600",
    color: "neutral",
    textDecoration: "none",
    _hover: {
        backgroundColor: "neutral/5",
    },
})

export function HomePage() {
    return (
        <div
            className={css({
                width: "100%",
                maxWidth: "42rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "stretch",
                gap: "2rem",
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
                        justifyContent: "start",
                        alignItems: "center",
                        gap: "0.75rem",
                    })}
                >
                    <span
                        className={css({
                            width: "3rem",
                            height: "2.5rem",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        })}
                    >
                        <Logo
                            className={css({
                                height: "2.5rem",
                                width: "auto",
                            })}
                        />
                    </span>
                    <h1
                        className={css({
                            fontSize: "1.5rem",
                            fontWeight: "700",
                            color: "neutral",
                            margin: 0,
                        })}
                    >
                        BrowserWorkshop
                    </h1>
                </div>
                <p
                    className={css({
                        fontSize: "0.875rem",
                        color: "neutral/60",
                        lineHeight: "1.5",
                        margin: 0,
                    })}
                >
                    A growing collection of handy browser-based tools for
                    everyday tasks. No ads, no tracking, no server uploads —
                    everything runs locally in your browser.
                </p>
            </div>

            <div
                className={css({
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                })}
            >
                <h2
                    className={css({
                        fontSize: "1rem",
                        fontWeight: "600",
                        color: "neutral",
                        margin: 0,
                    })}
                >
                    Why BrowserWorkshop?
                </h2>
                <div
                    className={css({
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fill, minmax(11rem, 1fr))",
                        gap: "0.75rem",
                    })}
                >
                    {prosItems.map((item) => {
                        const Icon = item.icon
                        return (
                            <div key={item.title} className={prosCard}>
                                <span
                                    className={css({
                                        color: "primary",
                                        display: "flex",
                                    })}
                                >
                                    <Icon size={20} />
                                </span>
                                <span
                                    className={css({
                                        fontSize: "0.875rem",
                                        fontWeight: "600",
                                    })}
                                >
                                    {item.title}
                                </span>
                                <span
                                    className={css({
                                        fontSize: "0.75rem",
                                        color: "neutral/60",
                                        lineHeight: "1.4",
                                    })}
                                >
                                    {item.description}
                                </span>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div
                className={css({
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                })}
            >
                <div className={helpSection}>
                    <span
                        className={css({
                            fontSize: "0.875rem",
                            fontWeight: "600",
                        })}
                    >
                        Open source
                    </span>
                    <span
                        className={css({
                            fontSize: "0.75rem",
                            color: "neutral/60",
                            lineHeight: "1.5",
                        })}
                    >
                        BrowserWorkshop is open source and free to use. If you
                        want to help, you can report issues, suggest tools, or
                        contribute code on GitHub.
                    </span>
                    <a
                        href="https://github.com/barbote/BrowserWorkshop"
                        target="_blank"
                        rel="noreferrer"
                        className={helpButton}
                    >
                        <IconBrandGithub size={18} />
                        GitHub
                    </a>
                </div>

                <div
                    className={cx(
                        helpSection,
                        css({
                            display: {
                                base: "flex",
                                md: "none",
                            },
                        }),
                    )}
                >
                    <span
                        className={css({
                            fontSize: "0.875rem",
                            fontWeight: "600",
                        })}
                    >
                        Install the app
                    </span>
                    <span
                        className={css({
                            fontSize: "0.75rem",
                            color: "neutral/60",
                            lineHeight: "1.5",
                        })}
                    >
                        Add BrowserWorkshop to your home screen and use it
                        offline, just like a native app.
                    </span>
                    <InstallPwaButton />
                </div>

                <div className={helpSection}>
                    <span
                        className={css({
                            fontSize: "0.875rem",
                            fontWeight: "600",
                        })}
                    >
                        Support the project
                    </span>
                    <span
                        className={css({
                            fontSize: "0.75rem",
                            color: "neutral/60",
                            lineHeight: "1.5",
                        })}
                    >
                        BrowserWorkshop is built and maintained in spare time,
                        with no ads and no paywalls. A small donation goes a
                        long way in keeping it free for everyone.
                    </span>
                    <a
                        href="https://payment-links.mollie.com/payment/v7bX8uwdg4tsSLe5in8zJ"
                        target="_blank"
                        rel="noreferrer"
                        className={helpButton}
                    >
                        <IconHeart size={18} />
                        Donate
                    </a>
                </div>
            </div>
        </div>
    )
}
