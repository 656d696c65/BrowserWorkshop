import { IconCheck, IconSearch, IconSelector } from "@tabler/icons-react"
import { type ComponentProps, type InputHTMLAttributes, useState } from "react"
import type { FieldError } from "react-hook-form"
import { css, type Styles } from "../../../styled-system/css"
import { ButtonGhostContent } from "../button"
import { Button } from "../button/button"
import { ButtonContent } from "../button/buttonContent"
import { FormatNull } from "../formatNull"
import { Popover } from "../layouts/popover"

export function InputSelect<TValue extends string>(
    props: Omit<
        InputHTMLAttributes<HTMLSelectElement>,
        "className" | "value" | "onChange"
    > & {
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
        searchable?: boolean
        className?: Styles
        popoverProps?: ComponentProps<typeof Popover>
    },
) {
    const [search, setSearch] = useState("")

    function input(value: TValue | null | undefined) {
        return value
    }

    function _output(value: TValue | undefined | null) {
        if (value === null) return null
        if (value === undefined) return undefined
        return value
    }

    const normalizedSearch = search.trim().toLowerCase()
    const filteredOptions = props.options?.filter((option) =>
        option.label.toLowerCase().includes(normalizedSearch),
    )

    const currentOption = props.options?.find(
        (x) => x.key === input(props.value ?? props.defaultValue),
    )
    return (
        <Popover
            {...props.popoverProps}
            triggerElement={
                <Button
                    type="button"
                    className={css(
                        {
                            width: "100%",
                            cursor: "pointer",
                        },
                        props.className,
                    )}
                >
                    <ButtonContent>
                        <div
                            className={css({
                                width: "100%",
                                height: "2.5rem",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "start",
                                alignItems: "center",
                                gap: "0.5rem",
                                paddingX: "0.75rem",
                                borderRadius: "0.375rem",
                                borderWidth: "1px",
                                borderStyle: "solid",
                                borderColor: "neutral/20",
                                backgroundColor: "white",
                                transition: "all 0.15s",
                                _hover: {
                                    borderColor: "neutral/40",
                                },
                                _focusWithin: {
                                    borderColor: "primary",
                                    outlineWidth: "2px",
                                    outlineStyle: "solid",
                                    outlineColor: "primary/15",
                                    outlineOffset: "0px",
                                },
                            })}
                        >
                            <span
                                className={css(
                                    {
                                        flex: 1,
                                        minWidth: 0,
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                        textAlign: "start",
                                        fontSize: "0.875rem",
                                        color: "neutral",
                                    },
                                    currentOption?.label === undefined
                                        ? {
                                              color: "neutral/40",
                                              fontStyle: "italic",
                                          }
                                        : undefined,
                                )}
                            >
                                {currentOption?.label ??
                                    props.placeholder ??
                                    "No option selected"}
                            </span>
                            <span
                                className={css({
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flexShrink: 0,
                                })}
                            >
                                <IconSelector
                                    className={css({
                                        strokeWidth: "1.5px",
                                        width: "1rem",
                                        height: "1rem",
                                        minWidth: "1rem",
                                        color: "neutral/50",
                                    })}
                                />
                            </span>
                        </div>
                    </ButtonContent>
                </Button>
            }
            position="bottom"
        >
            {(context) => {
                const shouldSearch =
                    props.searchable === true &&
                    (props.options ?? []).length > 5
                return (
                    <div
                        className={css({
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "start",
                            alignItems: "start",
                        })}
                    >
                        {shouldSearch && (
                            <div
                                className={css({
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap: "0.375rem",
                                    paddingX: "0.375rem",
                                    paddingY: "0.25rem",
                                    borderBottomWidth: "1px",
                                    borderBottomColor: "neutral/10",
                                    marginBottom: "0.25rem",
                                })}
                            >
                                <IconSearch
                                    className={css({
                                        width: "0.875rem",
                                        height: "0.875rem",
                                        minWidth: "0.875rem",
                                        strokeWidth: "1.5px",
                                        color: "neutral/50",
                                    })}
                                />
                                <input
                                    type="search"
                                    value={search}
                                    onChange={(event) =>
                                        setSearch(event.currentTarget.value)
                                    }
                                    placeholder="Search..."
                                    aria-label="Search options"
                                    className={css({
                                        width: "100%",
                                        height: "1.75rem",
                                        fontSize: "0.875rem",
                                        backgroundColor: "transparent",
                                        borderWidth: "0",
                                        outline: "none",
                                        _placeholder: {
                                            color: "neutral/40",
                                        },
                                    })}
                                />
                            </div>
                        )}
                        <div
                            className={css({
                                width: "100%",
                                maxHeight: "16rem",
                                overflow: "auto",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "start",
                                alignItems: "start",
                                gap: "0.125rem",
                                padding: "0.25rem",
                                flexShrink: 1,
                            })}
                        >
                            {props.options === undefined ? (
                                <FormatNull text="No available options" />
                            ) : filteredOptions?.length === 0 ? (
                                <FormatNull
                                    text="No options match your search"
                                    className={{
                                        padding: "0.5rem",
                                    }}
                                />
                            ) : (
                                filteredOptions?.map((option) => {
                                    const isSelected =
                                        props.value === option.key
                                    return (
                                        <Button
                                            type="button"
                                            key={option.key}
                                            onClick={(event) => {
                                                event.preventDefault()

                                                if (
                                                    props.onChange === undefined
                                                ) {
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
                                                padding: "0.125rem 0",
                                            })}
                                        >
                                            <ButtonContent>
                                                <ButtonGhostContent
                                                    key={option.key}
                                                    text={option.label}
                                                    isCurrent={isSelected}
                                                    rightIcon={
                                                        isSelected ? (
                                                            <IconCheck />
                                                        ) : undefined
                                                    }
                                                    className={css({
                                                        width: "100%",
                                                    })}
                                                />
                                            </ButtonContent>
                                        </Button>
                                    )
                                })
                            )}
                        </div>
                    </div>
                )
            }}
        </Popover>
    )
}
