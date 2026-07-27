<template>
    <q-toolbar class="q-mb-lg justify-center q-gutter-sm">
        <div class="col text-center">
            <div class="text-h6">
                {{ props.titulo }}
            </div>

            <div v-if="props.descricao" class="text-caption text-grey-7">{{ props.descricao }}</div>
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

    descricao: {
        type: String,
        required: false
    }
})
</script>

<style lang="scss" scoped></style>