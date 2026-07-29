import type { InputHTMLAttributes, JSX } from "react"
import type { FieldError } from "react-hook-form"
import { css, type Styles } from "../../../styled-system/css"
import { ButtonGhostContent } from "../button"

export function InputToggle<TValue extends string | boolean>(
    props: Omit<InputHTMLAttributes<HTMLInputElement>, "className" | "value" | "onChange"> & {
        value: TValue | null | undefined
        onChange: (value: TValue | null | undefined) => void
        options: Array<{
            icon?: JSX.Element
            label?: string
            value: TValue
        }>
        error?: FieldError
        className?: Styles
    },
) {
    return (
        <div
            className={css(
                {
                    width: "fit-content",
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                    gap: "0.25rem",
                    // borderStyle: "solid",
                    // borderWidth: "1px",
                    // borderColor: "neutral/25",
                    borderRadius: "0.25rem",
                    backgroundColor: "neutral/5",
                    padding: "0.25rem",
                },
                props.error === undefined
                    ? undefined
                    : {
                          borderColor: "red",
                      },
                props.className,
            )}
        >
            {props.options.map((option, _index) => {
                const isSelected = props.value === option.value
                return (
                    <button
                        type="button"
                        key={option.value.toString()}
                        onClick={() => {
                            if (isSelected === true) {
                                props.onChange(null)
                                return
                            }
                            props.onChange(option.value)
                        }}
                        className={css({})}
                    >
                        <ButtonGhostContent
                            className={css(
                                {
                                    animationDuration: "200ms",
                                    animationTimingFunction: "ease-in-out",
                                    backgroundColor: "transparent",
                                },
                                isSelected === false
                                    ? undefined
                                    : {
                                          backgroundColor: "white",
                                          outlineStyle: "solid",
                                          outlineWidth: "1px",
                                          outlineOffset: "-1px",
                                          outlineColor: "neutral/50",
                                      },
                            )}
                            text={option.label}
                            leftIcon={option.icon}
                        />
                    </button>
                )
            })}
        </div>
    )
}
