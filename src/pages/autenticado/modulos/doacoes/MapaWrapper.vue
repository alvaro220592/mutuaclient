<template>
    <div>
        <SpinnerCarregamento v-if="carregando" :carregando="carregando" />

        <div v-else>
            <div class="row items-center justify-center q-col-gutter-sm">

                <div class="q-pt-md text-caption">
                    Se quiser, filtre os resultados nos campos abaixo
                </div>

                <!-- PERFIL -->
                <div class="col-12">
                    <q-select dense outlined clearable v-model="filtros.perfil"
                        label="Perfil (oferecidas ou solicitadas)" :options="perfisDoacao" option-label="nome"
                        option-value="id" emit-value map-options @update:model-value="buscarDoacoes" />
                </div>

                <!-- CATEGORIA -->
                <div class="col-12">
                    <q-select dense outlined multiple clearable v-model="filtros.categorias"
                        label="Categoria (móveis, roupas, etc.)" :options="categoriasDoacao" option-label="nome"
                        option-value="id" emit-value map-options @update:model-value="buscarDoacoes" />
                </div>

                <div class="row items-center q-px-none">
                    <q-checkbox color="positive" v-model="filtros.apenasCategoriasInteresse"
                        @update:model-value="buscarDoacoes" />

                    <div class="col q-pt-xs">
                        <div class="text-body2">
                            Apenas categorias do meu interesse
                        </div>

                        <div class="text-caption text-grey">
                            Exibe apenas tipos de doações que você está oferecendo ou solicitando
                        </div>
                    </div>
                </div>
            </div>

            <q-space class="q-my-md" />

            <!-- BOTÃO LIMPAR FILTROS -->
            <div v-if="filtros.perfil !== null || filtros.categorias.length > 0" class="row justify-center">
                <q-btn @click="limparFiltros" outline dense label="Limpar filtros" />
            </div>

            <q-space class="q-my-md" />

            <div>
                <span v-if="doacoes.length > 0">{{ doacoes.length }} resultado(s) encontrado(s)</span>
                <span v-else>Nenhum resultado encontrado</span>
            </div>

            <VisualizacaoModoMapa :doacoes="doacoes" :latitudeUsuario="latitudeInicial"
                :longitudeUsuario="longitudeInicial" />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

import { carregarDoacoesMapa } from 'src/utils/doacoes'
import VisualizacaoModoMapa from 'src/components/doacao/VisualizacaoModoMapa.vue'
import { buscarDoacoesMapa } from 'src/services/doacao'
import SpinnerCarregamento from 'src/components/SpinnerCarregamento.vue'

// FILTROS
const filtros = ref({
    statusAtivo: true,
    perfil: null,
    categorias: [],
    apenasCategoriasInteresse: false
})

// DADOS
const doacoes = ref([])
const categoriasDoacao = ref([])
const perfisDoacao = ref([])
const latitudeInicial = ref(null)
const longitudeInicial = ref(null)

const carregando = ref(false)

// BUSCA
const buscarDoacoes = async () => {
    filtros.value.categorias ??= [] // evita que que o array se torne null ao limpar pelo clearable do select

    await carregarDoacoesMapa({
        carregando,
        filtros,
        categoriasDoacao,
        perfisDoacao,
        doacoes,
        latitudeInicial,
        longitudeInicial,
        buscar: buscarDoacoesMapa
    })
}

// limpar FILTROS
const limparFiltros = async () => {
    filtros.value = {
        statusAtivo: true,
        perfil: null,
        categorias: [],
        apenasCategoriasInteresse: false
    }

    await buscarDoacoes()
}

// INICIALIZAÇÃO
onMounted(async () => {
    await buscarDoacoes()
})
</script>