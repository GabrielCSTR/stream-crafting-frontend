<script setup lang="ts">
import useElement from '@/composables/useElement'
import type { INormalizedHUDElementBind } from '@/types/hud'

const props = defineProps<INormalizedHUDElementBind>()

const emits = defineEmits(['update:position', 'update:size'])

const { styles } = useElement(props, emits)
</script>

<template>
  <div ref="elementRef" class="stream-crafter-hud-element-base" :style="styles">
    <slot></slot>
  </div>
</template>

<style lang="scss">
.stream-crafter-hud-element-base {
  display: flex;
  align-items: center;
  justify-content: center;
  text-wrap: nowrap;
  position: absolute;
  padding: 0 1em;
  min-width: min-content;
  transform: translate(var(--hud-element-position-x), var(--hud-element-position-y));
  width: var(--hud-element-width);
  height: var(--hud-element-height);
  background-color: var(--hud-element-background-color);
  color: var(--hud-element-color);
  touch-action: none;
  user-select: none;
}
</style>
