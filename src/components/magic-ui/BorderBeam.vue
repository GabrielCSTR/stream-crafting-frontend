<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { cn } from '@/utils/cn'

interface Props {
  className?: string
  size?: number
  duration?: number
  borderWidth?: number
  anchor?: number
  colorFrom?: string
  colorTo?: string
  delay?: number
}

const props = withDefaults(defineProps<Props>(), {
  className: '',
  size: 200,
  duration: 15,
  borderWidth: 1.5,
  anchor: 90,
  colorFrom: '#34F5A3',
  colorTo: '#6D5DF6',
  delay: 0
})

const containerRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, props.delay)
})
</script>

<template>
  <div
    ref="containerRef"
    :class="cn('pointer-events-none absolute inset-0 rounded-[inherit] [border:calc(var(--border-width,1.5px)*1)_solid_transparent]', className)"
    :style="{
      '--border-width': `${borderWidth}px`,
      '--size': `${size}px`,
      '--duration': `${duration}s`,
      '--anchor': `${anchor}%`,
      '--color-from': colorFrom,
      '--color-to': colorTo,
    } as any"
  >
    <div
      v-if="isVisible"
      :class="cn('absolute [--duration:var(--duration)] [--size:var(--size)] [--anchor:var(--anchor)] [--color-from:var(--color-from)] [--color-to:var(--color-to)] [border:calc(var(--border-width)*1)_solid_transparent] rounded-[inherit] [background:padding-box_linear-gradient(var(--color-from),var(--color-to)),border-box_linear-gradient(var(--color-from),var(--color-to))] [background-size:200%_100%,var(--size)_var(--size)] [background-position:200%_0%,var(--anchor)_var(--anchor)] [background-clip:padding-box,border-box] [background-repeat:no-repeat,repeat] [animation:border-beam_calc(var(--duration)*1s)_linear_infinite]')"
      style="mask: linear-gradient(#000 0 0) padding-box exclude, linear-gradient(#000 0 0); -webkit-mask: linear-gradient(#000 0 0) padding-box exclude, linear-gradient(#000 0 0);"
    />
  </div>
</template>

<style scoped>
@keyframes border-beam {
  100% {
    background-position: -200% 0%, var(--anchor) var(--anchor);
  }
}
</style>
