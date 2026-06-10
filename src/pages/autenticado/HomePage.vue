<template>
    <div>
        <q-btn color="primary" label="remove token" @click="onLogout" />

        <p>Olá, {{ authStore.user?.name }}</p>
    </div>
</template>

<script setup>

import { useRouter } from 'vue-router'
import { logout } from 'src/services/auth'

import { useAuthStore } from 'src/stores/auth'

const authStore = useAuthStore()

const router = useRouter()

const onLogout = async () => {
    await logout()
    router.replace('/login')
}

</script>

<style lang="scss" scoped></style>