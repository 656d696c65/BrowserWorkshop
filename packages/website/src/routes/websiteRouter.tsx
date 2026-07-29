import { createRouter, type LinkProps } from "@tanstack/react-router"
import { websiteTree } from "./websiteTree.js"

export const websiteRouter = createRouter({
    routeTree: websiteTree,
    context: {
        title: undefined,
    },
})

export type ValidRoutes = LinkProps["to"]
export type ValidParams = LinkProps["params"]

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof websiteRouter
    }
}
