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
import { onMounted } from 'vue';
import { useModulos } from 'src/composables/useModulos'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const { listaModulos, trazerModulos } = useModulos()
const router = useRouter()

onMounted(trazerModulos)

const navegar = (rota) => {
    router.push({ name: rota }) // ou router.push({ name: 'doacoes.index' })
}

</script>

<style lang="scss" scoped></style>