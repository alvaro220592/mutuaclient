<template>
    <q-layout view="hHh lpR fFf">

        <!-- HEADER SIMPLES -->
        <q-header elevated>
            <q-toolbar class="bg-dark">
                <q-btn flat dense icon="menu" @click="drawer = !drawer" />

                <q-toolbar-title>
                    <img :src="logoDark" width="30%" style="display: block;">
                </q-toolbar-title>
            </q-toolbar>
        </q-header>

        <!-- DRAWER SIMPLES -->
        <q-drawer v-model="drawer" bordered>

            <q-list>

                <q-item-label header>
                    <div style="width: 50%;">
                        <img :src="logo" class="full-width">
                    </div>
                </q-item-label>

                <q-separator />

                <q-item class="" clickable @click="navegar('usuario.perfil')" v-ripple>
                    <q-item-section avatar>
                        <q-icon name="account_circle" />
                    </q-item-section>
                    <q-item-section>
                        Meu perfil
                    </q-item-section>
                </q-item>

                <q-item class="" clickable @click="alternarTema" v-ripple>
                    <q-item-section avatar>
                        <q-icon :name="Dark.isActive ? 'light_mode' : 'dark_mode'" />
                    </q-item-section>
                    <q-item-section>
                        Alterar tema
                    </q-item-section>
                </q-item>

                <q-item class="" clickable @click.prevent="logout" v-ripple>
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

                <router-view v-slot="{ Component }">

                    <transition appear mode="out-in" :enter-active-class="animacaoEntrar"
                        :leave-active-class="animacaoSair">
                        <component :is="Component" :key="$route.fullPath" />
                    </transition>

                </router-view>
            </q-page>
        </q-page-container>

    </q-layout>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from 'src/stores/auth'
import { setToken } from 'src/services/storage'
import { Dark } from 'quasar'
import { useTransicaoEntrePaginas } from 'src/composables/useTransicaoEntrePaginas'
import logoDark from 'src/assets/logos/logo-mutua-dark-sem-fundo.png'
import logoLight from 'src/assets/logos/logo-mutua-light-sem-fundo.png'

const logo = computed(() =>
    Dark.isActive ? logoDark : logoLight
)

const drawer = ref(false)
const router = useRouter()
const authStore = useAuthStore()

const {
    animacaoEntrar,
    animacaoSair
} = useTransicaoEntrePaginas()

const logout = async () => {
    await setToken(null)
    authStore.setAuth(null, null)
    router.replace('/login')
}

const alternarTema = () => {
    Dark.toggle()
    // futuramente, tem que aplicar a escolha do tema pro usuário no backend
}

const navegar = (rota) => {
    router.push({ name: rota }) // ou router.push({ name: 'doacoes.index' })
}
</script>