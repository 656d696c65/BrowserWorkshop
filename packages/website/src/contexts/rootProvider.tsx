import { ToasterProvider } from "@browserworkshop/ui"
import { DataProvider } from "./data/dataProvider.js"
import { RouterProvider } from "./router/routerProvider.js"

export function RootProvider() {
    return (
        <DataProvider>
            <RouterProvider />
            <ToasterProvider />
        </DataProvider>
    )
}
