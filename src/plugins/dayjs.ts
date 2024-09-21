import dayjs from 'dayjs'
import localeData from 'dayjs/plugin/localeData'
import duration from 'dayjs/plugin/duration'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(localeData)
dayjs.extend(duration)
dayjs.extend(relativeTime)

const supportedLocales = {
  es: async () => await import('dayjs/locale/es'),
  'en-us': async () => await import('dayjs/locale/en'),
  'pt-br': async () => await import('dayjs/locale/pt-br')
}

export async function setLocale(locale: string) {
  try {
    await supportedLocales[locale as keyof typeof supportedLocales]()
    dayjs.locale(locale)
  } catch (error) {
    return
  }
}

export { dayjs }
