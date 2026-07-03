import { Preferences } from '@capacitor/preferences';

export async function armazenarToken(token) {
    await Preferences.set({
        key: 'token',
        value: token,
    })
}

export async function trazerToken() {
    const { value } = await Preferences.get({
        key: 'token',
    })

    return value || null
}

export async function removerToken() {
    await Preferences.remove({
        key: 'token',
    })
}

export async function armazenarTema(tema) {
    await Preferences.set({
        key: 'tema',
        value: String(tema),
    });
}

export async function trazerTema() {
    const { value } = await Preferences.get({
        key: 'tema',
    });

    return value;
}

export async function removerTema() {
    await Preferences.remove({
        key: 'tema',
    });
}