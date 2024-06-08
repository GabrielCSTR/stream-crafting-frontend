<script lang="ts" setup>
import { useForm } from 'vee-validate'
import type { DynamicFormProps } from '@/types'
import type { PasswordProps } from 'primevue/password'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import * as yup from 'yup'
import { ref } from 'vue'
import SignBase from '@/components/Auth/SignBase.vue'
import { markRaw } from 'vue'
import { useRouter } from 'vue-router'
import { oauth } from '@/plugins/axios'
import { PasswordGrant } from '@/services/oauth'
import { useI18n } from 'vue-i18n'

const router = useRouter()

const { t } = useI18n()

const formContext = useForm({
  validationSchema: yup.object({
    email: yup.string().email().required().label(t('pages.signin.labels.email')),
    password: yup.string().required().label(t('pages.signin.labels.password'))
  })
})

const loading = ref(false)

const links = markRaw([
  { text: t('pages.forgot.title'), to: '/forgot' },
  { text: t('pages.signup.title'), to: '/signup' }
])

const dynamicFormProps: DynamicFormProps<'email' | 'password'> = {
  fields: {
    email: {
      label: t('pages.signin.labels.email'),
      component: InputText,
      bind: {
        type: 'email'
      }
    },
    password: {
      label: t('pages.signin.labels.password'),
      component: Password,
      bind: {
        pt: {
          input: 'w-full',
          hideIcon: 'cursor-pointer',
          showIcon: 'cursor-pointer'
        },
        feedback: false,
        toggleMask: true,
        invalid: true
      } as PasswordProps
    }
  },
  formContext
}

function btnsText(platform: string) {
  return t('buttons.enter_with', { target: platform })
}

async function onSubmit({ email, password }: { email: string; password: string }) {
  loading.value = true

  await oauth
    .requestAndSave(new PasswordGrant(email, password))
    .then(() => {
      router.replace('/app')
    })
    .finally(() => {
      loading.value = false
    })

  // await new Promise((resolve) => setTimeout(resolve, 5000))
}
</script>

<template>
  <div class="stream-crafting-signin">
    <SignBase
      class="h-25rem"
      :dynamic-form-props="dynamicFormProps"
      :submit-btn-text="t('buttons.signin')"
      :handle-submit="onSubmit"
      :btns-text="btnsText"
      :loading="loading"
      :links="links"
      :title="t('pages.signin.title')"
    ></SignBase>
  </div>
</template>
