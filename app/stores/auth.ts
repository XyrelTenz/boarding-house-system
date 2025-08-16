import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null as null | { id: number; email: string; username: string; role: string }
    }),
    actions: {
        async fetchUser() {
            const { data } = await useFetch('/api/auth/me')
            if (data.value?.authenticated) {
                this.user = data.value.user
            } else {
                this.user = null
            }
        },
        logout() {
            this.user = null
            useFetch('/api/auth/logout', { method: 'POST' })
        }
    }
})
