import { ref } from 'vue'
import { obterEcho } from 'src/services/echo'
import { notificacaoGeral, notificarErro } from 'src/utils/notificacao'
import { buscarNotificacoes, marcarComoLidas } from 'src/services/notificacao'

const notificacoes = ref([])
const notificacoesNaoLidas = ref(0)

let canal = null

const obterLinkNotificacao = notificacao => {
    if (notificacao.data.tipo === 'nova_doacao_interesse') {
        return {
            name: 'doacoes.detalhes',
            params: {
                id: notificacao.data.doacao_id
            }
        }
    }

    return null
}

const carregarNotificacoesSininho = async (pagina = 1, porPagina = 20) => {
    try {
        const data = await buscarNotificacoes(pagina, porPagina)

        notificacoes.value = data.notificacoes.data.map(notificacao => ({
            id: notificacao.id,
            texto: notificacao.data.mensagem,
            tempo: notificacao.dataAmigavel,
            lida: notificacao.read_at !== null,
            tipo: notificacao.data.tipo,
            link: obterLinkNotificacao(notificacao)
        }))

        notificacoesNaoLidas.value = data.notificacoesNaoLidas
    } catch (erro) {
        notificarErro(erro.message)
    }
}

const carregarNotificacoes = async ({
    pagina,
    porPagina,
    carregando,
    terminou,
}) => {

    if (terminou.value || carregando.value) {
        return
    }

    try {
        carregando.value = true
        const dados = await buscarNotificacoes(pagina.value, porPagina.value)

        const novasNotificacoes = dados.notificacoes.data.map(notificacao => ({
            id: notificacao.id,
            texto: notificacao.data.mensagem,
            tempo: notificacao.dataAmigavel,
            lida: notificacao.read_at !== null,
            tipo: notificacao.data.tipo,
            link: obterLinkNotificacao(notificacao)
        }))

        notificacoes.value.push(...novasNotificacoes)

        notificacoesNaoLidas.value = dados.notificacoesNaoLidas

        if (dados.notificacoes.current_page >= dados.notificacoes.last_page) {
            terminou.value = true
        } else {
            pagina.value++
        }

    } catch (erro) {
        notificarErro(erro.message)

    } finally {
        carregando.value = false
    }
}

const marcarNotificacoesComoLidas = async () => {
    await marcarComoLidas()

    notificacoesNaoLidas.value = 0

    notificacoes.value.forEach(notificacao => {
        notificacao.lida = true
    })
}

const iniciarListenerNotificacoes = async (userId, router) => {
    if (canal) {
        return
    }

    const echo = await obterEcho()

    canal = echo
        .private(`App.Models.User.${userId}`)

    canal.notification(notificacao => {
        notificacoes.value.unshift({
            id: notificacao.id ?? crypto.randomUUID(),
            texto: notificacao.mensagem,
            tempo: 'agora',
            lida: false,
            tipo: notificacao.tipo,
            link: obterLinkNotificacao({
                data: notificacao
            })
        })

        notificacoesNaoLidas.value++

        let icone = ''
        let rota = ''
        let label = ''
        let parametros = {}

        if (notificacao.tipo == 'nova_doacao_interesse') {
            icone = 'volunteer_activism'
            rota = 'doacoes.detalhes'
            label = 'Ver'
            parametros = { id: notificacao.doacao_id }
        }

        notificacaoGeral({
            icone,
            mensagem: notificacao.mensagem,
            router,
            acoes: {
                rota: rota,
                label: label
            },
            params: parametros
        })
    })
}

export function useNotificacoes() {
    return {
        notificacoes,
        notificacoesNaoLidas,
        carregarNotificacoes,
        carregarNotificacoesSininho,
        marcarNotificacoesComoLidas,
        iniciarListenerNotificacoes
    }
}