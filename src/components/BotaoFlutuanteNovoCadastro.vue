<template>
    <q-page-sticky position="bottom-right" :offset="[18, 18]" style="z-index:9999">
        <q-btn fab icon="add" color="primary" @click="$router.push({ name: nomeRota })" />
    </q-page-sticky>
</template>

<script setup>
defineProps({
    nomeRota: {
        type: String,
        required: true,
    }
})
</script>