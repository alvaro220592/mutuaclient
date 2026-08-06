<template>
    <q-layout view="hHh lpR fFf">

        <!-- Header normal -->
        <q-header class="bg-dark" flat bordered>
            <div class="row items-center q-pa-sm">

                <div class="col items-center justify-start">
                    <q-btn v-if="mostrarBotaoVoltar" class="text-subtitle1" flat round dense icon="arrow_back"
                        @click="voltar()" />
                </div>

                <div class="col justify-center">
                    <img :src="logoDark" width="100%" style="display: block;">
                </div>

                <div class="col items-center justify-end">
                    <div class="row justify-end q-gutter-sm">
                        <!-- <q-btn round flat dense class="text-subtitle1" icon="notifications" /> -->
                        <q-btn round flat dense icon="notifications">
                            <q-badge color="red" floating>3</q-badge>

                            <q-menu>
                                <q-list style="min-width:320px">
                                    <q-item-label header>
                                        Notificações
                                    </q-item-label>

                                    <q-item clickable>
                                        <q-item-section>
                                            João respondeu sua doação
                                            <div class="text-caption">
                                                há 5 minutos
                                            </div>
                                        </q-item-section>
                                    </q-item>

                                    <q-separator />

                                    <q-item clickable>
                                        <q-item-section>
                                            Ver todas
                                        </q-item-section>
                                    </q-item>
                                </q-list>
                            </q-menu>
                        </q-btn>
                    </div>
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

                <q-item clickable @click="navegar('home')" v-ripple>
                    <q-item-section avatar>
                        <q-icon name="home" />
                    </q-item-section>
                    <q-item-section>
                        Início
                    </q-item-section>
                </q-item>

                <q-expansion-item v-if="authStore.user?.is_admin" v-model="expansoes.admin" icon="shield"
                    label="Área admin">
                    <q-list class="q-ml-md">

                        <q-item clickable @click="navegar('admin.modulos.index', 'admin')" v-ripple>
                            <q-item-section avatar>
                                <q-icon name="sym_o_dashboard" />
                            </q-item-section>

                            <q-item-section>
                                Módulos
                            </q-item-section>
                        </q-item>

                        <q-item clickable @click="navegar('admin.usuarios.index', 'admin')" v-ripple>
                            <q-item-section avatar>
                                <q-icon name="sym_o_people" />
                            </q-item-section>

                            <q-item-section>
                                Usuários
                            </q-item-section>
                        </q-item>
                    </q-list>
                </q-expansion-item>

                <q-expansion-item icon="description" label="Documentos" v-model="expansoes.documentos">
                    <q-list class="q-ml-md">

                        <q-item clickable @click="navegar('autenticado.termos-uso.index', 'documentos')" v-ripple>
                            <q-item-section avatar>
                                <q-icon name="sym_o_article_person" />
                            </q-item-section>

                            <q-item-section>
                                Termos de Uso
                            </q-item-section>
                        </q-item>

                        <q-item clickable @click="navegar('autenticado.politica-privacidade.index', 'documentos')"
                            v-ripple>
                            <q-item-section avatar>
                                <q-icon name="sym_o_ballot" />
                            </q-item-section>

                            <q-item-section>
                                Política de privacidade
                            </q-item-section>
                        </q-item>

                    </q-list>
                </q-expansion-item>

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

            <q-page class="flex flex-center q-pa-md" :class="Dark.isActive ? '' : 'bg-grey-2'">
                <div class="box">
                    <q-card class="q-pa-md" flat>

                        <!-- <transition appear mode="out-in" :enter-active-class="animacaoEntrar" :leave-active-class="animacaoSair"> -->
                        <router-view v-slot="{ Component }">
                            <component :is="Component" :key="$route.fullPath" />
                        </router-view>
                        <!-- </transition> -->

                    </q-card>
                </div>
            </q-page>
        </q-page-container>

        <q-footer class="bg-dark" flat bordered style="padding-bottom: env(safe-area-inset-bottom);">
            <div class="row items-center justify-between q-py-sm q-px-lg">
                <q-btn round flat dense class="text-subtitle1" icon="home" @click="navegar('home')" />
                <q-btn round flat dense class="text-subtitle1" icon="menu" @click="drawer = !drawer" />
                <q-btn round flat dense class="text-subtitle1" icon="chat" @click="navegar('conversas.index')">
                    <q-badge v-if="numMensagensNaoLidas > 0" color="red" floating> {{ numMensagensNaoLidas }} </q-badge>
                </q-btn>
            </div>
        </q-footer>

    </q-layout>
</template>

<style>
.espelhado {
    transform: scaleX(-1);
}
</style>

<script setup>
import { ref, computed, reactive, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from 'src/stores/auth'
import { armazenarTema, armazenarToken } from 'src/services/storage'
import { Dark } from 'quasar'
// import { useTransicaoEntrePaginas } from 'src/composables/useTransicaoEntrePaginas'
import logoDark from 'src/assets/logos/logo-mutua-dark-sem-fundo.png'
import logoLight from 'src/assets/logos/logo-mutua-light-sem-fundo.png'
import { obterEcho } from 'src/services/echo'
import { buscarNumMensagensNaoLidas } from 'src/services/conversa'

let canal = null

const numMensagensNaoLidas = ref(0)

onMounted(async () => {
    await atualizarNumMensagensNaoLidas()

    const echo = await obterEcho()

    canal = echo
        .private(`usuario.${authStore.user.id}`)
        .listen('.mensagem.enviada', () => {
            atualizarNumMensagensNaoLidas()
        })
})

onUnmounted(async () => {
    if (canal) {
        const echo = await obterEcho()
        echo.leave(`usuario.${authStore.user.id}`)
    }
})

const atualizarNumMensagensNaoLidas = async () => {
    try {
        const dados = await buscarNumMensagensNaoLidas()
        // alert(JSON.stringify(dados))

        numMensagensNaoLidas.value = dados.numero

    } catch (e) {
        console.error(e)
    }
}

const logo = computed(() =>
    Dark.isActive ? logoDark : logoLight
)

const drawer = ref(false)
const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const expansoes = reactive({})

// const {
//     animacaoEntrar,
//     animacaoSair
// } = useTransicaoEntrePaginas()

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

// vai até a url desejada e fecha o expansion item se houver
function navegar(rota, expansao = null) {
    try {

        if (expansao) { expansoes[expansao] = false }
        router.push({ name: rota })
    } catch (e) {
        alert(e)
    }
}

const voltar = () => {

    if (window.history.length > 1) {
        router.back()
    } else {
        router.replace({ name: 'home' })
    }

}
</script>