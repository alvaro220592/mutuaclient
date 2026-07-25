<template>
    <div>
        <div class="row items-center justify-center q-col-gutter-sm">

            <div class="q-pt-md text-caption">
                Se quiser, filtre os resultados nos campos abaixo
            </div>

            <!-- PERFIL -->
            <div class="col-12 col-md-2">
                <q-select dense outlined v-model="filtros.perfil" label="Perfil de doação" :options="perfisDoacao"
                    option-label="nome" option-value="id" emit-value map-options @update:model-value="buscarDoacoes" />
            </div>

            <!-- CATEGORIA -->
            <div class="col-12 col-md-2">
                <q-select dense outlined v-model="filtros.categoria" label="Categoria" :options="categoriasDoacao"
                    option-label="nome" option-value="id" emit-value map-options @update:model-value="buscarDoacoes" />
            </div>
        </div>

        <q-space class="q-my-md" />

        <!-- BOTÃO BUSCAR -->
        <div class="row q-gutter-md">
            <!-- <q-btn class="botao-primario" label="Buscar" @click="buscarDoacoes" /> -->
            <q-btn v-if="filtros.perfil !== null || filtros.categoria !== null" @click="limparFiltros"
                class="botao-primario" label="Limpar filtros" />
        </div>

        <q-space class="q-mt-md q-mt-lg" />

        <VisualizacaoModoMapa v-if="regiaoUsuario.latitude && regiaoUsuario.longitude" :doacoes="doacoes"
            :latitudeUsuario="regiaoUsuario.latitude" :longitudeUsuario="regiaoUsuario.longitude" />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

import { carregarDoacoesMapa } from 'src/utils/doacoes'
import VisualizacaoModoMapa from 'src/components/doacao/VisualizacaoModoMapa.vue'
import { buscarDoacoesSolicitadasMapa } from 'src/services/doacao'

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
        buscar: buscarDoacoesSolicitadasMapa,
    })
}

// FILTROS
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