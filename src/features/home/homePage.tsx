import {
    IconAdOff,
    IconBolt,
    IconBrandGithub,
    IconBrandX,
    IconGift,
    IconHeart,
    IconSearch,
    IconShieldCheck,
    IconTrendingUp,
    IconWifiOff,
} from "@tabler/icons-react"
import { useNavigate } from "@tanstack/react-router"
import { Button } from "@/components/button/button"
import { ButtonContent } from "@/components/button/buttonContent"
import { Page } from "@/components/layouts/page/page"
import { Section } from "@/components/layouts/section"
import { css } from "@/styled-system/css"

interface ProsItem {
    icon: typeof IconShieldCheck
    title: string
    description: string
}

const prosItems: ProsItem[] = [
    {
        icon: IconShieldCheck,
        title: "100% local",
        description:
            "Everything runs in your browser — nothing is uploaded to a server.",
    },
    {
        icon: IconGift,
        title: "Free forever",
        description: "Open source, no accounts, no subscriptions, no paywalls.",
    },
    {
        icon: IconAdOff,
        title: "Ad-free",
        description: "No ads, no tracking. Just open and use.",
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
            "Installable as a PWA, so tools keep working without a connection (some tools might need a connection).",
    },
    {
        icon: IconTrendingUp,
        title: "Always growing",
        description: "New tools are added regularly to cover everyday tasks.",
    },
]

export default function HomePage() {
    const navigate = useNavigate()

    return (
        <Page.Root>
            <Page.Header>
                <Page.Title>BrowserWorkshop</Page.Title>
                <Page.Description>
                    A growing collection of handy browser-based tools for
                    everyday tasks. No ads, no tracking, no server uploads —
                    everything runs locally in your browser.
                </Page.Description>
                <Button
                    type="button"
                    onClick={() =>
                        navigate({
                            to: "/search",
                        })
                    }
                    title="Search tools"
                    className={css({
                        width: "100%",
                    })}
                >
                    <ButtonContent
                        variant="plain"
                        leftIcon={<IconSearch />}
                        text="Search tools"
                    />
                </Button>
            </Page.Header>
            <Page.Body>
                <Section
                    className={css({
                        padding: 0,
                        gap: 0,
                    })}
                >
                    {prosItems.map((item) => {
                        const Icon = item.icon
                        return (
                            <div
                                key={item.title}
                                className={css({
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "start",
                                    alignItems: "start",
                                    gap: "0.5rem",
                                    padding: "1rem",
                                    borderTopWidth: "1px",
                                    borderTopColor: "neutral/5",
                                    _first: {
                                        border: "none",
                                    },
                                })}
                            >
                                <div
                                    className={css({
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "start",
                                        alignItems: "center",
                                        gap: "0.5rem",
                                    })}
                                >
                                    <Icon size={20} />
                                    <span
                                        className={css({
                                            fontSize: "0.875rem",
                                            fontWeight: "500",
                                        })}
                                    >
                                        {item.title}
                                    </span>
                                </div>
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
                </Section>

                <Section>
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
                        href="https://github.com/656d696c65/BrowserWorkshop"
                        target="_blank"
                        rel="noreferrer"
                        title="GitHub"
                        className={css({
                            textDecoration: "none",
                        })}
                    >
                        <ButtonContent
                            leftIcon={<IconBrandGithub />}
                            text="GitHub"
                        />
                    </a>
                </Section>

                <Section>
                    <span
                        className={css({
                            fontSize: "0.875rem",
                            fontWeight: "600",
                        })}
                    >
                        Follow us on X
                    </span>
                    <span
                        className={css({
                            fontSize: "0.75rem",
                            color: "neutral/60",
                            lineHeight: "1.5",
                        })}
                    >
                        Get updates, announcements, and new tool releases
                        directly in your feed.
                    </span>
                    <a
                        href="https://x.com/BrowserWorkshop"
                        target="_blank"
                        rel="noreferrer"
                        title="Follow us on X"
                        className={css({
                            textDecoration: "none",
                        })}
                    >
                        <ButtonContent
                            leftIcon={<IconBrandX />}
                            text="Twitter / X"
                        />
                    </a>
                </Section>

                <Section>
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
                        title="Donate"
                        className={css({
                            textDecoration: "none",
                        })}
                    >
                        <ButtonContent leftIcon={<IconHeart />} text="Donate" />
                    </a>
                </Section>
            </Page.Body>
        </Page.Root>
    )
}
