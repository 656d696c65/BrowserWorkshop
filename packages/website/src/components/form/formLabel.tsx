import type { HTMLAttributes } from "react"
import { css } from "../../../styled-system/css"
import { useFormField } from "./useFormField"

export function FormLabel(props: {
    label: string | undefined
    description: string | undefined
    isRequired: boolean
    labelProps?: HTMLAttributes<HTMLLabelElement>
}) {
    const { formItemId } = useFormField()

    return (
        <label
            {...props.labelProps}
            htmlFor={formItemId}
            data-required={props.isRequired}
            className={css({
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "start",
                gap: "0.125rem",
            })}
        >
            <div
                className={css({
                    display: "inline-flex",
                    justifyContent: "start",
                    alignItems: "center",
                    gap: "0.25rem",
                })}
            >
                {props.label === undefined ? null : (
                    <span
                        className={css({
                            fontSize: "0.875rem",
                            color: "neutral/75",
                        })}
                    >
                        {props.label}
                    </span>
                )}
                {props.isRequired === false ? null : (
                    <span
                        className={css({
                            fontSize: "0.75rem",
                            color: "red",
                        })}
                    >
                        *
                    </span>
                )}
            </div>
            {props.description === undefined ? null : (
                <span
                    className={css({
                        fontSize: "0.75rem",
                        color: "neutral/50",
                    })}
                >
                    {props.description}
                </span>
            )}
        </label>
    )
}
