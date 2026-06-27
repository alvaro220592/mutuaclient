<template>
    <div>
        <div class="text-h6 q-mb-lg text-center">
            Suas solicitações de doação
        </div>

        <div class="column q-gutter-md">
            <!-- <q-card v-for="doacao in doacoes" :key="doacao.id">
                <q-card-section class="row items-center justify-between">
                    <div class="bg-pink-2">
                        <div class="text-h6">{{ doacao.categoria_doacao.nome }}</div>
                        <div class="text-subtitle2">{{ doacao.detalhes }}</div>
                    </div>

                    <div class="row items-center q-gutter-sm bg-green-4">
                        <q-badge :color="doacao.ativo ? 'positive' : 'grey'">
                            {{ doacao.ativo ? 'Ativa' : 'Inativa' }}
                        </q-badge>

                        <q-btn flat round icon="more_vert">
                            <q-menu>
                                <q-list dense>
                                    <q-item clickable>
                                        <q-item-section>Editar</q-item-section>
                                    </q-item>

                                    <q-item clickable>
                                        <q-item-section>
                                            {{ doacao.ativo ? 'Desativar' : 'Ativar' }}
                                        </q-item-section>
                                    </q-item>

                                    <q-item clickable>
                                        <q-item-section class="text-negative">
                                            Excluir
                                        </q-item-section>
                                    </q-item>
                                </q-list>
                            </q-menu>
                        </q-btn>
                    </div>
                </q-card-section>
            </q-card> -->

            <!-- <div class="meucard" v-for="doacao in doacoes" :key="doacao.id">
                <div class="meutextocontainer">
                    <div class="meutitulocontainer">
                        <span>Título</span>
                    </div>
                    <div>
                        veritatis corrupti! Nemo, dignissimos.
                        Provident harum doloremque explicabo ratione in facere doloribus dolorum!
                    </div>
                </div>

                <div class="meumenucontainer">
                    <span class="bg-green-5">Ativo</span>
                    <q-icon name="more_vert" />
                </div>
            </div> -->

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
                                    <q-item-section avatar>
                                        <q-icon name="edit" />
                                    </q-item-section>

                                    <q-item-section>
                                        Editar
                                    </q-item-section>
                                </q-item>

                                <q-item clickable v-close-popup @click="alternarStatus(doacao)">
                                    <q-item-section avatar>
                                        <q-icon :name="doacao.ativo ? 'visibility_off' : 'visibility'" />
                                    </q-item-section>

                                    <q-item-section>
                                        {{ doacao.ativo ? 'Desativar' : 'Ativar' }}
                                    </q-item-section>
                                </q-item>

                                <q-separator />

                                <q-item clickable v-close-popup @click="excluirDoacao(doacao)" class="text-negative">
                                    <q-item-section avatar>
                                        <q-icon name="delete" color="negative" />
                                    </q-item-section>

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