import type { PluginContext } from '@/types'
import { nextTick, type WritableComputedRef } from 'vue'
import { createI18n, type I18n, type I18nOptions } from 'vue-i18n'
import { setLocale } from 'yup'

const SUPPORT_LOCALES = ['pt-BR', 'es', 'en-US']

let i18n: I18n

async function setupI18n(options: I18nOptions = {}) {
  options = Object.assign<I18nOptions, I18nOptions>(
    { locale: window.navigator.language, legacy: false, fallbackLocale: 'en' },
    options
  )

  const i18nInstance = createI18n(options)

  const locale = options.locale || window.navigator.language

  setI18nLanguageWithInstance(i18nInstance, locale)

  await loadLocaleMessages(i18nInstance, locale)

  return i18nInstance
}

function setI18nLanguageWithInstance(i18nInstance: I18n, locale: string) {
  if (i18nInstance.mode === 'composition') {
    ;(i18nInstance.global.locale as WritableComputedRef<string>).value = locale
  }
}

async function loadLocaleMessages(i18n: I18n, locale: string) {
  const [messages] = await Promise.all([
    await import(
      /* @vite-ignore */
      `../locales/${locale}.json`
    ).then((i) => i.default)
  ])

  const t = i18n.global.t as any

  i18n.global.setLocaleMessage(locale, messages)

  setLocale({
    mixed: {
      required: ({ path }) => t('messages.required', { target: path })
    },
    string: {
      email: ({ path }) => t('messages.email', { target: path })
    }
  })

  return nextTick()
}

async function setI18nLanguage(locale: string) {
  setI18nLanguageWithInstance(i18n, locale)

  await loadLocaleMessages(i18n, locale)
}

export default async function ({ app }: PluginContext) {
  i18n = await setupI18n()

  app.use(i18n)
}

export { i18n, setI18nLanguage, SUPPORT_LOCALES }
