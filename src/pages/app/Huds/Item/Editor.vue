<script lang="ts" setup>
import HUDCanvas from '@/components/Huds/Canvas.vue'
import { LIST } from '@/composables/useElement'
import type { IHUDElement } from '@/types/hud'
import { onMounted, ref } from 'vue'

const list = ref<IHUDElement[]>([])

onMounted(() => {
  list.value = LIST
})
</script>

<template>
  <Page class="stream-crafter-hud-page">
    <HUDCanvas v-model="list" />
  </Page>
</template>
