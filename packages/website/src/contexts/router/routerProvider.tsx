import { RouterProvider as Router } from "@tanstack/react-router"
import { websiteRouter } from "../../routes/websiteRouter"

export function RouterProvider() {
    return (
        <Router
            router={websiteRouter}
        />
    )
}
