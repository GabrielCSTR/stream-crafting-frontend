<script setup lang="ts">
import type { HUDElementBaseEmits, INormalizedHUDElementBind } from '@/types'
import Base from './Base.vue'
import { useTemplateRef } from 'vue'

const baseRef = useTemplateRef('baseRef')

const props = defineProps<INormalizedHUDElementBind>()

const emits = defineEmits<{
  'on-change-is-showed': HUDElementBaseEmits['update:is-showed']
  'on-change-size': HUDElementBaseEmits['update:size']
  'on-change-position': HUDElementBaseEmits['delta:position']
  'on-change-layer': HUDElementBaseEmits['update:layer']
}>()

function getBoundingClientRect() {
  return baseRef.value?.getBoundingClientRect()
}

defineExpose({
  getBoundingClientRect
})
</script>

<template>
  <Base
    ref="baseRef"
    class="stream-crafter-hud-element-bounding-box absolute"
    v-bind="props"
    @update:size="emits('on-change-size', $event)"
    @update:layer="emits('on-change-layer', $event)"
    @delta:position="emits('on-change-position', $event)"
    @update:is-showed="emits('on-change-is-showed', $event)"
  ></Base>
</template>

<style lang="scss">
.stream-crafter-hud-element-bounding-box {
  border: 2px dashed var(--p-primary-color);
}
</style>
