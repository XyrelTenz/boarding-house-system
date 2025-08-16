export default defineNuxtRouteMiddleware((to) => {
    const user = useState<any>('user', () => null)
    const session = useCookie('session')

    // Load session into state if exists
    if (!user.value && session.value) {
        try {
            user.value = JSON.parse(session.value)
        } catch {
            user.value = null
        }
    }

    // Redirect if no user and not on login/signup
    if (!user.value && !['/auth/login', '/auth/signup'].includes(to.path)) {
        return navigateTo('/auth/login')
    }
})
