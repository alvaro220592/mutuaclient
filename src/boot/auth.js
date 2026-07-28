import { boot } from 'quasar/wrappers'
import { useAuthStore } from 'src/stores/auth'
import { trazerToken, removerToken } from 'src/services/storage'
import { dadosUsuario } from 'src/services/auth'

export default boot(async () => {
    const authStore = useAuthStore()
    const token = await trazerToken()

    if (!token) {
        return
    }

    try {
        const usuario = await dadosUsuario()

        authStore.setAuth(usuario, token)
    } catch (error) {
        console.error('Erro ao restaurar autenticação:', error)

        await removerToken()
        authStore.logout()
    }
})