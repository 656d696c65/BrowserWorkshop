import { css } from "../../../styled-system/css"

export function Beta() {
    return (
        <div
            className={css({
                width: "fit-content",
                height: "fit-content",
                backgroundColor: "green/5",
                paddingY: "0.25rem",
                paddingX: "0.25rem",
                borderRadius: "0.25rem",
            })}
        >
            <span
                className={css({
                    display: "block",
                    color: "green/75",
                    fontSize: "0.75rem",
                    lineHeight: "none",
                })}
            >
                beta
            </span>
        </div>
    )
}
