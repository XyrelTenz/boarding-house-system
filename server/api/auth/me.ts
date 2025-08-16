export default defineEventHandler((event) => {
    const cookie = getCookie(event, 'user')
    if (!cookie) {
        return { authenticated: false }
    }

    try {
        const user = JSON.parse(cookie)
        return { authenticated: true, user }
    } catch {
        return { authenticated: false }
    }
})