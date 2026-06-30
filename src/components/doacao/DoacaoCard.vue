<template>
    <q-card flat bordered>
        <q-card-section class="row items-center justify-between">
            <div class="row items-center q-gutter-sm">
                <div class="text-subtitle1">
                    {{ doacao.categoria_doacao.nome }}
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
            <div class="q-mb-md">{{ doacao.detalhes }}</div>

            <div class="row justify-between items-center">
                <div class="text-caption text-grey-7 q-mt-sm">
                    {{ new Date(doacao.created_at).toLocaleString('pt-BR', {
                        dateStyle: 'short',
                        timeStyle: 'short'
                    }) }}
                </div>

                <q-badge :color="doacao.ativo ? 'positive' : 'grey'" :label="doacao.ativo ? 'Ativa' : 'Inativa'" />
            </div>
        </q-card-section>
    </q-card>
</template>

<script setup>
defineProps({
    doacao: {
        type: Object,
        required: true
    }
})

const emit = defineEmits([
    'editar',
    'alternar-status',
    'excluir'
])
</script>