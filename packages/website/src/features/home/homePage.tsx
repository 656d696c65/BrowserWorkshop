import { css } from "../../../styled-system/css/css"

export function HomePage() {
    return (
        <div
            className={css({
                width: "100%",
                minHeight:
                    "fit-content",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "stretch",
                backgroundColor:
                    "background",
            })}
        >
            <span>home</span>
        </div>
    )
}
