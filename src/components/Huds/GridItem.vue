<script setup lang="ts">
import type { Hud } from '@/services/models/hud'
import dayjs from 'dayjs'
import { computed } from 'vue'

const props = defineProps<{
  hud: Hud
}>()

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
  <router-link class="stream-crafting-hud-grid-item" :to="`/app/huds/${props.hud._id}`">
    <Card>
      <template #header>
        <PImage :alt="`${props.hud.name} preview`" :src="props.hud.src" width="200" />
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
