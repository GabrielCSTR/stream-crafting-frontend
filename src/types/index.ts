import type router from '@/router'
import type { Pinia } from 'pinia'
import type { GenericObject } from 'vee-validate'
import type { App } from 'vue'

export type ClassType = string | GenericObject

export interface Loaddable {
  loading: boolean
}

export interface Disablable {
  disabled: boolean
}

export interface PluginContext {
  app: App
  router: typeof router
  pinia: Pinia
}

export interface IToken {
  email: string
}

export * from './links'

export * from './components'
