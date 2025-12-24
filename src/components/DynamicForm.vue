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
  <div class="radiantcast-dynamic-form flex flex-col w-full">
    <div
      v-for="(v, k) in props.fields"
      :key="k"
      :class="['radiantcast-dynamic-form__field flex flex-col gap-2', v.classes]"
    >
      <FloatLabel>
        <component
          class="radiantcast-dynamic-form__input w-full"
          :is="v.component"
          v-bind="v.bind || {}"
          :model-value="getFormValue(k)"
          :invalid="!!errors[k]"
          :disabled="props.loading || v.disabled"
          :loading="props.loading || v.loading"
          @update:modelValue="setFormValue(k, $event)"
        />
        <label class="radiantcast-dynamic-form__label">{{ v.label }}</label>
      </FloatLabel>
      <small v-if="!!errors[k]" class="radiantcast-dynamic-form__error">{{ errors[k] }}</small>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.radiantcast-dynamic-form {
  &__field {
    position: relative;
  }

  &__input {
    width: 100%;

    // InputText styling
    :deep(.p-inputtext) {
      width: 100%;
      background: rgba(15, 23, 42, 0.6) !important;
      border: 1px solid #1E293B !important;
      color: #CBD5E1 !important;
      border-radius: 12px;
      padding: 0.875rem 1rem;
      font-size: 1rem;
      transition: all 0.3s ease;

      &:focus {
        border-color: #34F5A3 !important;
        box-shadow: 0 0 0 3px rgba(52, 245, 163, 0.1) !important;
        background: rgba(15, 23, 42, 0.8) !important;
        outline: none;
      }

      &:hover:not(:disabled):not(:focus) {
        border-color: rgba(52, 245, 163, 0.5) !important;
      }

      &::placeholder {
        color: #64748B;
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }

    // Password component styling
    :deep(.p-password) {
      width: 100%;

      .p-inputwrapper {
        position: relative;
        width: 100%;
      }

      .p-inputtext,
      .p-password-input {
        width: 100%;
        background: rgba(15, 23, 42, 0.6) !important;
        border: 1px solid #1E293B !important;
        color: #CBD5E1 !important;
        border-radius: 12px;
        padding: 0.875rem 1rem;
        padding-right: 3rem !important;
        font-size: 1rem;
        transition: all 0.3s ease;

        &:focus {
          border-color: #34F5A3 !important;
          box-shadow: 0 0 0 3px rgba(52, 245, 163, 0.1) !important;
          background: rgba(15, 23, 42, 0.8) !important;
          outline: none;
        }

        &:hover:not(:disabled):not(:focus) {
          border-color: rgba(52, 245, 163, 0.5) !important;
        }

        &::placeholder {
          color: #64748B;
        }

        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      }

      .p-password-toggle {
        position: absolute;
        right: 0.75rem;
        top: 50%;
        transform: translateY(-50%);
        background: transparent;
        border: none;
        cursor: pointer;
        padding: 0.25rem;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #94A3B8;
        transition: color 0.2s ease;
        z-index: 10;

        &:hover {
          color: #34F5A3;
        }

        .p-password-toggle-icon {
          width: 1.25rem;
          height: 1.25rem;
        }
      }
    }
  }

  &__label {
    color: #94A3B8 !important;
    font-weight: 500;
    font-size: 0.875rem;
    transition: color 0.3s ease;

    &[data-p-filled='true'],
    &[data-p-inputwrapper-focus='true'] {
      color: #34F5A3 !important;
    }
  }

  &__error {
    color: #F87171 !important;
    font-size: 0.875rem;
    margin-top: 0.25rem;
    display: block;
    font-weight: 500;
  }
}
</style>
