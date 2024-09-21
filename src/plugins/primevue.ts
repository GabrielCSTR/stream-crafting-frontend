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

// Prime directives imports
import Ripple from 'primevue/ripple'

// Prime config imports
import Aura from '@primevue/themes/aura'

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

  // Prime directives
  app.directive('ripple', Ripple)

  // Prime
  app.use(PrimeVue, {
    theme: {
      preset: Aura,
      cssLayer: {
        name: 'primevue',
        order: 'tailwind-base, primevue, tailwind-utilities'
      }
    }
  })
}
