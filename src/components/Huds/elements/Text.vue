<script setup lang="ts">
import type { HUDElementBaseEmits, HUDElementTextProps } from '@/types'
import Base from './Base.vue'
import { generateListeners } from '@/utils'

const props = defineProps<HUDElementTextProps>()

const emits = defineEmits<HUDElementBaseEmits>()

const on = generateListeners<HUDElementBaseEmits>(
  ['update:position', 'update:size', 'update:is-showed', 'update:layer', 'click'],
  emits
)
</script>

<template>
  <Base class="stream-crafter-hud-element-text" v-bind="props" v-on="on">
    <span class="stream-crafter-hud-element-text__content truncate">
      {{ props.data.text }}
    </span>
  </Base>
</template>

<style lang="scss">
.stream-crafter-hud-element-text {
  border-radius: 0.75em;
}
</style>
