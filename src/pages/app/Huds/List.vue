<script lang="ts" setup>
import GridItem from '@/components/Huds/GridItem.vue'
import { dayjs } from '@/plugins/dayjs'
import type { Hud } from '@/services/models/hud'

import { ref } from 'vue'

const huds = ref<Hud[]>([
  {
    _id: '666e4a7a9c782d9999a30ab8',
    created_at: dayjs().subtract(5, 'months').toDate(),
    updated_at: dayjs().subtract(2, 'weeks').toDate(),
    src: 'https://placehold.co/1000x500',
    name: 'Static Hud'
  }
])
</script>

<template>
  <Fluid class="stream-crafting-huds-page">
    <h2>Huds</h2>

    <ul class="stream-crafting-huds-page__list list-none pl-0">
      <GridItem v-for="hud in huds" :key="hud._id" :hud="hud"></GridItem>
    </ul>
  </Fluid>
</template>
