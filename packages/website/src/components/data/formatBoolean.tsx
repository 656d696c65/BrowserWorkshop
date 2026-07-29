import type { ComponentProps } from "react"
import { Chip } from "./chip"
import { FormatNull } from "./formatNull"

export function FormatBoolean(props: {
    value?: boolean | null
    options?: Array<{
        key: boolean
        label: string
    }>
    className?: ComponentProps<"div">["className"]
}) {
    if (props.value === null) {
        return <FormatNull />
    }
    if (props.value === undefined) {
        return <FormatNull />
    }
    const currentOption = props.options?.find((x) => x.key === props.value)
    return (
        <Chip
            text={currentOption !== undefined ? currentOption?.label : props.value === true ? "True" : "False"}
            color={props.value === true ? "success" : "error"}
        />
    )
}
