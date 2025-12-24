<script lang="ts" setup>
import { useForm } from 'vee-validate'
import type { DynamicFormProps } from '@/types'
import type { PasswordProps } from 'primevue/password'
import InputText, { type InputTextProps } from 'primevue/inputtext'
import Password from 'primevue/password'
import * as yup from 'yup'
import { ref } from 'vue'
import SignBase from '@/components/Auth/SignBase.vue'
import { markRaw } from 'vue'
import { useRouter } from 'vue-router'
import { oauth } from '@/plugins/services'
import { PasswordGrant } from '@/services/oauth'
import { useI18n } from 'vue-i18n'
import { useToast } from 'primevue/usetoast'

const router = useRouter()
const toast = useToast()

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
        type: 'email',
        autocomplete: 'email',
        id: 'email',
        name: 'email'
      } as InputTextProps
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
        invalid: true,
        autocomplete: 'current-password',
        id: 'password',
        name: 'password'
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

  try {
    await oauth.requestAndSave(new PasswordGrant(email, password))
    toast.add({
      severity: 'success',
      summary: 'Login realizado com sucesso!',
      life: 3000
    })
    router.replace('/app')
  } catch (error: any) {
    let errorMessage = 'Erro ao fazer login. Verifique suas credenciais.'
    
    if (error?.response?.data?.error) {
      const errorData = error.response.data.error
      
      if (errorData === 'invalid_grant' || errorData === 'user_or_password_wrong') {
        errorMessage = 'Email ou senha incorretos. Tente novamente.'
      } else if (errorData === 'invalid_user') {
        errorMessage = 'Usuário inválido ou não encontrado.'
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message
      }
    } else if (error?.message) {
      errorMessage = error.message
    }

    toast.add({
      severity: 'error',
      summary: 'Erro no login',
      detail: errorMessage,
      life: 5000
    })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="radiantcast-signin">
    <SignBase
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

<style lang="scss" scoped>
.radiantcast-signin {
  width: 100%;
  max-width: 100%;
}
</style>
