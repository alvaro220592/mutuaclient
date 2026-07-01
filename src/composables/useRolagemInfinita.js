import { ref } from 'vue'
import { useQuasar } from 'quasar'

export function useRolagemInfinita(
    buscarPagina
) {
    const $q = useQuasar()

    // Estado interno do composable.
    const registros = ref({
        data: [],
        current_page: 1,
        last_page: 1
    })

    const carregarPrimeiraPagina =
        async function () {

            // Busca a página 1.
            const dados =
                await buscarPagina(1)

            // Substitui o estado.
            registros.value = dados
        }

    const carregarMais =
        async function (_, done) {

            try {
                const paginaAtual =
                    registros.value.current_page

                const ultimaPagina =
                    registros.value.last_page

                // Não há mais páginas.
                if (
                    paginaAtual >=
                    ultimaPagina
                ) {
                    done()
                    return
                }

                const proximaPagina =
                    paginaAtual + 1

                const dados =
                    await buscarPagina(
                        proximaPagina
                    )

                const registrosAntigos =
                    registros.value.data

                const registrosNovos =
                    dados.data

                registros.value = {
                    ...dados,

                    data: [
                        ...registrosAntigos,
                        ...registrosNovos
                    ]
                }
            }
            catch (erro) {
                $q.notify({
                    type: 'negative',
                    message:
                        erro.message ||
                        'Erro ao carregar dados.',
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