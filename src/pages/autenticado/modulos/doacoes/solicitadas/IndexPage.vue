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

                                <q-item clickable v-close-popup @click="mostrarConfirmacaoExclusao(doacao)">
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
            <q-btn fab icon="add" color="primary" @click="$router.push({ name: 'doacoes.solicitadas.novo' })" />
        </q-page-sticky>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { buscarSolicitadas, excluirSolicitada, mudarStatusSolicitada } from 'src/services/doacao';
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar';

const $q = useQuasar()

const router = useRouter()

const doacoes = ref([])

onMounted(() => {
    trazerDoacoes()
})

const trazerDoacoes = async () => {
    const dados = await buscarSolicitadas()
    doacoes.value = dados.doacoes
}

const editarDoacao = (doacao) => {
    router.push({
        name: 'doacoes.solicitadas.editar',
        params: {
            id: doacao.id
        }
    })
}

const alternarStatus = async (doacao) => {
    try {
        const dados = await mudarStatusSolicitada({ id: doacao.id })

        doacao.ativo = doacao.ativo ? 0 : 1

        $q.notify({
            type: 'positive',
            message: dados.message,
            position: 'top-right'
        })

        router.replace({ name: 'doacoes.solicitadas.index' })
    }
    catch (erro) {
        $q.notify({
            type: 'negative',
            message: JSON.stringify(erro.message),
            position: 'top-right'
        })
    }
}

const mostrarConfirmacaoExclusao = async (doacao) => {
    try {
        $q.dialog({
            title: 'Excluir solicitação',
            message: 'Esta ação não poderá ser desfeita.',
            persistent: true,
            cancel: {
                label: 'Cancelar',
                flat: true
            },
            ok: {
                label: 'Excluir',
                color: 'negative'
            }
        }).onOk(async () => {
            try {
                await confirmarExclusao(doacao.id)
            }
            catch (erro) {
                alert(JSON.stringify(erro))
            }
        })
    } catch (error) {
        alert(JSON.stringify(error))
    }
}

const confirmarExclusao = async (id) => {
    const dados = await excluirSolicitada(id)

    try {
        $q.notify({
            type: 'positive',
            message: dados.message,
            position: 'top-right'
        })

        doacoes.value = doacoes.value.filter(
            d => d.id !== id
        )

    } catch (erro) {
        $q.notify({
            type: 'negative',
            message: JSON.stringify(erro.message),
            position: 'top-right'
        })
    }
}

</script>