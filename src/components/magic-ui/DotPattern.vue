<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/utils/cn'

interface Props {
  className?: string
  width?: number
  height?: number
  cx?: number
  cy?: number
  cr?: number
  color?: string
}

const props = withDefaults(defineProps<Props>(), {
  className: '',
  width: 16,
  height: 16,
  cx: 1,
  cy: 1,
  cr: 1,
  color: '#34F5A3'
})

const patternStyle = computed(() => {
  const rgb = props.color.replace('#', '')
  const r = parseInt(rgb.substring(0, 2), 16)
  const g = parseInt(rgb.substring(2, 4), 16)
  const b = parseInt(rgb.substring(4, 6), 16)
  
  return {
    backgroundImage: `radial-gradient(circle, rgba(${r}, ${g}, ${b}, 0.4) ${props.cr}px, transparent ${props.cr}px)`,
    backgroundSize: `${props.width}px ${props.height}px`,
    backgroundPosition: `${props.cx}px ${props.cy}px`
  }
})
</script>

<template>
  <div
    :class="cn('pointer-events-none absolute inset-0 overflow-hidden', className)"
    :style="patternStyle"
  />
</template>
