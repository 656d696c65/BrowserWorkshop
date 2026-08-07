import { useState } from "react"
import { ConvertView } from "../../components/convert/convertView"
import { InputSelect } from "../../components/inputs/inputSelect"
import { convertCategory, type UnitCategory, unitCategories } from "./units"

export function UnitConverter(props: { categories?: UnitCategory[] }) {
    const categories = props.categories ?? unitCategories
    const [categoryId, setCategoryId] = useState<string | null>(
        categories[0]?.id ?? null,
    )
    const category = categories.find((c) => c.id === categoryId)

    const options = categories.map((category) => ({
        key: category.id,
        label: category.label,
    }))

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "stretch",
                gap: "1rem",
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.25rem",
                }}
            >
                <span
                    style={{
                        fontSize: "0.875rem",
                        color: "rgba(12, 24, 33, 0.6)",
                    }}
                >
                    Type
                </span>
                <InputSelect<string>
                    value={categoryId}
                    onChange={(value) => setCategoryId(value ?? null)}
                    options={options}
                    placeholder="Select a type"
                />
            </div>

            {category && (
                <ConvertView
                    units={category.units}
                    convert={(value, from, to) =>
                        convertCategory(value, from, to, category.id)
                    }
                />
            )}
        </div>
    )
}
