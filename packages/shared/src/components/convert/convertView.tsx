import { useMemo, useState } from "react"
import { css } from "@browserworkshop/shared/styled-system/css"
import { InputText } from "../inputs/inputText"
import { UnitSelect } from "./unitSelect"

export function ConvertView(props: {
    units: Array<{
        id: string
        label: string
    }>
    convert: (value: number, from: string, to: string) => number
}) {
    const [value, setValue] = useState<string>("")
    const [fromUnit, setFromUnit] = useState<string | null>(null)
    const [toUnit, setToUnit] = useState<string | null>(null)

    const numValue = parseFloat(value)
    const isValidValue = !Number.isNaN(numValue) && value !== ""

    const result = useMemo(() => {
        if (!isValidValue || !fromUnit || !toUnit) return null
        return props.convert(numValue, fromUnit, toUnit)
    }, [
        numValue,
        fromUnit,
        toUnit,
        isValidValue,
        props.convert,
    ])

    const fromLabel = props.units.find((u) => u.id === fromUnit)?.label
    const toLabel = props.units.find((u) => u.id === toUnit)?.label

    function formatResult(value: number): string {
        const fixed = value.toFixed(10)
        const trimmed = fixed.replace(/\.?0+$/, "")
        return trimmed
    }

    return (
        <div
            className={css({
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "stretch",
                gap: "1rem",
            })}
        >
            <div
                className={css({
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.25rem",
                })}
            >
                <span
                    className={css({
                        fontSize: "0.875rem",
                        color: "neutral/60",
                    })}
                >
                    Value
                </span>
                <InputText
                    value={value}
                    onChange={(v) => setValue(v ?? "")}
                    type="number"
                    inputMode="decimal"
                    placeholder="Enter a value"
                />
            </div>

            <div
                className={css({
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.25rem",
                })}
            >
                <span
                    className={css({
                        fontSize: "0.875rem",
                        color: "neutral/60",
                    })}
                >
                    From
                </span>
                <UnitSelect
                    units={props.units}
                    value={fromUnit}
                    onChange={(v) => setFromUnit(v ?? null)}
                    placeholder="Select a unit"
                />
            </div>

            <div
                className={css({
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.25rem",
                })}
            >
                <span
                    className={css({
                        fontSize: "0.875rem",
                        color: "neutral/60",
                    })}
                >
                    To
                </span>
                <UnitSelect
                    units={props.units}
                    value={toUnit}
                    onChange={(v) => setToUnit(v ?? null)}
                    placeholder="Select a unit"
                />
            </div>

            {result !== null && (
                <div
                    className={css({
                        marginTop: "0.5rem",
                        padding: "1rem",
                        borderRadius: "0.5rem",
                        backgroundColor: "neutral/5",
                        borderWidth: "1px",
                        borderColor: "neutral/10",
                        fontSize: "1.25rem",
                        fontWeight: "500",
                        textAlign: "center",
                        color: "neutral",
                    })}
                >
                    {value} {fromLabel} ={" "}
                    <span
                        className={css({
                            color: "primary",
                        })}
                    >
                        {formatResult(result)}
                    </span>{" "}
                    {toLabel}
                </div>
            )}
        </div>
    )
}
