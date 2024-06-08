import type { PluginContext } from '@/types'

import PrimeVue from 'primevue/config'

// Prime components
import Button from 'primevue/button'
import Card from 'primevue/card'
import FloatLabel from 'primevue/floatlabel'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Image from 'primevue/image'
import Dropdown from 'primevue/dropdown'

export default function ({ app }: PluginContext) {
  // Prime components
  app.component('PButton', Button)
  app.component('Card', Card)
  app.component('FloatLabel', FloatLabel)
  app.component('InputText', InputText)
  app.component('Password', Password)
  app.component('PImage', Image)
  app.component('Dropdown', Dropdown)

  // Prime
  app.use(PrimeVue)
}
