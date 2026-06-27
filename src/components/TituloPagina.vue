<template>
    <q-toolbar class="q-mb-lg justify-center q-gutter-sm">
        <q-btn v-if="props.botaoVoltar" flat round dense icon="arrow_back" @click="$router.back()" />

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

    botaoVoltar: {
        type: Boolean,
        required: false,
    }
})
</script>

<style lang="scss" scoped></style>