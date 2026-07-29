import { IconSelector } from "@tabler/icons-react"
import { type ComponentProps, type InputHTMLAttributes } from "react"
import type { FieldError } from "react-hook-form"
import { css, type Styles } from "../../../styled-system/css"
import { ButtonGhostContent } from "../button"
import { FormatNull } from "../formatNull"
import { Popover } from "../layouts/popover"

export function InputSelect<TValue extends string>(
    props: Omit<InputHTMLAttributes<HTMLSelectElement>, "className" | "value" | "onChange"> & {
        value?: TValue | null
        defaultValue?: TValue | null
        onChange?: (value?: TValue | null | undefined) => void
        error?: FieldError
        options:
            | Array<{
                  key: TValue
                  label: string
              }>
            | undefined
        className?: Styles
        popoverProps?: ComponentProps<typeof Popover>
    },
) {
    function input(value: TValue | null | undefined) {
        return value
    }

    function _output(value: TValue | undefined | null) {
        if (value === null) return null
        if (value === undefined) return undefined
        return value
    }

    const currentOption = props.options?.find((x) => x.key === input(props.value ?? props.defaultValue))
    return (
        <Popover
            {...props.popoverProps}
            triggerElement={
                <button
                    type="button"
                    className={css(
                        {
                            width: "fit-content",
                            maxWidth: "100%",
                            cursor: "pointer",
                            minWidth: "fit-content",
                            height: "fit-content",
                        },
                        props.className,
                    )}
                >
                    <div
                        className={css({
                            width: "100%",
                            height: "auto",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "start",
                            alignItems: "start",
                            borderRadius: "0.25rem",
                            borderWidth: "1px",
                            borderColor: "neutral/25",
                            padding: "0.5rem",
                            gap: "0.5rem",
                            _hover: {
                                backgroundColor: "neutral/5",
                            },
                        })}
                    >
                        <div
                            className={css({
                                width: "100%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "start",
                                alignItems: "start",
                                gap: "0.25rem",
                            })}
                        >
                            <span
                                className={css(
                                    {
                                        fontSize: "1rem",
                                        fontWeight: "300",
                                        lineHeight: "1rem",
                                        whiteSpace: "nowrap",
                                        color: "neutral",
                                    },
                                    currentOption?.label === undefined
                                        ? {
                                              color: "neutral/25",
                                              fontStyle: "italic",
                                          }
                                        : undefined,
                                )}
                            >
                                {currentOption?.label ?? props.placeholder ?? "No option selected"}
                            </span>
                        </div>
                        <div>
                            <IconSelector
                                className={css({
                                    strokeWidth: "1.5px",
                                    minWidth: "1rem",
                                    width: "1rem",
                                    minHeight: "1rem",
                                    height: "1rem",
                                    color: "neutral",
                                })}
                            />
                        </div>
                    </div>
                </button>
            }
            position="bottom"
        >
            {(context) => {
                return (
                    <div
                        className={css({
                            width: "100%",
                            maxHeight: "16rem",
                            overflow: "auto",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "start",
                            alignItems: "start",
                        })}
                    >
                        {props.options === undefined ? (
                            <FormatNull text="No available options" />
                        ) : props.options.length === 0 ? (
                            <FormatNull
                                text="No available options"
                                className={{
                                    padding: "0.5rem",
                                }}
                            />
                        ) : (
                            props.options.map((option) => {
                                const isSelected = props.value === option.key
                                return (
                                    <button
                                        type="button"
                                        key={option.key}
                                        onClick={(event) => {
                                            event.preventDefault()

                                            if (props.onChange === undefined) {
                                                return
                                            }

                                            if (isSelected === true) {
                                                props.onChange(null)
                                            } else {
                                                props.onChange(option.key)
                                            }

                                            context.setIsOpen(false)
                                        }}
                                        className={css({
                                            width: "100%",
                                        })}
                                    >
                                        <ButtonGhostContent
                                            key={option.key}
                                            text={option.label}
                                            className={css({
                                                width: "100%",
                                            })}
                                        />
                                    </button>
                                )
                            })
                        )}
                    </div>
                )
            }}
        </Popover>
    )
}
