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
                <router-view />
            </q-page>
        </q-page-container>

        <!-- Navegação inferior -->
        <!-- <q-footer bordered>
            <q-tabs align="justify">
                <q-route-tab icon="home" to="/" />
                <q-route-tab icon="login" to="/login" />
            </q-tabs>
        </q-footer> -->

    </q-layout>
</template>

<script setup>
</script>