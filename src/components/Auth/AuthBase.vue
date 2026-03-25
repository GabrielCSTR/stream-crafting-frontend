<script setup lang="ts">
import type { AuthBaseProps } from '@/types'
import DynamicForm from '../DynamicForm.vue'
import type { GenericObject } from 'vee-validate'

const props = defineProps<AuthBaseProps>()

const slots = defineSlots<{ links(): any }>()

const onSubmit = props.dynamicFormProps.formContext.handleSubmit((form: GenericObject) => {
  props.handleSubmit(form)
})
</script>

<template>
  <section class="radiantcast-auth-base flex flex-col justify-center w-full">
    <!-- title -->
    <h2 class="radiantcast-auth-base__title">{{ props.title }}</h2>

    <!-- form -->
    <div class="radiantcast-auth-base__container flex flex-col w-full">
      <form class="flex flex-col gap-6" @submit="onSubmit">
        <!-- DynamicForm -->
        <DynamicForm v-bind="props.dynamicFormProps" :loading="loading" class="gap-6" />

        <div class="flex flex-col gap-4">
          <!-- Button -->
          <p-button
            class="radiantcast-auth-base__submit-btn w-full"
            type="submit"
            :label="props.submitBtnText"
            :disabled="props.loading"
            :loading="props.loading"
            size="large"
          ></p-button>

          <!-- Post button -->
          <div
            v-if="!!slots.links"
            class="radiantcast-auth-base__container__links flex justify-between mt-2"
          >
            <slot name="links"></slot>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.radiantcast-auth-base {
  &__title {
    text-align: center;
    font-size: 2rem;
    font-weight: 700;
    color: #FFFFFF;
    margin: 0 0 2rem 0;
    letter-spacing: -0.02em;
  }

  &__container {
    &__links {
      gap: 1rem;
    }
  }

  &__submit-btn {
    background: linear-gradient(135deg, #FD2A36 0%, #e60011 100%) !important;
    border: none !important;
    color: #FFFFFF !important;
    font-weight: 600;
    padding: 0.875rem 1.5rem;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(253, 42, 54, 0.25);

    &:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(253, 42, 54, 0.35);
    }

    &:active:not(:disabled) {
      transform: translateY(0);
    }
  }
}
</style>
