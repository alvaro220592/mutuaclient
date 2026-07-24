<template>
    <div>
        <TituloPagina titulo="Doações" descricao="Acesso ADMIN" />

        <!-- BARRA DE FILTROS -->
        <!-- <q-card flat bordered class="q-pa-sm q-mb-md"> -->

        <div class="row items-center q-col-gutter-sm">

            <!-- PERFIL -->
            <div class="col-12 col-md-2">
                <q-select dense outlined v-model="filtros.perfil" label="Perfil" :options="perfisDoacao"
                    option-label="nome" option-value="id" emit-value map-options />
            </div>

            <!-- CATEGORIA -->
            <div class="col-12 col-md-2">
                <q-select dense outlined v-model="filtros.categoria" label="Categoria" :options="categoriasDoacao"
                    option-label="nome" option-value="id" emit-value map-options />
            </div>

            <!-- STATUS -->
            <div class="col-12 col-md-2">
                <q-select dense outlined label="Status" v-model="filtros.statusAtivo" :options="statusOptions"
                    option-label="label" option-value="value" emit-value map-options />
            </div>

            <!-- BOTÃO BUSCAR -->
            <div class="col-12 col-md-2">
                <q-btn class="botao-primario" label="Buscar" @click="buscarComFiltros" />
            </div>

        </div>

        <q-space class="q-mb-sm" />

        <!-- LIMPAR -->
        <div class="row justify-center">
            <q-btn v-if="filtros.perfil !== null || filtros.categoria !== null" @click="limparFiltros" flat dense
                color="negative" label="Limpar filtros" />
        </div>

        <!-- TIPO DE VISUALIZAÇÃO -->
        <div class="text-center q-mt-lg q-mb-sm">
            <q-btn-toggle class="borda-toggle" :toggle-text-color="Dark.isActive ? 'dark' : ''"
                v-model="modoVisualizacao" :options="[
                    { label: 'Mapa', value: 'mapa', icon: 'map' },
                    { label: 'Lista', value: 'lista', icon: 'view_list' }
                ]" />
        </div>

        <div v-if="doacoes.length === 0" class="text-center text-grey q-mt-xl">
            Nenhum registro encontrado
        </div>

        <div v-else>
            <VisualizacaoModoLista v-if="modoVisualizacao === 'lista'" :doacoes="doacoes"
                :funcaoCarregarMais="carregarMais" @editar="editarDoacao" @alternar-status="alternarStatus"
                @excluir="mostrarConfirmacaoExclusao" />

            <VisualizacaoModoMapa v-else :doacoes="doacoes" />
        </div>

        <BotaoFlutuanteNovoCadastro nomeRota="admin.doacoes.novo" />
    </div>
</template>

<!-- <script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Dark } from 'quasar'

import { buscar } from 'src/services/doacao'
import { useDoacaoAcoes } from 'src/composables/useDoacaoAcoes'
import { useRolagemInfinita } from 'src/composables/useRolagemInfinita'

import BotaoFlutuanteNovoCadastro from 'src/components/BotaoFlutuanteNovoCadastro.vue'
import TituloPagina from 'src/components/TituloPagina.vue'
import DoacoesModoLista from './DoacoesModoLista.vue'
import DoacoesModoMapa from './DoacoesModoMapa.vue'

const router = useRouter()

/* =========================
   FILTROS CENTRALIZADOS
========================= */
const filtros = ref({
    statusAtivo: true,
    perfil: null,
    categoria: null
})

/* =========================
   DADOS AUXILIARES
========================= */
const categoriasDoacao = ref([])
const perfisDoacao = ref([])

const statusOptions = [
    { label: 'Ativo', value: true },
    { label: 'Inativo', value: false }
]

/* =========================
   LIMPAR FILTROS
========================= */
const limparFiltros = async () => {
    filtros.value = {
        statusAtivo: true,
        perfil: null,
        categoria: null
    }

    await buscarComFiltros()
}

/* =========================
   PAGINAÇÃO INFINITA
========================= */
const paginacao = useRolagemInfinita(async function (pagina) {
    const dados = await buscar(pagina)

    if (pagina === 1) {
        categoriasDoacao.value = dados.categoriasDoacao
        perfisDoacao.value = dados.perfisDoacao.map(perfil => ({
            ...perfil,
            nome: perfil.nome.charAt(0).toUpperCase() + perfil.nome.slice(1) + 's'
        }))
    }

    return dados.doacoes
})

/* =========================
   BUSCAR COM FILTROS
========================= */
const buscarComFiltros = async () => {
    paginacao.registros.value = {
        data: [],
        current_page: 1,
        last_page: 1
    }

    const dados = await buscar(1, filtros.value)

    paginacao.registros.value = dados.doacoes
}

const doacoes = paginacao.registros
const trazerDoacoes = paginacao.carregarPrimeiraPagina
const carregarMais = paginacao.carregarMais

/* =========================
   AÇÕES
========================= */
const acoesDoacao = useDoacaoAcoes(doacoes)

const alternarStatus = acoesDoacao.alternarStatus
const mostrarConfirmacaoExclusao = acoesDoacao.mostrarConfirmacaoExclusao

const modoVisualizacao = ref('mapa')

const editarDoacao = (doacao) => {
    router.push({
        name: 'admin.doacoes.editar',
        params: { id: doacao.id }
    })
}

/* =========================
   INIT
========================= */
onMounted(() => {
    trazerDoacoes()
})
</script> -->


<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Dark } from 'quasar'
import { useDoacaoAcoes } from 'src/composables/useDoacaoAcoes'
import { carregarDoacoes } from 'src/utils/doacoes.js'

import BotaoFlutuanteNovoCadastro from 'src/components/BotaoFlutuanteNovoCadastro.vue'
import TituloPagina from 'src/components/TituloPagina.vue'
import VisualizacaoModoLista from 'src/components/doacao/VisualizacaoModoLista.vue'
import VisualizacaoModoMapa from 'src/components/doacao/VisualizacaoModoMapa.vue'

const router = useRouter()

//FILTROS
const filtros = ref({
    statusAtivo: true,
    perfil: null,
    categoria: null
})

const statusOptions = [
    { label: 'Ativo', value: true },
    { label: 'Inativo', value: false }
]

// DADOS
const doacoes = ref([])
const categoriasDoacao = ref([])
const perfisDoacao = ref([])

const modoVisualizacao = ref('mapa')

const carregando = ref(false)

const pagina = ref(1)

const terminou = ref(false)

const buscarDoacoes = async () => {
    await carregarDoacoes({
        carregando,
        terminou,
        pagina,
        filtros,
        categoriasDoacao,
        perfisDoacao,
        doacoes,
    })
}

// FILTROS
const atualizarLista = async () => {
    doacoes.value = []
    pagina.value = 1
    terminou.value = false

    await buscarDoacoes(1, () => { })
}

const limparFiltros = async () => {
    filtros.value = {
        statusAtivo: true,
        perfil: null,
        categoria: null
    }
    await atualizarLista()
}

// AÇÕES
const {
    alternarStatus,
    mostrarConfirmacaoExclusao
} = useDoacaoAcoes(doacoes)

const editarDoacao = (doacao) => {
    router.push({
        name: 'admin.doacoes.editar',
        params: {
            id: doacao.id
        }
    })
}

// INICIALIZAÇÃO
onMounted(() => {
    buscarDoacoes(1, () => { })
})
</script>

<style scoped>
.borda-toggle {
    border: 1px solid var(--q-primary);
}
</style>