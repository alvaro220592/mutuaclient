<template>
    <q-layout view="hHh lpR fFf">

        <!-- Topo -->
        <q-header elevated>
            <q-toolbar>

                <q-toolbar-title>
                    Mútua - autenticado
                </q-toolbar-title>

                <!-- dropdown de perfil -->
                <q-btn flat round>
                    <q-avatar size="32px">
                        <img :src="user?.imageUrl || 'https://cdn.quasar.dev/img/boy-avatar.png'" />
                    </q-avatar>

                    <q-menu>
                        <q-list style="min-width: 180px">

                            <!-- info do usuário -->
                            <q-item>
                                <q-item-section>
                                    <q-item-label>{{ user?.name }}</q-item-label>
                                    <q-item-label caption>{{ user?.email }}</q-item-label>
                                </q-item-section>
                            </q-item>

                            <q-separator />

                            <!-- logout -->
                            <q-item clickable v-close-popup @click="logout">
                                <q-item-section>
                                    Sair
                                </q-item-section>
                            </q-item>

                        </q-list>
                    </q-menu>
                </q-btn>

            </q-toolbar>
        </q-header>

        <!-- Conteúdo -->
        <q-page-container>
            <q-page class="q-pa-md">
                <router-view />
            </q-page>
        </q-page-container>

        <!-- Navegação inferior -->
        <q-footer bordered>
            <q-tabs align="justify">
                <q-route-tab icon="home" to="/" />
                <q-route-tab icon="login" to="/login" />
            </q-tabs>
        </q-footer>

    </q-layout>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from 'src/stores/auth'
import { setToken } from 'src/services/storage'

const router = useRouter()
const authStore = useAuthStore()

const user = authStore.user

const logout = async () => {
    await setToken(null)
    authStore.logout?.() || authStore.setAuth(null, null)
    router.replace('/login')
}
</script>