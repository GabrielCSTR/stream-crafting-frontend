<script setup lang="ts">
import { cn } from '@/utils/cn'

interface Props {
  className?: string
  showRadialGradient?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  className: '',
  showRadialGradient: true
})
</script>

<template>
  <div :class="cn('pointer-events-none absolute inset-0 overflow-hidden', className)" style="contain: layout style paint;">
    <div
      v-if="showRadialGradient"
      class="absolute -inset-[10px] opacity-50"
      style="
        background: 
          radial-gradient(at 0% 0%, rgba(52, 245, 163, 0.3) 0px, transparent 50%),
          radial-gradient(at 100% 0%, rgba(109, 93, 246, 0.3) 0px, transparent 50%),
          radial-gradient(at 100% 100%, rgba(58, 242, 233, 0.3) 0px, transparent 50%),
          radial-gradient(at 0% 100%, rgba(52, 245, 163, 0.3) 0px, transparent 50%);
        filter: blur(60px);
        animation: aurora 20s ease infinite;
      "
    />
    <div
      class="absolute inset-0 opacity-30"
      style="
        background: 
          linear-gradient(135deg, rgba(52, 245, 163, 0.1) 0%, transparent 50%),
          linear-gradient(225deg, rgba(109, 93, 246, 0.1) 0%, transparent 50%),
          linear-gradient(315deg, rgba(58, 242, 233, 0.1) 0%, transparent 50%);
        animation: aurora-shift 15s ease infinite;
      "
    />
  </div>
</template>

<style scoped>
@keyframes aurora {
  0%, 100% {
    transform: rotate(0deg) scale(1);
  }
  33% {
    transform: rotate(120deg) scale(1.1);
  }
  66% {
    transform: rotate(240deg) scale(0.9);
  }
}

@keyframes aurora-shift {
  0%, 100% {
    background-position: 0% 0%, 100% 0%, 50% 100%;
  }
  50% {
    background-position: 100% 100%, 0% 100%, 50% 0%;
  }
}
</style>
