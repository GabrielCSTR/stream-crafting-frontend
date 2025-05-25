<script setup lang="ts">
import type { Hud } from '@/services/models/hud'
import dayjs from 'dayjs'
import type { CardPassThroughOptions } from 'primevue/card'
import type { ImagePassThroughOptions } from 'primevue/image'
import { computed, markRaw } from 'vue'

const props = defineProps<{
  hud: Hud
}>()

const cardPT = markRaw<CardPassThroughOptions>({
  header: {
    class: 'flex justify-center items-center'
  }
})

const imagePT = markRaw<ImagePassThroughOptions>({
  image: {
    class: 'rounded-lg'
  }
})

const list = computed(() => [
  {
    key: 'created_at',
    text: '[Criado]',
    value: dayjs().to(props.hud.created_at)
  },
  {
    key: 'created_at',
    text: '[Atualizado]',
    value: dayjs().to(props.hud.updated_at)
  }
])
</script>

<template>
  <router-link class="stream-crafting-hud-grid-item" :to="`/app/huds/${props.hud._id}/editor`">
    <Card class="w-full max-w-72 py-5" :pt="cardPT">
      <template #header>
        <PImage
          class="rounded-lg"
          :alt="`${props.hud.name} preview`"
          :src="props.hud.src"
          width="250"
          :pt="imagePT"
        />
      </template>

      <template #title>{{ props.hud.name }}</template>

      <template #content>
        <ul class="list-none pl-0">
          <li v-for="listItem in list" :key="listItem.key" class="flex justify-between">
            <span>
              {{ listItem.text }}
            </span>

            <span>
              {{ listItem.value }}
            </span>
          </li>
        </ul>
      </template>
    </Card>
  </router-link>
</template>
