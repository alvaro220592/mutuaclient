<template>
    <q-btn flat no-caps color="primary" :icon="props.icone" :label="props.titulo" :to="{ name: props.nomeRota }" />
</template>


<script setup>
const props = defineProps({
    nomeRota: {
        type: String,
        required: true
    },

    titulo: {
        type: String,
        default: ''
    },

    icone: {
        type: String,
        default: ''
    }
})
</script>