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
  <div class="radiantcast-sign-base flex flex-col w-full gap-6">
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
          class="radiantcast-sign-base__link"
        >
          <p-button 
            class="px-0" 
            :label="link.text" 
            :disabled="props.loading" 
            link 
            style="color: #34F5A3;"
          />
        </component>
      </template>
    </AuthBase>

    <!-- Divider -->
    <div class="radiantcast-sign-base__divider">
      <div class="radiantcast-sign-base__divider__line"></div>
      <span class="radiantcast-sign-base__divider__text">ou</span>
      <div class="radiantcast-sign-base__divider__line"></div>
    </div>

    <!-- OAuth Buttons -->
    <section class="radiantcast-sign-base__oauth flex flex-col w-full gap-4">
      <p-button
        class="radiantcast-sign-base__oauth__btn items-center justify-center"
        v-for="btn in btns"
        :key="btn.id"
        :label="btnsText(btn.text)"
        :disabled="props.loading"
        :loading="props.loading"
        :style="{
          ...btn.colors
        }"
        @click="btn.click"
        outlined
        size="large"
      >
        <template #icon>
          <div class="p-button-icon p-button-left flex items-center mr-2">
            <component :is="btn.icon" :color="btn.colors['--text-color']" />
          </div>
        </template>
      </p-button>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.radiantcast-sign-base {
  .p-password {
    &-input {
      width: 100%;
    }
  }

  &__link {
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 0.8;
    }
  }

  &__divider {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin: 0.5rem 0;

    &__line {
      flex: 1;
      height: 1px;
      background: linear-gradient(90deg, transparent, #1E293B, transparent);
    }

    &__text {
      color: #94A3B8;
      font-size: 0.875rem;
      font-weight: 500;
    }
  }

  &__oauth {
    &__btn {
      --p-button-primary-focus-ring-color: var(--text-color);

      background: transparent !important;
      border: 1px solid #1E293B !important;
      border-color: #1E293B !important;
      color: var(--text-color) !important;
      transition: all 0.3s ease;

      &:not(:disabled) {
        &:hover {
          background: rgba(30, 41, 59, 0.5) !important;
          border-color: rgba(52, 245, 163, 0.3) !important;
          transform: translateY(-2px);
        }

        &:active,
        &:focus-visible {
          background: rgba(30, 41, 59, 0.7) !important;
          border-color: rgba(52, 245, 163, 0.5) !important;
        }
      }
    }
  }
}
</style>
