export interface CurrencyUnit {
    id: string
    label: string
    symbol: string
}

export const currencyUnits: CurrencyUnit[] = [
    {
        id: "USD",
        label: "US Dollar",
        symbol: "$",
    },
    {
        id: "EUR",
        label: "Euro",
        symbol: "€",
    },
    {
        id: "GBP",
        label: "British Pound",
        symbol: "£",
    },
    {
        id: "JPY",
        label: "Japanese Yen",
        symbol: "¥",
    },
    {
        id: "CHF",
        label: "Swiss Franc",
        symbol: "Fr",
    },
    {
        id: "CAD",
        label: "Canadian Dollar",
        symbol: "C$",
    },
    {
        id: "AUD",
        label: "Australian Dollar",
        symbol: "A$",
    },
    {
        id: "CNY",
        label: "Chinese Yuan",
        symbol: "¥",
    },
    {
        id: "INR",
        label: "Indian Rupee",
        symbol: "₹",
    },
    {
        id: "BRL",
        label: "Brazilian Real",
        symbol: "R$",
    },
    {
        id: "MXN",
        label: "Mexican Peso",
        symbol: "Mex$",
    },
    {
        id: "KRW",
        label: "South Korean Won",
        symbol: "₩",
    },
    {
        id: "SEK",
        label: "Swedish Krona",
        symbol: "kr",
    },
    {
        id: "NOK",
        label: "Norwegian Krone",
        symbol: "kr",
    },
    {
        id: "NZD",
        label: "New Zealand Dollar",
        symbol: "NZ$",
    },
    {
        id: "SGD",
        label: "Singapore Dollar",
        symbol: "S$",
    },
    {
        id: "HKD",
        label: "Hong Kong Dollar",
        symbol: "HK$",
    },
    {
        id: "TRY",
        label: "Turkish Lira",
        symbol: "₺",
    },
    {
        id: "ZAR",
        label: "South African Rand",
        symbol: "R",
    },
    {
        id: "PLN",
        label: "Polish Zloty",
        symbol: "zł",
    },
    {
        id: "DKK",
        label: "Danish Krone",
        symbol: "kr",
    },
    {
        id: "THB",
        label: "Thai Baht",
        symbol: "฿",
    },
    {
        id: "IDR",
        label: "Indonesian Rupiah",
        symbol: "Rp",
    },
    {
        id: "HUF",
        label: "Hungarian Forint",
        symbol: "Ft",
    },
    {
        id: "CZK",
        label: "Czech Koruna",
        symbol: "Kč",
    },
    {
        id: "ILS",
        label: "Israeli Shekel",
        symbol: "₪",
    },
    {
        id: "PHP",
        label: "Philippine Peso",
        symbol: "₱",
    },
    {
        id: "AED",
        label: "UAE Dirham",
        symbol: "د.إ",
    },
    {
        id: "MYR",
        label: "Malaysian Ringgit",
        symbol: "RM",
    },
    {
        id: "RON",
        label: "Romanian Leu",
        symbol: "lei",
    },
    {
        id: "BGN",
        label: "Bulgarian Lev",
        symbol: "лв",
    },
]

const API_BASE = "https://api.frankfurter.dev/v1"

interface RatesCache {
    rates: Record<string, Record<string, number>>
    timestamp: number
}

let cached: RatesCache | null = null
const CACHE_TTL_MS = 30 * 60 * 1000
const FETCH_TIMEOUT_MS = 10_000

export async function fetchRates(
    base: string,
): Promise<Record<string, number>> {
    const now = Date.now()
    if (cached && cached.timestamp + CACHE_TTL_MS > now && cached.rates[base]) {
        return cached.rates[base]
    }

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)

    try {
        const url = `${API_BASE}/latest?base=${base}`
        const res = await fetch(url, {
            signal: controller.signal,
        })
        if (!res.ok) {
            throw new Error(`Failed to fetch rates: ${res.statusText}`)
        }

        const data = (await res.json()) as {
            rates: Record<string, number>
        }

        const rates = {
            ...data.rates,
            [base]: 1,
        }

        cached = {
            rates: {
                ...cached?.rates,
                [base]: rates,
            },
            timestamp: now,
        }

        return rates
    } finally {
        clearTimeout(timeout)
    }
}

export function convertCurrency(
    value: number,
    from: string,
    to: string,
    rates: Record<string, number>,
): number {
    const fromRate = rates[from]
    const toRate = rates[to]
    if (fromRate === undefined || toRate === undefined) {
        return NaN
    }
    const baseValue = value / fromRate
    return baseValue * toRate
}
