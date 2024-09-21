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
      'splitter-or flex items-center justify-center',
      props.variation === 'horizontal' ? 'splitter-or--horizontal' : 'splitter-or--vertical'
    ]"
  >
    <div
      v-if="props.showText"
      class="splitter-or__text p-panel flex justify-center items-center px-2"
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
    border: 1px solid var(--p-form-field-border-color);
    text-transform: uppercase;
    border-radius: 5px;
    background: var(--p-form-field-background);
  }

  &::before {
    content: '';
    background-color: var(--p-form-field-border-color);
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
