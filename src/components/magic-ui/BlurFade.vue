<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { cn } from '@/utils/cn'

interface Props {
  className?: string
  delay?: number
  duration?: number
}

const props = withDefaults(defineProps<Props>(), {
  className: '',
  delay: 0,
  duration: 0.5
})

const isVisible = ref(false)

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, props.delay)
})
</script>

<template>
  <div
    :class="cn('transition-all duration-500 ease-out', className)"
    :style="{
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
      filter: isVisible ? 'blur(0)' : 'blur(10px)',
      transitionDuration: `${duration}s`
    }"
  >
    <slot />
  </div>
</template>
