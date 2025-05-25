<script setup lang="ts">
import type {
  HUDElementBaseEmits,
  IHUDElement,
  INormalizedHUDElement,
  INormalizedHUDElementBind
} from '@/types/hud'
import useColor from '@/composables/useColor'
import useCrypt from '@/composables/useCrypt'
import { HudText } from './elements'
import isEqual from 'lodash.isequal'
import { computed, ref, toRaw, watch } from 'vue'
import { PrimeIcons } from '@primevue/core'
import { useRoute, useRouter } from 'vue-router'
import { DEFAULT_MIN_SIZE } from '@/composables/useElement'
import useElementSelection, { CONTEXT_MENU_Z_INDEX } from '@/composables/useElementSelection'
import BoundingBox from './elements/BoundingBox.vue'

const props = defineProps<{ modelValue: IHUDElement[]; disable?: boolean }>()

const emits = defineEmits<{
  'update:modelValue': [payload: IHUDElement[]]
}>()

const route = useRoute()

const router = useRouter()

const { genRandomColors } = useColor()

const { genUUID } = useCrypt('HUD')

const lazyList = ref<IHUDElement[]>([])

const { selecteds, selectedsIds, boundingBox, clearSelection } = useElementSelection(
  lazyList,
  '.stream-crafter-hud-canvas__content',
  '.stream-crafter-hud-element-base'
)

const normalizedList = ref<INormalizedHUDElement[]>([])

const activeNode = ref<string>()

const componentsMap = toRaw<any>({
  text: HudText
})

const selectedNormalizedElements = computed(() =>
  normalizedList.value.filter((normalizedElement) => selecteds.has(normalizedElement.id))
)

function normalizeListItem(
  { id, component, ...rest }: IHUDElement<any>,
  index: number
): INormalizedHUDElement {
  function setNewValue<K extends keyof INormalizedHUDElementBind>(key: K) {
    return (newValue: INormalizedHUDElementBind[K]) => {
      normalizedList.value[index].bind[key] = newValue
    }
  }

  const isInsideBoundingBox = selecteds.has(id)

  return {
    id,
    index,
    component,
    bind: {
      ...rest,
      id,
      active: selecteds.size ? isInsideBoundingBox : activeNode.value === id,
      disable: true,
      isInsideBoundingBox
    },
    on: {
      'update:position': setNewValue('position'),
      'update:size': setNewValue('size'),
      'update:is-showed': setNewValue('isShowed'),
      'update:layer': setNewValue('layer'),
      'selecteds:position'(payload: HUDElementBaseEmits['delta:position'][number]) {
        updateSelectedsPosition(id, payload)
      },
      click() {
        activeNode.value = id

        genNormalizedList(lazyList.value)
      }
    } as any
  }
}

function normalizeList(sanitazedList: IHUDElement[]) {
  return sanitazedList
    .filter((item) => (props.disable ? item.isShowed : true))
    .map(normalizeListItem)
}

function sanitizeList(normalizedList: INormalizedHUDElement[]) {
  const arr: IHUDElement[] = []

  for (const { id, component, bind } of toRaw(normalizedList)) {
    const data = { ...bind, disable: undefined }

    delete data.disable

    arr.push({
      component,
      ...data,
      id
    })
  }

  return arr
}

function genDefaultListItemData() {
  const { color, luminance } = genRandomColors()
  const uuid = genUUID()

  return {
    id: uuid,
    backgroundColor: color,
    color: luminance,
    position: {
      x: 0,
      y: 0
    },
    size: {
      width: DEFAULT_MIN_SIZE,
      height: DEFAULT_MIN_SIZE
    }
  }
}

function genNormalizedList(newValue: IHUDElement[]) {
  const newNormalizedList = normalizeList(newValue)

  if (!isEqual(normalizedList.value, newNormalizedList)) {
    normalizedList.value = newNormalizedList
  }
}

function addText() {
  const defaultData = genDefaultListItemData()

  lazyList.value.push({
    ...defaultData,
    component: 'text',
    isShowed: true,
    maintainAspectRatio: false,
    layer: 0,
    data: {
      text: `ELEMENTO TESTE ${lazyList.value.length + 1}`
    }
  })
}

function updateSelectedsIsShowed(newValue: IHUDElement['isShowed']) {
  selectedNormalizedElements.value.forEach((item) => {
    normalizedList.value[item.index].bind.isShowed = newValue
  })
}

function updateSelectedsLayer(newValue: IHUDElement['layer']) {
  const operator = CONTEXT_MENU_Z_INDEX > newValue ? -1 : 1

  selectedNormalizedElements.value.forEach((item) => {
    normalizedList.value[item.index].bind.layer = Math.max(0, item.bind.layer + operator)
  })
}

// Método que atualiza a posição dos itens selecionados
function updateSelectedsPosition(
  targetDispatched: string,
  { dx, dy }: HUDElementBaseEmits['delta:position'][number]
) {
  selectedNormalizedElements.value.forEach((item) => {
    if (targetDispatched !== item.id) {
      normalizedList.value[item.index].bind.position = {
        x: item.bind.position.x + dx,
        y: item.bind.position.y + dy
      }
    }
  })
}

// Método que atualiza o tamanho dos itens selecionados
function updateSelectedsSize({ width, height }: IHUDElement['size']) {
  const scaleX = width / boundingBox.value.size.width
  const scaleY = height / boundingBox.value.size.height

  selectedNormalizedElements.value.forEach((item) => {
    const originalData = { ...normalizedList.value[item.index].bind }

    const boundingBoxX = boundingBox.value.position.x
    const boundingBoxy = boundingBox.value.position.y

    normalizedList.value[item.index].bind.size = {
      width: item.bind.size.width * scaleX,
      height: item.bind.size.height * scaleY
    }

    normalizedList.value[item.index].bind.position = {
      x: boundingBoxX + (originalData.position.x - boundingBoxX) * scaleX,
      y: boundingBoxy + (originalData.position.y - boundingBoxy) * scaleY
    }
  })
}

function showList() {
  console.log('showList', toRaw(lazyList.value))
}

function showPreview() {
  router.push(`/app/huds/${route.params.hudId}`)
}

watch(
  () => props.modelValue,
  (newValue) => {
    if (!isEqual(lazyList.value, newValue)) {
      lazyList.value = newValue
    }
  },
  { immediate: true, deep: true }
)

watch(
  [lazyList, () => selectedsIds.value.length],
  () => {
    genNormalizedList(lazyList.value)
  },
  { deep: true }
)

watch(
  normalizedList,
  (newValue) => {
    const newModelValue = sanitizeList(newValue)

    if (!isEqual(props.modelValue, newModelValue)) {
      emits('update:modelValue', sanitizeList(newValue))
    }
  },
  { deep: true }
)
</script>

<template>
  <div
    class="stream-crafter-hud-canvas flex flex-col h-full overflow-hidden"
    @dblclick.prevent="clearSelection"
  >
    <!-- content -->
    <div class="stream-crafter-hud-canvas__content relative flex flex-col w-full h-full">
      <div
        v-if="!props.disable"
        class="sticky top-2 left-2 z-10 flex items-center gap-1 bg-white p-2 rounded w-fit"
      >
        <p-button label="Adicionar texto" @click="addText" />

        <p-button label="Ver lista" @click="showList" />

        <p-button label="Preview" :icon="PrimeIcons.EYE" @click="showPreview" />
      </div>

      <component
        v-for="item in normalizedList"
        :is="componentsMap[item.component]"
        :key="item.id"
        v-bind="item.bind"
        v-on="item.on"
      />
    </div>

    <!-- bounding box -->
    <BoundingBox
      v-if="selectedsIds.length > 0"
      ref="boundingBoxRef"
      v-bind="boundingBox"
      @on-change-size="updateSelectedsSize"
      @on-change-layer="updateSelectedsLayer"
      @on-change-is-showed="updateSelectedsIsShowed"
      @on-change-position="updateSelectedsPosition('bounding-box', $event)"
    ></BoundingBox>
  </div>
</template>

<style lang="scss">
.stream-crafter-hud-canvas {
  background-image: radial-gradient(circle, transparent 20px, white 1px);
  background-size: 30px 30px;
}

.selection-area {
  background: rgba(79, 144, 242, 0.01);
  border: 1px dashed rgba(79, 144, 242, 0.8);
  border-radius: 0.25rem;
}
</style>
