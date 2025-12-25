<script setup lang="ts">
import useElement from '@/composables/useElement'
import { BOUNDING_BOX_ID, CONTEXT_MENU_Z_INDEX } from '@/composables/useElementSelection'
import type { HUDElementBaseEmits, HUDElementBaseProps } from '@/types'
import { PrimeIcons } from '@primevue/core'
import ContextMenu, { type ContextMenuMethods } from 'primevue/contextmenu'
import type { MenuItem } from 'primevue/menuitem'
import { computed, markRaw, ref } from 'vue'

const props = defineProps<HUDElementBaseProps>()

const emits = defineEmits<HUDElementBaseEmits>()

const { elementRef, styles, isResizing } = useElement(props, emits)

// const isFocused = ref(false)

const contextMenuRef = ref<ContextMenuMethods>()

const contextMenuItems = markRaw<MenuItem[]>([
  generateShowOrHideAction(true),
  generateShowOrHideAction(false),
  {
    separator: true
  },
  {
    label: props.groupId ? '[Desagrupar]' : '[Agrupar selecionados]',
    icon: props.groupId ? PrimeIcons.TIMES : PrimeIcons.LINK,
    visible: () => props.id !== BOUNDING_BOX_ID,
    command: () => {
      if (props.groupId) {
        emits('update:group', undefined)
      }
    }
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

function generateShowOrHideAction(show: boolean): MenuItem {
  const data = show
    ? {
        icon: PrimeIcons.EYE,
        label: () => (props.id === BOUNDING_BOX_ID ? '[Mostrar nós]' : '[Mostrar nó]')
      }
    : {
        icon: PrimeIcons.EYE_SLASH,
        label: () => (props.id === BOUNDING_BOX_ID ? '[Esconder nós]' : '[Esconder nó]')
      }

  return {
    ...data,
    visible: () => {
      if (props.id === BOUNDING_BOX_ID) {
        return true
      }

      return show ? !props.isShowed : props.isShowed
    },
    command: () => {
      emits('update:is-showed', show)
    }
  }
}

function onContextMenu(event: MouseEvent) {
  if (!props.isInsideBoundingBox) {
    contextMenuRef.value?.show(event)
  }
}

function getBoundingClientRect() {
  return elementRef.value?.getBoundingClientRect()
}

defineExpose({
  getBoundingClientRect
})

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
        'stream-crafter-hud-element-base--active': props.active,
        'stream-crafter-hud-element-base--grouped': props.groupId
      }
    ]"
    tabindex="0"
    :data-key="props.id"
    :style="styles"
    @contextmenu.prevent="onContextMenu"
    @click="emits('click', $event)"
  >
    <ContextMenu
      ref="contextMenuRef"
      :model="contextMenuItems"
      :base-z-index="CONTEXT_MENU_Z_INDEX"
    />

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
    border-color: var(--p-primary-color);
  }

  &--grouped {
    outline: 2px solid #6D5DF6;
    outline-offset: -2px;
  }
}

// .p-contextmenu {
//   z-index: 10000 !important;
// }
</style>
