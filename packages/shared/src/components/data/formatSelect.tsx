import type { ComponentProps } from "react"
import { Chip } from "./chip"
import { FormatNull } from "./formatNull"

export function FormatSelect<
    TValue extends string,
>(props: {
    value?: TValue | null
    options?: Array<{
        key: TValue
        label: string
        color?:
            | "default"
            | "error"
            | "warning"
            | "success"
            | "information"
    }>
    className?: ComponentProps<"div">["className"]
}) {
    if (props.value === null) {
        return <FormatNull />
    }
    if (props.value === undefined) {
        return <FormatNull />
    }

    const currentOption =
        props.options?.find(
            (x) =>
                x.key === props.value,
        )
    if (currentOption === undefined) {
        return <FormatNull />
    }

    return (
        <Chip
            text={currentOption.label}
            color={currentOption.color}
        />
    )
}
