<template>
    <q-dialog v-model="model" maximized>
        <q-card>

            <q-card-section class="bg-dark text-white header-fixo row items-center">
                <div class="text-h6">
                    {{ titulo }}
                </div>

                <q-space />

                <q-btn flat round dense icon="close" v-close-popup />
            </q-card-section>

            <q-card-section class="q-pa-md scroll">
                <div v-html="conteudo"></div>
            </q-card-section>

        </q-card>
    </q-dialog>
</template>

<script setup>
const model = defineModel()

defineProps({
    titulo: {
        type: String,
        required: true
    },
    conteudo: {
        type: String,
        required: true
    }
})
</script>

<style>
h1 {
    font-size: 30px;
}

h2 {
    font-size: 18px;
}

ul {
    list-style: '- ';
    padding-left: 15px;
}

.header-fixo {
    position: sticky;
    top: 0;
    z-index: 1;
    /* background: white; */
}
</style>