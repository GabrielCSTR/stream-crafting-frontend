<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/utils/cn'

interface Props {
  className?: string
  text?: string
}

const props = withDefaults(defineProps<Props>(), {
  className: '',
  text: ''
})

const gradientClass = computed(() => 
  'bg-gradient-to-r from-[#34F5A3] via-[#3AF2E9] to-[#6D5DF6] bg-clip-text text-transparent'
)
</script>

<template>
  <div :class="cn('group relative mx-auto flex max-w-fit flex-row items-center justify-center rounded-2xl bg-black/40 px-4 py-1.5 text-sm font-medium shadow-[inset_0_-8px_10px_#34F5A30f] backdrop-blur-sm transition-shadow duration-500 ease-out hover:shadow-[inset_0_-5px_10px_#34F5A33f] border border-[#34F5A3]/20', className)">
    <span :class="gradientClass">
      <slot>{{ text }}</slot>
    </span>
  </div>
</template>
