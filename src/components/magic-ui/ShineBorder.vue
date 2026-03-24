<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/utils/cn'

interface Props {
  className?: string
  color?: string
  borderRadius?: number
  duration?: number
}

const props = withDefaults(defineProps<Props>(), {
  className: '',
  color: '#34F5A3',
  borderRadius: 16,
  duration: 14
})

const borderStyle = computed(() => ({
  '--border-radius': `${props.borderRadius}px`,
  '--color': props.color,
  '--duration': `${props.duration}s`
} as any))
</script>

<template>
  <div
    :class="cn('relative flex w-full items-center justify-center overflow-hidden rounded-[var(--border-radius)] border border-transparent bg-background p-[1px]', className)"
    :style="borderStyle"
  >
    <div class="relative z-10 w-full rounded-[var(--border-radius)] bg-[#0F172A] p-6">
      <slot />
    </div>
    <div
      class="shine-border absolute inset-0 rounded-[var(--border-radius)]"
      :style="{
        background: `linear-gradient(var(--border-radius), var(--color), transparent, transparent, var(--color))`,
        backgroundSize: '200% 200%',
        animation: `shine-border ${props.duration}s linear infinite`
      }"
    />
  </div>
</template>

<style scoped>
@keyframes shine-border {
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: -200% -200%;
  }
}
</style>
