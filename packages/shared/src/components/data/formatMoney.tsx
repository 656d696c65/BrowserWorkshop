import { type Styles } from "../../../../website/styled-system/css"
import { FormatText } from "./formatText"

export function FormatMoney(props: {
    amount: number
    currency: string
    className?: Styles
}) {
    const _color =
        Math.sign(props.amount) === +1
            ? "green"
            : "red"
    const money = `${(props.amount / 100).toFixed(2)}${props.currency}`
    return (
        <FormatText>{money}</FormatText>
    )
}
