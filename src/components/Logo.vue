<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    width?: string | number
    height?: string | number
  }>(),
  { width: 100, height: 50 }
)
</script>

<template>
  <!-- eslint-disable-next-line vue/require-component-is -->
  <component class="stream-crafting-logo" is="div">
    <p-image
      class="flex"
      :src="`https://placehold.co/${props.width}x${props.height}`"
      alt="Logo"
      :width="props.width"
      :height="props.height"
    />
  </component>
</template>
