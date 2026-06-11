<template>
    <q-page class="flex flex-center q-pa-md">

        <div class="home-container">

            <!-- cabeçalho -->
            <div class="q-mb-xl">

                <div class="text-h5">
                    Olá, {{ authStore.user?.name }}
                </div>

                <div class="text-body2 text-grey-7">
                    O que deseja acessar hoje?
                </div>
            </div>

            <div class="column q-gutter-md">
                <q-card v-for="modulo in listaModulos" :key="modulo.id" clickable bordered>
                    <q-card-section>
                        <div class="text-subtitle1">
                            <q-icon :name="modulo.icone" />
                            <!-- <q-icon name="person_search" /> -->
                            {{ modulo.nome }}
                        </div>

                        <div class="text-caption text-grey">
                            {{ modulo.descricao }}
                        </div>
                    </q-card-section>
                </q-card>
            </div>


        </div>

    </q-page>
</template>

<style scoped>
.home-container {
    width: 100%;
    max-width: 520px;
}
</style>

<script setup>


import { useAuthStore } from 'src/stores/auth'
import { modulos } from 'src/services/modulos';
import { ref, onMounted } from 'vue';

const authStore = useAuthStore()
const listaModulos = ref(null)

onMounted(() => {
    trazerModulos()
})

const trazerModulos = async () => {

    try {
        const dados = await modulos()

        listaModulos.value = dados.modulos

        console.log(JSON.stringify(dados))

    } catch (err) {
        console.error(JSON.stringify(err))
    }
}

</script>

<style lang="scss" scoped></style>