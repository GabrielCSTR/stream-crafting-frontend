<script setup lang="ts">
import type { IHUDElement, INormalizedHUDElement, INormalizedHUDElementBind } from '@/types/hud'
import { 
  HudText, 
  HudImage, 
  PlayerCard, 
  ScoreBoard, 
  DraftPanel, 
  GameTimer, 
  TeamBanner 
} from './elements'
import { computed, ref, toRaw, watch } from 'vue'

const props = defineProps<{ 
  elements: IHUDElement[]
}>()

const normalizedList = ref<INormalizedHUDElement[]>([])

const componentsMap = toRaw({
  text: {
    component: HudText
  },
  image: {
    component: HudImage
  },
  playerCard: {
    component: PlayerCard
  },
  scoreBoard: {
    component: ScoreBoard
  },
  draftPanel: {
    component: DraftPanel
  },
  gameTimer: {
    component: GameTimer
  },
  teamBanner: {
    component: TeamBanner
  }
})

function normalizeListItem(
  { id, component, ...rest }: IHUDElement<any>,
  index: number
): INormalizedHUDElement {
  return {
    id,
    index,
    component,
    bind: {
      ...rest,
      id,
      active: false,
      disable: true, // Sempre desabilitado no overlay (sem edição)
      isInsideBoundingBox: false
    },
    on: {} as any // Sem eventos de edição no overlay
  }
}

function normalizeList(elementsList: IHUDElement[]) {
  return elementsList
    .filter((item) => item.isShowed) // Apenas elementos visíveis
    .map(normalizeListItem)
}

function genNormalizedList(elementsList: IHUDElement[]) {
  normalizedList.value = normalizeList(elementsList)
}

// Ordenar por layer (z-index)
const orderedList = computed(() =>
  normalizedList.value.slice().sort((a, b) => (a.bind?.layer ?? 0) - (b.bind?.layer ?? 0))
)

// Observar mudanças nos elementos
watch(
  () => props.elements,
  (newElements) => {
    genNormalizedList(newElements)
  },
  { immediate: true, deep: true }
)
</script>

<template>
  <div class="overlay-canvas">
    <div class="overlay-canvas__content">
      <component
        v-for="(item, index) in orderedList"
        :key="`${item.id}-${index}`"
        :is="componentsMap[item.component].component"
        v-bind="item.bind"
        class="overlay-canvas__element"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.overlay-canvas {
  width: 1920px;
  height: 1080px;
  position: relative;
  background: transparent;
  overflow: hidden;

  &__content {
    width: 100%;
    height: 100%;
    position: relative;
  }

  &__element {
    position: absolute;
    pointer-events: none; // Sem interação no overlay
  }
}
</style>
