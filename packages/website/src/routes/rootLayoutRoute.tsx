import { CircularLoader } from "@browserworkshop/shared"
import {
    createRootRouteWithContext,
    useRouterState,
} from "@tanstack/react-router"
import { Fragment } from "react/jsx-runtime"
import { RootLayout } from "../features/rootLayout.js"

export const rootLayoutRoute = createRootRouteWithContext<{
    title: string | undefined
    description: string | undefined
    isAuthenticated: boolean | undefined
    userSession: unknown
}>()({
    pendingComponent: () => <CircularLoader text="Loading..." />,
    beforeLoad: (_ctx) => {},
    component: () => {
        const matches = useRouterState({
            select: (s) => s.matches,
        })

        const matchWithTitle = [
            ...matches,
        ]
            .reverse()
            .find((d) => d.context.title)

        const title = matchWithTitle?.context.title || "BrowserWorkshop"

        const matchWithDescription = [
            ...matches,
        ]
            .reverse()
            .find((d) => d.context.description)

        const description = matchWithDescription?.context.description

        return (
            <Fragment>
                <title>{title}</title>
                {description && (
                    <meta name="description" content={description} />
                )}
                <RootLayout />
            </Fragment>
        )
    },
})
