<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/utils/cn'

interface Props {
  className?: string
  squares?: number
  duration?: number
}

const props = withDefaults(defineProps<Props>(), {
  className: '',
  squares: 50,
  duration: 2
})

const squaresArray = computed(() => {
  return Array.from({ length: props.squares }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * props.duration,
    duration: (Math.random() * 0.5 + 0.5) * props.duration
  }))
})
</script>

<template>
  <div :class="cn('pointer-events-none absolute inset-0 overflow-hidden', className)">
    <div
      v-for="square in squaresArray"
      :key="square.id"
      class="absolute w-1 h-1 bg-[#34F5A3] opacity-0 animate-flicker"
      :style="{
        left: `${square.x}%`,
        top: `${square.y}%`,
        animationDelay: `${square.delay}s`,
        animationDuration: `${square.duration}s`
      }"
    />
  </div>
</template>

<style scoped>
@keyframes flicker {
  0%, 100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}

.animate-flicker {
  animation: flicker ease-in-out infinite;
}
</style>
