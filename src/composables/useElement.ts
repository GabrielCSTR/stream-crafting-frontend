import type { EmitsFunction } from '@/types'
import type { HUDElementBaseEmits, IHUDElement, INormalizedHUDElementBind } from '@/types/hud'
import interact from 'interactjs'
import { computed, onMounted, ref, useTemplateRef } from 'vue'

export const DEFAULT_SNAP = 30

export default function useElement(
  props: INormalizedHUDElementBind,
  emits: EmitsFunction<HUDElementBaseEmits>
) {
  const elementRef = useTemplateRef<HTMLDivElement>('elementRef')

  const interactInstance = ref<ReturnType<typeof interact>>()
  // .on('resizeend', (event) => {
  //   const target = event.target

  //   target.textContent = oldTextContent.value
  // })

  const isDragging = ref(false)
  const isResizing = ref(false)

  const styles = computed(() => ({
    '--hud-element-position-x': `${props.position.x}px`,
    '--hud-element-position-y': `${props.position.y}px`,
    '--hud-element-width': `${props.size.width}px`,
    '--hud-element-height': `${props.size.height}px`,
    '--hud-element-background-color': props.backgroundColor,
    '--hud-element-text-color': props.color,
    '--hud-element-layer': props.layer
  }))

  onMounted(() => {
    if (elementRef.value) {
      interactInstance.value = interact(elementRef.value)

      if (!props.disable) {
        interactInstance.value
          .draggable({
            inertia: true,

            modifiers: [
              interact.modifiers.snap({
                targets: [interact.snappers.grid({ x: DEFAULT_SNAP, y: DEFAULT_SNAP })],
                range: Infinity,
                relativePoints: [{ x: 0, y: 0 }]
              }),
              interact.modifiers.restrictRect({
                restriction: 'parent',
                endOnly: true
              })
            ],

            listeners: {
              start(event) {
                console.log(event.type, event.target)

                isDragging.value = true
              },

              move(event) {
                const { dx, dy } = event
                const x = props.position.x + dx
                const y = props.position.y + dy

                emits('update:position', { x, y })
              },

              end() {
                isDragging.value = false
              }
            }
          })
          .resizable({
            inertia: true,

            edges: { left: true, right: true, bottom: true, top: true },

            listeners: {
              start() {
                isResizing.value = true
              },
              move(event) {
                const x = props.position.x + event.deltaRect.left
                const y = props.position.y + event.deltaRect.top

                const width = event.rect.width
                const height = event.rect.height

                emits('update:position', { x, y })

                emits('update:size', { width, height })
              },
              end() {
                isResizing.value = false
              }
            },
            modifiers: [
              // Restringe o tamanho do redimensionamento para o container pai.
              interact.modifiers.restrictEdges({
                outer: 'parent'
              }),

              // Restringe o tamanho do redimensionamento até 100x100
              interact.modifiers.restrictSize({
                min: { width: 100, height: 100 }
              }),

              // Preserva o aspecto original do elemento
              interact.modifiers.aspectRatio({
                enabled: !!props.maintainAspectRatio,
                ratio: 'preserve'
              })
            ]
          })
      }
    }
  })

  return {
    interactInstance,
    elementRef,
    isDragging,
    isResizing,
    styles
  }
}

export const LIST: IHUDElement[] = [
  {
    id: '0c6a71d933ce480f1bd75588172f597e26155baa',
    isShowed: true,
    layer: 1,
    component: 'text',
    backgroundColor: '#b17fa9',
    color: '#2d2d2d',
    maintainAspectRatio: false,
    position: {
      x: 539.9999969033828,
      y: 180.00000227441978
    },
    size: {
      width: 281.609375,
      height: 100
    },
    data: {
      text: 'ELEMENTO TESTE 1'
    }
  },
  {
    id: '785fbff42ed8d02d12e0f27ac0cef4210d7debff',
    isShowed: false,
    layer: 0,
    component: 'text',
    backgroundColor: '#9c137b',
    color: '#ffffff',
    maintainAspectRatio: false,
    position: {
      x: 922.2656163286897,
      y: 448.0000000104938
    },
    size: {
      width: 375.734375,
      height: 180
    },
    data: {
      text: 'ELEMENTO TESTE 2'
    }
  },
  {
    id: '5ed07f3d4fc17e8f4af06a95128cd98545148930',
    isShowed: true,
    layer: 1,
    component: 'text',
    backgroundColor: '#77a32c',
    color: '#2d2d2d',
    maintainAspectRatio: false,
    position: {
      x: 0,
      y: 179.9999999999992
    },
    size: {
      width: 280,
      height: 100
    },
    data: {
      text: 'ELEMENTO TESTE 3'
    }
  },
  {
    id: 'c0a246bda1db9a471f2f9b374fe9fefee56b7019',
    isShowed: true,
    layer: 1,
    component: 'text',
    backgroundColor: '#2ab28d',
    color: '#2d2d2d',
    maintainAspectRatio: false,
    position: {
      x: 270,
      y: 90
    },
    size: {
      width: 100,
      height: 100
    },
    data: {
      text: 'ELEMENTO TESTE 4'
    }
  },
  {
    id: '745398f340c7411249300ee61a61626338dc8870',
    isShowed: true,
    layer: 1,
    component: 'text',
    backgroundColor: '#5775ad',
    color: '#ffffff',
    maintainAspectRatio: false,
    position: {
      x: 810,
      y: 90
    },
    size: {
      width: 100,
      height: 100
    },
    data: {
      text: 'ELEMENTO TESTE 5'
    }
  },
  {
    id: 'dc45d90b28282024802de6428d6757fc5b2ff411',
    isShowed: true,
    layer: 1,
    component: 'text',
    backgroundColor: '#653224',
    color: '#ffffff',
    maintainAspectRatio: false,
    position: {
      x: 360,
      y: 180
    },
    size: {
      width: 100,
      height: 100
    },
    data: {
      text: 'ELEMENTO TESTE 6'
    }
  },
  {
    id: '20396969ad223ff8f9b896ed072f421a8d98dd43',
    isShowed: true,
    layer: 1,
    component: 'text',
    backgroundColor: '#4862b7',
    color: '#ffffff',
    maintainAspectRatio: false,
    position: {
      x: 450,
      y: 90
    },
    size: {
      width: 100,
      height: 100
    },
    data: {
      text: 'ELEMENTO TESTE 7'
    }
  },
  {
    id: 'c912a849bdbbea78644081e2d81d3ffde94fea22',
    isShowed: true,
    layer: 0,
    component: 'text',
    backgroundColor: '#e8c96f',
    color: '#2d2d2d',
    maintainAspectRatio: false,
    position: {
      x: 1075,
      y: 0
    },
    size: {
      width: 223,
      height: 169
    },
    data: {
      text: 'ELEMENTO TESTE 8'
    }
  }
]
