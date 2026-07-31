import { getIsAuthenticated } from "./getIsAuthenticated.js"

export async function getUserSession() {
    const isAuthenticated =
        getIsAuthenticated()

    if (isAuthenticated === true) {
        return undefined
    }
    return undefined
}
