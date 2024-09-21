<script setup lang="ts">
import type { IHUDText } from '@/types/hud'
import Base from './Base.vue'

const props = defineProps<IHUDText>()
</script>

<template>
  <Base
    class="stream-crafter-hud-element-text"
    v-bind="props"
    @update:position="$emit('update:position', $event)"
    @update:size="$emit('update:size', $event)"
  >
    <span class="stream-crafter-hud-element-text__content">
      {{ props.data.text }}
    </span>
  </Base>
</template>

<style lang="scss">
.stream-crafter-hud-element-text {
  border-radius: 0.75em;
}
</style>
