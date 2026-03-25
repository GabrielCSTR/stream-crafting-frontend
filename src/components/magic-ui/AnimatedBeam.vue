<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/utils/cn'

interface Props {
  className?: string
  containerRef?: HTMLElement | null
  fromRef?: HTMLElement | null
  toRef?: HTMLElement | null
  curvature?: number
  reverse?: boolean
  duration?: number
  delay?: number
}

const props = withDefaults(defineProps<Props>(), {
  className: '',
  containerRef: null,
  fromRef: null,
  toRef: null,
  curvature: -75,
  reverse: false,
  duration: 3,
  delay: 0
})

const pathD = computed(() => {
  if (!props.fromRef || !props.toRef) return ''
  
  const fromRect = props.fromRef.getBoundingClientRect()
  const toRect = props.toRef.getBoundingClientRect()
  
  const fromX = fromRect.left + fromRect.width / 2
  const fromY = fromRect.top + fromRect.height / 2
  const toX = toRect.left + toRect.width / 2
  const toY = toRect.top + toRect.height / 2
  
  const midX = (fromX + toX) / 2
  const midY = (fromY + toY) / 2
  
  return `M ${fromX} ${fromY} Q ${midX} ${midY + props.curvature} ${toX} ${toY}`
})
</script>

<template>
  <svg
    v-if="fromRef && toRef"
    :class="cn('pointer-events-none absolute left-0 top-0 transform-gpu stroke-2', className)"
    width="100%"
    height="100%"
    style="overflow: visible;"
  >
    <path
      :d="pathD"
      fill="none"
      stroke="url(#gradient)"
      stroke-width="2"
      :class="reverse ? 'animate-draw-reverse' : 'animate-draw'"
      :style="{
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`
      }"
    />
    <defs>
      <linearGradient id="gradient" gradientUnits="userSpaceOnUse" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#FD2A36" stop-opacity="0" />
        <stop offset="0%" stop-color="#FD2A36" stop-opacity="1" />
        <stop offset="100%" stop-color="#FFAF0E" stop-opacity="1" />
        <stop offset="100%" stop-color="#FFAF0E" stop-opacity="0" />
      </linearGradient>
    </defs>
  </svg>
</template>

<style scoped>
@keyframes draw {
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes draw-reverse {
  from {
    stroke-dashoffset: 0;
  }
  to {
    stroke-dashoffset: var(--path-length);
  }
}

.animate-draw,
.animate-draw-reverse {
  stroke-dasharray: var(--path-length);
  stroke-dashoffset: var(--path-length);
  animation: draw linear forwards;
}
</style>
