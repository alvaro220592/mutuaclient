<template>
    <q-toolbar class="q-mb-lg justify-center q-gutter-sm">
        <div class="text-h6">
            {{ props.titulo }}
        </div>
    </q-toolbar>
</template>

<script setup>
const props = defineProps({
    titulo: {
        type: String,
        default: '',
        required: true,
    },
})
</script>

<style lang="scss" scoped></style>