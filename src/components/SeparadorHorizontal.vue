<template>
    <div class="row items-center">
        <div class="col"><q-separator /></div>
        <div v-if="detalhes" class="q-px-sm text-caption text-grey-6">{{ detalhes }}</div>
        <div class="col"><q-separator /></div>
    </div>
</template>

<script setup>
defineProps({
    detalhes: {
        type: String,
        required: false
    }
})
</script>