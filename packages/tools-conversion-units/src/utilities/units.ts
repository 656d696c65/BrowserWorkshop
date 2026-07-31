export interface Unit {
    id: string
    label: string
    factor: number
}

export const lengthUnits: Unit[] = [
    {
        id: "millimeters",
        label: "Millimeters",
        factor: 0.001,
    },
    {
        id: "centimeters",
        label: "Centimeters",
        factor: 0.01,
    },
    {
        id: "decimeters",
        label: "Decimeters",
        factor: 0.1,
    },
    {
        id: "meters",
        label: "Meters",
        factor: 1,
    },
    {
        id: "decameters",
        label: "Decameters",
        factor: 10,
    },
    {
        id: "hectometers",
        label: "Hectometers",
        factor: 100,
    },
    {
        id: "kilometers",
        label: "Kilometers",
        factor: 1000,
    },
    {
        id: "inches",
        label: "Inches",
        factor: 0.0254,
    },
    {
        id: "feet",
        label: "Feet",
        factor: 0.3048,
    },
    {
        id: "yards",
        label: "Yards",
        factor: 0.9144,
    },
    {
        id: "miles",
        label: "Miles",
        factor: 1609.344,
    },
]

export const weightUnits: Unit[] = [
    {
        id: "milligrams",
        label: "Milligrams",
        factor: 0.001,
    },
    {
        id: "centigrams",
        label: "Centigrams",
        factor: 0.01,
    },
    {
        id: "decigrams",
        label: "Decigrams",
        factor: 0.1,
    },
    {
        id: "grams",
        label: "Grams",
        factor: 1,
    },
    {
        id: "decagrams",
        label: "Decagrams",
        factor: 10,
    },
    {
        id: "hectograms",
        label: "Hectograms",
        factor: 100,
    },
    {
        id: "kilograms",
        label: "Kilograms",
        factor: 1000,
    },
    {
        id: "tonnes",
        label: "Tonnes",
        factor: 1000000,
    },
    {
        id: "ounces",
        label: "Ounces",
        factor: 28.3495,
    },
    {
        id: "pounds",
        label: "Pounds",
        factor: 453.592,
    },
]

export function convert(
    value: number,
    from: string,
    to: string,
    units: Unit[],
): number {
    const fromUnit = units.find(
        (u) => u.id === from,
    )
    const toUnit = units.find(
        (u) => u.id === to,
    )
    if (!fromUnit || !toUnit) return NaN
    const baseValue =
        value * fromUnit.factor
    return baseValue / toUnit.factor
}
