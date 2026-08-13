import {
    IconBrandGithub,
    IconBrandX,
    IconHeartHandshake,
    IconSearch,
} from "@tabler/icons-react"
import { Link } from "@tanstack/react-router"
import {
    ButtonContent,
    type ButtonContentProps,
} from "@/components/button/buttonContent.js"
import { css } from "@/styled-system/css"
import { Logo } from "../components/layouts/logo.js"

function IconLink(props: {
    href: string
    title: string
    propsButtonContent: ButtonContentProps
}) {
    return (
        <a
            href={props.href}
            target="_blank"
            rel="noreferrer"
            title={props.title}
            aria-label={props.title}
        >
            <ButtonContent {...props.propsButtonContent} />
        </a>
    )
}

function IconNavLink(props: {
    to: string
    title: string
    propsButtonContent: ButtonContentProps
}) {
    return (
        <Link to={props.to} title={props.title} aria-label={props.title}>
            <ButtonContent {...props.propsButtonContent} />
        </Link>
    )
}

export function ToolsTopbar() {
    return (
        <header
            className={css({
                width: "100%",
                flexShrink: 0,
                borderBottomWidth: "1px",
                borderBottomColor: "neutral/10",
                backgroundColor: "white",
            })}
        >
            <div
                className={css({
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "1rem",
                    padding: "0.75rem 1rem",
                    maxWidth: "80rem",
                    marginX: "auto",
                })}
            >
                <div
                    className={css({
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: "0.75rem",
                        flexShrink: 0,
                    })}
                >
                    <Link
                        to="/"
                        title="Home"
                        aria-label="Home"
                        className={css({
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        })}
                    >
                        <Logo
                            className={css({
                                height: "1rem",
                                fill: "neutral",
                            })}
                        />
                    </Link>
                    <Link
                        to="/"
                        className={css({
                            display: "none",
                            md: {
                                display: "flex",
                            },
                            flexDirection: "row",
                            alignItems: "center",
                            gap: "0.375rem",
                            fontSize: "1rem",
                            fontWeight: "700",
                            color: "neutral",
                            textDecoration: "none",
                            _hover: {
                                textDecoration: "underline",
                            },
                        })}
                    >
                        BrowserWorkshop
                    </Link>
                    <span
                        className={css({
                            fontSize: "0.625rem",
                            fontWeight: "400",
                            color: "neutral/40",
                        })}
                    >
                        {__APP_VERSION__}
                    </span>
                </div>

                <div
                    className={css({
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: "0.25rem",
                        flexShrink: 0,
                    })}
                >
                    <IconNavLink
                        to="/search"
                        title="Search tools"
                        propsButtonContent={{
                            variant: "plain",
                            leftIcon: <IconSearch />,
                            text: "Search",
                        }}
                    />
                    <IconLink
                        href="https://github.com/656d696c65/BrowserWorkshop"
                        title="Contribute on Github"
                        propsButtonContent={{
                            leftIcon: <IconBrandGithub />,
                        }}
                    />
                    <IconLink
                        href="https://x.com/BrowserWorkshop"
                        title="Follow us on X"
                        propsButtonContent={{
                            leftIcon: <IconBrandX />,
                        }}
                    />
                    <IconLink
                        href="https://payment-links.mollie.com/payment/v7bX8uwdg4tsSLe5in8zJ"
                        title="Support the project"
                        propsButtonContent={{
                            leftIcon: <IconHeartHandshake />,
                        }}
                    />
                </div>
            </div>
        </header>
    )
}
