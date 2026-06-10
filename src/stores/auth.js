// src/stores/auth.js
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: null
    }),

    actions: {
        setAuth(user, token) {
            this.user = user
            this.token = token
        },

        logout() {
            this.user = null
            this.token = null
        }
    }
})