<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/utils/cn'

interface Props {
  className?: string
  children?: any
  reverse?: boolean
  duration?: number
  delay?: number
  path?: boolean
  radius?: number
  pathColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  className: '',
  reverse: false,
  duration: 20,
  delay: 0,
  path: true,
  radius: 50,
  pathColor: '#FD2A36'
})

const orbitStyle = computed(() => ({
  '--duration': `${props.duration}s`,
  '--delay': `${props.delay}s`,
  '--radius': `${props.radius}px`
} as any))
</script>

<template>
  <div :class="cn('relative flex size-full items-center justify-center', className)" :style="orbitStyle">
    <div
      v-if="path"
      :class="cn('pointer-events-none absolute inset-0 rounded-full border border-dashed', reverse ? 'animate-orbit-reverse' : 'animate-orbit')"
      :style="{
        borderColor: `${pathColor}20`,
        width: `calc(2 * var(--radius))`,
        height: `calc(2 * var(--radius))`,
        animationDuration: `var(--duration)`,
        animationDelay: `var(--delay)`
      }"
    />
    <div
      :class="cn('absolute', reverse ? 'animate-orbit-reverse' : 'animate-orbit')"
      :style="{
        width: `calc(2 * var(--radius))`,
        height: `calc(2 * var(--radius))`,
        animationDuration: `var(--duration)`,
        animationDelay: `var(--delay)`,
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)'
      }"
    >
      <div class="absolute left-1/2 top-0 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FD2A36] shadow-[0_0_8px_#FD2A36]">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes orbit {
  from {
    transform: rotate(0deg) translateY(calc(var(--radius) * -1)) rotate(0deg);
  }
  to {
    transform: rotate(360deg) translateY(calc(var(--radius) * -1)) rotate(-360deg);
  }
}

@keyframes orbit-reverse {
  from {
    transform: rotate(360deg) translateY(calc(var(--radius) * -1)) rotate(-360deg);
  }
  to {
    transform: rotate(0deg) translateY(calc(var(--radius) * -1)) rotate(0deg);
  }
}

.animate-orbit {
  animation: orbit linear infinite;
}

.animate-orbit-reverse {
  animation: orbit-reverse linear infinite;
}
</style>
