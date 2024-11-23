<script setup lang="ts">
import type { IHUDElement, INormalizedHUDElement, INormalizedHUDElementBind } from '@/types/hud'
import useColor from '@/composables/useColor'
import useCrypt from '@/composables/useCrypt'
import { HudText } from './elements'
import isEqual from 'lodash.isequal'
import { ref, toRaw, watch } from 'vue'
import { PrimeIcons } from '@primevue/core'
import { useRoute, useRouter } from 'vue-router'

const props = defineProps<{ modelValue: IHUDElement[]; disable?: boolean }>()

const emits = defineEmits<{
  'update:modelValue': [payload: IHUDElement[]]
}>()

const route = useRoute()

const router = useRouter()

const { genRandomColors } = useColor()

const { genUUID } = useCrypt('HUD')

const lazyList = ref<IHUDElement[]>([])

const normalizedList = ref<INormalizedHUDElement[]>([])

const activeNode = ref<string>()

const componentsMap = toRaw<any>({
  text: HudText
})

function normalizeListItem(
  { id, component, ...rest }: IHUDElement<any>,
  index: number
): INormalizedHUDElement {
  function setNewValue<K extends keyof INormalizedHUDElementBind>(key: K) {
    return (newValue: INormalizedHUDElementBind[K]) => {
      normalizedList.value[index].bind[key] = newValue
    }
  }

  return {
    id,
    index,
    component,
    bind: {
      ...rest,
      active: activeNode.value === id,
      disable: props.disable
    },
    on: {
      'update:position': setNewValue('position'),
      'update:size': setNewValue('size'),
      'update:is-showed': setNewValue('isShowed'),
      'update:layer': setNewValue('layer'),
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
      id,
      component,
      ...data
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
      width: 100,
      height: 100
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
  lazyList,
  (newValue) => {
    genNormalizedList(newValue)
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
  <div class="stream-crafter-hud-canvas flex flex-col h-full overflow-hidden">
    <!-- <fluid v-if="!disable" class="flex min-h-5 w-full bg-white px-2 py-4"> </fluid> -->

    <!-- content -->
    <div class="relative flex flex-col w-full h-full">
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
  </div>
</template>

<!-- <style lang="scss">
.stream-crafter-hud-canvas {
    background-image: radial-gradient(circle, transparent 20px, white 1px);
    background-size: 30px 30px;
}
</style> -->
