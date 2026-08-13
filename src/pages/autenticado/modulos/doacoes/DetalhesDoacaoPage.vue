<template>
    <DetalhesDoacao :mostrarBotaoIrParaChat="true" :doacao="doacao" />
</template>

<script setup>
import { buscarDoacao } from 'src/services/doacao'
import {
    onMounted,
    ref
} from 'vue'
import { useRoute } from 'vue-router'
import DetalhesDoacao from './DetalhesDoacao.vue'
import { carregandoBasico, ocultarCarregando } from 'src/utils/carregando.js'

const route = useRoute()

const doacao = ref({})

onMounted(async () => {
    await carregarDoacao(route.params.id)
})

const carregarDoacao = async (id) => {
    try {
        carregandoBasico()

        const dados = await buscarDoacao(id)
        doacao.value = dados.doacao

    } catch (error) {
        alert(JSON.stringify(error) ?? error)

    } finally {
        ocultarCarregando()
    }
}

</script>

<style lang="scss" scoped></style>