<script lang="ts" setup>
import { useSessionStore } from '@/stores/session'
import { computed } from 'vue'

const userStore = useSessionStore()

const welcomeMessage = computed(() => `Yoo ${userStore.user?.name.toUpperCase()}!`)
</script>

<template>
  <div>{{ welcomeMessage }}</div>
</template>
