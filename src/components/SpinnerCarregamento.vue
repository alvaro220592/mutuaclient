<template>
    <div v-if="carregando" class="q-gutter-md q-mb-md row justify-center">
        <q-spinner color="primary" size="3em" />
    </div>
</template>

<script setup>
defineProps({
    carregando: {
        type: Boolean,
        required: true
    }
})
</script>

<style lang="scss" scoped></style>