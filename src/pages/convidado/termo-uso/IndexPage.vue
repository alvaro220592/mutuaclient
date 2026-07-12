<template>

    <q-page class="flex flex-center q-pa-md">

        <div class="box">
            <TituloPagina titulo="Termos de Uso" :descricao="'Última atualização: ' + termoUso.dataCriacaoPtBr" />

            <div v-html="termoUso.conteudo"></div>

        </div>
    </q-page>
</template>

<script setup>
import TituloPagina from 'src/components/TituloPagina.vue';
import { get } from 'src/services/http';
import { onMounted, ref } from 'vue';

const termoUso = ref({ conteudo: '' })

onMounted(() => {
    trazerAtual()
})

const trazerAtual = async () => {
    try {
        const dados = await get('/termo-uso/atual',)
        termoUso.value = dados

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