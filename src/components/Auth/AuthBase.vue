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
  <section class="stream-crafting-auth-base flex flex-col justify-center w-full">
    <!-- title -->
    <h2 class="stream-crafting-auth-base__title text-center mt-0">{{ props.title }}</h2>

    <!-- form -->
    <div class="stream-crafting-auth-base__container flex flex-col w-full">
      <form class="flex flex-col gap-8" @submit="onSubmit">
        <!-- DynamicForm -->
        <DynamicForm v-bind="props.dynamicFormProps" :loading="loading" class="gap-8" />

        <div class="flex flex-col">
          <!-- Button -->
          <p-button
            class="w-full"
            type="submit"
            :label="props.submitBtnText"
            :disabled="props.loading"
            :loading="props.loading"
          ></p-button>

          <!-- Post button -->
          <div
            v-if="!!slots.links"
            class="stream-crafting-auth-base__container__links flex justify-between mt-2"
          >
            <slot name="links"></slot>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>
