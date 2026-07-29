import { ConversionView } from "@browserworkshop/ui"
import { convert, weightUnits } from "../utilities/units"

export function WeightConverter() {
    return <ConversionView units={weightUnits} convert={(value, from, to) => convert(value, from, to, weightUnits)} />
}
