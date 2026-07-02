<template>
    <div>
        <TituloPagina titulo="Suas solicitações de doação" />

        <div v-if="doacoes.data.length === 0" class="text-center text-grey q-mt-xl">
            Nenhum registro encontrado
        </div>

        <q-infinite-scroll v-else @load="carregarMais">
            <div class="column q-gutter-md">
                <DoacaoCard v-for="doacao in doacoes.data" :key="doacao.id" :doacao="doacao" @editar="editarDoacao"
                    @alternar-status="alternarStatus" @excluir="mostrarConfirmacaoExclusao" />
            </div>
        </q-infinite-scroll>

        <BotaoFlutuanteNovoCadastro nomeRota="doacoes.solicitadas.novo" />
    </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

import { buscarSolicitadas } from 'src/services/doacao'
import { useDoacaoAcoes } from 'src/composables/useDoacaoAcoes'
import { useRolagemInfinita } from 'src/composables/useRolagemInfinita'
import BotaoFlutuanteNovoCadastro from 'src/components/BotaoFlutuanteNovoCadastro.vue'
import DoacaoCard from 'src/components/doacao/DoacaoCard.vue'
import TituloPagina from 'src/components/TituloPagina.vue'

const router = useRouter()

// Cria uma instância do composable.
// O parâmetro é uma função que sabe buscar
// uma página de solicitações.
const paginacao = useRolagemInfinita(
    async function (pagina) {
        const dados = await buscarSolicitadas(pagina)

        // O composable espera receber apenas
        // o objeto paginado.
        return dados.doacoes
    }
)

// O composable criou uma ref chamada "registros".
// Nesta tela, ela representa as doações.
const doacoes = paginacao.registros

// Função que carrega a primeira página.
const trazerDoacoes = paginacao.carregarPrimeiraPagina

// Função usada pelo QInfiniteScroll.
const carregarMais = paginacao.carregarMais

// Cria uma instância do composable de ações.
const acoesDoacao = useDoacaoAcoes(doacoes)

// Obtém as funções do composable.
const alternarStatus = acoesDoacao.alternarStatus

const mostrarConfirmacaoExclusao = acoesDoacao.mostrarConfirmacaoExclusao

const editarDoacao = function (doacao) {
    router.push({
        name: 'doacoes.solicitadas.editar',
        params: {
            id: doacao.id
        }
    })
}

onMounted(function () {
    trazerDoacoes()
})
</script>