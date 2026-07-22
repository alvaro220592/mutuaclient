<template>
    <div class="box">
        <TituloPagina titulo="Termos de Uso" :descricao="ultimaAtualizacao" />

        <SpinnerCarregamento :carregando="carregando" />

        <div v-html="termoUso.conteudo"></div>
    </div>
</template>

<script setup>
import SpinnerCarregamento from 'src/components/SpinnerCarregamento.vue';
import TituloPagina from 'src/components/TituloPagina.vue';
import { get } from 'src/services/http';
import { onMounted, ref } from 'vue';

const termoUso = ref({ conteudo: '' })
const ultimaAtualizacao = ref('...')
const carregando = ref(false)

onMounted(() => {
    trazerAtual()
})

const trazerAtual = async () => {
    try {
        carregando.value = true
        const dados = await get('/termo-uso/atual',)
        termoUso.value = dados
        ultimaAtualizacao.value = 'Última atualização: ' + termoUso.value.dataCriacaoPtBr

    } catch (e) {
        alert(JSON.stringify(e))
    } finally {
        carregando.value = false
    }
}

</script>

<style lang="scss" scoped>
:deep(h1) {
    font-size: 36px;
}

:deep(h2) {
    font-size: 28px;
}

:deep(h3) {
    font-size: 24px;
}

:deep(h4) {
    font-size: 20px;
}

:deep(ul) {
    list-style: '- ';
    padding-left: 15px;
}
</style>