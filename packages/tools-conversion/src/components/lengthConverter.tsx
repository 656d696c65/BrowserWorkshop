import { ConversionView } from "@browserworkshop/ui"
import { convert, lengthUnits } from "../utilities/units"

export function LengthConverter() {
    return <ConversionView units={lengthUnits} convert={(value, from, to) => convert(value, from, to, lengthUnits)} />
}
