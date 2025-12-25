<script setup lang="ts">
import type {
  HUDElementBaseEmits,
  IHUDElement,
  INormalizedHUDElement,
  INormalizedHUDElementBind
} from '@/types/hud'
import useColor from '@/composables/useColor'
import useCrypt from '@/composables/useCrypt'
import { HudText, HudImage } from './elements'
import isEqual from 'lodash.isequal'
import { computed, ref, toRaw, watch } from 'vue'
import { PrimeIcons } from '@primevue/core'
import SplitButton from 'primevue/splitbutton'
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

const { selecteds, selectedsIds, boundingBox, clearSelection } = useElementSelection({
  list: lazyList,
  container: '.stream-crafter-hud-canvas__content',
  selectable: '.stream-crafter-hud-element-base',
  disable: computed(() => props.disable)
})

const normalizedList = ref<INormalizedHUDElement[]>([])

const activeNode = ref<string>()

const componentsMap = toRaw({
  text: {
    component: HudText
  },
  image: {
    component: HudImage
  }
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
      disable: props.disable,
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
      text: 'Elemento de texto'
    }
  })
}

function addImage() {
  const defaultData = genDefaultListItemData()

  lazyList.value.push({
    ...defaultData,
    component: 'image',
    isShowed: true,
    maintainAspectRatio: true,
    layer: 0,
    data: {
      src: 'https://placehold.co/400x300',
      alt: 'Imagem placeholder'
    }
  })
}

const addElementMenuItems = ref([
  {
    label: 'Texto',
    icon: PrimeIcons.FONT,
    command: () => addText()
  },
  {
    label: 'Imagem',
    icon: PrimeIcons.IMAGE,
    command: () => addImage()
  }
])

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

function onDoubleClick() {
  clearSelection()
  activeNode.value = undefined
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
    @dblclick.prevent="onDoubleClick"
  >
    <!-- content -->
    <div class="stream-crafter-hud-canvas__content relative flex flex-col w-full h-full">
      <div
        v-if="!props.disable"
        class="stream-crafter-hud-canvas__toolbar"
      >
        <SplitButton
          label="Adicionar Elemento"
          :icon="PrimeIcons.PLUS"
          severity="success"
          :model="addElementMenuItems"
          @click="addText"
        />

        <p-button 
          label="Ver Lista" 
          :icon="PrimeIcons.LIST"
          severity="secondary"
          outlined
          @click="showList" 
        />

        <p-button 
          label="Preview" 
          :icon="PrimeIcons.EYE" 
          severity="info"
          outlined
          @click="showPreview" 
        />
      </div>

      <component
        v-for="item in normalizedList"
        :is="componentsMap[item.component].component"
        :key="item.id"
        v-bind="item.bind"
        v-on="item.on"
      />
    </div>

    <!-- bounding box -->
    <BoundingBox
      v-if="selectedsIds.length > 0 && !props.disable"
      ref="boundingBoxRef"
      v-bind="boundingBox"
      :disable="props.disable"
      @on-change-size="updateSelectedsSize"
      @on-change-layer="updateSelectedsLayer"
      @on-change-is-showed="updateSelectedsIsShowed"
      @on-change-position="updateSelectedsPosition('bounding-box', $event)"
    ></BoundingBox>
  </div>
</template>

<style lang="scss">
.stream-crafter-hud-canvas {
  background-color: #0F172A;
  background-image: 
    linear-gradient(rgba(52, 245, 163, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(52, 245, 163, 0.03) 1px, transparent 1px);
  background-size: 30px 30px;

  &__toolbar {
    position: sticky;
    top: 1rem;
    left: 1rem;
    z-index: 10;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem;
    background: rgba(15, 23, 42, 0.95);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(52, 245, 163, 0.2);
    border-radius: 12px;
    width: fit-content;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
    margin: 1rem;
  }
}

.selection-area {
  background: rgba(52, 245, 163, 0.05);
  border: 2px dashed rgba(52, 245, 163, 0.6);
  border-radius: 0.25rem;
}

// Estilo do menu dropdown
:deep(.p-splitbutton-dropdown) {
  .p-menu {
    background: rgba(15, 23, 42, 0.98);
    backdrop-filter: blur(16px);
    border: 1px solid rgba(52, 245, 163, 0.3);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
    
    .p-menuitem {
      .p-menuitem-content {
        transition: all 0.2s;
        
        &:hover {
          background: rgba(52, 245, 163, 0.1);
        }
        
        .p-menuitem-link {
          color: #CBD5E1;
          
          .p-menuitem-icon {
            color: #34F5A3;
          }
          
          &:hover {
            color: #F9FAFB;
          }
        }
      }
    }
  }
}
</style>
