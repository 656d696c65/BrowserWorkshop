import { useContext } from "react"
import { useFormContext } from "react-hook-form"
import { ClientError } from "../../../../website/src/utilities/clientError"
import { FormFieldContext } from "./formFieldContext"

export const useFormField = () => {
    const fieldContext = useContext(
        FormFieldContext,
    )
    const { getFieldState, formState } =
        useFormContext()

    const fieldState = getFieldState(
        fieldContext.name ?? "",
        formState,
    )

    if (!fieldContext) {
        throw new ClientError({
            message:
                "useFormField should be used within <FormField>",
        })
    }

    const id = fieldContext.name

    return {
        id,
        name: fieldContext.name,
        formItemId: `${id}-form-item`,
        formDescriptionId: `${id}-form-item-description`,
        formMessageId: `${id}-form-item-message`,
        ...fieldState,
    }
}
