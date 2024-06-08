<script setup lang="ts">
import type { DividerProps } from '@/types'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = withDefaults(defineProps<DividerProps>(), {
  variation: 'vertical',
  text: '',
  showText: true
})

const computedText = computed(() => props.text || t('components.separator.text'))
</script>

<template>
  <div
    :class="[
      'splitter-or flex align-items-center justify-content-center',
      props.variation === 'horizontal' ? 'splitter-or--horizontal' : 'splitter-or--vertical'
    ]"
  >
    <div
      v-if="props.showText"
      class="splitter-or__text p-panel flex justify-content-center align-items-center px-2"
    >
      {{ computedText }}
    </div>
  </div>
</template>

<style setup lang="scss">
.splitter-or {
  position: relative;

  &__text {
    position: absolute;
    min-height: 50px;
    min-width: 50px;
    border: 1px solid surface;
    text-transform: uppercase;
    border-radius: 5px;
    background: var(--surface-ground);
  }

  &::before {
    content: '';
    background-color: var(--gray-700);
    position: absolute;
  }

  &--horizontal {
    min-height: 50px;

    &::before {
      height: 1px;
      width: 100%;
    }
  }

  &--vertical {
    min-width: 50px;

    &::before {
      width: 1px;
      height: 100%;
    }
  }
}
</style>
