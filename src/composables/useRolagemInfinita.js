import { ref } from 'vue'
import { notificarErro } from 'src/utils/notificacao'

export function useRolagemInfinita(buscarPagina) {

    const registros = ref({
        data: [],
        current_page: 1,
        last_page: 1
    })

    const filtrosAtuais = ref({})

    const carregarPrimeiraPagina = async function (filtros = {}) {
        try {
            filtrosAtuais.value = filtros
            const dados = await buscarPagina(1, filtros)
            registros.value = dados

        } catch (e) {
            alert(JSON.stringify(e))
        }
    }

    const carregarMais = async function (_, done) {
        try {
            const paginaAtual = registros.value.current_page
            const ultimaPagina = registros.value.last_page

            if (paginaAtual >= ultimaPagina) {
                done()
                return
            }

            const proximaPagina = paginaAtual + 1

            const dados = await buscarPagina(
                proximaPagina,
                filtrosAtuais.value
            )

            registros.value = {
                ...dados,
                data: [
                    ...registros.value.data,
                    ...dados.data
                ]
            }
        }
        catch (erro) {
            notificarErro(erro.message || 'Erro ao carregar dados')
        }
        finally {
            done()
        }
    }

    return {
        registros,
        carregarPrimeiraPagina,
        carregarMais
    }
}