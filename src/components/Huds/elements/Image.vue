<script setup lang="ts">
import type { HUDElementBaseEmits, HUDElementImageProps } from '@/types'
import { generateListeners } from '@/utils'
import Base from './Base.vue'
import { computed } from 'vue'

const props = defineProps<HUDElementImageProps>()

const emits = defineEmits<HUDElementBaseEmits>()

const on = generateListeners<HUDElementBaseEmits>(
  ['update:position', 'update:size', 'update:is-showed', 'update:layer', 'delta:position', 'click'],
  emits
)

const styles = computed(() => ({
  backgroundImage: `url(${props.data.src})`,
  width: `${props.size.width}px`,
  height: `${props.size.height}px`
}))
</script>

<template>
  <Base
    class="stream-crafter-hud-element-image bg-cover bg-center"
    v-bind="props"
    v-on="on"
    :style="styles"
  >
  </Base>
</template>
