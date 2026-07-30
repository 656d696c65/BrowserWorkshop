import {
    type ComponentProps,
    Fragment,
    type ReactElement,
    useMemo,
} from "react"
import * as v from "valibot"
import { CircularLoader } from "../../../../website/src/components/circularLoader"
import { useDataFromAPI } from "../../../../website/src/utilities/useDataFromAPI"
import {
    css,
    cx,
} from "../../../../website/styled-system/css"
import { FormatError } from "./formatError"

export function DataWrapper<
    TSchemaInput extends v.ObjectSchema<
        v.ObjectEntries,
        undefined
    >,
    TSchemaOutput extends
        | v.ObjectSchema<
              v.ObjectEntries,
              undefined
          >
        | v.ArraySchema<
              v.ObjectSchema<
                  v.ObjectEntries,
                  undefined
              >,
              undefined
          >,
>(props: {
    routeDefinition: {
        path: string
        schemas: {
            output: TSchemaOutput
        }
    }
    body: v.InferInput<TSchemaInput>
    children: (
        data: v.InferOutput<TSchemaOutput>,
    ) =>
        | ReactElement
        | Array<ReactElement>
        | null
    className?: ComponentProps<"div">["className"]
    loaderProps?: ComponentProps<
        typeof CircularLoader
    >
    errorProps?: ComponentProps<
        typeof FormatError
    >
}) {
    const response = useDataFromAPI({
        routeDefinition:
            props.routeDefinition,
        body: props.body,
    })
    const key = useMemo(
        () => crypto.randomUUID(),
        [],
    )

    if (response.data === undefined) {
        if (response.isPending) {
            return (
                <CircularLoader
                    {...props.loaderProps}
                    text={
                        props
                            .loaderProps
                            ?.text
                    }
                    className={cx(
                        css({}),
                        props
                            .loaderProps
                            ?.className,
                    )}
                />
            )
        }
        return (
            <FormatError
                {...props.errorProps}
                text={
                    props.errorProps
                        ?.text ??
                    "Error loading data"
                }
                className={css.raw({
                    padding: "1rem",
                })}
            />
        )
    }

    return (
        <Fragment key={key}>
            {props.children(
                response.data,
            )}
        </Fragment>
    )
}
