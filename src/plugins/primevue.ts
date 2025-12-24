import type { PluginContext } from '@/types'

import PrimeVue from 'primevue/config'

// Prime components imports
import Button from 'primevue/button'
import Card from 'primevue/card'
import FloatLabel from 'primevue/floatlabel'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Image from 'primevue/image'
import Select from 'primevue/select'
import PanelMenu from 'primevue/panelmenu'
import Fluid from 'primevue/fluid'
import Toast from 'primevue/toast'
import ToastService from 'primevue/toastservice'

// Prime directives imports
import Ripple from 'primevue/ripple'

// Prime config imports
import D2Cast from '@/presets/D2Cast'

export default function ({ app }: PluginContext) {
  // Prime components
  app.component('PButton', Button)
  app.component('Card', Card)
  app.component('FloatLabel', FloatLabel)
  app.component('InputText', InputText)
  app.component('Password', Password)
  app.component('PImage', Image)
  app.component('PSelect', Select)
  app.component('PanelMenu', PanelMenu)
  app.component('Fluid', Fluid)
  app.component('Toast', Toast)

  // Prime services
  app.use(ToastService)

  // Prime directives
  app.directive('ripple', Ripple)

  // Prime
  app.use(PrimeVue, {
    theme: {
      preset: D2Cast,
      options: {
        darkModeSelector: '.dark',
        cssLayer: {
          name: 'primevue',
          order: 'tailwind-base, primeui, primevue, tailwind-utilities'
        }
      },
      cssLayer: {
        name: 'primevue',
        order: 'tailwind-base, primeui, primevue, tailwind-utilities'
      }
    }
  })
}
