import { css } from "../../../../styled-system/css"

export function DataViewerLabel(props: { label: string; description?: string }) {
    return (
        <div
            className={css({
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "start",
                gap: "0.125rem",
            })}
        >
            <span
                className={css({
                    fontSize: "1rem",
                    color: "neutral/75",
                })}
            >
                {props.label}
            </span>
            {props.description !== undefined ? (
                <span
                    className={css({
                        fontSize: "0.75rem",
                        color: "neutral/50",
                    })}
                >
                    {props.description}
                </span>
            ) : null}
        </div>
    )
}
