<template>
    <div>
        <SpinnerCarregamento v-if="carregando" :carregando="carregando" />

        <div v-else>
            <div class="row items-center justify-center q-col-gutter-sm">

                <div class="q-pt-md text-caption">
                    Se quiser, filtre os resultados nos campos abaixo
                </div>

                <!-- PERFIL -->
                <div class="col-12 col-md-2">
                    <q-select dense outlined v-model="filtros.perfil" label="Perfil de doação" :options="perfisDoacao"
                        option-label="nome" option-value="id" emit-value map-options
                        @update:model-value="buscarDoacoes" />
                </div>

                <!-- CATEGORIA -->
                <div class="col-12 col-md-2">
                    <q-select dense outlined v-model="filtros.categoria" label="Categoria" :options="categoriasDoacao"
                        option-label="nome" option-value="id" emit-value map-options
                        @update:model-value="buscarDoacoes" />
                </div>
            </div>

            <q-space class="q-my-md" />

            <!-- BOTÃO LIMPAR FILTROS -->
            <div v-if="filtros.perfil !== null || filtros.categoria !== null" class="row justify-center">
                <q-btn @click="limparFiltros" outline dense label="Limpar filtros" />
            </div>

            <q-space class="q-my-md" />

            <VisualizacaoModoMapa v-if="regiaoUsuario.latitude && regiaoUsuario.longitude" :doacoes="doacoes"
                :latitudeUsuario="regiaoUsuario.latitude" :longitudeUsuario="regiaoUsuario.longitude" />
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
    categoria: null
})

// DADOS
const doacoes = ref([])
const categoriasDoacao = ref([])
const perfisDoacao = ref([])
const regiaoUsuario = ref({})

const carregando = ref(false)

// BUSCA
const buscarDoacoes = async () => {
    await carregarDoacoesMapa({
        carregando,
        filtros,
        categoriasDoacao,
        perfisDoacao,
        doacoes,
        regiaoUsuario,
        buscar: buscarDoacoesMapa
    })
}

// limpar FILTROS
const limparFiltros = async () => {
    filtros.value = {
        statusAtivo: true,
        perfil: null,
        categoria: null
    }

    await buscarDoacoes()
}

// INICIALIZAÇÃO
onMounted(async () => {
    await buscarDoacoes()
})
</script>