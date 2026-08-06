import { useEffect, useMemo, useState } from "react"
import { Section } from "@/components/layouts/section"
import { css } from "@/styled-system/css"
import { Button } from "../../../components/button/button"
import { ButtonContent } from "../../../components/button/buttonContent"
import { UnitSelect } from "../../../components/convert/unitSelect"
import { InputText } from "../../../components/inputs/inputText"
import { convertCurrency, currencyUnits, fetchRates } from "./currency"

export function CurrencyConverter() {
    const [value, setValue] = useState<string>("1")
    const [fromUnit, setFromUnit] = useState<string>("USD")
    const [toUnit, setToUnit] = useState<string>("EUR")
    const [rates, setRates] = useState<Record<string, number> | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [retryKey, setRetryKey] = useState(0)

    useEffect(() => {
        let cancelled = false
        setLoading(true)
        setError(null)
        if (retryKey > 0) {
            setRates(null)
        }

        fetchRates(fromUnit)
            .then((r) => {
                if (!cancelled) {
                    setRates(r)
                    setLoading(false)
                }
            })
            .catch((e: unknown) => {
                if (!cancelled) {
                    setError(
                        e instanceof Error
                            ? e.message
                            : "Failed to fetch rates",
                    )
                    setLoading(false)
                }
            })

        return () => {
            cancelled = true
        }
    }, [
        fromUnit,
        retryKey,
    ])

    const numValue = parseFloat(value)
    const isValidValue = !Number.isNaN(numValue) && value !== ""

    const result = useMemo(() => {
        if (!isValidValue || !rates) return null
        return convertCurrency(numValue, fromUnit, toUnit, rates)
    }, [
        numValue,
        fromUnit,
        toUnit,
        rates,
        isValidValue,
    ])

    const fromLabel =
        currencyUnits.find((u) => u.id === fromUnit)?.label ?? fromUnit
    const toLabel = currencyUnits.find((u) => u.id === toUnit)?.label ?? toUnit

    function formatResult(v: number): string {
        const fixed = v.toFixed(10)
        return fixed.replace(/\.?0+$/, "")
    }

    function swap() {
        setFromUnit(toUnit)
        setToUnit(fromUnit)
    }

    return (
        <Section>
            <div>
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
                        Amount
                    </span>
                    <InputText
                        value={value}
                        onChange={(v) => setValue(v ?? "")}
                        type="number"
                        inputMode="decimal"
                        placeholder="0.00"
                    />
                </div>
            </div>

            <div
                className={css({
                    display: "flex",
                    flexDirection: "row",
                    gap: "0.5rem",
                    alignItems: "end",
                })}
            >
                <div
                    className={css({
                        flex: 1,
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
                        units={currencyUnits}
                        value={fromUnit}
                        onChange={(v) => setFromUnit(v ?? "USD")}
                        placeholder="Select currency"
                    />
                </div>

                <Button
                    type="button"
                    onClick={swap}
                    className={css({
                        padding: "0.5rem",
                        borderRadius: "0.25rem",
                        cursor: "pointer",
                        fontSize: "0.875rem",
                        color: "neutral/50",
                        backgroundColor: "transparent",
                        borderWidth: "1px",
                        borderColor: "neutral/20",
                        _hover: {
                            backgroundColor: "neutral/5",
                            color: "neutral",
                        },
                    })}
                    aria-label="Swap currencies"
                    title="Swap currencies"
                >
                    <ButtonContent>⇄</ButtonContent>
                </Button>

                <div
                    className={css({
                        flex: 1,
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
                        units={currencyUnits}
                        value={toUnit}
                        onChange={(v) => setToUnit(v ?? "EUR")}
                        placeholder="Select currency"
                    />
                </div>
            </div>

            {loading && (
                <div
                    className={css({
                        padding: "1rem",
                        textAlign: "center",
                        fontSize: "0.875rem",
                        color: "neutral/50",
                    })}
                >
                    Loading exchange rates...
                </div>
            )}

            {error && (
                <div
                    className={css({
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "0.75rem",
                        padding: "1rem",
                        textAlign: "center",
                        fontSize: "0.875rem",
                        color: "red",
                    })}
                >
                    <span>{error}</span>
                    <Button
                        type="button"
                        onClick={() => setRetryKey((k) => k + 1)}
                        title="Retry"
                        className={css({
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            padding: "0.375rem 0.75rem",
                            borderRadius: "0.375rem",
                            borderWidth: "1px",
                            borderColor: "red/40",
                            fontSize: "0.875rem",
                            color: "red",
                            backgroundColor: "transparent",
                            cursor: "pointer",
                            _hover: {
                                backgroundColor: "red/10",
                            },
                        })}
                    >
                        <ButtonContent>Retry</ButtonContent>
                    </Button>
                </div>
            )}

            {!loading && !error && result !== null && (
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

            {rates && !loading && (
                <div
                    className={css({
                        fontSize: "0.75rem",
                        color: "neutral/40",
                        textAlign: "center",
                    })}
                >
                    1 {fromUnit} ={" "}
                    {formatResult(convertCurrency(1, fromUnit, toUnit, rates))}{" "}
                    {toUnit}
                </div>
            )}

            <div
                className={css({
                    marginTop: "0.5rem",
                    paddingTop: "0.75rem",
                    borderTopWidth: "1px",
                    borderTopColor: "neutral/10",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.125rem",
                })}
            >
                <span
                    className={css({
                        fontSize: "0.75rem",
                        color: "neutral/50",
                    })}
                >
                    Exchange rates by{" "}
                    <a
                        href="https://www.frankfurter.app/"
                        target="_blank"
                        rel="noreferrer"
                        title="Frankfurter (daily exchange rates)"
                        className={css({
                            color: "primary",
                            textDecoration: "underline",
                            _hover: {
                                textDecoration: "none",
                            },
                        })}
                    >
                        Frankfurter
                    </a>{" "}
                    — daily rates from the European Central Bank.
                </span>
            </div>
        </Section>
    )
}
