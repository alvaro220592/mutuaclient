import { boot } from 'quasar/wrappers'
import { initializeGoogle } from 'src/services/google-auth'
import { Capacitor } from '@capacitor/core'

export default boot(async () => {
    const enabled = import.meta.env.VITE_GOOGLE_AUTH_ENABLED === 'true'
    const isNative = Capacitor.isNativePlatform()

    // se estiver desativado, não faz nada
    if (!enabled) {
        console.log('[GoogleAuth] desativado via .env')
        return
    }

    // evita crash no dev web
    if (!isNative) {
        console.log('[GoogleAuth] não nativo → ignorado')
        return
    }

    try {
        await initializeGoogle()
        console.log('[GoogleAuth] inicializado com sucesso')
    } catch (err) {
        console.warn('[GoogleAuth] falhou ao inicializar:', err)
    }
})