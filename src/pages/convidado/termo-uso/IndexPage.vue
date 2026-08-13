<template>
    <div class="box">
        <TituloPagina titulo="Termos de Uso" :descricao="ultimaAtualizacao" />

        <div v-html="termoUso.conteudo"></div>
    </div>
</template>

<script setup>
import { useQuasar } from 'quasar';
import TituloPagina from 'src/components/TituloPagina.vue';
import { get } from 'src/services/http';
import { onMounted, ref } from 'vue';

const $q = useQuasar()

const termoUso = ref({ conteudo: '' })
const ultimaAtualizacao = ref('...')

onMounted(() => {
    trazerAtual()
})

const trazerAtual = async () => {
    try {
        $q.loading.show({
            message: 'Carregando'
        })

        const dados = await get('/termo-uso/atual',)
        termoUso.value = dados
        ultimaAtualizacao.value = 'Última atualização: ' + termoUso.value.dataCriacaoPtBr

    } catch (e) {
        alert(e)
    } finally {
        $q.loading.hide()
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