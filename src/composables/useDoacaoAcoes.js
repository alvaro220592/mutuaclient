// src/composables/useDoacaoAcoes.js

import { useQuasar } from 'quasar'
import { excluir, mudarStatus } from 'src/services/doacao'
import { carregandoBasico, ocultarCarregando } from 'src/utils/carregando'
import { notificarErro, notificarSucesso } from 'src/utils/notificacao'

export function useDoacaoAcoes(doacoes) {
    const $q = useQuasar()

    const alternarStatus =
        async function (doacao) {
            try {
                carregandoBasico()

                const dados = await mudarStatus({ id: doacao.id })

                doacao.ativo = !doacao.ativo

                notificarSucesso(dados.message)
            }
            catch (erro) {
                notificarErro(erro.message || 'Erro ao alterar status')

            } finally {
                ocultarCarregando()
            }
        }

    const confirmarExclusao = async function (id) {
        try {
            carregandoBasico()

            const dados = await excluir(id)
            const listaAtual = doacoes.value

            doacoes.value = listaAtual.filter(
                function (doacao) {
                    return doacao.id !== id
                }
            )

            notificarSucesso(dados.message)
        }
        catch (erro) {
            notificarErro(erro.message || 'Erro ao excluir')

        } finally {
            ocultarCarregando()
        }
    }

    const mostrarConfirmacaoExclusao = function (doacao) {
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

    return { alternarStatus, mostrarConfirmacaoExclusao }
}