<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { cn } from '@/utils/cn'

interface Props {
  className?: string
  mainCircleSize?: number
  mainCircleOpacity?: number
  numCircles?: number
}

const props = withDefaults(defineProps<Props>(), {
  className: '',
  mainCircleSize: 210,
  mainCircleOpacity: 0.24,
  numCircles: 8
})

const containerRef = ref<HTMLElement | null>(null)
let animationFrameId: number | null = null

const createRipple = (): (() => void) | null => {
  if (!containerRef.value) return null

  const circles = Array.from({ length: props.numCircles }, (_, i) => {
    const circle = document.createElement('div')
    const size = props.mainCircleSize + i * 70
    const opacity = props.mainCircleOpacity - i * 0.03
    const delay = i * 0.06
    const duration = 1.51 + i * 0.09

    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.position = 'absolute'
    circle.style.left = '50%'
    circle.style.top = '50%'
    circle.style.transform = 'translate(-50%, -50%) scale(0)'
    circle.style.border = `1px solid rgba(253, 42, 54, ${opacity})`
    circle.style.borderRadius = '9999px'
    circle.style.animation = `ripple ${duration}s ease-out ${delay}s infinite`
    circle.style.animationFillMode = 'forwards'

    return circle
  })

  circles.forEach(circle => {
    if (containerRef.value) {
      containerRef.value.appendChild(circle)
    }
  })

  return () => {
    circles.forEach(circle => circle.remove())
  }
}

let cleanupFn: (() => void) | null = null

onMounted(() => {
  cleanupFn = createRipple()
})

onUnmounted(() => {
  cleanupFn?.()
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }
})
</script>

<template>
  <div
    ref="containerRef"
    :class="cn('pointer-events-none absolute inset-0 overflow-hidden', className)"
  />
</template>

<style scoped>
@keyframes ripple {
  to {
    transform: translate(-50%, -50%) scale(3);
    opacity: 0;
  }
}
</style>
