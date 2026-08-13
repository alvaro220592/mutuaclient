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
import { useQuasar } from 'quasar'

const route = useRoute()
const $q = useQuasar()

const doacao = ref({})

onMounted(async () => {
    await carregarDoacao(route.params.id)
})

const carregarDoacao = async (id) => {
    try {
        $q.loading.show({
            message: 'Carregando'
        })

        const dados = await buscarDoacao(id)
        doacao.value = dados.doacao

    } catch (error) {
        alert(JSON.stringify(error) ?? error)

    } finally {
        $q.loading.hide()
    }
}

</script>

<style lang="scss" scoped></style>