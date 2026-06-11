<template>
    <q-layout view="hHh lpR fFf">

        <!-- HEADER SIMPLES -->
        <q-header elevated>
            <q-toolbar>

                <q-btn flat dense icon="menu" @click="drawer = !drawer" />

                <q-toolbar-title>
                    Mútua
                </q-toolbar-title>

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
                        Home
                    </q-item-section>
                </q-item>

                <q-item clickable to="/app/doacoes" v-ripple>
                    <q-item-section avatar>
                        <q-icon name="volunteer_activism" />
                    </q-item-section>
                    <q-item-section>
                        Doações
                    </q-item-section>
                </q-item>

                <q-item clickable to="/app/adoção" v-ripple>
                    <q-item-section avatar>
                        <q-icon name="pets" />
                    </q-item-section>
                    <q-item-section>
                        Adoção
                    </q-item-section>
                </q-item>

                <q-item clickable to="/app/desaparecidos" v-ripple>
                    <q-item-section avatar>
                        <q-icon name="report" />
                    </q-item-section>
                    <q-item-section>
                        Desaparecidos
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from 'src/stores/auth'
import { setToken } from 'src/services/storage'

const drawer = ref(false)
const router = useRouter()
const authStore = useAuthStore()

const logout = async () => {
    await setToken(null)
    authStore.setAuth(null, null)
    router.replace('/login')
}
</script>