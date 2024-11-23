<script setup lang="ts">
import useElement from '@/composables/useElement'
import type { HUDElementBaseEmits, HUDElementBaseProps } from '@/types'
import { PrimeIcons } from '@primevue/core'
import ContextMenu, { type ContextMenuMethods } from 'primevue/contextmenu'
import type { MenuItem } from 'primevue/menuitem'
import { computed, markRaw, ref } from 'vue'

const props = defineProps<HUDElementBaseProps>()

const emits = defineEmits<HUDElementBaseEmits>()

const { elementRef, styles, isResizing } = useElement(props, emits)

// const isFocused = ref(false)--

const contextMenuRef = ref<ContextMenuMethods>()

const contextMenuItems = markRaw<MenuItem[]>([
  {
    icon: (() => (props.isShowed ? PrimeIcons.EYE_SLASH : PrimeIcons.EYE)) as any,
    label: () => (props.isShowed ? '[Esconder nó]' : '[Mostrar nó]'),
    command: () => emits('update:is-showed', !props.isShowed)
  },
  {
    separator: true
  },
  {
    label: '[Trazer à frente]',
    icon: PrimeIcons.ARROW_UP,
    command: () => emits('update:layer', props.layer + 1)
  },
  {
    label: '[Mandar para trás]',
    icon: PrimeIcons.ARROW_DOWN,
    disabled: () => props.layer === 0,
    command: () => emits('update:layer', Math.max(0, props.layer - 1))
  }
])

const currentDimensions = computed(
  () => `${Math.ceil(props.size.width)} \u00D7 ${Math.ceil(props.size.height)}`
)

function onContextMenu(event: MouseEvent) {
  contextMenuRef.value?.show(event)
}

/* function onFocus() {
  isFocused.value = true
}

function onBlur() {
  isFocused.value = false
}

function onKeydown(event: KeyboardEvent) {
  if (elementRef.value && interactInstance.value) {
    let x = 0
    let y = 0

    switch (event.key) {
      case 'ArrowUp':
        y -= DEFAULT_SNAP
        break
      case 'ArrowDown':
        y = DEFAULT_SNAP
        break
      case 'ArrowLeft':
        x -= DEFAULT_SNAP
        break
      case 'ArrowRight':
        x = DEFAULT_SNAP
        break
      default:
        return // Exit if it's not an arrow key
    }

    interactInstance.value.fire({
      type: 'dragmove',
      target: elementRef.value,
      dx: x,
      dy: y
    })

    interactInstance.value.reflow({ name: 'drag', axis: 'xy' })
  }
} */
</script>

<template>
  <div
    ref="elementRef"
    :class="[
      'stream-crafter-hud-element-base absolute touch-none select-none flex items-center justify-center px-4',
      {
        'opacity-35': !props.isShowed,
        'stream-crafter-hud-element-base--active': props.active
      }
    ]"
    tabindex="0"
    :style="styles"
    @contextmenu.prevent="onContextMenu"
    @click="emits('click', $event)"
  >
    <ContextMenu ref="contextMenuRef" :model="contextMenuItems" />

    <div v-if="isResizing">
      {{ currentDimensions }}
    </div>
    <slot v-else></slot>
  </div>
</template>

<style lang="scss">
.stream-crafter-hud-element-base {
  transform: translate(var(--hud-element-position-x), var(--hud-element-position-y));
  width: var(--hud-element-width);
  height: var(--hud-element-height);
  background-color: var(--hud-element-background-color);
  color: var(--hud-element-text-color);
  border: 4px dashed transparent;
  z-index: var(--hud-element-layer);

  &__show-btn {
    --p-button-icon-only-width: 1.75rem;
  }

  &--active {
    border-color: white;
  }
}
</style>
