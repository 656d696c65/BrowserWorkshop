import { createRoute, redirect, useParams } from "@tanstack/react-router"
import {
    type ComponentType,
    type LazyExoticComponent,
    lazy,
    Suspense,
} from "react"
import { CircularLoader } from "@/components/circularLoader"
import { Page } from "@/components/layouts/page/page.js"
import { getToolById, internalTools } from "@/features/tools/toolsRegistry.js"
import { toolsLayoutRoute } from "./toolsLayoutRoute.js"

const internalComponents = new Map<string, LazyExoticComponent<ComponentType>>()
for (const tool of internalTools) {
    internalComponents.set(tool.id, lazy(tool.component))
}

export const toolDetailRoute = createRoute({
    getParentRoute: () => toolsLayoutRoute,
    path: "$toolId",
    pendingComponent: () => <CircularLoader />,
    beforeLoad: ({ params }) => {
        const tool = getToolById(params.toolId)
        if (!tool || !("component" in tool)) {
            throw redirect({
                to: "/",
            })
        }
        return {
            title: `${tool.name} | BrowserWorkshop`,
            description: tool.description,
        }
    },
    component: () => {
        const { toolId } = useParams({
            from: "/tools/$toolId",
        })
        const tool = getToolById(toolId)
        const Component = internalComponents.get(toolId)
        if (!tool || !Component) {
            return null
        }
        return (
            <Page.Root>
                <Page.Header>
                    <Page.Title>{tool.name}</Page.Title>
                    <Page.Description>{tool.description}</Page.Description>
                </Page.Header>
                <Page.Body>
                    <Suspense fallback={<CircularLoader />}>
                        <Component />
                    </Suspense>
                </Page.Body>
            </Page.Root>
        )
    },
})
