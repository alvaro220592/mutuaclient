import { ref } from 'vue'
import { useQuasar } from 'quasar'

export function useRolagemInfinita(buscarPagina) {
    const $q = useQuasar()

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
            $q.notify({
                type: 'negative',
                message: erro.message || 'Erro ao carregar dados.',
                position: 'top-right'
            })
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