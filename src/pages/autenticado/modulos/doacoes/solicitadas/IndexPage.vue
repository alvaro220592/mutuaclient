<template>
    <div>
        <q-toolbar class="q-mb-lg">
            <q-btn flat round dense icon="arrow_back" @click="$router.back()" />

            <q-toolbar-title>
                Suas solicitações de doação
            </q-toolbar-title>
        </q-toolbar>

        <div class="column q-gutter-md">
            <q-card flat bordered v-for="doacao in doacoes" :key="doacao.id">
                <q-card-section class="row items-center justify-between">
                    <div class="row items-center q-gutter-sm">
                        <div class="text-subtitle1">
                            {{ doacao.categoria_doacao.nome }}
                        </div>

                        <q-badge :color="doacao.ativo ? 'positive' : 'grey'"
                            :label="doacao.ativo ? 'Ativa' : 'Inativa'" />
                    </div>

                    <!-- menu de opções -->
                    <q-btn flat round dense icon="more_vert">
                        <q-menu>
                            <q-list dense style="min-width: 150px">
                                <q-item clickable v-close-popup @click="editarDoacao(doacao)">
                                    <q-item-section>
                                        Editar
                                    </q-item-section>
                                </q-item>

                                <q-item clickable v-close-popup @click="alternarStatus(doacao)">
                                    <q-item-section>
                                        {{ doacao.ativo ? 'Desativar' : 'Ativar' }}
                                    </q-item-section>
                                </q-item>

                                <q-item clickable v-close-popup @click="excluirDoacao(doacao)">
                                    <q-item-section>
                                        Excluir
                                    </q-item-section>
                                </q-item>
                            </q-list>
                        </q-menu>
                    </q-btn>


                </q-card-section>

                <!-- <q-separator /> -->

                <q-card-section>
                    {{ doacao.detalhes }}
                </q-card-section>
            </q-card>
        </div>


        <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn fab icon="add" :color="Dark.isActive ? 'primary' : 'dark'"
                @click="$router.push({ name: 'doacoes.solicitadas.novo' })" />
        </q-page-sticky>
    </div>
</template>

<script setup>
import { get } from 'src/services/http';
import { onMounted, ref } from 'vue';
import { Dark } from 'quasar'

const doacoes = ref([])

onMounted(() => {
    trazerDoacoes()
})

const trazerDoacoes = async () => {
    const dados = await get('/doacoes')
    doacoes.value = dados.doacoes
}

</script>

<style lang="scss" scoped>
.meucard {
    display: flex;
    flex-direction: row;
    gap: 10px;
    border: 1px solid black;
    padding: 10px;
}

.meutitulocontainer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.meutextocontainer {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.meumenucontainer {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;
}
</style>