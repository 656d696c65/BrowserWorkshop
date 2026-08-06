import type { InputHTMLAttributes } from "react"
import type { FieldError } from "react-hook-form"
import { css, type Styles } from "@/styled-system/css"

export function InputText(
    props: Omit<
        InputHTMLAttributes<HTMLInputElement>,
        "className" | "value" | "onChange"
    > & {
        value?: string | null
        onChange?: (value?: string | null | undefined) => void
        error?: FieldError
        className?: Styles
    },
) {
    const { className, error, value, onChange, ...rest } = props

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
                    alignItems: "center",
                    borderStyle: "solid",
                    borderWidth: "1px",
                    borderColor: "neutral/20",
                    borderRadius: "0.375rem",
                    transition: "all 0.15s",
                    _focusWithin: {
                        borderColor: "primary",
                        outlineWidth: "2px",
                        outlineStyle: "solid",
                        outlineColor: "primary/20",
                        outlineOffset: "0px",
                    },
                },
                error === undefined
                    ? undefined
                    : {
                          borderColor: "red",
                      },
                className,
            )}
        >
            <input
                {...rest}
                className={css({
                    width: "100%",
                    height: "2.5rem",
                    fontSize: "0.875rem",
                    lineHeight: "1rem",
                    backgroundColor: "transparent",
                    paddingX: "0.75rem",
                    borderRadius: "inherit",
                    _placeholder: {
                        color: "neutral/40",
                    },
                    _focus: {
                        outline: "none",
                    },
                })}
                value={input(value)}
                onChange={(e) => {
                    if (onChange === undefined) return
                    onChange(output(e.currentTarget.value))
                }}
            />
        </div>
    )
}
