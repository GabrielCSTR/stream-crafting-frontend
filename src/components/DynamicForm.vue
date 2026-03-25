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
      background: rgba(18, 18, 18, 0.9) !important;
      border: 1px solid #242424 !important;
      color: #D4D4D4 !important;
      border-radius: 12px;
      padding: 0.875rem 1rem;
      font-size: 1rem;
      transition: all 0.3s ease;

      &:focus {
        border-color: #FD2A36 !important;
        box-shadow: 0 0 0 3px rgba(253, 42, 54, 0.12) !important;
        background: rgba(18, 18, 18, 1) !important;
        outline: none;
      }

      &:hover:not(:disabled):not(:focus) {
        border-color: rgba(253, 42, 54, 0.35) !important;
      }

      &::placeholder {
        color: #737373;
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
        background: rgba(18, 18, 18, 0.9) !important;
        border: 1px solid #242424 !important;
        color: #D4D4D4 !important;
        border-radius: 12px;
        padding: 0.875rem 1rem;
        padding-right: 3rem !important;
        font-size: 1rem;
        transition: all 0.3s ease;

        &:focus {
          border-color: #FD2A36 !important;
          box-shadow: 0 0 0 3px rgba(253, 42, 54, 0.12) !important;
          background: rgba(18, 18, 18, 1) !important;
          outline: none;
        }

        &:hover:not(:disabled):not(:focus) {
          border-color: rgba(253, 42, 54, 0.35) !important;
        }

        &::placeholder {
          color: #737373;
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
        color: #A4A4A4;
        transition: color 0.2s ease;
        z-index: 10;

        &:hover {
          color: #FD2A36;
        }

        .p-password-toggle-icon {
          width: 1.25rem;
          height: 1.25rem;
        }
      }
    }
  }

  &__label {
    color: #A4A4A4 !important;
    font-weight: 500;
    font-size: 0.875rem;
    transition: color 0.3s ease;

    &[data-p-filled='true'],
    &[data-p-inputwrapper-focus='true'] {
      color: #FD2A36 !important;
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
