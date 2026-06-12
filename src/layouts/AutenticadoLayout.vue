<template>
    <q-layout view="hHh lpR fFf">

        <!-- HEADER SIMPLES -->
        <q-header elevated>
            <q-toolbar>

                <q-btn flat dense icon="menu" @click="drawer = !drawer" />

                <q-toolbar-title>
                    Mútua
                </q-toolbar-title>


                <q-btn flat round :icon="Dark.isActive ? 'light_mode' : 'dark_mode'" @click="alternarTema" />

            </q-toolbar>
        </q-header>

        <!-- DRAWER SIMPLES -->
        <q-drawer v-model="drawer" bordered>

            <q-list>

                <q-item-label header>
                    Módulos
                </q-item-label>

                <q-item clickable to="/app/home" v-ripple>
                    <q-item-section avatar>
                        <q-icon name="home" />
                    </q-item-section>
                    <q-item-section>
                        Início
                    </q-item-section>
                </q-item>

                <q-item v-for="modulo in listaModulos" :key="modulo.id" clickable to="/app/{{ modulo.slug }}" v-ripple>
                    <q-item-section avatar>
                        <q-icon :name="modulo.icone" />
                    </q-item-section>
                    <q-item-section>
                        {{ modulo.nome }}
                    </q-item-section>
                </q-item>

                <q-item clickable @click.prevent="logout" v-ripple>
                    <q-item-section avatar>
                        <q-icon name="logout" />
                    </q-item-section>
                    <q-item-section>
                        Sair
                    </q-item-section>
                </q-item>

            </q-list>

        </q-drawer>

        <!-- CONTEÚDO -->
        <q-page-container>
            <q-page class="q-pa-md">
                <router-view />
            </q-page>
        </q-page-container>

    </q-layout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from 'src/stores/auth'
import { setToken } from 'src/services/storage'
import { useModulos } from 'src/composables/useModulos'
import { Dark } from 'quasar'

const drawer = ref(false)
const router = useRouter()
const authStore = useAuthStore()
const { listaModulos, trazerModulos } = useModulos()

onMounted(trazerModulos)

const logout = async () => {
    await setToken(null)
    authStore.setAuth(null, null)
    router.replace('/login')
}

const alternarTema = () => {
    Dark.toggle()
    // futuramente, tem que aplicar a escolha do tema pro usuário no backend
}
</script>