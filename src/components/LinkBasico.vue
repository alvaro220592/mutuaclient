<template>
    <q-btn flat no-caps color="primary" icon="arrow_back" :label="props.titulo" :to="{ name: props.nomeRota }" />
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
    }
})
</script>