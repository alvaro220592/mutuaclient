import { Preferences } from '@capacitor/preferences';

export async function setToken(token) {
    await Preferences.set({
        key: 'token',
        value: token,
    })
}

export async function getToken() {
    const { value } = await Preferences.get({
        key: 'token',
    })

    return value || null
}

export async function removeToken() {
    await Preferences.remove({
        key: 'token',
    })
}