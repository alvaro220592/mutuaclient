<template>
    <q-layout view="hHh lpR fFf">

        <!-- Header -->
        <q-header class="bg-dark" elevated>
            <div class="row items-center q-pa-sm">
                <div class="col row justify-start">
                    <img :src="logoDark" width="60%" style="display: block;">
                </div>
                <div class="col row items-center justify-end">
                    <q-btn flat dense class="text-subtitle1" icon="logout" @click="logout" />
                </div>
            </div>
        </q-header>


        <q-page-container>
            <q-page class="q-pa-md flex flex-center">

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
import { useRouter } from 'vue-router'
import { useAuthStore } from 'src/stores/auth'
import { armazenarToken } from 'src/services/storage'
import logoDark from 'src/assets/logos/logo-mutua-dark-sem-fundo.png'


const router = useRouter()
const authStore = useAuthStore()


const logout = async () => {
    await armazenarToken(null)
    authStore.setAuth(null, null)
    router.replace('/login')
}

</script>


<style></style>