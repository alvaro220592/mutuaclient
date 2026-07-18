<template>
    <q-layout view="hHh lpR fFf">

        <q-header class="bg-dark" elevated>
            <div class="row items-center q-pa-sm">
                Precisa colocar um link no drawer pra poder ler os doc de termos de uso e politica <br>
                precisa habilitar os links da area admin que estao sem uso

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

            <q-list class="text-primary">

                <q-item-label header>
                    <div style="width: 50%;">
                        <img :src="logo" class="full-width">
                    </div>
                </q-item-label>

                <q-separator class="q-mb-lg" />

                <q-expansion-item v-if="authStore.user?.is_admin" icon="shield" label="Área admin">
                    <q-list class="q-ml-md">

                        <q-item clickable @click="navegar('admin.modulos.index')" v-ripple>
                            <q-item-section avatar>
                                <q-icon name="sym_o_dashboard" />
                            </q-item-section>

                            <q-item-section>
                                Módulos
                            </q-item-section>
                        </q-item>

                        <q-item clickable @click="navegar('admin.usuarios.index')" v-ripple>
                            <q-item-section avatar>
                                <q-icon name="sym_o_people" />
                            </q-item-section>

                            <q-item-section>
                                Usuários
                            </q-item-section>
                        </q-item>

                        <q-item clickable @click="navegar('admin.documentos.index')" v-ripple>
                            <q-item-section avatar>
                                <q-icon name="sym_o_description" />
                            </q-item-section>

                            <q-item-section>
                                Documentos
                            </q-item-section>
                        </q-item>

                    </q-list>
                </q-expansion-item>

                <q-item clickable @click="navegar('home')" v-ripple>
                    <q-item-section avatar>
                        <q-icon name="home" />
                    </q-item-section>
                    <q-item-section>
                        Início
                    </q-item-section>
                </q-item>

                <q-item clickable @click="navegar('usuario.perfil')" v-ripple>
                    <q-item-section avatar>
                        <q-icon name="account_circle" />
                    </q-item-section>
                    <q-item-section>
                        Meu perfil
                    </q-item-section>
                </q-item>

                <q-item clickable @click="navegar('contato.email.index')" v-ripple>
                    <q-item-section avatar>
                        <q-icon name="email" />
                    </q-item-section>
                    <q-item-section>
                        Contato
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

<style></style>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from 'src/stores/auth'
import { armazenarTema, armazenarToken } from 'src/services/storage'
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
    await armazenarToken(null)
    authStore.setAuth(null, null)
    router.replace('/login')
}

const alternarTema = async () => {
    Dark.toggle()
    await armazenarTema(Dark.mode)
}

const navegar = (rota) => {
    router.push({ name: rota })
}
</script>