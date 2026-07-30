import { ToasterProvider } from "@browserworkshop/shared"
import { Fragment } from "react/jsx-runtime"
import { RouterProvider } from "./router/routerProvider.js"

export function RootProvider() {
    return (
        <Fragment>
            <RouterProvider />
            <ToasterProvider />
        </Fragment>
    )
}
