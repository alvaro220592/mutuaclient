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

                <div class="col-12">
                    <q-select dense outlined v-model="filtros.usuario" label="Usuário" :options="usuarios"
                        option-label="name" option-value="id" emit-value map-options clearable
                        @update:model-value="buscarDoacoes" />
                </div>
            </div>

            <q-space class="q-my-md" />

            <!-- BOTÃO LIMPAR FILTROS -->
            <div v-if="filtros.perfil !== null || filtros.categorias.length > 0 || filtros.usuario != null"
                class="row justify-center">
                <q-btn @click="limparFiltros" outline dense label="Limpar filtros" />
            </div>

            <q-space class="q-my-md" />

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
import { buscarUsuarios } from 'src/services/info-usuario'
import { notificarErro } from 'src/utils/notificacao'

// FILTROS
const filtros = ref({
    statusAtivo: true,
    perfil: null,
    usuario: null,
    categorias: []
})

// DADOS
const doacoes = ref([])
const categoriasDoacao = ref([])
const perfisDoacao = ref([])
const usuarios = ref([])
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

const trazerUsuarios = async () => {
    try {
        const dados = await buscarUsuarios()
        usuarios.value = dados.usuarios

    } catch (erro) {
        notificarErro(JSON.stringify(erro))
    }
}

// limpar FILTROS
const limparFiltros = async () => {
    filtros.value = {
        statusAtivo: true,
        perfil: null,
        usuario: null,
        categorias: []
    }

    await buscarDoacoes()
}

// INICIALIZAÇÃO
onMounted(async () => {
    await buscarDoacoes()
    await trazerUsuarios()
})
</script>