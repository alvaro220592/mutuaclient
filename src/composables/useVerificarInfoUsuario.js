import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { dadosUsuario } from 'src/services/info-usuario'

export function useVerificarInfoUsuario() {
    const router = useRouter()
    const $q = useQuasar()

    const verificarInfoUsuario = async () => {
        const dados = await dadosUsuario()

        if (!dados.usuario.regiao_usuario || !dados.usuario.telefone) {
            router.push({
                name: 'usuario.perfil',
                query: {
                    returnTo: router.currentRoute.value.fullPath
                }
            })

            $q.dialog({
                title: 'Complete seu cadastro',
                message: 'Para completar, você precisa inserir suas informações de telefone e endereço. Se não quiser fazer isso agora, basta clicar para voltar à tela inicial ou em "Cancelar" no final da página.',
                html: true,
                persistent: true,
                cancel: {
                    label: 'Voltar à tela inicial',
                    textColor: 'primary',
                    outline: true,
                },
                ok: {
                    label: 'Ok',
                    outline: true,
                    color: 'primary',
                }
            }).onCancel(() => {
                router.replace({ name: 'home' })
            })

            return false
        }

        return true
    }

    return {
        verificarInfoUsuario
    }
}