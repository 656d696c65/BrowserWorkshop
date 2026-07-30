import type { InputHTMLAttributes } from "react"
import {
    css,
    type Styles,
} from "../../../../website/styled-system/css"
import { useFormField } from "./useFormField"

export function FormError(
    props: InputHTMLAttributes<HTMLParagraphElement> & {
        className?: Styles
    },
) {
    const { error, formMessageId } =
        useFormField()
    const body = error
        ? String(error?.message)
        : props.children

    if (!body) return null
    return (
        <p
            {...props}
            id={formMessageId}
            className={css(
                {
                    width: "100%",
                    fontSize: "0.75rem",
                    color: "red",
                },
                props.className,
            )}
        >
            {body}
        </p>
    )
}
