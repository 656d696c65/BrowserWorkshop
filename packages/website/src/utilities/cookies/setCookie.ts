export function setCookie(name: string, value: string) {
    // biome-ignore lint/suspicious/noDocumentCookie: necessary for setting cookies
    document.cookie = `${name}=${value}; path=/; SameSite=Lax`
}
