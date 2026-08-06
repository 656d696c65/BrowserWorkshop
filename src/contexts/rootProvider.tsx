import { Fragment } from "react/jsx-runtime"
import { RouterProvider } from "./router/routerProvider.js"
import { ToasterProvider } from "./toasts/toastProvider.js"

export function RootProvider() {
    return (
        <Fragment>
            <RouterProvider />
            <ToasterProvider />
        </Fragment>
    )
}
