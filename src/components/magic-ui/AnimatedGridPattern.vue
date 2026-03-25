<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/utils/cn'

interface Props {
  className?: string
  width?: number
  height?: number
  squares?: number
  maxSquares?: number
  duration?: number
}

const props = withDefaults(defineProps<Props>(), {
  className: '',
  width: 40,
  height: 40,
  squares: 20,
  maxSquares: 50,
  duration: 4
})

const gridStyle = computed(() => ({
  backgroundImage: `linear-gradient(to right, rgba(253, 42, 54, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(253, 42, 54, 0.1) 1px, transparent 1px)`,
  backgroundSize: `${props.width}px ${props.height}px`,
  animation: `grid-pattern ${props.duration}s linear infinite`
} as any))
</script>

<template>
  <div
    :class="cn('pointer-events-none absolute inset-0 overflow-hidden [mask-image:linear-gradient(to_bottom,white,transparent)]', className)"
    :style="gridStyle"
  />
</template>

<style scoped>
@keyframes grid-pattern {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(var(--width, 40px), var(--height, 40px));
  }
}
</style>
