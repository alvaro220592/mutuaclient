<template>
    <q-layout view="hHh lpR fFf">

        <!-- Topo -->
        <q-header elevated>
            <q-toolbar class="bg-dark">

                <q-toolbar-title>
                    <img :src="logoDark" width="30%" style="display: block;">
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

                <!-- Rodapé -->
                <q-footer bordered class="bg-dark">
                    <q-toolbar class="justify-center">
                        <q-btn flat icon="menu">

                            <q-menu class="text-primary" anchor="top middle" self="bottom middle" auto-close>
                                <q-list style="min-width: 220px">

                                    <q-item clickable @click="navegar('login')">
                                        <q-item-section avatar>
                                            <q-icon name="sym_o_login" />
                                        </q-item-section>

                                        <q-item-section>
                                            Login e cadastro
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

                                    <q-item clickable @click="navegar('termos-uso')">
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

                                    <q-item clickable @click="navegar('boas-vindas')">
                                        <q-item-section avatar>
                                            <q-icon name="sym_o_home" />
                                        </q-item-section>

                                        <q-item-section>
                                            Início
                                        </q-item-section>
                                    </q-item>

                                    <q-separator />

                                    <q-item clickable @click="navegar('contato')">
                                        <q-item-section avatar>
                                            <q-icon name="sym_o_mail" />
                                        </q-item-section>

                                        <q-item-section>
                                            Contato
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
import { useTransicaoEntrePaginas } from 'src/composables/useTransicaoEntrePaginas'
import logoDark from 'src/assets/logos/logo-mutua-dark-sem-fundo.png'
import { Dark } from 'quasar'
import { useRouter } from 'vue-router'

const router = useRouter()

const {
    animacaoEntrar,
    animacaoSair
} = useTransicaoEntrePaginas()

const alternarTema = () => {
    Dark.toggle()
}

const navegar = (rota) => {
    router.push({ name: rota })
}
</script>