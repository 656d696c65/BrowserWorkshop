import { createContext } from "react"
import type {
    FieldPath,
    FieldValues,
} from "react-hook-form"

type FormFieldContextValue<
    TFieldValues extends
        FieldValues = FieldValues,
    TName extends
        FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
    name: TName | undefined
}

export const FormFieldContext =
    createContext<FormFieldContextValue>(
        {
            name: undefined,
        },
    )
