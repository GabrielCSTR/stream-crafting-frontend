<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/utils/cn'

interface Props {
  number?: number
  className?: string
}

const props = withDefaults(defineProps<Props>(), {
  number: 20,
  className: ''
})

const meteors = computed(() => {
  return Array.from({ length: props.number }, (_, i) => ({
    id: i,
    left: Math.floor(Math.random() * (400 - -400) + -400) + 'px',
    animationDelay: Math.random() * (0.8 - 0.2) + 0.2 + 's',
    animationDuration: Math.floor(Math.random() * (10 - 2) + 2) + 's',
    top: Math.floor(Math.random() * (400 - -400) + -400) + 'px'
  }))
})
</script>

<template>
  <div :class="cn('pointer-events-none absolute inset-0 overflow-hidden', className)">
    <div
      v-for="meteor in meteors"
      :key="meteor.id"
      class="animate-meteor-effect absolute top-1/2 left-1/2 h-0.5 w-0.5 rounded-[9999px] bg-[#34F5A3] shadow-[0_0_0_1px_#34F5A3_inset,0_0_6px_#34F5A3,0_0_8px_#34F5A3]"
      :style="{
        top: meteor.top,
        left: meteor.left,
        animationDelay: meteor.animationDelay,
        animationDuration: meteor.animationDuration
      }"
    />
  </div>
</template>

<style scoped>
@keyframes meteor-effect {
  to {
    transform: translate(var(--tx), var(--ty)) rotate(var(--angle));
    opacity: 0;
  }
}

.animate-meteor-effect {
  --angle: 215deg;
  --tx: 200px;
  --ty: 200px;
  animation: meteor-effect linear infinite;
}
</style>
