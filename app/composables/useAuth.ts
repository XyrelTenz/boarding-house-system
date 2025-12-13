export function useAuth() {
    const user = useState<any>('user', () => null)
    const session = useCookie('session')

    function login(userData: any) {
        user.value = userData
        session.value = JSON.stringify(userData)
    }

// Remove Session and Token
    function logout() {
        user.value = null
        session.value = null
        navigateTo('/auth/login')
    }

    return { user, login, logout }
}
