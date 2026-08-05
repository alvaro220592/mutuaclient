<template>
    <q-layout view="hHh lpR fFf">

        <!-- Topo -->
        <!-- <q-header flat class="bg-dark">
            <q-toolbar>
                <q-toolbar-title>
                    <img :src="logoDark" width="30%" style="display: block;">
                </q-toolbar-title>

            </q-toolbar>
        </q-header> -->

        <!-- Conteúdo -->
        <q-page-container>

            <q-page class="flex flex-center q-pa-md" :class="Dark.isActive ? '' : 'bg-grey-2'">

                <div class="box">
                    <q-card class="q-pa-md" flat>

                        <div class="row justify-center q-mb-md">
                            <img :src="Dark.isActive ? logoDark : logoLight" width="50%" style="display: block;">
                        </div>

                        <q-separator class="q-mb-md" />

                        <!-- <transition appear mode="out-in" :enter-active-class="animacaoEntrar" :leave-active-class="animacaoSair"> -->
                        <router-view v-slot="{ Component }">
                            <component :is="Component" :key="$route.fullPath" />
                        </router-view>
                        <!-- </transition> -->
                    </q-card>
                </div>

                <!-- Rodapé -->
                <q-footer bordered class="bg-dark" style="padding-bottom: env(safe-area-inset-bottom);">
                    <q-toolbar class="justify-between">
                        <div>
                            <q-btn v-if="route.name != 'login'" color="white" outline label="Entrar"
                                @click="navegar('login')" />
                        </div>

                        <q-btn flat icon="menu" label="">
                            <q-menu class="text-primary" anchor="top middle" self="bottom middle" auto-close>
                                <q-list style="min-width: 220px">

                                    <q-item clickable @click="navegar('boas-vindas')">
                                        <q-item-section avatar>
                                            <q-icon name="sym_o_home" />
                                        </q-item-section>

                                        <q-item-section>
                                            Início
                                        </q-item-section>
                                    </q-item>

                                    <q-item clickable @click="navegar('politica-privacidade.index')">
                                        <q-item-section avatar>
                                            <q-icon name="sym_o_description" />
                                        </q-item-section>

                                        <q-item-section>
                                            Política de Privacidade
                                        </q-item-section>
                                    </q-item>

                                    <q-item clickable @click="navegar('termos-uso.index')">
                                        <q-item-section avatar>
                                            <q-icon name="sym_o_gavel" />
                                        </q-item-section>

                                        <q-item-section>
                                            Termos de Uso
                                        </q-item-section>
                                    </q-item>

                                    <q-item clickable @click="alternarTema">
                                        <q-item-section avatar>
                                            <q-icon :name="Dark.isActive ? 'sym_o_light_mode' : 'sym_o_dark_mode'" />
                                        </q-item-section>

                                        <q-item-section>
                                            Alterar tema
                                        </q-item-section>
                                    </q-item>
                                </q-list>
                            </q-menu>

                        </q-btn>

                    </q-toolbar>
                </q-footer>

            </q-page>
        </q-page-container>

    </q-layout>
</template>

<script setup>
// import { useTransicaoEntrePaginas } from 'src/composables/useTransicaoEntrePaginas'
import logoDark from 'src/assets/logos/logo-mutua-dark-sem-fundo.png'
import logoLight from 'src/assets/logos/logo-mutua-light-sem-fundo.png'
import { Dark } from 'quasar'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

// const {
//     animacaoEntrar,
//     animacaoSair
// } = useTransicaoEntrePaginas()

const alternarTema = () => {
    Dark.toggle()
}

const navegar = (rota) => {
    router.push({ name: rota })
}
</script>