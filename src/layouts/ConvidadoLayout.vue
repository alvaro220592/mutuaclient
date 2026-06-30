<template>
    <q-layout view="hHh lpR fFf">

        <!-- Topo -->
        <q-header elevated>
            <q-toolbar class="bg-dark">

                <q-toolbar-title>
                    <img :src="logoDark" width="30%" style="display: block;">
                </q-toolbar-title>

                <q-icon class="text-h6" :name="Dark.isActive ? 'light_mode' : 'dark_mode'" @click="alternarTema" />

            </q-toolbar>
        </q-header>

        <!-- Conteúdo -->
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
import { useTransicaoEntrePaginas } from 'src/composables/useTransicaoEntrePaginas'
import logoDark from 'src/assets/logos/logo-mutua-dark-sem-fundo.png'
import { Dark } from 'quasar'

const {
    animacaoEntrar,
    animacaoSair
} = useTransicaoEntrePaginas()

const alternarTema = () => {
    Dark.toggle()
}
</script>