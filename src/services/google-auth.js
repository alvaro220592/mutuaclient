import { GoogleSignIn } from '@capawesome/capacitor-google-sign-in'
import { post } from './http'

export async function initializeGoogle() {
    await GoogleSignIn.initialize({
        clientId: import.meta.env.VITE_GOOGLE_AUTH_WEB_CLIENT_ID,
        scopes: [
            'https://www.googleapis.com/auth/userinfo.profile',
        ],
    })
}

export async function loginGoogle() {
    return await GoogleSignIn.signIn()
}

export async function loginGoogleBackend(idToken) {
    return await post('/auth/login-google', { idToken }, false)
}