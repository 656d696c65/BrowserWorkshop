import {
    cloneElement,
    type ReactElement,
    useEffect,
    useState,
} from "react"

export function InputDebounced<
    T,
>(props: {
    value: T
    initialValue?: T
    onChange: (value: T) => void
    debounce?: number
    children: ReactElement<any>
}) {
    const [value, setValue] =
        useState<T>(
            props.initialValue ||
                props.value,
        )

    useEffect(() => {
        setValue(
            props.initialValue ||
                props.value,
        )
    }, [
        props.initialValue,
        props.value,
    ])

    useEffect(() => {
        const timeout = setTimeout(
            () => {
                props.onChange(value)
            },
            !props.debounce
                ? 300
                : props.debounce,
        )

        return () =>
            clearTimeout(timeout)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        value,
        props.onChange,
        props.debounce,
    ])

    return cloneElement(
        props.children,
        {
            value: value,
            onChange: (value: T) =>
                setValue(value),
        },
    )
}
