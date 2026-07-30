import {
    IconArrowsLeftRight,
    IconBrandGithub,
    IconCoin,
    IconHeart,
    IconTool,
} from "@tabler/icons-react"
import { Link } from "@tanstack/react-router"
import { css } from "../../../styled-system/css/css"

const linkCard = css({
    display: "flex",
    flexDirection: "row",
    justifyContent: "start",
    alignItems: "center",
    gap: "1rem",
    padding: "1rem",
    borderRadius: "0.5rem",
    borderWidth: "1px",
    borderColor: "neutral/10",
    textDecoration: "none",
    color: "neutral",
    transition: "all 0.15s",
    _hover: {
        borderColor: "primary",
        backgroundColor: "primary/5",
    },
})

const iconWrap = css({
    width: "2rem",
    height: "2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    color: "primary",
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
                    flexDirection:
                        "column",
                    gap: "0.5rem",
                })}
            >
                <div
                    className={css({
                        display: "flex",
                        flexDirection:
                            "row",
                        justifyContent:
                            "start",
                        alignItems:
                            "center",
                        gap: "0.75rem",
                    })}
                >
                    <span
                        className={css({
                            width: "2.5rem",
                            height: "2.5rem",
                            display:
                                "flex",
                            alignItems:
                                "center",
                            justifyContent:
                                "center",
                            color: "primary",
                        })}
                    >
                        <IconTool
                            size={32}
                        />
                    </span>
                    <h1
                        className={css({
                            fontSize:
                                "1.5rem",
                            fontWeight:
                                "700",
                            color: "neutral",
                            margin: 0,
                        })}
                    >
                        BrowserWorkshop
                    </h1>
                </div>
                <p
                    className={css({
                        fontSize:
                            "0.875rem",
                        color: "neutral/60",
                        lineHeight:
                            "1.5",
                        margin: 0,
                    })}
                >
                    A growing collection
                    of handy
                    browser-based tools
                    for everyday tasks.
                    No ads, no tracking,
                    no server uploads —
                    everything runs
                    locally in your
                    browser.
                </p>
            </div>

            <div
                className={css({
                    display: "flex",
                    flexDirection:
                        "column",
                    gap: "0.75rem",
                })}
            >
                <h2
                    className={css({
                        fontSize:
                            "1rem",
                        fontWeight:
                            "600",
                        color: "neutral",
                        margin: 0,
                    })}
                >
                    Tools
                </h2>

                <Link
                    to="/tools/conversion/length"
                    className={linkCard}
                >
                    <span
                        className={
                            iconWrap
                        }
                    >
                        <IconArrowsLeftRight />
                    </span>
                    <div
                        className={css({
                            display:
                                "flex",
                            flexDirection:
                                "column",
                            gap: "0.125rem",
                        })}
                    >
                        <span
                            className={css(
                                {
                                    fontSize:
                                        "0.875rem",
                                    fontWeight:
                                        "600",
                                },
                            )}
                        >
                            Conversion
                        </span>
                        <span
                            className={css(
                                {
                                    fontSize:
                                        "0.75rem",
                                    color: "neutral/50",
                                },
                            )}
                        >
                            Length ·
                            Weight ·
                            Currency
                        </span>
                    </div>
                    <span
                        className={css({
                            marginLeft:
                                "auto",
                            fontSize:
                                "0.75rem",
                            color: "neutral/40",
                        })}
                    >
                        <IconCoin
                            size={16}
                        />
                    </span>
                </Link>
            </div>

            <div
                className={css({
                    display: "flex",
                    flexDirection:
                        "row",
                    justifyContent:
                        "start",
                    alignItems:
                        "center",
                    gap: "0.75rem",
                    flexWrap: "wrap",
                })}
            >
                <a
                    href="https://github.com/barbote/BrowserWorkshop"
                    target="_blank"
                    rel="noreferrer"
                    className={css({
                        display: "flex",
                        flexDirection:
                            "row",
                        justifyContent:
                            "center",
                        alignItems:
                            "center",
                        gap: "0.5rem",
                        padding:
                            "0.5rem 1rem",
                        borderRadius:
                            "0.375rem",
                        borderWidth:
                            "1px",
                        borderColor:
                            "neutral/20",
                        fontSize:
                            "0.875rem",
                        color: "neutral",
                        textDecoration:
                            "none",
                        _hover: {
                            backgroundColor:
                                "neutral/5",
                        },
                    })}
                >
                    <IconBrandGithub
                        size={18}
                    />
                    GitHub
                </a>
                <a
                    href="https://github.com/sponsors/barbote"
                    target="_blank"
                    rel="noreferrer"
                    className={css({
                        display: "flex",
                        flexDirection:
                            "row",
                        justifyContent:
                            "center",
                        alignItems:
                            "center",
                        gap: "0.5rem",
                        padding:
                            "0.5rem 1rem",
                        borderRadius:
                            "0.375rem",
                        borderWidth:
                            "1px",
                        borderColor:
                            "neutral/20",
                        fontSize:
                            "0.875rem",
                        color: "neutral",
                        textDecoration:
                            "none",
                        _hover: {
                            backgroundColor:
                                "neutral/5",
                        },
                    })}
                >
                    <IconHeart
                        size={18}
                    />
                    Donate
                </a>
            </div>
        </div>
    )
}
