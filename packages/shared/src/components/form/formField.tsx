import {
    Controller,
    type ControllerProps,
    type FieldPath,
    type FieldValues,
} from "react-hook-form"
import { FormFieldContext } from "./formFieldContext"

export function FormField<
    TFieldValues extends FieldValues,
    TName extends
        FieldPath<TFieldValues>,
>(
    props: ControllerProps<
        TFieldValues,
        TName
    >,
) {
    return (
        <FormFieldContext
            value={{ name: props.name }}
        >
            <Controller {...props} />
        </FormFieldContext>
    )
}
