// src/composables/useDoacaoAcoes.js

import { useQuasar } from 'quasar'
import { excluir, mudarStatus } from 'src/services/doacao'

export function useDoacaoAcoes(doacoes) {
    const $q = useQuasar()

    const alternarStatus =
        async function (doacao) {
            try {
                const dados =
                    await mudarStatus({
                        id: doacao.id
                    })

                doacao.ativo =
                    !doacao.ativo

                $q.notify({
                    type: 'positive',
                    message: dados.message,
                    position: 'top-right'
                })
            }
            catch (erro) {
                $q.notify({
                    type: 'negative',
                    message:
                        erro.message ||
                        'Erro ao alterar status',
                    position: 'top-right'
                })
            }
        }

    const confirmarExclusao =
        async function (id) {
            try {
                const dados =
                    await excluir(id)

                const listaAtual =
                    doacoes.value.data

                doacoes.value.data =
                    listaAtual.filter(
                        function (doacao) {
                            return doacao.id !== id
                        }
                    )

                $q.notify({
                    type: 'positive',
                    message: dados.message,
                    position: 'top-right'
                })
            }
            catch (erro) {
                $q.notify({
                    type: 'negative',
                    message:
                        erro.message ||
                        'Erro ao excluir',
                    position: 'top-right'
                })
            }
        }

    const mostrarConfirmacaoExclusao =
        function (doacao) {
            $q.dialog({
                title: 'Excluir registro',
                message:
                    'Esta ação não poderá ser desfeita.',
                persistent: true,
                cancel: {
                    label: 'Cancelar',
                    flat: true
                },
                ok: {
                    label: 'Excluir',
                    color: 'negative'
                }
            }).onOk(function () {
                confirmarExclusao(
                    doacao.id
                )
            })
        }

    return {
        alternarStatus,
        mostrarConfirmacaoExclusao
    }
}