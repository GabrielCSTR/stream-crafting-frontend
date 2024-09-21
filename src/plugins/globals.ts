import Page from '@/components/Page.vue'
import type { PluginContext } from '@/types'

export default function ({ app }: PluginContext) {
  app.component('Page', Page)
}
