import './assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

const pinia = createPinia()

// Plugins call
const plugins = ['axios', 'i18n', 'prime'] as const

Promise.all(
  plugins.map(async (plugin) => {
    const { default: defaultImport } = await import(`./plugins/${plugin}.ts`)

    const fn = defaultImport || (() => Promise.resolve(undefined))

    return fn({ app, pinia, router })
  })
).finally(() => {
  // Default plugins use
  app.use(pinia)

  app.use(router)

  app.mount('#app')
})
