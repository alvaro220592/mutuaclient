<template>
    <div>
        <p>Olá, {{ authStore.user?.name }}</p>
    </div>
</template>

<script setup>


import { useAuthStore } from 'src/stores/auth'

const authStore = useAuthStore()

</script>

<style lang="scss" scoped></style>