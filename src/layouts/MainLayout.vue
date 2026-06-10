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
      <router-view />
    </q-page-container>

    <!-- Navegação inferior -->
    <q-footer bordered>
      <q-tabs
        align="justify"
      >

        <q-route-tab
          icon="home"
          to="/"
        />

        <q-route-tab
          icon="map"
          to="/map"
        />

        <q-route-tab
          icon="notifications"
          to="/notifications"
        />

        <q-route-tab
          icon="person"
          to="/profile"
        />

      </q-tabs>
    </q-footer>

  </q-layout>
</template>

<script setup>
</script>