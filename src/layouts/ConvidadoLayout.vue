<template>
    <q-layout view="hHh lpR fFf">

        <!-- Topo -->
        <q-header elevated>
            <q-toolbar>

                <q-toolbar-title>
                    Mútua
                </q-toolbar-title>

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
import { useTransicaoEntrePaginas }
    from 'src/composables/useTransicaoEntrePaginas'

const {
    animacaoEntrar,
    animacaoSair
} = useTransicaoEntrePaginas()
</script>