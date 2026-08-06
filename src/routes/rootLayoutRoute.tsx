import {
    createRootRouteWithContext,
    useLocation,
    useRouterState,
} from "@tanstack/react-router"
import { Fragment } from "react/jsx-runtime"
import { CircularLoader } from "@/components/circularLoader.js"
import { RootLayout } from "../features/rootLayout.js"
import {
    canonicalUrl,
    OG_IMAGE,
    OG_IMAGE_ALT,
    SITE_NAME,
} from "../seo/routeMeta.js"

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
        const location = useLocation()

        const matchWithTitle = [
            ...matches,
        ]
            .reverse()
            .find((d) => d.context.title)

        const title = matchWithTitle?.context.title || SITE_NAME

        const matchWithDescription = [
            ...matches,
        ]
            .reverse()
            .find((d) => d.context.description)

        const description = matchWithDescription?.context.description

        const canonical = canonicalUrl(location.pathname)

        return (
            <Fragment>
                <title>{title}</title>
                {description && (
                    <meta name="description" content={description} />
                )}
                <link rel="canonical" href={canonical} />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content={SITE_NAME} />
                <meta property="og:title" content={title} />
                {description && (
                    <meta property="og:description" content={description} />
                )}
                <meta property="og:url" content={canonical} />
                <meta property="og:image" content={OG_IMAGE} />
                <meta property="og:image:alt" content={OG_IMAGE_ALT} />
                <meta property="og:locale" content="en_US" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={title} />
                {description && (
                    <meta name="twitter:description" content={description} />
                )}
                <meta name="twitter:image" content={OG_IMAGE} />
                <meta name="twitter:image:alt" content={OG_IMAGE_ALT} />
                <RootLayout />
            </Fragment>
        )
    },
})
