<template>
    <q-layout view="hHh lpR fFf">

        <!-- <q-btn v-if="mostrarBotaoVoltar" flat round dense icon="arrow_back" class="self-start"
            @click="$router.back()" /> -->

        <!-- HEADER SIMPLES -->
        <!-- <q-header elevated>
            <q-toolbar class="bg-dark">
                <q-btn flat dense icon="menu" @click="drawer = !drawer" />

                <q-toolbar-title>
                    <img :src="logoDark" width="30%" style="display: block;">
                </q-toolbar-title>


            </q-toolbar>
        </q-header> -->

        <q-header class="bg-dark" elevated>
            <div class="row items-center q-pa-sm">

                <div class="col row items-center justify-start">
                    <q-btn v-if="mostrarBotaoVoltar" class="text-subtitle1" flat round dense icon="arrow_back"
                        @click="$router.back()" />
                </div>

                <div class="col row justify-center">
                    <img :src="logoDark" width="100%" style="display: block;">
                </div>

                <div class="col row items-center justify-end">
                    <q-btn flat dense class="text-subtitle1" icon="menu" @click="drawer = !drawer" />
                </div>

            </div>
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

                <q-item :class="Dark.isActive ? 'text-primary' : 'text-dark'" clickable
                    @click="navegar('usuario.perfil')" v-ripple>
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

<style>
.meu-header-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 2px;
}

.meu-item-container {

    flex: 1;
    text-align: right;
    display: flex;
    align-items: center;
}

.meu-item-container-esquerda {
    justify-content: flex-start;
}

.meu-item-container-centro {
    justify-content: center;
}

.meu-item-container-direita {
    justify-content: flex-end;
}
</style>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
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
const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const {
    animacaoEntrar,
    animacaoSair
} = useTransicaoEntrePaginas()

const mostrarBotaoVoltar = computed(() => {
    return route.name !== 'home'
})

const logout = async () => {
    await setToken(null)
    authStore.setAuth(null, null)
    router.replace('/login')
}

const alternarTema = () => {
    Dark.toggle()
}

const navegar = (rota) => {
    router.push({ name: rota }) // ou router.push({ name: 'doacoes.index' })
}
</script>