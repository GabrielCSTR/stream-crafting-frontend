<script setup lang="ts">
import type { DynamicFormProps } from '@/types'
import type { Ref } from 'vue'

const props = defineProps<DynamicFormProps>()

const { defineField, errors } = props.formContext

const form: Record<string, Ref<any>> = {}

function getFormValue(key: string) {
  return form[key].value
}

function setFormValue(key: string, newValue: any) {
  form[key].value = newValue
}

for (const k of Object.keys(props.fields)) {
  const [value] = defineField(k)

  form[k] = value
}
</script>

<template>
  <div class="dynamic-form flex flex-column w-full">
    <div
      v-for="(v, k) in props.fields"
      :key="k"
      :class="['dynamic-form__field flex flex-column gap-2', v.classes]"
    >
      <FloatLabel>
        <component
          class="w-full"
          :is="v.component"
          v-bind="v.bind || {}"
          :model-value="getFormValue(k)"
          :invalid="!!errors[k]"
          :disabled="props.loading || v.disabled"
          :loading="props.loading || v.loading"
          @update:modelValue="setFormValue(k, $event)"
        />
        <label>{{ v.label }}</label>
      </FloatLabel>
      <small v-if="!!errors[k]" class="p-error">{{ errors[k] }}</small>
    </div>
  </div>
</template>
