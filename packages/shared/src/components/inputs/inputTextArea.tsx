import type { InputHTMLAttributes } from "react"
import type { FieldError } from "react-hook-form"
import { css, type Styles } from "@browserworkshop/shared/styled-system/css"

export function InputTextArea(
    props: Omit<
        InputHTMLAttributes<HTMLTextAreaElement>,
        "className" | "value" | "onChange"
    > & {
        value?: string | null
        onChange?: (value?: string | null | undefined) => void
        error?: FieldError
        className?: Styles
    },
) {
    function input(value: string | undefined | null) {
        if (value === null) return ""
        if (value === undefined) return ""
        return value
    }

    function output(value: string) {
        if (value === "") return null
        return value
    }

    return (
        <div
            className={css(
                {
                    width: "100%",
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "start",
                    borderStyle: "solid",
                    borderWidth: "1px",
                    borderColor: "neutral/25",
                    borderRadius: "0.25rem",
                    _focusWithin: {
                        borderColor: "neutral/50",
                        outlineStyle: "solid",
                        outlineWidth: "1px",
                        outlineOffset: "0px",
                        outlineColor: "neutral/10",
                    },
                },
                props.error === undefined
                    ? undefined
                    : {
                          borderColor: "red",
                      },
                props.className,
            )}
        >
            <textarea
                {...props}
                className={css({
                    width: "100%",
                    minHeight: "6rem",
                    fontSize: "1rem",
                    lineHeight: "1rem",
                    backgroundColor: "transparent",
                    padding: "0.5rem",
                    borderRadius: "inherit",
                    _placeholder: {
                        color: "neutral/25",
                    },
                    _focus: {
                        outline: "none",
                    },
                })}
                value={input(props.value)}
                onChange={(e) => {
                    if (props.onChange === undefined) return
                    props.onChange(output(e.currentTarget.value))
                }}
            />
        </div>
    )
}
