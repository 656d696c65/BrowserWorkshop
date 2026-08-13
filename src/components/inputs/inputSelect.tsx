import { IconCheck, IconSearch, IconSelector } from "@tabler/icons-react"
import { type ComponentProps, type InputHTMLAttributes, useState } from "react"
import type { FieldError } from "react-hook-form"
import { css, type Styles } from "@/styled-system/css"
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
        isFullWidth?: boolean
        css?: Styles
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
                    title={
                        currentOption?.label ??
                        props.placeholder ??
                        "Select an option"
                    }
                    css={css.raw(
                        {
                            width: props.isFullWidth ? "100%" : "fit-content",
                            cursor: "pointer",
                        },
                        props.css,
                    )}
                >
                    <ButtonContent
                        text={
                            currentOption?.label ??
                            props.placeholder ??
                            "No option selected"
                        }
                        rightIcon={<IconSelector />}
                        isCurrent={currentOption?.label === undefined}
                        isFullWidth={props.isFullWidth ?? false}
                    />
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
                                // gap: "0.5rem",
                                padding: "0.5rem",
                                flexShrink: 1,
                            })}
                        >
                            {props.options === undefined ? (
                                <FormatNull
                                    text="No available options"
                                    className={{}}
                                />
                            ) : filteredOptions?.length === 0 ? (
                                <FormatNull
                                    text="No options match your search"
                                    className={{}}
                                />
                            ) : (
                                filteredOptions?.map((option) => {
                                    const isSelected =
                                        props.value === option.key
                                    return (
                                        <Button
                                            type="button"
                                            key={option.key}
                                            title={option.label}
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
                                            css={css.raw({
                                                width: "100%",
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                gap: "0.5rem",
                                                padding: "0.5rem",
                                                borderRadius: "0.25rem",
                                                _hover: {
                                                    backgroundColor:
                                                        "neutral/5",
                                                },
                                            })}
                                        >
                                            <span
                                                className={css({
                                                    lineHeight: 1,
                                                    ...(isSelected && {
                                                        color: "primary",
                                                    }),
                                                })}
                                            >
                                                {option.label}
                                            </span>
                                            {isSelected ? (
                                                <IconCheck
                                                    size={16}
                                                    className={css(
                                                        {
                                                            marginLeft: "auto",
                                                        },
                                                        isSelected && {
                                                            stroke: "primary",
                                                        },
                                                    )}
                                                />
                                            ) : undefined}
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
