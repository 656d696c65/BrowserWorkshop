import { css } from "@browserworkshop/shared/styled-system/css"

export function SectionTitle(props: { children: string }) {
    return (
        <h1
            className={css({
                width: "fit-content",
                fontSize: "1.25rem",
                fontWeight: 400,
                lineHeight: "none",
                color: "neutral/75",
            })}
        >
            {props.children}
        </h1>
    )
}
