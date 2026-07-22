<template>
    <div>
        <TituloPagina titulo="Política de Privacidade" :descricao="ultimaAtualizacao" />

        <SpinnerCarregamento :carregando="carregando" />

        <div v-html="politicaPrivacidade.conteudo"></div>
    </div>
</template>

<script setup>
import SpinnerCarregamento from 'src/components/SpinnerCarregamento.vue';
import TituloPagina from 'src/components/TituloPagina.vue';
import { get } from 'src/services/http';
import { onMounted, ref } from 'vue';

const politicaPrivacidade = ref({ conteudo: '' })
const carregando = ref(false)
const ultimaAtualizacao = ref('...')

onMounted(() => {
    trazerAtual()
})

const trazerAtual = async () => {
    try {
        carregando.value = true
        const dados = await get('/politica-privacidade/atual',)
        politicaPrivacidade.value = dados
        ultimaAtualizacao.value = 'Última atualização: ' + politicaPrivacidade.value.dataCriacaoPtBr

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