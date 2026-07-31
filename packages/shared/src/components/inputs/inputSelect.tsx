import {
    IconCheck,
    IconSelector,
} from "@tabler/icons-react"
import {
    type ComponentProps,
    type InputHTMLAttributes,
} from "react"
import type { FieldError } from "react-hook-form"
import {
    css,
    type Styles,
} from "../../../styled-system/css"
import { ButtonGhostContent } from "../button"
import { FormatNull } from "../formatNull"
import { Popover } from "../layouts/popover"

export function InputSelect<
    TValue extends string,
>(
    props: Omit<
        InputHTMLAttributes<HTMLSelectElement>,
        | "className"
        | "value"
        | "onChange"
    > & {
        value?: TValue | null
        defaultValue?: TValue | null
        onChange?: (
            value?:
                | TValue
                | null
                | undefined,
        ) => void
        error?: FieldError
        options:
            | Array<{
                  key: TValue
                  label: string
              }>
            | undefined
        className?: Styles
        popoverProps?: ComponentProps<
            typeof Popover
        >
    },
) {
    function input(
        value:
            | TValue
            | null
            | undefined,
    ) {
        return value
    }

    function _output(
        value:
            | TValue
            | undefined
            | null,
    ) {
        if (value === null) return null
        if (value === undefined)
            return undefined
        return value
    }

    const currentOption =
        props.options?.find(
            (x) =>
                x.key ===
                input(
                    props.value ??
                        props.defaultValue,
                ),
        )
    return (
        <Popover
            {...props.popoverProps}
            triggerElement={
                <button
                    type="button"
                    className={css(
                        {
                            width: "100%",
                            cursor: "pointer",
                        },
                        props.className,
                    )}
                >
                    <div
                        className={css({
                            width: "100%",
                            height: "2.5rem",
                            display:
                                "flex",
                            flexDirection:
                                "row",
                            justifyContent:
                                "start",
                            alignItems:
                                "center",
                            gap: "0.5rem",
                            paddingX:
                                "0.75rem",
                            borderRadius:
                                "0.375rem",
                            borderWidth:
                                "1px",
                            borderStyle:
                                "solid",
                            borderColor:
                                "neutral/20",
                            transition:
                                "all 0.15s",
                            _hover: {
                                borderColor:
                                    "primary",
                            },
                            _focusWithin:
                                {
                                    borderColor:
                                        "primary",
                                    outlineWidth:
                                        "2px",
                                    outlineStyle:
                                        "solid",
                                    outlineColor:
                                        "primary/20",
                                    outlineOffset:
                                        "0px",
                                },
                        })}
                    >
                        <span
                            className={css(
                                {
                                    flex: 1,
                                    minWidth: 0,
                                    overflow:
                                        "hidden",
                                    textOverflow:
                                        "ellipsis",
                                    whiteSpace:
                                        "nowrap",
                                    textAlign:
                                        "start",
                                    fontSize:
                                        "0.875rem",
                                    color: "neutral",
                                },
                                currentOption?.label ===
                                    undefined
                                    ? {
                                          color: "neutral/40",
                                          fontStyle:
                                              "italic",
                                      }
                                    : undefined,
                            )}
                        >
                            {currentOption?.label ??
                                props.placeholder ??
                                "No option selected"}
                        </span>
                        <span
                            className={css(
                                {
                                    display:
                                        "flex",
                                    alignItems:
                                        "center",
                                    justifyContent:
                                        "center",
                                    flexShrink: 0,
                                },
                            )}
                        >
                            <IconSelector
                                className={css(
                                    {
                                        strokeWidth:
                                            "1.5px",
                                        width: "1rem",
                                        height: "1rem",
                                        minWidth:
                                            "1rem",
                                        color: "neutral/50",
                                    },
                                )}
                            />
                        </span>
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
                            maxHeight:
                                "16rem",
                            overflow:
                                "auto",
                            display:
                                "flex",
                            flexDirection:
                                "column",
                            justifyContent:
                                "start",
                            alignItems:
                                "start",
                            gap: "0.125rem",
                            padding:
                                "0.25rem",
                        })}
                    >
                        {props.options ===
                        undefined ? (
                            <FormatNull text="No available options" />
                        ) : props
                              .options
                              .length ===
                          0 ? (
                            <FormatNull
                                text="No available options"
                                className={{
                                    padding:
                                        "0.5rem",
                                }}
                            />
                        ) : (
                            props.options.map(
                                (
                                    option,
                                ) => {
                                    const isSelected =
                                        props.value ===
                                        option.key
                                    return (
                                        <button
                                            type="button"
                                            key={
                                                option.key
                                            }
                                            onClick={(
                                                event,
                                            ) => {
                                                event.preventDefault()

                                                if (
                                                    props.onChange ===
                                                    undefined
                                                ) {
                                                    return
                                                }

                                                if (
                                                    isSelected ===
                                                    true
                                                ) {
                                                    props.onChange(
                                                        null,
                                                    )
                                                } else {
                                                    props.onChange(
                                                        option.key,
                                                    )
                                                }

                                                context.setIsOpen(
                                                    false,
                                                )
                                            }}
                                            className={css(
                                                {
                                                    width: "100%",
                                                    padding:
                                                        "0.125rem 0",
                                                },
                                            )}
                                        >
                                            <ButtonGhostContent
                                                key={
                                                    option.key
                                                }
                                                text={
                                                    option.label
                                                }
                                                isCurrent={
                                                    isSelected
                                                }
                                                rightIcon={
                                                    isSelected ? (
                                                        <IconCheck />
                                                    ) : undefined
                                                }
                                                className={css(
                                                    {
                                                        width: "100%",
                                                    },
                                                )}
                                            />
                                        </button>
                                    )
                                },
                            )
                        )}
                    </div>
                )
            }}
        </Popover>
    )
}
