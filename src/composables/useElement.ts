import type { INormalizedHUDElementBind } from '@/types/hud'
import interact from 'interactjs'
import { computed, onMounted, useTemplateRef } from 'vue'

export default function useElement<
  T extends INormalizedHUDElementBind,
  E extends ((eventName: 'update:position', event: INormalizedHUDElementBind['position']) => void) &
    ((eventName: 'update:size', event: INormalizedHUDElementBind['size']) => void)
>(props: T, emits: E) {
  const elementRef = useTemplateRef<HTMLDivElement>('elementRef')

  // .on('resizeend', (event) => {
  //   const target = event.target

  //   target.textContent = oldTextContent.value
  // })

  const styles = computed(() => ({
    '--hud-element-position-x': `${props.position.x}px`,
    '--hud-element-position-y': `${props.position.y}px`,
    '--hud-element-width': `${props.size.width}px`,
    '--hud-element-height': `${props.size.height}px`,
    '--hud-element-background-color': props.backgroundColor,
    '--hud-element-text-color': props.color
  }))

  onMounted(() => {
    if (elementRef.value) {
      interact(elementRef.value)
        .draggable({
          inertia: true,
          modifiers: [
            interact.modifiers.snap({
              targets: [interact.snappers.grid({ x: 30, y: 30 })],
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
            },
            move(event) {
              const x = props.position.x + event.dx
              const y = props.position.y + event.dy

              emits('update:position', { x, y })
            }
          }
        })
        .resizable({
          inertia: true,

          edges: { left: true, right: true, bottom: true, top: true },

          listeners: {
            move(event) {
              const x = props.position.x + event.deltaRect.left
              const y = props.position.y + event.deltaRect.top

              const width = event.rect.width
              const height = event.rect.height

              emits('update:position', { x, y })

              emits('update:size', { width, height })

              // target.textContent =
              //   Math.round(event.rect.width) + '\u00D7' + Math.round(event.rect.height)
            }
          },
          modifiers: [
            interact.modifiers.restrictEdges({
              outer: 'parent'
            }),

            interact.modifiers.restrictSize({
              min: { width: 100, height: 50 }
            })
          ]
        })
    }
  })

  return {
    styles
  }
}
