import { css } from "../../../../../website/styled-system/css"

export function PageDescription(props: { children: string }) {
    return (
        <span
            className={css({
                width: "fit-content",
                maxWidth: "66ch",
                fontSize: "1rem",
                lineHeight: "normal",
                color: "neutral/75",
            })}
        >
            {props.children}
        </span>
    )
}
