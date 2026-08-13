import { IconSwitchHorizontal } from "@tabler/icons-react"
import { useState } from "react"
import { Section } from "@/components/layouts/section"
import { css } from "@/styled-system/css"
import { Button } from "../../../../components/button/button"
import { ButtonContent } from "../../../../components/button/buttonContent"
import { UnitSelect } from "../../../../components/convert/unitSelect"
import { InputSelect } from "../../../../components/inputs/inputSelect"
import { InputText } from "../../../../components/inputs/inputText"
import { convertCategory, type UnitCategory, unitCategories } from "./units"

function formatValue(value: number): string {
    const fixed = value.toFixed(10)
    return fixed.replace(/\.?0+$/, "")
}

export default function UnitConverter(props: { categories?: UnitCategory[] }) {
    const categories = props.categories ?? unitCategories
    const defaultCategory = categories[0]

    const [categoryId, setCategoryId] = useState<string | null>(
        defaultCategory?.id ?? null,
    )
    const [unit1, setUnit1] = useState<string | null>(
        defaultCategory?.units[0]?.id ?? null,
    )
    const [unit2, setUnit2] = useState<string | null>(
        defaultCategory?.units[1]?.id ?? defaultCategory?.units[0]?.id ?? null,
    )
    const [value1, setValue1] = useState<string>("1")
    const [value2, setValue2] = useState<string>(() => {
        if (defaultCategory && defaultCategory.units.length > 1) {
            return formatValue(
                convertCategory(
                    1,
                    defaultCategory.units[0].id,
                    defaultCategory.units[1].id,
                    defaultCategory.id,
                ),
            )
        }
        return ""
    })

    const category = categories.find((c) => c.id === categoryId)

    const options = categories.map((category) => ({
        key: category.id,
        label: category.label,
    }))

    function handleCategoryChange(value?: string | null | undefined) {
        const nextId = value ?? null
        setCategoryId(nextId)
        const nextCategory = categories.find((c) => c.id === nextId)
        const nextUnit1 = nextCategory?.units[0]?.id ?? null
        const nextUnit2 = nextCategory?.units[1]?.id ?? null
        setUnit1(nextUnit1)
        setUnit2(nextUnit2)
        setValue1("1")
        if (nextUnit1 && nextUnit2 && nextId) {
            setValue2(
                formatValue(convertCategory(1, nextUnit1, nextUnit2, nextId)),
            )
        } else {
            setValue2("")
        }
    }

    function handleValueChange(value?: string | null | undefined) {
        const next = value ?? ""
        setValue1(next)
        const num = parseFloat(next)
        if (next !== "" && !Number.isNaN(num) && unit1 && unit2 && categoryId) {
            setValue2(
                formatValue(convertCategory(num, unit1, unit2, categoryId)),
            )
        } else {
            setValue2("")
        }
    }

    function handleUnit1Change(value?: string | null | undefined) {
        const next = value ?? null
        setUnit1(next)
        const num = parseFloat(value1)
        if (
            value1 !== "" &&
            !Number.isNaN(num) &&
            next &&
            unit2 &&
            categoryId
        ) {
            setValue2(
                formatValue(convertCategory(num, next, unit2, categoryId)),
            )
        }
    }

    function handleUnit2Change(value?: string | null | undefined) {
        const next = value ?? null
        setUnit2(next)
        const num = parseFloat(value2)
        if (
            value2 !== "" &&
            !Number.isNaN(num) &&
            unit1 &&
            next &&
            categoryId
        ) {
            setValue1(
                formatValue(convertCategory(num, next, unit1, categoryId)),
            )
        }
    }

    function swapUnits() {
        const nextUnit1 = unit2
        const nextUnit2 = unit1
        setUnit1(nextUnit1)
        setUnit2(nextUnit2)
        const num = parseFloat(value1)
        if (
            value1 !== "" &&
            !Number.isNaN(num) &&
            nextUnit1 &&
            nextUnit2 &&
            categoryId
        ) {
            setValue2(
                formatValue(
                    convertCategory(num, nextUnit1, nextUnit2, categoryId),
                ),
            )
        }
    }

    return (
        <div
            className={css({
                width: "100%",
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
                    flexDirection: "row",
                    justifyContent: "start",
                    alignItems: "center",
                    gap: "0.5rem",
                })}
            >
                <InputSelect<string>
                    value={categoryId}
                    onChange={handleCategoryChange}
                    options={options}
                    placeholder="Select a type"
                />
            </div>

            {category && (
                <Section>
                    <div
                        className={css({
                            width: "100%",
                            display: "grid",
                            gridTemplateColumns: "1fr auto 1fr",
                            gap: "0.75rem",
                            alignItems: "center",
                        })}
                    >
                        <UnitSelect
                            units={category.units}
                            value={unit1}
                            onChange={handleUnit1Change}
                            placeholder="Select a unit"
                            isFullWidth
                        />
                        <Button
                            type="button"
                            onClick={swapUnits}
                            aria-label="Swap units"
                            title="Swap units"
                        >
                            <ButtonContent
                                leftIcon={<IconSwitchHorizontal />}
                            />
                        </Button>
                        <UnitSelect
                            units={category.units}
                            value={unit2}
                            onChange={handleUnit2Change}
                            placeholder="Select a unit"
                            isFullWidth
                        />

                        <InputText
                            value={value1}
                            onChange={handleValueChange}
                            type="number"
                            inputMode="decimal"
                            placeholder="Value"
                        />
                        <div />
                        <div
                            className={css({
                                height: "2.5rem",
                                display: "flex",
                                alignItems: "center",
                                paddingX: "0.75rem",
                                borderWidth: "1px",
                                borderStyle: "solid",
                                borderColor: "neutral/20",
                                borderRadius: "0.375rem",
                                fontSize: "0.875rem",
                                color: "neutral",
                                backgroundColor: "neutral/5",
                            })}
                        >
                            {value2}
                        </div>
                    </div>
                </Section>
            )}
        </div>
    )
}
