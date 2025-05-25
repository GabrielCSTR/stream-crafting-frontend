import { reactive, computed, onMounted, type Ref, useTemplateRef, ref } from 'vue'
import SelectionArea from '@viselect/vanilla'
import type { IHUDElement, IHUDElementBase, INormalizedHUDElementBind } from '@/types'
import { useMutationObserver } from '@vueuse/core'
import useColor from './useColor'

export type BoundingBox = Pick<IHUDElementBase, 'position' | 'size'>

export const CONTEXT_MENU_Z_INDEX = 9_999

export const BOUNDING_BOX_ID = 'bounding-box'

export default function useElementSelection(
  list: Ref<IHUDElement[]>,
  container: string,
  selectable: string
) {
  useMutationObserver(
    document.body,
    () => {
      setPrimaryColorNormalized()
    },
    {
      attributes: true
    }
  )

  const { changeAlpha } = useColor()

  const boundingBoxRef = useTemplateRef<HTMLDivElement>('boundingBoxRef')

  const selectionArea = reactive(
    new SelectionArea({
      selectables: selectable,
      boundaries: container
    })
  )

  const selecteds = reactive<Set<string>>(new Set())

  const primaryColorInHex = ref('')

  const selectedsIds = computed(() => Array.from(selecteds))

  const selectedElements = computed(() => list.value.filter((item) => selecteds.has(item.id)))

  const boundingBox = computed<INormalizedHUDElementBind>(() => {
    const base = {
      id: BOUNDING_BOX_ID,
      active: true,
      disable: false,
      isShowed: true,
      isInsideBoundingBox: false,
      maintainAspectRatio: false,
      backgroundColor: `#${changeAlpha(primaryColorInHex.value.replace('#', ''), 0.2)}`,
      color: 'transparent',
      data: {},
      layer: CONTEXT_MENU_Z_INDEX
    }

    if (selectedElements.value.length === 0)
      return {
        ...base,
        position: { x: 0, y: 0 },
        size: { width: 0, height: 0 }
      }

    const x1 = Math.min(...selectedElements.value.map((item) => item.position.x))
    const y1 = Math.min(...selectedElements.value.map((item) => item.position.y))
    const x2 = Math.max(...selectedElements.value.map((item) => item.position.x + item.size.width))
    const y2 = Math.max(...selectedElements.value.map((item) => item.position.y + item.size.height))

    return {
      ...base,
      position: {
        x: x1,
        y: y1
      },
      size: {
        width: x2 - x1,
        height: y2 - y1
      }
    }
  })

  onMounted(() => {
    setPrimaryColorNormalized()

    selectionArea
      .on('beforestart', ({ event }) => {
        document.body.style.userSelect = 'none'

        const isEventInElement = boundingBoxRef.value
          ? checkEventIsInElement(event, boundingBoxRef.value)
          : false

        return !isEventInElement
      })
      .on('start', ({ event }) => {
        if (!event?.ctrlKey && !event?.metaKey) {
          clearSelection()
        }
      })
      .on(
        'move',
        ({
          store: {
            changed: { added, removed }
          }
        }) => {
          const addedIds = extractIds(added)
          const removedIds = extractIds(removed)

          addedIds.forEach((id) => selecteds.add(id))
          removedIds.forEach((id) => selecteds.delete(id))
          // console.log('move', { added, removed, addedIds, removedIds })
        }
      )
      .on('stop', () => {
        document.body.style.userSelect = 'unset'
      })
  })

  function clearSelection() {
    selecteds.clear()
    selectionArea.clearSelection()
  }

  function extractIds(elements: Element[]) {
    return elements
      .map((el) => el.getAttribute('data-key'))
      .filter(Boolean)
      .map(String)
  }

  function checkEventIsInElement(
    event: MouseEvent | TouchEvent | null,
    element: HTMLElement | null
  ) {
    if (event === null || element === null) {
      return false
    }

    if (event instanceof MouseEvent) {
      const rect = element.getBoundingClientRect()

      const x = event.clientX

      if (x < rect.left || x >= rect.right) return false

      const y = event.clientY

      if (y < rect.top || y >= rect.bottom) return false

      return true
    }

    return false
  }

  function setPrimaryColorNormalized() {
    primaryColorInHex.value = getComputedStyle(document.body).getPropertyValue('--p-primary-color')
  }

  return {
    selecteds,
    boundingBox,
    selectionArea,
    selectedsIds,
    clearSelection,
    primaryColorInHex
  }
}
