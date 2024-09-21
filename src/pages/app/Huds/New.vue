<script lang="ts" setup>
import { HudText } from '@/components/Huds/elements'
import useColor from '@/composables/useColor'
import useCrypt from '@/composables/useCrypt'
import type { IHUDElement, INormalizedHUDElement } from '@/types/hud'
import { onMounted, ref, toRaw, useTemplateRef } from 'vue'

const { genRandomColors } = useColor()

const { genUUID } = useCrypt('HUD')

const canvaRef = useTemplateRef('canvaRef')

const list = ref<INormalizedHUDElement[]>([])

const componentsMap = toRaw<any>({
  text: HudText
})

onMounted(() => {
  list.value = (
    [
      {
        id: '1',
        component: 'text',
        backgroundColor: '#b17fa9',
        color: '#000000',
        position: {
          x: 414.3218047647109,
          y: 365.0773032998104
        },
        size: {
          width: 305.609375,
          height: 100
        },
        data: {
          text: 'ELEMENTO TESTE 1'
        }
      },
      {
        id: '2',
        component: 'text',
        backgroundColor: '#9c137b',
        color: '#ffffff',
        position: {
          x: 922.7954014849397,
          y: -0.4154562845196068
        },
        size: {
          width: 375.734375,
          height: 249
        },
        data: {
          text: 'ELEMENTO TESTE 2'
        }
      },
      {
        id: '1726936562679',
        component: 'text',
        backgroundColor: '#77a32c',
        color: '#000000',
        position: {
          x: -0.0033333333333089854,
          y: 560.0011999999998
        },
        size: {
          width: 100,
          height: 100
        },
        data: {
          text: 'ELEMENTO TESTE 3'
        }
      },
      {
        id: 'c0a246bda1db9a471f2f9b374fe9fefee56b7019',
        component: 'text',
        backgroundColor: '#2ab28d',
        color: '#000000',
        position: {
          x: 78,
          y: 167
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
        component: 'text',
        backgroundColor: '#5775ad',
        color: '#ffffff',
        position: {
          x: 845,
          y: 336
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
        component: 'text',
        backgroundColor: '#653224',
        color: '#ffffff',
        position: {
          x: 372,
          y: 175
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
        component: 'text',
        backgroundColor: '#4862b7',
        color: '#ffffff',
        position: {
          x: 660,
          y: 82
        },
        size: {
          width: 100,
          height: 100
        },
        data: {
          text: 'ELEMENTO TESTE 7'
        }
      }
    ] as IHUDElement<any>[]
  ).map(normalizeListItem)
})

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

function normalizeListItem(
  { id, component, ...rest }: IHUDElement<any>,
  index: number
): INormalizedHUDElement {
  return {
    id,
    index,
    component,
    bind: {
      ...rest
    },
    on: {
      'update:position'(newValue) {
        list.value[index].bind.position = newValue
      },
      'update:size'(newValue) {
        list.value[index].bind.size = newValue
      }
    }
  }
}

function addText() {
  const defaultData = genDefaultListItemData()

  list.value.push(
    normalizeListItem(
      {
        ...defaultData,
        component: 'text',
        data: {
          text: `ELEMENTO TESTE ${list.value.length + 1}`
        }
      },
      list.value.length
    )
  )
}

function normalizeList() {
  const arr: IHUDElement<any>[] = []

  for (const { id, component, bind } of toRaw(list.value)) {
    arr.push({
      id,
      component,
      ...bind
    })
  }

  console.log('normalizeList', arr)
}

function showList() {
  console.log('showList', toRaw(list.value))
}
</script>

<template>
  <Page class="stream-crafter-hud-page flex flex-column w-full h-full">
    <div
      ref="canvaRef"
      class="stream-crafter-hud-page__canva relative flex flex-col w-full h-full overflow-hidden"
    >
      <div class="sticky top-2 left-2 z-10 flex gap-1 bg-white p-2 rounded w-fit">
        <p-button label="Adicionar texto" @click="addText" />

        <p-button label="Ver lista" @click="showList" />

        <p-button label="Ver saída" @click="normalizeList" />
      </div>

      <component
        v-for="item in list"
        :is="componentsMap[item.component]"
        :key="item.id"
        v-bind="item.bind"
        v-on="item.on"
      />
    </div>
  </Page>
</template>

<style lang="scss">
.stream-crafter-hud-page {
  &__canva {
    background-image: radial-gradient(circle, transparent 20px, white 1px);
    background-size: 30px 30px;
  }
}
</style>
