<template>
    <q-card flat bordered
        :class="doacao.perfil.nome == 'oferecida' ? 'card-doacao-oferecida' : 'card-doacao-solicitada'">
        <div class="q-pa-xs text-center text-white text-weight-bold"
            :class="doacao.perfil.nome == 'oferecida' ? 'faixa-card-doacao-oferecida' : 'faixa-card-doacao-solicitada'">
            {{ primeiraLetraMaiuscula(doacao.perfil.nome) }}
        </div>

        <q-card-section class="row items-center justify-between">
            <div>
                <div class="text-subtitle2 text-weight-bold">
                    Categoria
                </div>

                <div class="text-body1">
                    {{ doacao.categoria.nome }}
                </div>
            </div>

            <!-- menu de opções -->
            <q-btn flat round dense icon="more_vert">
                <q-menu>
                    <q-list dense>
                        <q-item clickable v-close-popup @click="emit('editar', doacao)">
                            <q-item-section>
                                Editar
                            </q-item-section>
                        </q-item>

                        <q-item clickable v-close-popup @click="emit('alternar-status', doacao)">
                            <q-item-section>
                                {{ doacao.ativo ? 'Desativar' : 'Ativar' }}
                            </q-item-section>
                        </q-item>

                        <q-item clickable v-close-popup @click="emit('excluir', doacao)">
                            <q-item-section>
                                Excluir
                            </q-item-section>
                        </q-item>
                    </q-list>
                </q-menu>
            </q-btn>
        </q-card-section>

        <!-- <q-separator /> -->

        <q-card-section class="q-pt-none">

            <div class="q-mb-md">
                <div class="text-subtitle2 text-weight-bold">
                    Detalhes
                </div>

                <div v-if="doacao.detalhes" class="text-body1">
                    {{ doacao.detalhes }}
                </div>
            </div>

            <div class="text-caption text-grey-7">
                <div class="text-subtitle2 text-weight-bold">
                    Criado em
                </div>

                <div class="row justify-between items-center">
                    <div class="text-body1">
                        {{ new Date(doacao.created_at).toLocaleString('pt-BR', {
                            dateStyle: 'short',
                            timeStyle: 'short'
                        }) }}
                    </div>
                    <q-badge :color="doacao.ativo ? 'positive' : 'grey'" :label="doacao.ativo ? 'Ativa' : 'Inativa'" />
                </div>
            </div>
        </q-card-section>
    </q-card>
</template>

<script setup>
import { primeiraLetraMaiuscula } from 'src/utils/strings';

defineProps({
    doacao: {
        type: Object,
        required: true
    },
    usuario: {
        type: String,
        required: false
    }
})

const emit = defineEmits([
    'editar',
    'alternar-status',
    'excluir'
])
</script>

<style>
.card-doacao-oferecida {
    border: 1px solid var(--cor-doacao-oferecida);

}

.card-doacao-solicitada {
    border: 1px solid var(--cor-doacao-solicitada);

}

.faixa-card-doacao-oferecida {
    background-color: var(--cor-doacao-oferecida);
}

.faixa-card-doacao-solicitada {
    background-color: var(--cor-doacao-solicitada);
}
</style>