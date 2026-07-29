import type { Styles } from "../../../styled-system/css"
import { InputSelect } from "../inputs/inputSelect"

export function UnitSelect(props: {
    value?: string | null
    defaultValue?: string | null
    onChange?: (value?: string | null | undefined) => void
    units: Array<{ id: string; label: string }> | undefined
    placeholder?: string
    className?: Styles
}) {
    const options = props.units?.map((unit) => ({
        key: unit.id,
        label: unit.label,
    }))

    return (
        <InputSelect<string>
            value={props.value}
            defaultValue={props.defaultValue ?? undefined}
            onChange={props.onChange}
            options={options}
            placeholder={props.placeholder}
            className={props.className}
        />
    )
}
