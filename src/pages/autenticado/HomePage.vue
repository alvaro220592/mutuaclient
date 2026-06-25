<template>
    <q-page class="flex flex-center q-pa-md">

        <div class="home-container">

            <!-- cabeçalho -->
            <div class="q-mb-xl">

                <div class="text-h5">
                    Olá, {{ authStore.user?.name }}!
                </div>

                <div class="text-body2 text-grey-7">
                    O que deseja acessar hoje?
                </div>
            </div>

            <div class="column q-gutter-md">
                <template v-if="carregando">
                    <q-card v-for="i in 3" :key="i" bordered>
                        <q-card-section>
                            <q-skeleton type="text" width="40%" />
                            <q-skeleton class="q-mt-sm" type="text" />
                        </q-card-section>
                    </q-card>
                </template>
                <template v-else>
                    <q-card v-for="modulo in listaModulos" :key="modulo.id" clickable
                        @click="navegar(modulo.slug + '.opcoes')" bordered>

                        <q-card-section>
                            <div class="text-subtitle1">
                                <q-icon :name="modulo.icone" />
                                <!-- <q-icon name="person_search" /> -->
                                {{ modulo.slug }}
                            </div>

                            <div class="text-caption text-grey">
                                {{ modulo.descricao }}
                            </div>
                        </q-card-section>
                    </q-card>
                </template>
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
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router'
import { modulos } from 'src/services/modulos';

const authStore = useAuthStore()
const router = useRouter()
const listaModulos = ref()
const carregando = ref(false)

onMounted(() => {
    trazerModulos()
})

const trazerModulos = async () => {
    try {
        carregando.value = true
        const dados = await modulos()
        listaModulos.value = dados.modulos || []
    } catch (error) {
        console.log(JSON.stringify(error))
    } finally {
        carregando.value = false
    }
}

const navegar = (rota) => {
    router.push({ name: rota }) // ou router.push({ name: 'doacoes.index' })
}

</script>

<style lang="scss" scoped></style>