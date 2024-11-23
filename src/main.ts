import './css/index.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

const pinia = createPinia()

// Plugins call
const plugins = ['axios', 'i18n', 'globals', 'primevue'] as const

async function loadPlugins() {
  for (const plugin of plugins) {
    const { default: defaultImport } = await import(`./plugins/${plugin}.ts`)

    const fn = defaultImport || (() => Promise.resolve(undefined))

    await fn({ app, pinia, router })
  }
}

loadPlugins().finally(() => {
  // Default plugins use
  app.use(pinia)

  app.use(router)

  app.mount('#app')
})
