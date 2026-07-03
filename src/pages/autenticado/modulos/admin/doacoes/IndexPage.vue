<template>
    <div>
        <TituloPagina titulo="Doações (colocar o nome do perfil da doação no card)" />




        <!-- BARRA DE FILTROS -->
        <q-card flat bordered class="q-pa-sm q-mb-md">

            <div class="row items-center q-col-gutter-sm">

                <!-- TIPO -->
                <div class="col-12 col-md-2">
                    <q-select dense outlined label="Tipo" />
                </div>

                <!-- STATUS -->
                <div class="col-12 col-md-2">
                    <q-select dense outlined label="Status" />
                </div>

                <!-- PERFIL -->
                <div class="col-12 col-md-3">
                    <q-select dense outlined label="Perfil" />
                </div>

                <!-- CATEGORIA -->
                <div class="col-12 col-md-3">
                    <q-select dense outlined label="Categoria" />
                </div>

                <!-- BUSCA -->
                <div class="col-12 col-md-2">
                    <q-input dense outlined label="Buscar">
                        <template v-slot:append>
                            <q-icon name="search" />
                        </template>
                    </q-input>
                </div>

            </div>

            <!-- FILTROS ATIVOS (CHIPS) -->
            <div class="row q-gutter-sm q-mt-sm">

                <q-chip removable color="primary" text-color="white">
                    Ativas
                </q-chip>

                <q-chip removable color="secondary" text-color="white">
                    Oferecidas
                </q-chip>

                <q-chip removable color="orange" text-color="white">
                    Perfil: Básico
                </q-chip>

                <q-space />

                <!-- LIMPAR -->
                <q-btn flat dense color="negative" label="Limpar filtros" />

            </div>

        </q-card>



        <div class="text-center q-mt-lg q-mb-sm">

            <!-- VISUALIZAÇÃO POR LISTA OU MAPA -->
            <q-btn-toggle v-model="modoVisualizacao" :options="[
                { label: 'Lista', value: 'lista', icon: 'view_list' },
                { label: 'Mapa', value: 'mapa', icon: 'map' }
            ]" />
        </div>

        <DoacoesModoLista v-if="modoVisualizacao === 'lista'" :doacoes="doacoes" :funcaoCarregarMais="carregarMais"
            @editar="editarDoacao" @alternar-status="alternarStatus" @excluir="mostrarConfirmacaoExclusao" />

        <!-- BIBLIOTECA: OpenStreetMap + Leaflet -->
        <DoacoesModoMapa v-else />





        <div v-if="doacoes.data.length === 0" class="text-center text-grey q-mt-xl">
            Nenhum registro encontrado
        </div>



        <BotaoFlutuanteNovoCadastro nomeRota="admin.doacoes.novo" />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import { buscar } from 'src/services/doacao'
import { useDoacaoAcoes } from 'src/composables/useDoacaoAcoes'
import { useRolagemInfinita } from 'src/composables/useRolagemInfinita'
import BotaoFlutuanteNovoCadastro from 'src/components/BotaoFlutuanteNovoCadastro.vue'
import TituloPagina from 'src/components/TituloPagina.vue'
import DoacoesModoLista from './DoacoesModoLista.vue'
import DoacoesModoMapa from './DoacoesModoMapa.vue'

const router = useRouter()

// Cria uma instância do composable.
// O parâmetro é uma função que sabe buscar
// uma página de doações.
const paginacao = useRolagemInfinita(
    async function (pagina) {
        const dados = await buscar(pagina)

        // O composable espera receber apenas o objeto paginado.
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

const modoVisualizacao = ref('lista')

const editarDoacao = function (doacao) {
    router.push({
        name: 'admin.doacoes.editar',
        params: {
            id: doacao.id
        }
    })
}

onMounted(function () {
    trazerDoacoes()
})
</script>