<script setup lang="ts">
import { type AuthBaseProps } from '@/types/'
import SteamIcon from '@/components/icons/Steam.vue'
import AuthBase from './AuthBase.vue'
import Divider from '../Divider.vue'
import { markRaw } from 'vue'

const props = defineProps<
  {
    btnsText(platform: string): string
    links: { text: string; to: string }[]
  } & AuthBaseProps
>()

const btns = markRaw<
  {
    id: string
    text: string
    icon: any
    click(): any
    colors: {
      '--text-color': string
      '--bg-color': string
      '--active-color': string
      '--hover-color': string
    }
  }[]
>([
  {
    id: 'steam',
    text: 'Steam',
    icon: SteamIcon,
    click() {
      console.log('CLICK ON STEAM BTN')
    },
    colors: {
      '--bg-color': '#1B2838',
      '--text-color': '#FFFFFF',
      '--active-color': '#293d55',
      '--hover-color': '#223246'
    }
  }
])
</script>

<template>
  <div class="stream-crafting-sign-base flex">
    <!-- AuthBase -->
    <AuthBase
      :dynamic-form-props="props.dynamicFormProps"
      :submit-btn-text="props.submitBtnText"
      :handle-submit="props.handleSubmit"
      :loading="props.loading"
      :title="props.title"
    >
      <template #links>
        <component
          :is="props.loading ? 'div' : 'router-link'"
          v-for="link in links"
          :key="link.to"
          :to="link.to"
        >
          <p-button class="px-0" :label="link.text" :disabled="props.loading" link />
        </component>
      </template>
    </AuthBase>

    <!-- splitter -->
    <Divider class="mx-5" />

    <!-- with -->
    <section
      class="stream-crafting-sign-base__with flex flex-column justify-content-center w-full gap-5"
    >
      <p-button
        class="stream-crafting-sign-base__with__btns align-items-center justify-content-center"
        v-for="btn in btns"
        :key="btn.id"
        :label="btnsText(btn.text)"
        :disabled="props.loading"
        :loading="props.loading"
        :style="{
          ...btn.colors
        }"
        @click="btn.click"
      >
        <template #icon>
          <div class="p-button-icon p-button-left flex align-items-center mr-2">
            <component :is="btn.icon" :color="btn.colors['--text-color']" />
          </div>
        </template>
      </p-button>
    </section>
  </div>
</template>

<style lang="scss">
.stream-crafting-sign-base {
  .p-password {
    &-input {
      width: 100%;
    }
  }

  &__with {
    &__btns {
      --p-focus-ring-color: var(--text-color);

      background: var(--bg-color);
      border-color: var(--bg-color);
      color: var(--text-color);

      &:not(:disabled) {
        &:hover {
          background: var(--hover-color);
        }

        &:active,
        &:focus-visible {
          background: var(--active-color);
        }
      }
    }
  }
}
</style>
