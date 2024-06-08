<script setup lang="ts">
import { useSessionStore } from '@/stores/session'
import { SUPPORT_LOCALES, setI18nLanguage } from '../plugins/i18n'
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'

const sessionStore = useSessionStore()

const languages = ref(SUPPORT_LOCALES)

const { t } = useI18n()

const FLAGS_NAMES = {
  'pt-BR': 'BR',
  'en-US': 'US',
  es: 'ES'
}

function optionLabel(opt: string) {
  return t(`languages.${opt}`)
}

function normalizeFlagCode(code: string) {
  const k = code as keyof typeof FLAGS_NAMES
  return FLAGS_NAMES[k].toLowerCase()
}
</script>

<template>
  <Dropdown
    v-model="sessionStore.language"
    :options="languages"
    :option-label="optionLabel"
    placeholder="[Selecione um idioma]"
    class="w-14rem"
    @update:modelValue="setI18nLanguage"
  >
    <template #value="{ value, placeholder }">
      <div v-if="value" class="flex align-items-center">
        <img
          :alt="value.label"
          src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"
          :class="`mr-2 flag flag-${normalizeFlagCode(value)}`"
          style="width: 18px"
        />
        <div>{{ optionLabel(value) }}</div>
      </div>
      <span v-else>
        {{ placeholder }}
      </span>
    </template>

    <!-- option -->
    <template #option="{ option }">
      <div class="flex align-items-center">
        <img
          :alt="option.label"
          src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"
          :class="`mr-2 flag flag-${normalizeFlagCode(option)}`"
          style="width: 18px"
        />
        <div>{{ optionLabel(option) }}</div>
      </div>
    </template>
  </Dropdown>
</template>
