import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

import { trazerToken } from './storage'

window.Pusher = Pusher

let echo = null

export async function iniciarEcho() {
    const token = await trazerToken()

    if (!token) {
        throw new Error('Token não encontrado para iniciar o Echo.')
    }

    Pusher.logToConsole = true
    echo = new Echo({
        broadcaster: 'reverb',
        key: import.meta.env.VITE_REVERB_APP_KEY,
        wsHost: import.meta.env.VITE_REVERB_HOST,
        wsPort: Number(import.meta.env.VITE_REVERB_PORT),
        wssPort: Number(import.meta.env.VITE_REVERB_PORT),
        forceTLS: import.meta.env.VITE_REVERB_SCHEME === 'https',
        enabledTransports: ['ws', 'wss'],
        authEndpoint: `${import.meta.env.VITE_API_BASE_URL}/broadcasting/auth`,
        logToConsole: true,
        auth: {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    })

    return echo
}

export async function obterEcho() {
    if (!echo) {
        await iniciarEcho()
    }

    return echo
}