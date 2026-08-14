<script setup>
import { onMounted } from 'vue'
import { configurarFirebase } from 'src/services/firebase'

onMounted(async () => {
  await configurarFirebase()
  alert('app')
})

</script>

<template>
  <router-view />
</template>