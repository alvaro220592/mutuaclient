<template>
    <div>
        <div class="text-h6 q-mb-lg text-center">
            Suas solicitações de doação
        </div>

        <div class="column q-gutter-md">
            <q-card v-for="doacao in doacoes" :key="doacao.id">
                <q-card-section>
                    <div class="text-h6">{{ doacao.categoria_doacao.nome }}</div>
                    <div class="text-subtitle2">{{ doacao.detalhes }}</div>
                </q-card-section>

                <q-separator />

                <q-card-actions class="justify-between">
                    <q-toggle v-model="doacao.ativo" :true-value="1" :false-value="0" label="Ativa" />

                    <div>
                        <q-btn flat round color="warning" icon="edit" />
                        <q-btn flat round color="negative" icon="delete" />
                    </div>
                </q-card-actions>
            </q-card>
        </div>

        <br>
        <LinkBasico nomeRota="doacoes.solicitadas.novo" icone="add" titulo="Nova" />
        <br>
        <LinkBasico nomeRota="doacoes.opcoes" icone="arrow_back" titulo="Voltar" />
    </div>
</template>

<script setup>
import LinkBasico from 'src/components/LinkBasico.vue';
import { get } from 'src/services/http';
import { onMounted, ref } from 'vue';

const doacoes = ref([])

onMounted(() => {
    trazerDoacoes()
})

const trazerDoacoes = async () => {
    const dados = await get('/doacoes')
    doacoes.value = dados.doacoes
}

</script>

<style lang="scss" scoped></style>