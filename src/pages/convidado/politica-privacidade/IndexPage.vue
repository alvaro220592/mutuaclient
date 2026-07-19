<template>
    <div>
        <TituloPagina titulo="Política de Privacidade"
            :descricao="'Última atualização: ' + politicaPrivacidade.dataCriacaoPtBr" />

        <div v-html="politicaPrivacidade.conteudo"></div>
    </div>
</template>

<script setup>
import TituloPagina from 'src/components/TituloPagina.vue';
import { get } from 'src/services/http';
import { onMounted, ref } from 'vue';

const politicaPrivacidade = ref({ conteudo: '' })

onMounted(() => {
    trazerAtual()
})

const trazerAtual = async () => {
    try {
        const dados = await get('/politica-privacidade/atual',)
        politicaPrivacidade.value = dados

    } catch (e) {
        alert(JSON.stringify(e))
    }
}

</script>

<style lang="scss" scoped>
:deep(h1) {
    font-size: 30px;
}

:deep(h2) {
    font-size: 18px;
}

:deep(ul) {
    list-style: '- ';
    padding-left: 15px;
}
</style>