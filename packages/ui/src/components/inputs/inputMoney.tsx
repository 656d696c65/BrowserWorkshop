import type { InputHTMLAttributes } from "react"
import type { FieldError } from "react-hook-form"
import { IMaskInput } from "react-imask"
import { css, type Styles } from "../../../styled-system/css"

export function InputMoney(
    props: Omit<InputHTMLAttributes<HTMLInputElement>, "className" | "value" | "onChange"> & {
        value?: number | null
        onChange?: (value?: number | null | undefined) => void
        error?: FieldError
        className?: Styles
    },
) {
    function input(value: number | undefined | null) {
        if (value === null) return ""
        if (value === undefined) return ""
        return (value / 100).toFixed(2)
    }

    function output(value: string | null) {
        if (value === null) return null
        return Math.round(Number(Number(value)) * 100)
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
            <IMaskInput
                // inputRef={props.ref}
                mask={Number}
                scale={2}
                thousandsSeparator=" "
                padFractionalZeros={false}
                normalizeZeros={true}
                radix="."
                mapToRadix={[".", ","]}
                lazy={false}
                overwrite={false}
                eager="append"
                unmask={"typed"}
                // onClick={(event) => { event.currentTarget.select() }}
                // onFocus={(event) => { event.currentTarget.setSelectionRange(-1, -1) }}
                onAccept={(value) => {
                    if (props.onChange === undefined) return
                    props.onChange(output(value))
                }}
                value={input(props.value)}
                className={css({
                    width: "100%",
                    height: "2rem",
                    fontSize: "1rem",
                    lineHeight: "1rem",
                    backgroundColor: "transparent",
                    paddingX: "0.5rem",
                    paddingY: "0.25rem",
                    borderRadius: "inherit",
                    _placeholder: {
                        color: "neutral/25",
                    },
                    _focus: {
                        outline: "none",
                    },
                })}
            />
        </div>
    )
}
