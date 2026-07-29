import { IconEye, IconEyeClosed } from "@tabler/icons-react"
import { type InputHTMLAttributes, useState } from "react"
import type { FieldError } from "react-hook-form"
import { css } from "../../../styled-system/css"

export function InputPassword(
    props: Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> & {
        value?: string | null
        onChange?: (value?: string | null | undefined) => void
        error?: FieldError
    },
) {
    const [showPassword, setShowPassword] = useState(false)

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
            )}
        >
            <input
                {...props}
                type={showPassword === true ? "text" : "password"}
                className={css({
                    width: "100%",
                    height: "2rem",
                    fontSize: "1rem",
                    lineHeight: "1rem",
                    backgroundColor: "transparent",
                    paddingX: "0.5rem",
                    paddingY: "0.25rem",
                    borderRadius: "0.25rem",
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
            <button
                type="button"
                onClick={() => {
                    setShowPassword(!showPassword)
                }}
                className={css({
                    borderRadius: "inherit",
                    padding: "0.25rem",
                    margin: "0.25rem",
                    _hover: {
                        backgroundColor: "neutral/5",
                    },
                })}
                tabIndex={-1}
            >
                {showPassword ? (
                    <IconEye
                        size={16}
                        className={css({
                            stroke: "neutral/50",
                        })}
                    />
                ) : (
                    <IconEyeClosed
                        size={16}
                        className={css({
                            stroke: "neutral/50",
                        })}
                    />
                )}
            </button>
        </div>
    )
}
