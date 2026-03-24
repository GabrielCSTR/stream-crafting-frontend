<script setup lang="ts">
import { cn } from '@/utils/cn'

interface Props {
  className?: string
}

defineProps<Props>()
</script>

<template>
  <div :class="cn('grid w-full auto-rows-max grid-cols-1 gap-4 md:grid-cols-3', $attrs.class)">
    <slot />
  </div>
</template>
