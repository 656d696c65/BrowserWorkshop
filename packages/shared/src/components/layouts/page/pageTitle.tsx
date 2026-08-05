import { css } from "@browserworkshop/shared/styled-system/css"

export function PageTitle(props: { children: string }) {
    return (
        <h1
            className={css({
                width: "fit-content",
                fontSize: "2rem",
                fontWeight: 500,
                lineHeight: "none",
            })}
        >
            {props.children}
        </h1>
    )
}
