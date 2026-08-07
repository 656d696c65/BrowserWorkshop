import { css } from "@/styled-system/css"

export function PageTitle(props: { children: string }) {
    return (
        <h1
            className={css({
                width: "fit-content",
                fontSize: "1.5rem",
                fontWeight: 500,
                lineHeight: 1,
            })}
        >
            {props.children}
        </h1>
    )
}
