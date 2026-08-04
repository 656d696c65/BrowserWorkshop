import * as v from "valibot"
import { ClientError } from "./clientError.js"

export function validate<
    T extends v.GenericSchema<unknown, unknown>,
>(parameters: { schema: T; data: v.InferOutput<T> }) {
    const parsedData = v.safeParse(parameters.schema, parameters.data)

    if (parsedData.issues === undefined) {
        return {
            success: true as const,
            data: parsedData.output,
            error: undefined,
        }
    }

    return {
        success: false as const,
        data: undefined,
        error: new ClientError({
            message: "Error with the data validation",
            rawError: parsedData.issues,
        }),
    }
}
