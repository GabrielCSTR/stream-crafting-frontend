<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { cn } from '@/utils/cn'

interface Props {
  className?: string
  gradientColor?: string
  gradientOpacity?: number
}

const props = withDefaults(defineProps<Props>(), {
  className: '',
  gradientColor: '#FD2A36',
  gradientOpacity: 0.1
})

const cardRef = ref<HTMLElement | null>(null)
const mouseX = ref(0)
const mouseY = ref(0)

const handleMouseMove = (e: MouseEvent) => {
  if (!cardRef.value) return
  
  const rect = cardRef.value.getBoundingClientRect()
  mouseX.value = e.clientX - rect.left
  mouseY.value = e.clientY - rect.top
}

onMounted(() => {
  if (cardRef.value) {
    cardRef.value.addEventListener('mousemove', handleMouseMove)
  }
})

onUnmounted(() => {
  if (cardRef.value) {
    cardRef.value.removeEventListener('mousemove', handleMouseMove)
  }
})

const gradientStyle = computed(() => {
  const opacityHex = Math.floor(props.gradientOpacity * 255).toString(16).padStart(2, '0')
  return {
    background: `radial-gradient(600px circle at ${mouseX.value}px ${mouseY.value}px, ${props.gradientColor}${opacityHex}, transparent 40%)`
  }
})
</script>

<template>
  <div
    ref="cardRef"
    :class="cn('group relative flex size-full overflow-hidden rounded-xl border border-[#242424] bg-gradient-to-br from-[#090909] to-[#121212]', className)"
  >
    <div class="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100" :style="gradientStyle" />
    <div class="relative z-10 w-full h-full">
      <slot />
    </div>
  </div>
</template>
