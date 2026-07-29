import {
    IconAlertHexagon,
    IconAlertTriangle,
    IconBulb,
    IconInfoCircle,
    IconMessageExclamation,
} from "@tabler/icons-react"
import type { ReactElement } from "react"
import { sva } from "../../../styled-system/css"

export default function Alert(props: {
    type: "note" | "tip" | "important" | "warning" | "caution"
    children: ReactElement
}) {
    const Icon = {
        note: IconInfoCircle,
        tip: IconBulb,
        important: IconMessageExclamation,
        warning: IconAlertTriangle,
        caution: IconAlertHexagon,
    }[props.type]

    const text = {
        note: "Note",
        tip: "Tip",
        important: "Important",
        warning: "Warning",
        caution: "Caution",
    }[props.type]

    const alertRecipe = sva({
        slots: ["container", "header", "icon", "title", "body"],
        base: {
            container: {
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "start",
                borderRadius: "0.5rem",
                borderWidth: "1px",
                borderLeftWidth: "4px",
                borderStyle: "solid",
            },
            header: {
                width: "100%",
                display: "flex",
                justifyContent: "start",
                alignItems: "start",
                gap: "0.5rem",
                borderBottomWidth: "1px",
                padding: "1rem",
            },
            icon: {
                strokeWidth: "1.5px",
            },
            title: {
                fontWeight: "normal",
            },
            body: {
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "start",
                padding: "1rem",
            },
        },
        variants: {
            type: {
                note: {
                    container: {
                        borderColor: "blue/25",
                        borderLeftColor: "blue/75",
                    },
                    header: {
                        backgroundColor: "blue/5",
                        borderBottomColor: "blue/25",
                    },
                    icon: {
                        stroke: "blue",
                    },
                    title: {
                        color: "blue",
                    },
                },
                tip: {
                    container: {
                        borderColor: "green/25",
                        borderLeftColor: "green/75",
                    },
                    header: {
                        backgroundColor: "green/5",
                        borderBottomColor: "green/25",
                    },
                    icon: {
                        stroke: "green",
                    },
                    title: {
                        color: "green",
                    },
                },
                important: {
                    container: {
                        borderColor: "purple/25",
                        borderLeftColor: "purple/75",
                    },
                    header: {
                        backgroundColor: "purple/5",
                        borderBottomColor: "purple/25",
                    },
                    icon: {
                        stroke: "purple",
                    },
                    title: {
                        color: "purple",
                    },
                },
                warning: {
                    container: {
                        borderColor: "orange/25",
                        borderLeftColor: "orange/75",
                    },
                    header: {
                        backgroundColor: "orange/5",
                        borderBottomColor: "orange/25",
                    },
                    icon: {
                        stroke: "orange",
                    },
                    title: {
                        color: "orange",
                    },
                },
                caution: {
                    container: {
                        borderColor: "red/25",
                        borderLeftColor: "red/75",
                    },
                    header: {
                        backgroundColor: "red/5",
                        borderBottomColor: "red/25",
                    },
                    icon: {
                        stroke: "red",
                    },
                    title: {
                        color: "red",
                    },
                },
            },
        },
    })

    const alertSlots = alertRecipe({
        type: props.type,
    })

    return (
        <div className={alertSlots.container}>
            <div className={alertSlots.header}>
                <Icon size={24} className={alertSlots.icon} />
                <span className={alertSlots.title}>{text}</span>
            </div>
            <div className={alertSlots.body}>{props.children}</div>
        </div>
    )
}
