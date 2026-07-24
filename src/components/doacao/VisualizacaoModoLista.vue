<template>
    <q-infinite-scroll @load="onCarregarMais">
        <div class="column q-gutter-md">
            <DoacaoCard v-for="doacao in doacoes" :key="doacao.id" :usuario="doacao.usuario.name" :doacao="doacao"
                @editar="$emit('editar', doacao)" @alternar-status="$emit('alternar-status', doacao)"
                @excluir="$emit('excluir', doacao)" />
        </div>
    </q-infinite-scroll>
</template>

<script setup>

import DoacaoCard from 'src/components/doacao/DoacaoCard.vue'

defineProps({
    doacoes: {
        type: Object,
        required: true
    },
    onCarregarMais: {
        type: Function,
        required: true
    }
})

defineEmits([
    'editar',
    'alternar-status',
    'excluir'
])
</script>